from uuid import UUID
import json

from sqlalchemy import case, cast, Float, func
from sqlalchemy.orm import Session
from sqlalchemy.sql import functions

def tables_get_all(meta):
    tablesArray = [{"name": t} for t in list(meta.tables.keys())]
    return tablesArray

def schema_metrics_get(db: Session, insp, table_name, meta):
    columns_table = insp.get_columns(table_name)
    found_table = meta.tables[table_name]
    schemaArray = [{"name": column['name'], "type": str(column['type'])} for column in columns_table]
    metricsArray = []
    for column in found_table.columns:
        metric_count = db.query(func.count(column)).scalar()
        distinct = db.query(func.count(func.distinct(column))).scalar()
        if str(column.type) == 'INTEGER':
          average = db.query(func.avg(column)).scalar()
        else:
          average = 'NA'
        object = {"name": column.name,"type": str(column.type) ,"distinct": distinct,
                    "average": average, "metric_count": metric_count}

        metricsArray.append(object)

    response = {"schema" : schemaArray, "metrics" : metricsArray}
    return response
