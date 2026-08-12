from fastapi import FastAPI
from matplotlib.cm import binary
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os
from sqlalchemy import create_engine, text
import psycopg2
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse


load_dotenv()
Database_URL = os.getenv("Database_URL")
engine = create_engine(Database_URL)

app=FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://127.0.0.1:5500"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class login(BaseModel):
    username: str
    password: str

@app.get("/")
def home():
    return FileResponse("Frontend/index.html")

@app.post("/login")
def login(data: login):
    username=data.username
    password=data.password
    querry=text("""INSERT INTO "User" (email_number,password) VALUES(:username, :password)""")
    values={"username": username, "password": password}
    with engine.connect() as conn:
        conn.execute(querry, values)
        conn.commit()
    return {"message": "Login info save"}