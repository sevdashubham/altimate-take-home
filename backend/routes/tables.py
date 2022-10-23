from typing import List

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from database.connection import get_db, get_db_meta, get_db_inspect

from utils.post_crud import (
    schema_metrics_get,
    tables_get_all,
)

router = APIRouter(tags=["tables"])

@router.get("/list/all", status_code=status.HTTP_200_OK)
def get_all_tables(meta = Depends(get_db_meta)):
    return tables_get_all(meta=meta)


@router.get("/get/{table_name}", status_code=status.HTTP_200_OK)
def get_schema_metrics(table_name, db: Session = Depends(get_db), insp = Depends(get_db_inspect), meta = Depends(get_db_meta)):
    return schema_metrics_get(db=db, insp=insp, table_name=table_name, meta = meta)
