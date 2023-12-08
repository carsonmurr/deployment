from rest_framework import serializers
# Django already has a user model so we can utilize it
from django.contrib.auth.models import User
from django.contrib.auth import authenticate

# Serializers for accounts based on this tutorial: https://youtu.be/0d7cIfiydAc?si=2KGWXphJfuk00LXL

# Register Serializer: Creates new user account
class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'first_name', 'last_name', 'username', 'email', 'password') #'employee_id'
        extra_kwargs = {'password': {'write_only': True}}
    
    def create(self, validated_data):
        # Validates the fields and creates a new user account
        account = User.objects.create_user(first_name=validated_data['first_name'],
                                           last_name=validated_data['last_name'],
                                           username=validated_data['username'], 
                                           email=validated_data['email'], 
                                           password=validated_data['password'])
        # Figure out a way to add employee_ids here
        # employee_id=validated_data['employee_id']

        return account

# Login Serializer: Validates login credentials
class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()
    
    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Incorrect Credentials")

# User Serializer: Creates basic user profile
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'first_name', 'last_name', 'username', 'email')

    # Updates user data, which for now just contains changing password
    # Might need to change later
    def update(self, instance, validated_data):
        password = validated_data.pop("password", None)
        for key, value in validated_data.items():
            setattr(instance, key, value)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance

class UserSettingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'first_name', 'last_name', 'username', 'email')
