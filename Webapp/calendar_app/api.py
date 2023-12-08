from .models import Event
from rest_framework import viewsets, generics, permissions
from rest_framework.response import Response
from .serializers import EventSerializer, MeetingSerializer, DeadlineSerializer

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

class CalendarViewAPI(generics.GenericAPIView):
    set = Event.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]

# Creates events using serializers
class CreateEventAPI(generics.GenericAPIView):
    serializer_class = EventSerializer

    def post(self, request, *args, **kwargs): # Creates event, validates it, and returns the event data
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        event = serializer.save()
        return Response({
            "event": EventSerializer(event, context=self.get_serializer_context()).data,
        })

# Creates meetings using serializers
class CreateMeetingAPI(generics.GenericAPIView):
    serializer_class = MeetingSerializer
    
    def post(self, request, *args, **kwargs): # Creates meeting, validates it, and returns the meeting data
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        meeting = serializer.save()
        return Response({
            "meeting": MeetingSerializer(meeting, context=self.get_serializer_context()).data,
        })
    
# Creates deadlines using serializers
class CreateDeadlineAPI(generics.GenericAPIView):
    serializer_class = DeadlineSerializer

    def post(self, request, *args, **kwargs): # Creates deadline, validates it, and returns the deadline data
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        deadline = serializer.save()
        return Response({
            "deadline": DeadlineSerializer(deadline, context=self.get_serializer_context()).data,
        })

# Cancels events (moreso delete events) from the calendar
class CancelEventAPI(generics.GenericAPIView):
    serializer_class = EventSerializer

    def delete(event_title):
        title = Event.objects.get(title = event_title)
        title.delete()