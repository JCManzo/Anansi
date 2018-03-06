from index import db, bcrypt
from marshmallow import Schema, fields


class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer(), primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(255), unique=True, nullable=False)
    password = db.Column(db.String(255))

    def __init__(self, username, email, password):
        self.username = username
        self.email = email
        self.active = True
        self.password = User.hashed_password(password)

    @staticmethod
    def hashed_password(password):
        return bcrypt.generate_password_hash(password).decode("utf-8")

    @staticmethod
    def get_user_with_email_and_password(email, password):
        user = User.query.filter_by(email=email).first()
        if user and bcrypt.check_password_hash(user.password, password):
            return user
        else:
            return None

    @staticmethod
    def get_user_with_username_and_password(username, password):
        user = User.query.filter_by(username=username).first()
        if user and bcrypt.check_password_hash(user.password, password):
            return user
        else:
            return None


class Photo(db.Model):
    __tablename__ = 'photos'

    id = db.Column(db.Integer(), primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    filename = db.Column(db.String, default=None, nullable=True)
    url = db.Column(db.String, default=None, nullable=True)

    def __init__(self, user_id, filename=None, url=None):
        self.user_id = user_id
        self.filename = filename
        self.url = url


class PhotoSchema(Schema):
    id = fields.Int(dump_only=True)
    user_id = fields.Int(required=True)
    url = fields.Str(required=True)
