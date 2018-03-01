import os


class BaseConfig(object):
    SECRET_KEY = "WHEREYOUEND"
    DEBUG = True
    USERNAME = 'admin'
    PASSWORD = 'default'
    SQLALCHEMY_DATABASE_URI = 'sqlite:///anansi.db'#os.environ['DATABASE_URL']
    SQLALCHEMY_TRACK_MODIFICATIONS = True

