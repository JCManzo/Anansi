from flask import request, render_template, jsonify, url_for, redirect, g
from index import app, db
from .models import User
from .utils.auth import generate_token
from sqlalchemy.exc import IntegrityError


@app.route('/', methods=['GET'])
def index():
    return render_template("index.html")


@app.route('/api/user', methods=['GET'])
def get_user():
    return jsonify(result=g.current_user)


@app.route('/api/create_user', methods=['POST'])
def create_user():
    data = request.get_json()
    user = User(
        username=data['username'],
        email=data['email'],
        password=data['password']
    )
    db.session.add(user)

    try:
        db.session.commit()
    except IntegrityError:
        return jsonify(message="USer with username or email already exists"), 409

    new_user = User.query.filter_by(username=data['email']).first()

    return jsonify(
        id=user.id,
        token=generate_token(new_user)
    )
