from flask import request, render_template, jsonify, url_for, redirect, g
from index import app, db
from .models import User
from .utils.auth import generate_token, validate_token
from sqlalchemy.exc import IntegrityError
import sys


@app.route('/', methods=['GET'])
def index():
    return render_template("index.html")


@app.route('/<path:path>', methods=['GET'])
def any_root_path(path):
    return render_template('index.html')


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
        return jsonify(message="User with username or email already exists"), 409

    new_user = User.query.filter_by(username=data['username']).first()

    return jsonify(
        id=user.id,
        token=generate_token(new_user)
    )


@app.route('/api/get_token', methods=['POST'])
def get_token():
    data = request.get_json()
    user = User.get_user_with_email_and_password(data['email'], data['password'])
    if user:
        tok = jsonify(token=generate_token(user))
        return tok

    return jsonify(error=True), 403


@app.route('/api/is_token_valid', methods=['POST'])
def is_token_valid():
    data = request.get_json()
    is_valid = validate_token(data['token'])

    if is_valid:
        return jsonify(token_is_valid=True)
    else:
        return jsonify(token_is_valid=False), 403
