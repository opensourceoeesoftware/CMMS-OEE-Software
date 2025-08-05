"""Permissions for the app"""
import logging
from rest_framework import permissions
from db.models import Asset ,MaintenancePlan,UserProfile
logger = logging.getLogger(__name__)
class OrganizationCreatePermission(permissions.BasePermission):
    """
    Global permission check for blocked IPs.
    """

    def has_permission(self, request, view):
        if request.method == 'POST':
            return True
        return False

class AssetsPermission(permissions.BasePermission):
    """
    Global permission check for blocked IPs.
    """

    def has_permission(self, request, view):
        if request.method == 'POST':
            return True
        if request.method == 'GET':
            return True
        try :

            return Asset.objects.select_related('organization').get(uuid = view.kwargs['pk'])\
                .organization == request.user.userprofile.organization
        except Exception :
            return False

class MaintenancePermission(permissions.BasePermission):
    """
    Global permission check for blocked IPs.
    """

    def has_permission(self, request, view):
        if request.method == 'POST':
            return True
        if request.method == 'GET':
            return True
        try :

            return MaintenancePlan.objects.select_related('asset','asset__organization').\
                get(uuid = view.kwargs['pk']).\
                    asset.organization == request.user.userprofile.organization
        except Exception:
            return False
class UserProfilePermission(permissions.BasePermission):
    """
    Global permission check for blocked IPs.
    """

    def has_permission(self, request, view):
        if request.method == 'POST':
            return True
        if request.method == 'GET':
            return True
        try :

            return UserProfile.objects.select_related('organization').\
                get(uuid = view.kwargs['pk']).organization == request.user.userprofile.organization
        except Exception as ex:
            return False
