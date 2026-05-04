# 📌 Project Guidelines

---

## 🚨 Rules

- Never push node_modules
- Always use .env for secrets
- Keep frontend and backend separate
- Write clean modular code

---

## 🧱 Architecture

Frontend → React + Vite UI  
Backend → FastAPI APIs  
Database → MySQL  
AI Layer → Groq LLM  

---

## 🧠 AI Flow

User Input → Groq LLM → SQL Query → MySQL Execution → Response → UI

---

## ⚡ Best Practices

- Keep commits small
- Use meaningful commit messages
- Do not expose API keys
- Optimize SQL queries

---

## 🔌 API Flow

POST /query → AI SQL generation  
GET /dashboard → Data fetch  
GET /health → Server status  

---

## 💻 Git Workflow

git add .  
git commit -m "update feature"  
git push origin main