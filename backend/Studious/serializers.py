from rest_framework import serializers
from .models import UserProfile, StudySession
from django.contrib.auth.models import User


class UserProfileSerializer(serializers.ModelSerializer):
    user_first_name = serializers.CharField(source="user.first_name", read_only=True)
    user_last_name = serializers.CharField(source="user.last_name", read_only=True)

    class Meta:
        model = UserProfile
        fields = (
            "user",
            "school",
            "major",
            "year",
            "user_first_name",
            "user_last_name",
        )


class AttendeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["username"]


class StudySessionSerializer(serializers.ModelSerializer):
    attendees = AttendeeSerializer(many=True, read_only=True, source="attendees.all")

    class Meta:
        model = StudySession
        fields = ["class_name", "attendees", "description", "session_time", "location"]
        extra_kwargs = {
            "attendees": {"required": False},
            "poster": {"required": False},
            "time_posted": {"read_only": True},
        }


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("username", "password", "email", "first_name", "last_name")
        extra_kwargs = {
            "password": {"write_only": True},
            "first_name": {"required": True},
            "last_name": {"required": True},
        }

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user
