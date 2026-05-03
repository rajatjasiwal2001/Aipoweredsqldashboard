from sql_engine import run_sql

def get_dashboard():
    result = run_sql("SELECT COUNT(*) as total_employees FROM employees")
    return result["data"][0]