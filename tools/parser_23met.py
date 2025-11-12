#!/usr/bin/env python3
"""
Скрипт для рекурсивного парсинга сайта 23met.ru и сохранения данных в базу данных
"""

import os
import time
import re
import json
from typing import List, Dict, Set, Optional
from urllib.parse import urljoin, urlparse
from datetime import datetime

import psycopg2
from bs4 import BeautifulSoup
from dotenv import load_dotenv
import requests

load_dotenv()

# Настройки
BASE_URL = "https://23met.ru"
START_URL = "https://23met.ru/spravka/armatura_a3"
DELAY_BETWEEN_REQUESTS = 1  # Задержка между запросами в секундах
MAX_RETRIES = 3

# Подключение к базе данных
def get_connection():
    return psycopg2.connect(
        host=os.environ.get("DBHOST"),
        database=os.environ.get("DBNAME"),
        user=os.environ.get("DBUSER"),
        password=os.environ.get("DBPASS"),
    )


def create_tables():
    """Создание таблиц для хранения материалов"""
    try:
        conn = get_connection()
    except Exception as e:
        print(f"Ошибка подключения к базе данных: {e}")
        print("Проверьте настройки подключения в файле .env")
        raise
    
    with conn:
        conn.autocommit = True
        with conn.cursor() as cursor:
            # Таблица для категорий материалов
            cursor.execute("""
                CREATE TABLE IF NOT EXISTS material_categories (
                    id SERIAL PRIMARY KEY,
                    name VARCHAR(255) NOT NULL UNIQUE,
                    url TEXT NOT NULL UNIQUE,
                    parent_category VARCHAR(255),
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            """)
            
            # Проверяем, существует ли таблица materials_23met со старой структурой
            cursor.execute("""
                SELECT EXISTS (
                    SELECT 1 FROM information_schema.tables 
                    WHERE table_schema = 'public' 
                    AND table_name = 'materials_23met'
                )
            """)
            table_exists = cursor.fetchone()[0]
            
            if table_exists:
                # Проверяем структуру таблицы
                cursor.execute("""
                    SELECT column_name FROM information_schema.columns 
                    WHERE table_schema = 'public' 
                    AND table_name = 'materials_23met'
                    AND column_name = 'наименование'
                """)
                has_new_structure = cursor.fetchone() is not None
                
                if not has_new_structure:
                    print("Обнаружена старая структура таблицы. Выполняется миграция...")
                    # Удаляем старые индексы, если они существуют
                    old_indexes = [
                        'idx_materials_category',
                        'idx_materials_name',
                        'idx_materials_size'
                    ]
                    for idx_name in old_indexes:
                        cursor.execute(f"DROP INDEX IF EXISTS {idx_name} CASCADE")
                    # Удаляем старую таблицу
                    cursor.execute("DROP TABLE IF EXISTS materials_23met CASCADE")
                    print("Старая таблица удалена")
            
            # Таблица для материалов (только необходимые поля)
            cursor.execute("""
                CREATE TABLE IF NOT EXISTS materials_23met (
                    id SERIAL PRIMARY KEY,
                    наименование TEXT,
                    гост TEXT,
                    класс VARCHAR(50),
                    диаметр VARCHAR(50),
                    номинальная_масса_1_метра NUMERIC(10, 4),
                    page_url TEXT,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    UNIQUE(наименование, гост, класс, диаметр, номинальная_масса_1_метра, page_url)
                )
            """)
            
            # Таблица для табличных данных (общая структура)
            cursor.execute("""
                CREATE TABLE IF NOT EXISTS material_tables (
                    id SERIAL PRIMARY KEY,
                    category VARCHAR(255),
                    page_url TEXT NOT NULL,
                    table_index INTEGER,
                    headers JSONB,
                    rows JSONB,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            """)
            
            # Индексы для быстрого поиска
            cursor.execute("""
                CREATE INDEX IF NOT EXISTS idx_materials_наименование 
                ON materials_23met(наименование)
            """)
            cursor.execute("""
                CREATE INDEX IF NOT EXISTS idx_materials_гост 
                ON materials_23met(гост)
            """)
            cursor.execute("""
                CREATE INDEX IF NOT EXISTS idx_materials_класс 
                ON materials_23met(класс)
            """)
            cursor.execute("""
                CREATE INDEX IF NOT EXISTS idx_materials_диаметр 
                ON materials_23met(диаметр)
            """)
            cursor.execute("""
                CREATE INDEX IF NOT EXISTS idx_categories_name 
                ON material_categories(name)
            """)
            
            print("Таблицы созданы успешно")


