import os
from datetime import date, datetime
from decimal import Decimal
from typing import List

import psycopg2
from dotenv import load_dotenv
from fastapi import Depends, FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from psycopg2 import sql
from psycopg2.extras import RealDictCursor
from pydantic import BaseModel
from sqlalchemy import Column, Integer, MetaData, String, Table, create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

load_dotenv()

app = FastAPI(title="PostgreSQL Viewer API")

# Настройка CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:4200"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

DATABASE_URL = os.environ.get("DATABASE_URL")
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Модели данных


class TableInfo(BaseModel):
    name: str
    row_count: int
    size: str


class ColumnInfo(BaseModel):
    name: str
    type: str
    nullable: bool
    default: str | None


class QueryRequest(BaseModel):
    query: str


# Зависимости


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def get_connection():
    return psycopg2.connect(
        host=os.environ.get("DBHOST"),
        database=os.environ.get("DBNAME"),
        user=os.environ.get("DBUSER"),
        password=os.environ.get("DBPASS"),
    )


# Эндпоинты


@app.get("/api/tables")
async def get_tables():
    """Получение списка таблиц"""
    try:
        with get_connection() as conn:
            conn.autocommit = True
            with conn.cursor() as cursor:
                cursor.execute("""
                    SELECT table_name,
                           (SELECT COUNT(*)
                              FROM information_schema.columns
                             WHERE table_schema = 'public'
                               AND table_name = t.table_name) AS column_count
                      FROM information_schema.tables t
                     WHERE table_schema = 'public'
                       AND table_type = 'BASE TABLE'
                     ORDER BY table_name
                """)
                tables = [{"name": row[0], "columns": row[1]}
                          for row in cursor.fetchall()]
                print(f"[DEBUG] Found {len(tables)} tables: {
                      [t['name'] for t in tables]}")
        return tables
    except Exception as e:
        print(f"[ERROR] Error getting tables: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/api/tables/{table_name}")
