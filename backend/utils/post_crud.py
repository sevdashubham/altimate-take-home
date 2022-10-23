from uuid import UUID
import json

from sqlalchemy import case, cast, Float, func
from sqlalchemy.orm import Session
from sqlalchemy.sql import functions

from database.models import GenderSubmissions
from schemas.models import GenderSubmission

def tables_get_all(meta):
    tablesArray = [{"name": t} for t in list(meta.tables.keys())]
    return tablesArray

def schema_metrics_get(db: Session, insp, table_name, meta):
    columns_table = insp.get_columns(table_name)
    schemaArray = [{"name": column['name'], "type": str(column['type'])} for column in columns_table]
    metricsArray = []
    for column in columns_table:
        metric_count = db.query(func.count(getattr(GenderSubmissions, column['name']))).scalar()
        distinct = db.query(func.count(func.distinct(getattr(GenderSubmissions, column['name'])))).scalar()
        average = db.query(func.avg(getattr(GenderSubmissions, column['name']))).scalar()
        object = {"name": column['name'], "type": str(column['type']), "distinct": distinct,
                    "average": average, "metric_count": metric_count}
        metricsArray.append(object)

    response = {"schema" : schemaArray, "metrics" : metricsArray}
    return response
