# Necessary modules from Django Rest Framework
from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
# Only using tokens from Knox
from knox.models import AuthToken
# Serializers for user-related operations
from .serializers import UserSerializer, RegisterSerializer, LoginSerializer, UserSettingsSerializer
from rest_framework.generics import RetrieveUpdateAPIView
# API structure follows from this tutorial: https://youtu.be/0d7cIfiydAc?si=2KGWXphJfuk00LXL
from django.contrib.auth import get_user_model

User = get_user_model()


# Registration API: Creates accounts for new users
class RegisterAPI(generics.GenericAPIView):
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        # Create an instance of the RegisterSerializer
        serializer = self.get_serializer(data=request.data)
        # Validate the registration data using the serializer
        serializer.is_valid(raise_exception=True)
        # Save the new user by calling the save method on the serializer
        user = serializer.save()

        # Return a Response with user data and an authentication token
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)[1]
        })

# Login API: Authenticates users and provides an authentication token
class LoginAPI(generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        # Create an instance of the LoginSerializer
        serializer = self.get_serializer(data=request.data)
        
        # Validate the login data using the serializer
        serializer.is_valid(raise_exception=True)
        
        # Extract the validated user data from the serializer
        user = serializer.validated_data
        
        # Return a Response with serialized user data and an authentication token
        return Response({
            # Serialize and return user data
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            
            # Provide an authentication token for login
            "token": AuthToken.objects.create(user)[1]
        })

# Get User API: Retrieves information about the authenticated user
class UserAPI(generics.RetrieveAPIView):
    permission_classes = [
        permissions.IsAuthenticated,  # Ensures only authenticated users can access the API
    ]
    serializer_class = UserSerializer

    def get_object(self):
        # Returns information about the current authenticated user
        return self.request.user

# User Settings API: For modifying account information including username, password, profile parameters, etcc
class UserSettingsAPI(RetrieveUpdateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = UserSettingsSerializer

    def get_object(self):
        return self.request.user
    
class AllUsernamesAPI(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        usernames = User.objects.values_list('username', flat=True)
        return Response({'usernames': usernames}, status=status.HTTP_200_OK)