def get_page_content(url: str, referer: Optional[str] = None, retries: int = MAX_RETRIES) -> Optional[BeautifulSoup]:
    """Получение содержимого страницы с повторными попытками"""
    headers = {
        'Host': '23met.ru',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:144.0) Gecko/20100101 Firefox/144.0',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'ru-RU,ru;q=0.8,en-US;q=0.5,en;q=0.3',
        'Accept-Encoding': 'gzip, deflate, br, zstd',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1',
        'Sec-Fetch-Dest': 'document',
        'Sec-Fetch-Mode': 'navigate',
        'Sec-Fetch-Site': 'same-origin',
        'Sec-Fetch-User': '?1',
        'Priority': 'u=0, i',
        'Cookie': 'banners_top_current_id=liskitrybprom_992_M; banners_bottom_current_id=rapid_M_2021; usrhash=35dd0be30b84c07d1783632ba096784613150ddfa5827a5c5c657d58776a0385; PHPSESSID=vthbj31urnn234a3148rscovk6'
    }
    
    # Добавляем Referer, если он указан
    if referer:
        headers['Referer'] = referer
    
    for attempt in range(retries):
        try:
            response = requests.get(url, headers=headers, timeout=30)
            response.raise_for_status()
            response.encoding = 'utf-8'
            return BeautifulSoup(response.text, 'lxml')
        except requests.exceptions.RequestException as e:
            print(f"Ошибка при запросе {url} (попытка {attempt + 1}/{retries}): {e}")
            if attempt < retries - 1:
                time.sleep(2 ** attempt)  # Экспоненциальная задержка
            else:
                return None
    
    return None


def extract_links(soup: BeautifulSoup, base_url: str, category_filter: Optional[str] = None) -> Set[str]:
    """Извлечение всех ссылок со страницы"""
    links = set()
    
    # Ищем ссылки в меню и навигации
    for link in soup.find_all('a', href=True):
        href = link['href']
        full_url = urljoin(base_url, href)
        
        # Фильтруем только ссылки на страницы справки
        if '/spravka/' in full_url and full_url.startswith(BASE_URL):
            # Если указан фильтр категории, применяем его
            if category_filter:
                if category_filter in full_url:
                    links.add(full_url)
            else:
                links.add(full_url)
    
    return links


