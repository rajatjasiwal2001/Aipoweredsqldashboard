const BASE_URL = "http://127.0.0.1:8000";

export const getDashboard = async () => {
  const res = await fetch(`${BASE_URL}/dashboard`);
  return res.json();
};

export const getChart = async (sql) => {
  const res = await fetch(`${BASE_URL}/chart`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ sql }),
  });

  return res.json();
};

export const generateSQL = async (question) => {
  const res = await fetch(`${BASE_URL}/generate-sql`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ question }),
  });

  return res.json();
};

export const runQuery = async (sql) => {
  const res = await fetch(`${BASE_URL}/run-query`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ sql }),
  });

  return res.json();
};