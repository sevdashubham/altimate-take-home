from sqlalchemy import create_engine, inspect
from sqlalchemy.orm import sessionmaker
from sqlalchemy.schema import MetaData
from database.models import Base

# create global vars
SessionLocal = None
engine = None
insp = None

# SQLALCHEMY_DATABASE_URL = "postgresql://myuser:postgres@localhost/postgres"

def connect_db(user, password, host, database):
    global engine
    global SessionLocal
    global insp
    url="postgresql://{0}:{1}@{2}/{3}".format(user, password, host, database)
    engine = create_engine(url)
    SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
    insp = inspect(engine)

def get_db_meta():
    meta = MetaData()
    meta.reflect(bind=engine)
    return meta

def get_db_inspect():
    insp = inspect(engine)
    return insp

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
