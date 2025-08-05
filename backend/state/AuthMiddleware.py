from django.contrib.auth.models import AnonymousUser
from rest_framework.authtoken.models import Token
from channels.db import database_sync_to_async
from channels.middleware import BaseMiddleware
from db.models import UserProfile
from apiv1.serializers import UserProfileSerializer
@database_sync_to_async
def get_user(token_key):
    try:
        token = Token.objects.get(key=token_key)
        profile = UserProfile.objects.get(user=token.user)
        user_profile = UserProfileSerializer(profile)
        return user_profile.data
    except Token.DoesNotExist:
        return None

class TokenAuthMiddleware(BaseMiddleware):
    def __init__(self, inner):
        super().__init__(inner)

    async def __call__(self, scope, receive, send):
        try:
            token_key = (dict((x.split('=') for x in scope['query_string'].decode().split("&")))).get('token', None)
            machine = (dict((x.split('=') for x in scope['query_string'].decode().split("&")))).get('machine', None)
        except ValueError:
            token_key = None
            machine = None
        scope['user'] = None if token_key is None else await get_user(token_key)
        scope['machine'] = None if token_key is None else machine
        return await super().__call__(scope, receive, send)