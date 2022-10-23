from typing import Optional
from uuid import UUID

from pydantic import BaseModel

class HealthResponse(BaseModel):
    status: str

class ConnectRequest(BaseModel):
    user: str
    password: str
    host: str
    database: str

class GenderSubmission(BaseModel):
    PassengerId: int
    Survived: int

    class Config:
        orm_mode = True
