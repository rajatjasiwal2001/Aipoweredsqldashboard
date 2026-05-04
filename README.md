# 🚀 AI Powered SQL Dashboard (Full Stack)

A full-stack AI system that converts natural language into SQL using Groq LLM, executes queries on MySQL, and displays results in a real-time React dashboard.

---

# ⚡ Features

- 🧠 Natural Language → SQL (Groq LLM)
- ⚡ FastAPI backend (high performance)
- 🗄️ MySQL database integration
- 📊 Live React dashboard (Vite)
- 🔌 REST API architecture
- 📈 Real-time data visualization

---

# 🧱 Tech Stack

## Frontend
- React.js (Vite)
- JavaScript / TypeScript
- Tailwind CSS

## Backend
- FastAPI (Python)
- SQLAlchemy
- Uvicorn

## Database
- MySQL

## AI Layer
- Groq LLM API

---

# 📁 Project Structure

Aipoweredsqldashboard-main/src
backend/
requirements.txt
README.md
guidelines.md

 🚀 Setup Instructions

---

# 1️⃣ Clone Project

```bash id="clone_cmd"
git clone https://github.com/your-username/Aipoweredsqldashboard.git
cd Aipoweredsqldashboard


Frontend Setup (React + Vite)
cd frontend
npm install
npm run dev

👉 Runs at:

http://localhost:5173


Backend Setup (FastAPI)
cd backend
pip install -r requirements.txt
uvicorn main:app --reload

👉 Runs at:

http://localhost:8000

