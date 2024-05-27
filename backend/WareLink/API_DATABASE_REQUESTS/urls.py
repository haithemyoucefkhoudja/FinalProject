# myapp/urls.py

from django.urls import path
from .views import *

urlpatterns = [
    path('login', login, name='login'),
    path('registeration', registeration, name='registeration'),
    path('populate_account/', populate_account, name='populate_account'),
    path('edit_warehouse', edit_warehouse, name='edit_warehouse'),
    path('create_warehouse', create_warehouse, name='create_warehouse'),
    path('get_all_json_data_for_three_consumer', get_all_json_data_for_three_consumer, name='get_all_json_data_for_three_consumer'),
]
