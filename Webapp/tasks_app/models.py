from django.db import models
from django.contrib.auth.models import User

# Task model
# Includes parameters for the project associated, the task contents, the user who created it, timestamps for creation, and the completion status
class Task(models.Model):
    project = models.CharField(max_length=100, blank=True)
    body = models.CharField(max_length=100, blank=True)
    owner = models.ForeignKey(User, related_name="tasks", on_delete=models.CASCADE, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    completed = models.BooleanField(default=False, blank=True)
