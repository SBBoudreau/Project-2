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
# Heroku Postgres
#################################################
pg_user = 'postgres'
db_name = 'Gamers'


app.config['SQLALCHEMY_DATABASE_URI'] = "postgres://jrpkuqconjtgyi:9064eee9d802e0565098da64a8ac7840cb9a1fae6f38216aaa3558dcbd78f10e@ec2-54-205-26-79.compute-1.amazonaws.com:5432/d1jq8j6quu52kd"
db = SQLAlchemy(app)
db.init_app(app)
engine = db.engine

#################################################
# Michael & Sadie's Postgres
#################################################
# pg_user = 'postgres'
# db_name = 'Gamers'

# connection_string = f"{pg_user}:bootcampDavid@1942@localhost:5432/{db_name}"
# app.config['SQLALCHEMY_DATABASE_URI'] = f'postgresql://{connection_string}'
# db = SQLAlchemy(app)
# db.init_app(app)
# engine = db.engine


# # Save reference to the table
# revenue = Base.classes.revenue
# console.log(revenue)


#################################################
# Flask Setup
#################################################


#################################################
# Flask Routes
#################################################


@app.route("/gamerChoice", methods=["POST"])
def gamerChoice():
    choice = request.form["id"]
    print(choice)
    gamerName = request.form["gamerName"]
    print(gamerName)
    genderOption = request.form["optionsRadios"]
    print(genderOption)

#


@app.route("/age")
def age():
    """Return a list of all age names"""

    # Query all gamer data
    session = Session(engine)
    df = pd.read_sql_query("SELECT * FROM age", engine)
    all_names = df.to_dict(orient="list")

    # close the session to end the communication with the database
    session.close()

    return jsonify(all_names)


@app.route("/revenue")
def revenue():
    """Return a list of all age names"""

    # Query all gamer data
    session = Session(engine)
    df = pd.read_sql_query("SELECT * FROM revenue", engine)
    all_names = df.to_dict(orient="list")

    # close the session to end the communication with the database
    session.close()

    return jsonify(all_names)


@app.route("/map_")
def map_():
    """Return a list of all age names"""

    # Query all gamer data
    session = Session(engine)
    df = pd.read_sql_query("SELECT * FROM country_hours", engine)
    all_maphours = df.to_dict(orient="list")

    # close the session to end the communication with the database
    session.close()

    return jsonify(all_maphours)


@app.route('/')
def home():

    # Query all gamer data
    session = Session(engine)
    df = pd.read_sql_query("SELECT * FROM age", engine)
    all_names = df.to_dict(orient="list")

    # close the session to end the communication with the database
    session.close()

    # stuff goes here
    return render_template('index.html', all_names=all_names)


@app.route('/hours')
def hours():

    # Query all gamer data
    session = Session(engine)
    df = pd.read_sql_query("SELECT * FROM hours_average_country", engine)
    all_names = df.to_dict(orient="list")

    # close the session to end the communication with the database
    session.close()

    # stuff goes here
    return jsonify(all_names)


@app.route('/top_ten')
def top_ten():

    # Query all gamer data
    session = Session(engine)
    df = pd.read_sql_query("SELECT * FROM top_ten", engine)
    df = df.iloc[0:5]

    df.date = pd.to_datetime(df.date, utc=True, format="%Y-%b-%d")
    print(df.date.head())
    # df.date=df.date.dt.strftime("%Y-%d-%b")
    all_names = df.to_dict(orient="records")

    # close the session to end the communication with the database
    session.close()

    # stuff goes here
    return jsonify(all_names)


@app.route("/mapChart")
def mapChart():
    """Return a list of all mapChart"""

    # Query all gamer data
    session = Session(engine)
    df = pd.read_sql_query("SELECT * FROM country_hours", engine)
    all_maphours = df.to_dict(orient="list")

    # close the session to end the communication with the database
    session.close()

    return render_template("streaming.html", all_names=all_maphours)


if __name__ == '__main__':
    app.run()
