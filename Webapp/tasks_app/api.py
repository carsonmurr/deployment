from tasks_app.models import Task
from rest_framework import viewsets, permissions
from .serializers import TaskSerializer

# Task Viewset
class TaskViewSet(viewsets.ModelViewSet):
    # A user can only access their own tasks
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = TaskSerializer

    # Grabs all tasks
    def get_queryset(self):
        return self.request.user.tasks.all()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)