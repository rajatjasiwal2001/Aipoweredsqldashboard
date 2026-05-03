from groq import Groq
import os

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

MODEL = "llama-3.1-8b-instant"   # ✅ latest working Groq model

def generate_sql(question):
    response = client.chat.completions.create(
        model=MODEL,
        messages=[
            {"role": "system", "content": "You are an expert SQL generator. Only return SQL query."},
            {"role": "user", "content": question}
        ]
    )
    return {"result": response.choices[0].message.content}


def fix_sql(sql, error):
    response = client.chat.completions.create(
        model=MODEL,
        messages=[
            {"role": "system", "content": "Fix SQL query and return only SQL."},
            {"role": "user", "content": f"SQL: {sql}\nError: {error}"}
        ]
    )
    return {"fixed_sql": response.choices[0].message.content}