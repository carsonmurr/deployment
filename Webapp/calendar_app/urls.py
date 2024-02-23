from django.urls import path, include
from rest_framework import routers
from .api import EventAPI

router = routers.DefaultRouter()

router.register('api/event', EventAPI, 'events')

urlpatterns = router.urls