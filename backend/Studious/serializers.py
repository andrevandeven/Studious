from rest_framework import serializers
from .models import UserProfile, StudySession
from django.contrib.auth.models import User


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = "__all__"


class AttendeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["username"]


class StudySessionSerializer(serializers.ModelSerializer):
    attendees = AttendeeSerializer(many=True, read_only=True, source="attendees.all")

    class Meta:
        model = StudySession
        fields = ["class_name", "attendees", "description"]
        extra_kwargs = {"attendees": {"required": False}, "poster": {"required": False}}


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("username", "password", "email")
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user
