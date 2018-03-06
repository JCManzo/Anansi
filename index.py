import os
import sqlite3
import sys

from config import BaseConfig
from flask import Flask, request, session, g, redirect, url_for, \
     abort, render_template, flash
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_migrate import Migrate
from flask_cors import CORS
from flask_uploads import UploadSet, IMAGES, configure_uploads

# Create application instance.
app = Flask(__name__, static_folder="static", static_url_path='', template_folder="./static/")

# Load config from config module.
app.config.from_object(BaseConfig)
CORS(app)

# Configure photo uploads via Flask-Uploads
PhotosSet = UploadSet('photos', IMAGES)
configure_uploads(app, PhotosSet)

db = SQLAlchemy(app)
migrate = Migrate(app, db)
bcrypt = Bcrypt(app)
