from django.urls import path, include
from .api import UserAPI, RegisterAPI, LoginAPI, UserSettingsAPI, AllUsernamesAPI
from knox import views as knox_views

urlpatterns = [
    path('api/auth', include('knox.urls')),
    path('api/auth/user', UserAPI.as_view()),
    path('api/auth/register', RegisterAPI.as_view()),
    path('api/auth/login', LoginAPI.as_view()),
    path('api/auth/settings', UserSettingsAPI.as_view(), name='user_settings'),
    # Invalidates token, forces user to login again to get a new token
    path('api/auth/logout', knox_views.LogoutView.as_view(), name='knox_logout'),
    path('api/auth/all_usernames', AllUsernamesAPI.as_view(), name='all_usernames'),
]