from django.shortcuts import render

from rest_framework import generics
from .models import UserProfile, StudySession
from .serializers import UserProfileSerializer, StudySessionSerializer


class UserProfileList(generics.ListCreateAPIView):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer


class StudySessionList(generics.ListCreateAPIView):
    queryset = StudySession.objects.all()
    serializer_class = StudySessionSerializer