def parse_table(soup: BeautifulSoup) -> List[Dict]:
    """Извлечение данных из таблиц на странице"""
    tables_data = []
    
    tables = soup.find_all('table')
    
    for table_idx, table in enumerate(tables):
        headers = []
        rows = []
        
        # Извлекаем заголовки из thead
        thead = table.find('thead')
        if thead:
            header_rows = thead.find_all('tr')
            if header_rows:
                # Объединяем заголовки из нескольких строк, если есть
                all_headers = []
                for header_row in header_rows:
                    row_headers = [th.get_text(strip=True) for th in header_row.find_all(['th', 'td'])]
                    if row_headers:
                        all_headers.append(row_headers)
                
                # Если несколько строк заголовков, объединяем их
                if len(all_headers) > 1:
                    max_len = max(len(h) for h in all_headers)
                    headers = []
                    for i in range(max_len):
                        combined = ' '.join([h[i] if i < len(h) else '' for h in all_headers if h])
                        headers.append(combined.strip())
                elif all_headers:
                    headers = all_headers[0]
        
        # Если заголовков нет в thead, ищем в первой строке tbody или table
        if not headers:
            tbody = table.find('tbody') or table
            first_row = tbody.find('tr')
            if first_row:
                # Проверяем, является ли первая строка заголовком (содержит th или имеет особый стиль)
                cells = first_row.find_all(['th', 'td'])
                if cells:
                    # Если все ячейки содержат th или имеют класс заголовка
                    is_header = all(cell.name == 'th' for cell in cells) or \
                               any('header' in str(cell.get('class', [])).lower() or 
                                   'head' in str(cell.get('class', [])).lower() 
                                   for cell in cells)
                    
                    if is_header or len(cells) > 0:
                        headers = [cell.get_text(strip=True) for cell in cells]
        
        # Если заголовков все еще нет, создаем их из индексов
        if not headers:
            # Пробуем определить количество колонок из первой строки данных
            tbody = table.find('tbody') or table
            first_data_row = tbody.find('tr')
            if first_data_row:
                num_cols = len(first_data_row.find_all(['td', 'th']))
                headers = [f"column_{i+1}" for i in range(num_cols)]
        
        # Извлекаем строки данных
        tbody = table.find('tbody') or table
        data_rows = tbody.find_all('tr')
        
        # Определяем индекс начала данных
        start_idx = 0
        if thead:
            start_idx = 0  # Данные начинаются после thead
        elif headers and data_rows:
            # Проверяем, является ли первая строка заголовком
            first_row_cells = data_rows[0].find_all(['th', 'td'])
            if first_row_cells and all(cell.name == 'th' for cell in first_row_cells):
                start_idx = 1
        
        for row in data_rows[start_idx:]:
            cells = row.find_all(['td', 'th'])
            if not cells:
                continue
            
            # Пропускаем строки, которые выглядят как заголовки
            if all(cell.name == 'th' for cell in cells) and start_idx == 0:
                continue
            
            row_data = {}
            for idx, cell in enumerate(cells):
                # Используем заголовок, если он есть, иначе создаем имя колонки
                if idx < len(headers):
                    header = headers[idx] if headers[idx] else f"column_{idx+1}"
                else:
                    header = f"column_{idx+1}"
                
                cell_text = cell.get_text(strip=True)
                # Очищаем текст от лишних пробелов и переносов строк
                cell_text = ' '.join(cell_text.split())
                
                if cell_text:  # Сохраняем только непустые значения
                    row_data[header] = cell_text
            
            # Добавляем строку, если в ней есть данные
            if row_data:
                rows.append(row_data)
        
        if headers or rows:
            tables_data.append({
                'headers': headers,
                'rows': rows
            })
    
    return tables_data


def save_category(category_name: str, url: str, parent: Optional[str] = None):
    """Сохранение категории в базу данных"""
    with get_connection() as conn:
        conn.autocommit = True
        with conn.cursor() as cursor:
            cursor.execute("""
                INSERT INTO material_categories (name, url, parent_category)
                VALUES (%s, %s, %s)
                ON CONFLICT (url) DO UPDATE
                SET name = EXCLUDED.name,
                    parent_category = EXCLUDED.parent_category
            """, (category_name, url, parent))


