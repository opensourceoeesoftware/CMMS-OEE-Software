from django.urls import re_path

from . import consumers

websocket_urlpatterns = [
    re_path(r"ws/machine-data/", consumers.MachineConsumer.as_asgi()),
    re_path(r"ws/machine-oee/", consumers.OeeConsumer2.as_asgi()),
    re_path(r"ws/machine-report/", consumers.ReportConsumer.as_asgi()),
]