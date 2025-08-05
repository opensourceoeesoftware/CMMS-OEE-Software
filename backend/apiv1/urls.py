
'''Urls of the app'''
from rest_framework import routers
from .views import  AssetViewSet,MaintenancePlanViewSet,\
    MaintenanceWritePlanViewSet,UserProfileViewSet\
    ,MyMaintenancePlanViewSet,MyProfileViewSet

router = routers.SimpleRouter()

router.register(r'assets', AssetViewSet,basename="all-assets")
router.register(r'maintenances', MaintenancePlanViewSet,\
                basename="all-maintenances-plans")
router.register(r'my-maintenances', MyMaintenancePlanViewSet,\
                basename="my-maintenances-plans")
router.register(r'maintenances-plans', MaintenanceWritePlanViewSet,\
                basename="maintenances-plans")
router.register(r'profile-users', UserProfileViewSet,basename="profile-users")
router.register(r'my-profile', MyProfileViewSet,basename="my-profile")



urlpatterns = router.urls