def save_material_data(category: str, page_url: str, tables_data: List[Dict]):
    """Сохранение данных материалов в базу данных"""
    with get_connection() as conn:
        conn.autocommit = True
        with conn.cursor() as cursor:
            for table_idx, table_data in enumerate(tables_data):
                headers = table_data.get('headers', [])
                rows = table_data.get('rows', [])
                
                # Сохраняем таблицу целиком
                try:
                    cursor.execute("""
                        INSERT INTO material_tables (category, page_url, table_index, headers, rows)
                        VALUES (%s, %s, %s, %s::jsonb, %s::jsonb)
                    """, (category, page_url, table_idx, 
                          json.dumps(headers, ensure_ascii=False), 
                          json.dumps(rows, ensure_ascii=False)))
                except Exception as e:
                    print(f"Ошибка при сохранении таблицы {table_idx} со страницы {page_url}: {e}")
                    continue
                
                # Извлекаем только необходимые поля: Наименование, ГОСТ, Класс, Диаметр, Номинальная масса 1 метра
                if rows:
                    for row in rows:
                        material_data = {
                            'наименование': None,
                            'гост': None,
                            'класс': None,
                            'диаметр': None,
                            'номинальная_масса_1_метра': None,
                            'page_url': page_url
                        }
                        
                        # Ищем нужные поля в данных строки
                        for key, value in row.items():
                            key_lower = key.lower().strip()
                            value_str = str(value).strip()
                            
                            if not value_str:
                                continue
                            
                            # Определение наименования
                            if any(term in key_lower for term in ['наименование', 'название', 'имя', 'name', 'назв']):
                                material_data['наименование'] = value_str
                            
                            # Определение ГОСТ
                            elif any(term in key_lower for term in ['гост', 'gost', 'стандарт']):
                                material_data['гост'] = value_str
                            
                            # Определение класса (А500С, А240 и т.д.)
                            elif any(term in key_lower for term in ['класс', 'class', 'марка']):
                                # Ищем классы типа А500С, А240, А400 и т.д.
                                class_match = re.search(r'А\d{3}[А-Я]?', value_str, re.IGNORECASE)
                                if class_match:
                                    material_data['класс'] = class_match.group(0).upper()
                                else:
                                    # Если не найдено по паттерну, берем значение как есть
                                    material_data['класс'] = value_str
                            
                            # Определение диаметра
                            elif any(term in key_lower for term in ['диаметр', 'diameter', 'd, мм', 'd', 'd мм']):
                                # Извлекаем числовое значение диаметра
                                diameter_match = re.search(r'\d+\.?\d*', value_str)
                                if diameter_match:
                                    material_data['диаметр'] = diameter_match.group(0)
                                else:
                                    material_data['диаметр'] = value_str
                            
                            # Определение номинальной массы 1 метра
                            elif any(term in key_lower for term in ['номинальная масса', 'масса 1 м', 'масса 1м', 
                                                                     'вес 1 м', 'вес 1м', 'кг/м', 'кг/м.', 'масса, кг/м',
                                                                     'масса', 'вес']):
                                # Извлекаем числовое значение массы
                                mass_match = re.search(r'\d+\.?\d*', value_str.replace(',', '.'))
                                if mass_match:
                                    try:
                                        material_data['номинальная_масса_1_метра'] = float(mass_match.group(0))
                                    except ValueError:
                                        pass
                        
                        # Дополнительная проверка: если класс не найден в отдельной колонке, ищем в других полях
                        if not material_data['класс']:
                            # Ищем класс в наименовании или других полях
                            all_text = ' '.join([str(v) for v in row.values() if v])
                            class_match = re.search(r'А\d{3}[А-Я]?', all_text, re.IGNORECASE)
                            if class_match:
                                material_data['класс'] = class_match.group(0).upper()
                        
                        # Фильтруем некорректные данные: пропускаем строки, где слишком много данных в одном поле
                        # (это обычно означает, что парсер неправильно извлек данные)
                        skip_row = False
                        for key, value in row.items():
                            if isinstance(value, str) and len(value) > 500:
                                # Слишком длинное значение - вероятно, это объединенные данные
                                skip_row = True
                                break
                        
                        # Пропускаем строки без минимально необходимых данных
                        if skip_row or (not material_data['диаметр'] and not material_data['наименование']):
                            continue
                        
                        # Ограничиваем длину полей для безопасности
                        if material_data['наименование'] and len(material_data['наименование']) > 1000:
                            material_data['наименование'] = material_data['наименование'][:1000]
                        if material_data['гост'] and len(material_data['гост']) > 500:
                            material_data['гост'] = material_data['гост'][:500]
                        
                        # Сохраняем материал, если есть хотя бы диаметр или наименование
                        try:
                            cursor.execute("""
                                INSERT INTO materials_23met 
                                (наименование, гост, класс, диаметр, номинальная_масса_1_метра, page_url)
                                VALUES (%s, %s, %s, %s, %s, %s)
                                ON CONFLICT (наименование, гост, класс, диаметр, номинальная_масса_1_метра, page_url) DO UPDATE
                                SET наименование = EXCLUDED.наименование,
                                    гост = EXCLUDED.гост,
                                    класс = EXCLUDED.класс,
                                    диаметр = EXCLUDED.диаметр,
                                    номинальная_масса_1_метра = EXCLUDED.номинальная_масса_1_метра
                            """, (
                                material_data['наименование'],
                                material_data['гост'],
                                material_data['класс'],
                                material_data['диаметр'],
                                material_data['номинальная_масса_1_метра'],
                                material_data['page_url']
                            ))
                        except Exception as e:
                            print(f"Ошибка при сохранении материала: {e}")
                            print(f"Данные: {material_data}")
                            # Не выводим всю строку, если она слишком длинная
                            if len(str(row)) < 500:
                                print(f"Строка: {row}")
                            continue


