from sqlalchemy import create_engine, inspect
from sqlalchemy.orm import Session
from sqlalchemy.sql import text
from datetime import date, timedelta

def lambda_handler(event, context):

    user = 'postgres'
    password = 'password'
    endpoint = 'gb-prod-db-instance.cmlcbdndvrou.us-east-1.rds.amazonaws.com'
    dbname = 'gb_database'

    engine = create_engine('postgresql+psycopg2://{0}:{1}@{2}/{3}'
                                                .format(user, password, endpoint, dbname))
    session = Session(engine)

    session.execute(text(f"UPDATE core_listing SET listing_status = 'closed' WHERE listing_end_date = '{str(date.today())}' AND listing_status = 'open'"))
    session.commit()

    session.execute(text(f"UPDATE core_order SET order_status = 'closed' WHERE order_listing_id IN (SELECT listing_id FROM core_listing WHERE listing_end_date = '{str(date.today())}') AND order_status = 'placed'"))
    session.commit()
    
    session.close()
    engine.dispose()

    return("done")