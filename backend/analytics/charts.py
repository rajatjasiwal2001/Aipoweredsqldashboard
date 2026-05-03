from sql_engine import run_sql

def get_chart(sql: str):
    data = run_sql(sql)["data"]

    labels = [row[list(row.keys())[0]] for row in data]
    values = [row[list(row.keys())[1]] for row in data]

    return {
        "labels": labels,
        "values": values
    }