def parse_page(url: str, category_name: str, visited: Set[str], parent_category: Optional[str] = None, referer: Optional[str] = None):
    """Рекурсивный парсинг страницы"""
    if url in visited:
        return
    
    visited.add(url)
    print(f"\nПарсинг страницы: {url}")
    if referer:
        print(f"Referer: {referer}")
    
    soup = get_page_content(url, referer=referer)
    if not soup:
        print(f"Не удалось загрузить страницу: {url}")
        return
    
    # Сохраняем категорию
    save_category(category_name, url, parent_category)
    
    # Извлекаем таблицы
    tables_data = parse_table(soup)
    
    if tables_data:
        print(f"Найдено таблиц: {len(tables_data)}")
        save_material_data(category_name, url, tables_data)
    
    # Извлекаем ссылки для дальнейшего обхода (только для арматуры А3)
    category_filter = 'armatura_a3' if 'armatura_a3' in url else None
    links = extract_links(soup, url, category_filter)
    
    # Определяем название категории из URL или заголовка страницы
    title = soup.find('title')
    page_title = title.get_text(strip=True) if title else category_name
    
    # Фильтруем ссылки на размеры материалов (например, /armatura_a3/4, /armatura_a3/5 и т.д.)
    for link in links:
        if link not in visited:
            # Извлекаем название категории из URL
            link_parts = link.replace(BASE_URL, '').strip('/').split('/')
            if len(link_parts) >= 2:
                link_category = link_parts[-1] if link_parts[-1] else link_parts[-2]
            else:
                link_category = category_name
            
            # Задержка между запросами
            time.sleep(DELAY_BETWEEN_REQUESTS)
            
            # Рекурсивный вызов с передачей текущего URL как referer
            parse_page(link, link_category, visited, category_name, referer=url)
    
    print(f"Завершен парсинг страницы: {url}")


def main():
    """Основная функция"""
    import sys
    
    # Проверка переменных окружения
    required_vars = ['DBHOST', 'DBNAME', 'DBUSER', 'DBPASS']
    missing_vars = [var for var in required_vars if not os.environ.get(var)]
    
    if missing_vars:
        print("Ошибка: отсутствуют необходимые переменные окружения:")
        for var in missing_vars:
            print(f"  - {var}")
        print("\nСоздайте файл .env в директории modules/db/ с необходимыми переменными.")
        sys.exit(1)
    
    # Парсинг аргументов командной строки
    start_url = START_URL
    category_name = "Арматура А3"
    
    if len(sys.argv) > 1:
        start_url = sys.argv[1]
    if len(sys.argv) > 2:
        category_name = sys.argv[2]
    
    print("Начало парсинга сайта 23met.ru")
    print(f"Стартовая страница: {start_url}")
    print(f"Категория: {category_name}")
    
    # Создаем таблицы
    print("\nСоздание таблиц в базе данных...")
    create_tables()
    
    # Начинаем парсинг
    visited = set()
    
    try:
        parse_page(start_url, category_name, visited, referer=None)
        print(f"\n\nПарсинг завершен!")
        print(f"Всего обработано страниц: {len(visited)}")
        
        # Выводим статистику
        with get_connection() as conn:
            conn.autocommit = True
            with conn.cursor() as cursor:
                cursor.execute("SELECT COUNT(*) FROM materials_23met")
                materials_count = cursor.fetchone()[0]
                cursor.execute("SELECT COUNT(*) FROM material_tables")
                tables_count = cursor.fetchone()[0]
                cursor.execute("SELECT COUNT(*) FROM material_categories")
                categories_count = cursor.fetchone()[0]
                
                # Статистика по классам
                cursor.execute("SELECT COUNT(DISTINCT класс) FROM materials_23met WHERE класс IS NOT NULL")
                classes_count = cursor.fetchone()[0]
                
                # Статистика по диаметрам
                cursor.execute("SELECT COUNT(DISTINCT диаметр) FROM materials_23met WHERE диаметр IS NOT NULL")
                diameters_count = cursor.fetchone()[0]
                
                print(f"\nСтатистика:")
                print(f"  - Категорий: {categories_count}")
                print(f"  - Материалов: {materials_count}")
                print(f"  - Таблиц: {tables_count}")
                print(f"  - Уникальных классов: {classes_count}")
                
                print(f"  - Уникальных диаметров: {diameters_count}")
    except KeyboardInterrupt:
        print("\n\nПарсинг прерван пользователем")
        print(f"Обработано страниц до прерывания: {len(visited)}")
    except Exception as e:
        print(f"\n\nОшибка при парсинге: {e}")
        import traceback
        traceback.print_exc()


if __name__ == "__main__":
    main()

