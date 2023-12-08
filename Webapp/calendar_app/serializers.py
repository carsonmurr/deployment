from rest_framework import serializers
from .models import Event, Meeting, Deadline

# The file establishes the serializers for the calendar event models
# Helps connect frontend/backend together

class EventSerializer(serializers.ModelSerializer):
	class Meta:
		model = Event
		fields = '__all__'
		
class MeetingSerializer(EventSerializer):
	class Meta:
		model = Meeting
		fields = '__all__'
		
class DeadlineSerializer(EventSerializer):
	class Meta:
		model = Deadline
		fields = '__all__'