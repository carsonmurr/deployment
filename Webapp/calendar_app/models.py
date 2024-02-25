from django.db import models
from django.contrib.auth import get_user_model
User = get_user_model()

# This file establishes the classes/models for calendar events

# Event class: contains info for calendar events, including the participants, date, and time.
class Event(models.Model):
    id = models.CharField(max_length=256)
    title = models.CharField(max_length=200, default="")
    start = models.CharField(max_length=200, default="")
    end = models.CharField(max_length=200, default="", blank=True)
    #startTime = models.CharField(max_length=200, default="")
    #endTime = models.CharField(max_length=200, default="")
    allDay = models.BooleanField(max_length=200, default=False)
    creator = models.ForeignKey(User, related_name="events", on_delete=models.CASCADE, null=True)

# class SharedEvent(models.Model):
#     #id = models.CharField(max_length=256)
#     title = models.CharField(max_length=200, default="")
#     start = models.CharField(max_length=200, default="")
#     end = models.CharField(max_length=200, default="", blank=True)
#     #startTime = models.CharField(max_length=200, default="")
#     #endTime = models.CharField(max_length=200, default="")
#     allDay = models.BooleanField(max_length=200, default=False)
#     participants = models.ManyToManyField(User, related_name="events", on_delete=models.CASCADE, null=True)