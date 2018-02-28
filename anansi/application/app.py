from flask import request, render_template, jsonify, url_for, redirect, g
from index import app, db
from .models import User


@app.route('/', methods=['GET'])
def index():
    return render_template("index.html")
