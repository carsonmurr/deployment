from rest_framework import serializers
from tasks_app.models import Task 

# Task Serializer
class TaskSerializer(serializers.ModelSerializer):
  class Meta:
    model = Task 
    fields = '__all__'

