from django.urls import re_path
from . import consumers

websocket_urlpatterns = [
    re_path(r'ws/some_path/$', consumers.LocationConsumer.as_asgi()),
    re_path(r'ws/numbers/$', consumers.three_consumer.as_asgi()),
]