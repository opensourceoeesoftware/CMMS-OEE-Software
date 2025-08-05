from rest_framework import permissions
import logging
from .models import Product,Event,Cell,MachineFault
from db.models import Asset
logger = logging.getLogger(__name__)
class ProductPermission(permissions.BasePermission):

    def has_permission(self, request, view):
        if request.method == 'POST':
            return True
        if request.method == 'GET':
            return True
        try :

            return Product.objects.select_related('organization').get(uuid = view.kwargs['pk']).organization == request.user.userprofile.organization
        except Exception as ex:
            return False
class CellPermission(permissions.BasePermission):

    def has_permission(self, request, view):
        if request.method == 'GET':
            return True
        if request.method == 'POST':
             return Asset.objects.select_related('organization').get(uuid=request.POST['machine']).organization \
                == request.user.userprofile.organization

        try :

            return Cell.objects.select_related('machine','machine__organization').\
                get(uuid = view.kwargs['pk']).machine.organization == request.user.userprofile.organization
        except Exception as ex:
            logger.warning(ex)
            return False
class FaultPermission(permissions.BasePermission):

    def has_permission(self, request, view):
        if request.method == 'GET':
            return True
        if request.method == 'POST':
             return Asset.objects.select_related('organization').get(uuid=request.POST['machine']).organization == \
                request.user.userprofile.organization

        try :

            return MachineFault.objects.select_related('machine','machine__organization').\
                get(uuid = view.kwargs['pk']).machine.organization == request.user.userprofile.organization
        except Exception as ex:
            return False
        
class CellReadPermission(permissions.BasePermission):

    def has_permission(self, request, view):
        
        if request.method == 'GET':
            return True
        return False

class FaultReadPermission(permissions.BasePermission):

    def has_permission(self, request, view):
        
        if request.method == 'GET':
            return True
        return False
class EventPermission(permissions.BasePermission):

    def has_permission(self, request, view):
        if request.method == 'POST':
            return True
        if request.method == 'GET':
            return True
        return False