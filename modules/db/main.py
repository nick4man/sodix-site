import os
from typing import List, Optional

import psycopg2
from dotenv import load_dotenv
from fastapi import Depends, FastAPI, HTTPException
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
    allow_origins=["http://10.10.0.213:4200"],
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
    default: Optional[str]


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
        with get_connection() as conn, conn.cursor() as cursor:
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
            tables = [{"name": row[0], "columns": row[1]} for row in cursor.fetchall()]
        return tables
    except Exception as e:
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

        return {
            "table": table_name,
            "limit": limit,
            "total_rows": total_rows,
            "schema": schema,
            "data": [dict(row) for row in data_rows],
            "data": [dict(row) for row in data_rows]
        }
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
