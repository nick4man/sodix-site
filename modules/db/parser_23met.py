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
            
            # Таблица для материалов
            cursor.execute("""
                CREATE TABLE IF NOT EXISTS materials_23met (
                    id SERIAL PRIMARY KEY,
                    category VARCHAR(255),
                    material_name VARCHAR(255),
                    size VARCHAR(100),
                    diameter VARCHAR(50),
                    weight_per_meter NUMERIC(10, 4),
                    cross_section_area NUMERIC(10, 4),
                    gost VARCHAR(255),
                    url TEXT,
                    page_url TEXT,
                    raw_data JSONB,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    UNIQUE(category, material_name, size, diameter, url)
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
                CREATE INDEX IF NOT EXISTS idx_materials_category 
                ON materials_23met(category)
            """)
            cursor.execute("""
                CREATE INDEX IF NOT EXISTS idx_materials_name 
                ON materials_23met(material_name)
            """)
            cursor.execute("""
                CREATE INDEX IF NOT EXISTS idx_materials_size 
                ON materials_23met(size)
            """)
            cursor.execute("""
                CREATE INDEX IF NOT EXISTS idx_categories_name 
                ON material_categories(name)
            """)
            
            print("Таблицы созданы успешно")


def get_page_content(url: str, retries: int = MAX_RETRIES) -> Optional[BeautifulSoup]:
    """Получение содержимого страницы с повторными попытками"""
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    }
    
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


def extract_links(soup: BeautifulSoup, base_url: str) -> Set[str]:
    """Извлечение всех ссылок со страницы"""
    links = set()
    
    # Ищем ссылки в меню и навигации
    for link in soup.find_all('a', href=True):
        href = link['href']
        full_url = urljoin(base_url, href)
        
        # Фильтруем только ссылки на страницы справки
        if '/spravka/' in full_url and full_url.startswith(BASE_URL):
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
                cursor.execute("""
                    INSERT INTO material_tables (category, page_url, table_index, headers, rows)
                    VALUES (%s, %s, %s, %s::jsonb, %s::jsonb)
                """, (category, page_url, table_idx, 
                      json.dumps(headers, ensure_ascii=False), 
                      json.dumps(rows, ensure_ascii=False)))
                
                # Пытаемся извлечь структурированные данные из таблицы
                if rows:
                    # Определяем тип материала из URL или заголовков
                    material_name = category
                    
                    # Пытаемся найти стандартные колонки
                    for row in rows:
                        material_data = {
                            'category': category,
                            'material_name': material_name,
                            'size': None,
                            'diameter': None,
                            'weight_per_meter': None,
                            'cross_section_area': None,
                            'gost': None,
                            'url': page_url,
                            'page_url': page_url,
                            'raw_data': row
                        }
                        
                        # Ищем известные поля в данных строки
                        for key, value in row.items():
                            key_lower = key.lower()
                            value_str = str(value).strip()
                            
                            if not value_str:
                                continue
                            
                            # Определение диаметра
                            if any(term in key_lower for term in ['диаметр', 'diameter', 'd, мм', 'd']):
                                material_data['diameter'] = value_str
                            
                            # Определение размера
                            if any(term in key_lower for term in ['размер', 'size', 'номер', 'профиль']):
                                material_data['size'] = value_str
                            
                            # Определение веса
                            if any(term in key_lower for term in ['вес', 'weight', 'масса', 'кг/м', 'кг/м2']):
                                # Извлекаем числовое значение
                                numbers = re.findall(r'\d+\.?\d*', value_str)
                                if numbers:
                                    try:
                                        material_data['weight_per_meter'] = float(numbers[0])
                                    except ValueError:
                                        pass
                            
                            # Определение площади сечения
                            if any(term in key_lower for term in ['площадь', 'area', 'сечение', 'см2']):
                                numbers = re.findall(r'\d+\.?\d*', value_str)
                                if numbers:
                                    try:
                                        material_data['cross_section_area'] = float(numbers[0])
                                    except ValueError:
                                        pass
                            
                            # Определение ГОСТ
                            if 'гост' in key_lower or 'gost' in key_lower:
                                material_data['gost'] = value_str
                        
                        # Сохраняем материал, если есть хотя бы одно поле
                        if material_data['size'] or material_data['diameter']:
                            try:
                                cursor.execute("""
                                    INSERT INTO materials_23met 
                                    (category, material_name, size, diameter, weight_per_meter, 
                                     cross_section_area, gost, url, page_url, raw_data)
                                    VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s::jsonb)
                                    ON CONFLICT (category, material_name, size, diameter, url) DO UPDATE
                                    SET weight_per_meter = EXCLUDED.weight_per_meter,
                                        cross_section_area = EXCLUDED.cross_section_area,
                                        gost = EXCLUDED.gost,
                                        raw_data = EXCLUDED.raw_data
                                """, (
                                    material_data['category'],
                                    material_data['material_name'],
                                    material_data['size'],
                                    material_data['diameter'],
                                    material_data['weight_per_meter'],
                                    material_data['cross_section_area'],
                                    material_data['gost'],
                                    material_data['url'],
                                    material_data['page_url'],
                                    json.dumps(material_data['raw_data'], ensure_ascii=False)
                                ))
                            except Exception as e:
                                print(f"Ошибка при сохранении материала: {e}")
                                print(f"Данные: {material_data}")


def parse_page(url: str, category_name: str, visited: Set[str], parent_category: Optional[str] = None):
    """Рекурсивный парсинг страницы"""
    if url in visited:
        return
    
    visited.add(url)
    print(f"\nПарсинг страницы: {url}")
    
    soup = get_page_content(url)
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
    
    # Извлекаем ссылки для дальнейшего обхода
    links = extract_links(soup, url)
    
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
            
            # Рекурсивный вызов
            parse_page(link, link_category, visited, category_name)
    
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
        parse_page(start_url, category_name, visited)
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
                
                print(f"\nСтатистика:")
                print(f"  - Категорий: {categories_count}")
                print(f"  - Материалов: {materials_count}")
                print(f"  - Таблиц: {tables_count}")
                
    except KeyboardInterrupt:
        print("\n\nПарсинг прерван пользователем")
        print(f"Обработано страниц до прерывания: {len(visited)}")
    except Exception as e:
        print(f"\n\nОшибка при парсинге: {e}")
        import traceback
        traceback.print_exc()


if __name__ == "__main__":
    main()

