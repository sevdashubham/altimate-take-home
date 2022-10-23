from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routes.tables import router
from schemas.models import HealthResponse, ConnectRequest

from database.connection import connect_db

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router=router, prefix="/tables")

@app.get("/", response_model=HealthResponse)
async def health():
    return HealthResponse(status="Ok")

@app.post("/connect", response_model=HealthResponse)
async def init_db_conn(request: ConnectRequest):
    user = request.user
    password = request.password
    host = request.host
    database = request.database
    connect_db(user, password, host, database)
    return HealthResponse(status="Ok")
