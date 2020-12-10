# Docs on session basics
# https://docs.sqlalchemy.org/en/13/orm/session_basics.html

import numpy as np
import os
import pandas as pd

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine

from flask_sqlalchemy import SQLAlchemy
from flask import (
    Flask,
    render_template,
    jsonify,
    request,
    redirect)
app = Flask(__name__)

#################################################
# Jennifer Postgres
#################################################
pg_user = 'postgres'
db_name = 'Gamers'

# connection_string = f"{pg_user}:Jennifer11@localhost:5432/{db_name}"
# app.config['SQLALCHEMY_DATABASE_URI'] = f'postgresql://{connection_string}'
# db = SQLAlchemy(app)
# db.init_app(app)
# engine = db.engine

#################################################
# Michael & Sadie's Postgres
#################################################
# pg_user = 'postgres'
# db_name = 'Gamers'

connection_string = f"{pg_user}:bootcampDavid@1942@localhost:5432/{db_name}"
app.config['SQLALCHEMY_DATABASE_URI'] = f'postgresql://{connection_string}'
db = SQLAlchemy(app)
db.init_app(app)
engine = db.engine


# Base = automap_base()
# Base.prepare(engine, reflect=True)

# # Save reference to the table
# revenue = Base.classes.revenue
# age = Base.classes.age
# hours = Base.classes.hours
# gender = Base.classes.gender

# table = Base.classes.wiki_movie

#################################################
# Flask Setup
#################################################


#################################################
# Flask Routes
#################################################

@app.route("/")
def age_():
    """Return a list of all movie names"""

    # Query all gamer data
    session = Session(engine)
    df = pd.read_sql_query("SELECT * FROM age", engine)
    all_names = df.to_dict(orient="list")

    # close the session to end the communication with the database
    session.close()

    # Convert list of tuples into normal list
    # all_names = list(np.ravel(results))
    print(all_names)

    # return jsonify(all_names)
    return render_template("index.html", all_names=all_names)


if __name__ == '__main__':
    app.run(debug=True)
