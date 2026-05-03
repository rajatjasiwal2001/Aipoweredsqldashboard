from db import get_connection

def run_sql(query: str):
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute(query)
    result = cursor.fetchall()

    cursor.close()
    conn.close()

    return {"data": result}