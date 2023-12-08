from django.db import models
from django.contrib.auth.models import User
import uuid

# This file establishes the classes/models for calendar events

# Event class: contains info for calendar events, including the participants, date, and time.
class Event(models.Model):
    def __init__(self, title, description, creator, participants, date, end_time, theme):
        self.title = title
        self.description = description
        self.creator = creator
        self.participants = participants
        self.date = date
        self.end_time = end_time
        self.theme = theme

    id = models.UUIDField(primary_key = True, default = uuid.uuid4, editable = False)
    title = models.CharField(max_length=30)
    description= models.CharField(max_length=255)
    creator = models.ForeignKey(User, on_delete=models.CASCADE, related_name='events', null=True)
    participants = models.ManyToManyField(User, related_name='event_particinants')
    date = models.DateField
    end_time = models.TimeField
    theme = models.CharField(max_length=30)

# Meeting class: derives from Event, contains added functionality for meeting events
class Meeting(Event):
    def __init__(self, title, description, creator, participants, date, end_time, theme, start_time):
        self.start_time = start_time
        super().__init__(self, title, description, creator, participants, date, end_time, theme)

    start_time = models.TimeField

# Deadline class: derives from Event, contains added functionality for deadline events
class Deadline(Event):
    def __init__(self, title, description, creator, participants, date, end_time, theme, importance):
        self.importance = importance
        super().__init__(self, title, description, creator, participants, date, end_time, theme)
    
    LOW = 1
    MEDIUM = 2
    URGENT = 3

    URGENCY = [
        (LOW, 'Low priority'),
        (MEDIUM, 'Medium priority'),
        (URGENT, 'High priority')
    ]
    importance = models.CharField(max_length=6, choices=URGENCY, default="Low")