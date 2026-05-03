from fastapi import APIRouter
from pydantic import BaseModel

from llm import generate_sql
from sql_engine import run_sql
from auth.auth import create_token
from analytics.charts import get_chart
from analytics.dashboard import get_dashboard

router = APIRouter()

class Query(BaseModel):
    question: str

class SQLRequest(BaseModel):
    sql: str

@router.post("/generate-sql")
def gen_sql(data: Query):
    return generate_sql(data.question)

@router.post("/run-query")
def run_query(data: SQLRequest):
    return run_sql(data.sql)

@router.post("/login")
def login():
    return {"token": create_token()}

@router.post("/chart")
def chart(data: SQLRequest):
    return get_chart(data.sql)

@router.get("/dashboard")
def dashboard():
    return get_dashboard()