from setuptools import setup
import os

basedir = os.path.abspath(os.path.dirname(__file__))
setup(
    name='anansi',
    packages=['application'],
    include_package_data=True,
    install_requires=[
        'flask',
    ],
)
