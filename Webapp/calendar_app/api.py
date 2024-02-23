from .models import Event
from rest_framework import viewsets, generics, permissions
from rest_framework.response import Response
from .serializers import EventSerializer
# The file contains the API for the calendar

class EventAPI(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = EventSerializer

    def get_queryset(self):
        return self.request.user.events.all()

    def perform_create(self, serializer):
        serializer.save(creator=self.request.user)