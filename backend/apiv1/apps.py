"""Configuration of the app"""
from django.apps import AppConfig


class Apiv1Config(AppConfig):
    '''
    Configuration of the app
    '''
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'apiv1'
