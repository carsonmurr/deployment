from rest_framework import routers
from .api import TaskViewSet #import ProjectViewSet later

router = routers.DefaultRouter()

#router.register('api/projects', ProjectViewSet, 'projects')
router.register('api/tasks', TaskViewSet, 'tasks')

# Gives us urls that we registered
urlpatterns = router.urls