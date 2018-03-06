import os
import sys


class BaseConfig(object):
    TOP_DIR = os.getcwd()
    SECRET_KEY = "WHEREYOUEND"
    DEBUG = True
    USERNAME = 'admin'
    PASSWORD = 'default'

    # USe ENV for this, maybe os.environ['DATABASE_URL']
    SQLALCHEMY_DATABASE_URI = 'sqlite:///anansi.db'
    SQLALCHEMY_TRACK_MODIFICATIONS = True

    SERVER_URL = 'http://localhost:5000'
    STATIC_DIR = 'static'
    UPLOAD_FOLDER = STATIC_DIR + '/uploads'
    UPLOADS_DEFAULT_DEST = TOP_DIR + '/' + UPLOAD_FOLDER + '/default/'
    UPLOADS_DEFAULT_URL = SERVER_URL + '/uploads/default/'
    UPLOADED_PHOTOS_DEST = TOP_DIR + '/' + UPLOAD_FOLDER + '/photos/'
    UPLOADED_PHOTOS_URL = SERVER_URL + '/uploads/photos/'
