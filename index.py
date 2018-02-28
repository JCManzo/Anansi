import os
import sqlite3

from config import BaseConfig
from flask import Flask, request, session, g, redirect, url_for, \
     abort, render_template, flash
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt

# Create application instance.
app = Flask(__name__, static_folder="./static/dist", template_folder="./static")

# Load config from config module.
app.config.from_object(BaseConfig)

db = SQLAlchemy(app)
bcrypt = Bcrypt(app);

@app.cli.command()
def initdb():
    # Initializes the database
    db.create_all()
    print('Init the db')

