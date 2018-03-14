from flask import request, render_template, jsonify, redirect, g, send_from_directory
from index import app, db, PhotoSet
import sys
from sqlalchemy.exc import *

from .models import User, Photo, PhotoSchema, Tag
from .utils.auth import validate_request_token, generate_token, InvalidUsage
from marshmallow import pprint


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


@app.route('/api/is_token_valid', methods=['GET'])
def is_token_valid():
    # Validate request token and return success if no error is raised.
    token = validate_request_token()
    if token:
        return jsonify(success=True)
    return jsonify(success=False), 403


@app.route('/uploads/<path:filename>', methods=['GET'])
def download_file(filename):
    # Serve image uploads
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)


@app.route('/api/photos/<int:id>', methods=['GET'])
@app.route('/api/photos', methods=['POST', 'GET'])
def photos(id=None):
    # Upload photos with POST or fetch an image with GET
    token = validate_request_token()
    if request.method == 'POST' and token:
        # Get user id from opened token.
        caption = request.form.get('caption')
        tags = request.form.get('tags')
        file = request.files.get('file')
        if caption and tags and file:
            user_id = token.get('id')
            for file in request.files.getlist('file'):
                # Save file and get it's name (including folder)
                filename = PhotoSet.save(file)
                photo = Photo(
                    user_id=user_id,
                    filename=filename,
                    url=PhotoSet.url(filename),
                    caption=caption
                )

                # Lookup tags
                tags = tags.split()
                for tag in tags:
                    photo_tag = add_tags(tag);
                    print('TAG', tag, file=sys.stdout)
                    photo.tags.append(photo_tag);
                db.session.add(photo)

                try:
                    db.session.commit()
                except SQLAlchemyError:
                    return jsonify(message="Unable to upload image " + filename), 409
            return jsonify(success=True)
        else:
            raise InvalidUsage('Required parameters: caption, tags or file are invalid', status_code=403)
    elif request.method == 'GET':
        if id:
            # Get image with id
            return jsonify(message=True)
        else:
            photo_res = Photo.query.all()
            photo_schema = PhotoSchema(many=True, only=('id', 'url'))
            data, errors = photo_schema.dumps(photo_res)
            return jsonify(data=data, errors=errors)

    return jsonify(message='Method not allowed'), 405

def add_tags(tag):
    existing_tag = Tag.query.filter(Tag.name == tag.lower()).one_or_none()
    print('EXISTING TAG', existing_tag, file=sys.stderr)
    if existing_tag is not None:
        return existing_tag
    else:
        new_tag = Tag()
        new_tag.name = tag.lower()
        return new_tag