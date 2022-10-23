import uuid

from sqlalchemy import Column, String, Integer
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class GenderSubmissions(Base):
    __tablename__ = "gender_submission"

    PassengerId = Column(Integer, primary_key=True)
    Survived = Column(Integer)
