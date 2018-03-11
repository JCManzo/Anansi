from flask import request, g, jsonify
from itsdangerous import TimedJSONWebSignatureSerializer as Serializer
from itsdangerous import SignatureExpired, BadSignature
from index import app


# Token expires in 2 weeks
EXP_TIME = 1209600


def generate_token(user, expiration=EXP_TIME):
    """
    Creates a JWT for a user.

    Args:
        user (User): A user object.
        expiration (int, optional): The expiration time for the JWT token.

    Returns:
        The token string.
    """
    s = Serializer(app.config['SECRET_KEY'], expires_in=expiration)
    token = s.dumps({
        'id': user.id,
        'email': user.email
    }).decode('utf-8')
    return token


def validate_request_token():
    """
    Validates the request by checking for the authentication token.

    Returns:
        str: The JWT.

    Raises:
        InvalidUsage: If no token with request or token is invalid
    """
    token = request.headers.get('Authorization')
    if not token:
        raise InvalidUsage('No token provided', status_code=403)

    # Parse out token from authentication scheme string.
    token = token.split('Bearer ', 1)[1]

    s = Serializer(app.config['SECRET_KEY'])
    try:
        data = s.loads(token)
    except (BadSignature, SignatureExpired):
        raise InvalidUsage('Token is invalid', status_code=403)
    return data


class InvalidUsage(Exception):
    """
    Exception class for handling authentication errors.

    Attributes:
        message (str): The error message
        payload (Any): Optional payload
        status_code (int): Optional HTTP code
    """
    status_code = 400

    def __init__(self, message, status_code=None, payload=None):
        Exception.__init__(self)
        self.message = message
        if status_code is not None:
            self.status_code = status_code
        self.payload = payload

    def to_dict(self):
        rv = dict(self.payload or ())
        rv['message'] = self.message
        return rv


@app.errorhandler(InvalidUsage)
def handle_invalid_usage(error):
    response = jsonify(error.to_dict())
    response.status_code = error.status_code
    return response
