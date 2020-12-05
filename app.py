# import necessary libraries
import os
import numpy as np
from flask import (
    Flask,
    render_template,
    jsonify,
    request,
    redirect)

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine
from flask_sqlalchemy import SQLAlchemy

#################################################
# Flask Setup
#################################################
app = Flask(__name__)

#################################################
# Database Setup
#################################################

# try:
db_uri = os.environ['https://dashboard.heroku.com/apps/turkey-tryptophan-trifecta']
# except KeyError:

#     pg_user = 'postgres'
#     db_name = 'Gamers'

#     connection_string = f"{pg_user}:Jennifer11@localhost:5432/{db_name}"
#     db_uri = create_engine(f'postgresql://{connection_string}')


print(db_uri)
# app.config['SQLALCHEMY_DATABASE_URI'] = db_uri

# db = SQLAlchemy(app)

# # Create class to frame each pet instance


# class user_input(db.Model):
#     __tablename__ = ''

#     id = db.Column(db.Integer, primary_key=True)
#     u_name = db.Column(db.String(64))
#     u_age = db.Column(db.Float)
#     u_hours = db.Column(db.Float)
#     u_gender = db.Column(db.String(64))

#     def __repr__(self):
#         return '<Pet %r>' % (self.name)


# @app.before_first_request
# def setup():
#     pass
#     # create route that renders index.html template


# @app.route("/")
# def home():
#     return render_template("index.html")


# # Query the database and send the jsonified results
# @app.route("/send", methods=["GET", "POST"])
# def send():
#     # if request.method == "POST":
#     #     u_name = request.form["UserName"]
#     #     u_age = request.form["UserAge"]
#     #     u_hours = request.form["UserHours"]

#     #     pet = Pet(name=name, lat=lat, lon=lon)
#     #     db.session.add(pet)
#     #     db.session.commit()
#     #     return redirect("/", code=302)

#     # return render_template("form.html")
#     pass


# @app.route("/api/pals")
# def pals():
#     # results = db.session.query(Pet.name, Pet.lat, Pet.lon).all()

#     # hover_text = [result[0] for result in results]
#     # lat = [result[1] for result in results]
#     # lon = [result[2] for result in results]

#     # pet_data = [{
#     #     "type": "scattergeo",
#     #     "locationmode": "USA-states",
#     #     "lat": lat,
#     #     "lon": lon,
#     #     "text": hover_text,
#     #     "hoverinfo": "text",
#     #     "marker": {
#     #         "size": 50,
#     #         "line": {
#     #             "color": "rgb(8,8,8)",
#     #             "width": 1
#     #         },
#     #     }
#     # }]

#     # return jsonify(pet_data)
#     pass


if __name__ == "__main__":
    app.run()
