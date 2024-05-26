# myapp/urls.py

from django.urls import path
from .views import *

urlpatterns = [
    path('login', login, name='login'),
    path('registeration', registeration, name='registeration'),
    path('populate_account', populate_account, name='populate_account'),
    path('edit_warehouse', edit_warehouse, name='edit_warehouse'),
]
