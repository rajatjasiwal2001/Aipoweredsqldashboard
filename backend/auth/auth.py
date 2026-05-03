from datetime import datetime, timedelta
import jwt

SECRET = "secret123"

def create_token():
    payload = {
        "user_id": "user1",
        "exp": datetime.utcnow() + timedelta(hours=2)
    }
    token = jwt.encode(payload, SECRET, algorithm="HS256")
    return token