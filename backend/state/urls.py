from rest_framework import routers
from .views import EventAutoViewSet,CellViewSet,MachineFaultViewSet,DowntimeViewSet,\
ProductViewSet,CellsViewSet,MachineFaultsViewSet

router = routers.SimpleRouter()

router.register(r'events', EventAutoViewSet,basename="all-events")

router.register(r'downtime', DowntimeViewSet,basename="downtime")
router.register(r'cells', CellsViewSet,basename="cells")
router.register(r'cells-read', CellViewSet,basename="cells-read")
router.register(r'faults', MachineFaultsViewSet,basename="faults")
router.register(r'faults-read', MachineFaultViewSet,basename="faults-read")
router.register(r'products-read', ProductViewSet,basename="products-read")

urlpatterns = router.urls