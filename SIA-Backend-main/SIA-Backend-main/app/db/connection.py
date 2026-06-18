import psycopg2
import psycopg2.extras
from dotenv import load_dotenv
import os

load_dotenv()

DATABASE_URL = os.getenv("postgresql://postgres.ohwzjrjpwkjwyafjypld:Fccba03450345.FCCB@aws-1-sa-east-1.pooler.supabase.com:6543/postgres")

def get_connection():
    try:
        conn = psycopg2.connect(DATABASE_URL)
        return conn
    except Exception as e:
        print(f"Erro ao conectar com o banco: {e}")
        raise e

def get_cursor(conn):
    return conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)