async def get_table_data(table_name: str, limit: int = 100):
    """Получение данных таблицы"""
    try:
        with get_connection() as conn:
            conn.autocommit = True

            with conn.cursor() as cursor:
                cursor.execute(
                    """
                    SELECT EXISTS(
                        SELECT 1
                          FROM information_schema.tables
                         WHERE table_schema = 'public'
                           AND table_name = %s
                    )
                """,
                    (table_name,),
                )
                exists = cursor.fetchone()[0]
                if not exists:
                    raise HTTPException(
                        status_code=404, detail=f"Таблица '{table_name}' не найдена"
                    )

            with conn.cursor() as cursor:
                cursor.execute(
                    """
                    SELECT column_name, data_type, is_nullable, column_default
                      FROM information_schema.columns
                     WHERE table_schema = 'public'
                       AND table_name = %s
                     ORDER BY ordinal_position
                """,
                    (table_name,),
                )
                schema = [
                    {
                        "name": row[0],
                        "type": row[1],
                        "nullable": row[2] == "YES",
                        "default": row[3],
                    }
                    for row in cursor.fetchall()
                ]

            with conn.cursor(cursor_factory=RealDictCursor) as cursor:
                data_query = sql.SQL("SELECT * FROM {} LIMIT %s").format(
                    sql.Identifier(table_name)
                )
                cursor.execute(data_query, (limit,))
                data_rows = cursor.fetchall()

            with conn.cursor() as cursor:
                count_query = sql.SQL("SELECT COUNT(*) FROM {}").format(
                    sql.Identifier(table_name)
                )
                cursor.execute(count_query)
                total_rows = cursor.fetchone()[0]

            # Преобразуем RealDictRow в обычные словари
            data_list = []
            for row in data_rows:
                row_dict = {}
                for key, value in row.items():
                    if value is None:
                        row_dict[key] = None
                    elif isinstance(value, (int, float, str, bool)):
                        row_dict[key] = value
                    elif isinstance(value, (datetime, date)):
                        row_dict[key] = value.isoformat()
                    elif isinstance(value, Decimal):
                        row_dict[key] = float(value)
                    elif isinstance(value, (bytes, bytearray)):
                        row_dict[key] = value.decode('utf-8', errors='ignore')
                    else:
                        row_dict[key] = str(value)
                data_list.append(row_dict)

        return {
            "table": table_name,
            "limit": limit,
            "total_rows": total_rows,
            "schema": schema,
            "data": data_list
        }
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/api/search_materials")
async def search_materials(
    terms: str = Query(..., description="Термины для поиска через запятую"),
    tables: str | None = Query(None, description="Таблицы для поиска через запятую (опционально)")
):
    """Поиск материалов по ключевым словам во всех текстовых колонках"""
    try:
        # Разбиваем строку терминов на список
        search_terms = [term.strip()
                        for term in terms.split(",") if term.strip()]
        print(f"[DEBUG] Search terms: {search_terms}")
        if not search_terms:
            return []

        with get_connection() as conn:
            conn.autocommit = True
            results = []

            # Получаем список таблиц для поиска
            with conn.cursor() as cursor:
                if tables:
                    # Если указаны конкретные таблицы, используем их
                    table_list = [t.strip() for t in tables.split(",") if t.strip()]
                    if not table_list:
                        tables_to_search = []
                    else:
                        # Проверяем существование таблиц безопасным способом
                        # Используем параметризованный запрос
                        placeholders = ','.join(['%s'] * len(table_list))
                        query = f"""
                            SELECT table_name
                              FROM information_schema.tables
                             WHERE table_schema = 'public'
                               AND table_type = 'BASE TABLE'
                               AND table_name IN ({placeholders})
                             ORDER BY table_name
                        """
                        cursor.execute(query, tuple(table_list))
                        table_rows = cursor.fetchall()
                        tables_to_search = [str(row[0]) for row in table_rows if isinstance(row, (tuple, list)) and len(row) > 0]
                    print(f"[DEBUG] Searching in specified {len(tables_to_search)} tables: {tables_to_search}")
                else:
                    # Если таблицы не указаны, ищем во всех
                    cursor.execute("""
                        SELECT table_name
                          FROM information_schema.tables
                         WHERE table_schema = 'public'
                           AND table_type = 'BASE TABLE'
                         ORDER BY table_name
                    """)
                    table_rows = cursor.fetchall()
                    tables_to_search = []
                    for row in table_rows:
                        if isinstance(row, (tuple, list)) and len(row) > 0:
                            tables_to_search.append(str(row[0]))
                        else:
                            print(f"[WARNING] Invalid table row: {row}")
                    print(f"[DEBUG] Searching in all {len(tables_to_search)} tables: {tables_to_search}")

            # Для каждой таблицы находим текстовые колонки и ищем совпадения
            for table_name in tables_to_search:
                try:
                    print(f"[DEBUG] Processing table: {
                          table_name} (type: {type(table_name)})")
                    with conn.cursor() as cursor:
                        # Получаем текстовые колонки таблицы (расширенный список типов)
                        # Используем более простой запрос без udt_name в WHERE
                        # И используем правильное экранирование имени таблицы
                        query = """
                            SELECT column_name, data_type
                              FROM information_schema.columns
                             WHERE table_schema = 'public'
                               AND table_name = %s
                               AND (
                                   data_type IN ('text', 'character varying', 'varchar', 'char', 'character')
                                   OR data_type LIKE %s
                               )
                             ORDER BY ordinal_position
                        """
                        params = (table_name, '%text%')
                        print(f"[DEBUG] Executing query for {
                              table_name} with params: {params}")
                        cursor.execute(query, params)
                        text_columns = cursor.fetchall()
                        print(f"[DEBUG] Raw columns result for {
                              table_name}: {text_columns}")

                        # Проверяем, что все кортежи имеют минимум 2 элемента
                        valid_columns = []
                        for col in text_columns:
                            if isinstance(col, (tuple, list)) and len(col) >= 2:
                                valid_columns.append((col[0], col[1]))
                            else:
                                print(f"[WARNING] Invalid column data for {table_name}: {col} (type: {
                                      type(col)}, len: {len(col) if hasattr(col, '__len__') else 'N/A'})")
                        print(f"[DEBUG] Table {table_name} has {len(valid_columns)} text columns: {
                              [col[0] for col in valid_columns]}")
                except Exception as col_error:
                    print(f"[ERROR] Error getting columns for {
                          table_name}: {col_error}")
                    print(f"[DEBUG] Table name value: {repr(table_name)}")
                    import traceback
                    traceback.print_exc()
                    continue

                if not valid_columns:
                    continue

                # Для каждой текстовой колонки ищем совпадения
                for column_name, data_type in valid_columns:
                    # Строим условие поиска для всех терминов (OR логика)
                    conditions = []
                    params = []

                    for term in search_terms:
                        # Используем правильное экранирование идентификатора колонки
                        conditions.append(sql.SQL("{}::text ILIKE %s").format(
                            sql.Identifier(column_name)))
                        params.append(f"%{term}%")

                    if not conditions:
                        continue

                    # Выполняем поиск
                    with conn.cursor(cursor_factory=RealDictCursor) as cursor:
                        try:
                            # Используем правильное экранирование идентификаторов через sql.Identifier
                            # Но строим запрос как строку с плейсхолдерами для параметров
                            escaped_column = sql.Identifier(
                                column_name).as_string(conn)
                            escaped_table = sql.Identifier(
                                table_name).as_string(conn)

                            # Строим условия с плейсхолдерами
                            placeholders = " OR ".join(
                                [f"{escaped_column}::text ILIKE %s" for _ in search_terms])
                            query_str = f"SELECT * FROM {
                                escaped_table} WHERE {placeholders}"

                            cursor.execute(query_str, params)
                            matching_rows = cursor.fetchall()
                            print(f"[DEBUG] Found {len(matching_rows)} matches in {
                                  table_name}.{column_name}")
                        except Exception as query_error:
                            print(f"[ERROR] Query error for {table_name}.{
                                  column_name}: {query_error}")
                            import traceback
                            traceback.print_exc()
                            continue

                        # Добавляем результаты с информацией о таблице и колонке
                        for row in matching_rows:
                            # Правильно преобразуем RealDictRow в обычный словарь
                            row_dict = {}
                            for key, value in row.items():
                                # Преобразуем значения, которые не сериализуются в JSON
                                if value is None:
                                    row_dict[key] = None
                                elif isinstance(value, (int, float, str, bool)):
                                    row_dict[key] = value
                                elif isinstance(value, (datetime, date)):
                                    row_dict[key] = value.isoformat()
                                elif isinstance(value, Decimal):
                                    row_dict[key] = float(value)
                                elif isinstance(value, (bytes, bytearray)):
                                    row_dict[key] = value.decode(
                                        'utf-8', errors='ignore')
                                else:
                                    # Для других типов преобразуем в строку
                                    row_dict[key] = str(value)

                            results.append({
                                "table": table_name,
                                "column": column_name,
                                "row_data": row_dict
                            })

        print(f"[DEBUG] Total results: {len(results)}")
        return results
    except Exception as e:
        print(f"[ERROR] Error searching materials: {e}")
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))
