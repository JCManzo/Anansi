from flask import request, g, jsonify
from itsdangerous import TimedJSONWebSignatureSerializer as Serializer
from itsdangerous import SignatureExpired, BadSignature
from index import app


# Token expires in 2 weeks
EXP_TIME = 1209600


def generate_token(user, expiration=EXP_TIME):
    s = Serializer(app.config['SECRET_KEY'], expires_in=expiration)
    token = s.dumps({
        'id': user.id,
        'username': user.username,
        'email': user.email
    }).decode('utf-8')
    return token

