from django.urls import path, include
from rest_framework import routers
from .api import EventAPI, CalendarViewAPI, CreateEventAPI, CancelEventAPI

#urlpatterns = [
#  path('api/', CalendarViewAPI.as_view()),
#  path('api/create', CreateEventAPI.as_view()),
#  path('api/cancel', CancelEventAPI.as_view()),
#]

router = routers.DefaultRouter()

router.register('api/event', EventAPI, 'events')

urlpatterns = router.urls