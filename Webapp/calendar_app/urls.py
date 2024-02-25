from django.urls import path, include
from rest_framework import routers
from .api import EventAPI, AllEventsAPI

router = routers.DefaultRouter()

router.register('api/event', EventAPI, 'events')
router.register('api/all-events', AllEventsAPI, 'events')

urlpatterns = router.urls