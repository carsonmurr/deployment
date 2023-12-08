from django.db import models
from django.contrib.auth.models import User

class Employee(models.Model):
    """
    Model for the user profile
    """
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    image = models.ImageField(default='profile.png', upload_to='profile_pics')
    # first_name = models.OneToOneField(User, on_delete=models.CASCADE)
    # last_name = models.OneToOneField(User, on_delete=models.CASCADE)
    # employee_id = models.CharField(max_length=20, null=True)
    department = models.CharField(max_length=100, default="Sales")


    def __str__(self):
        return f'{self.user.username} Profile'
