from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from rest_framework import generics
from .models import UserProfile, StudySession
from .serializers import UserProfileSerializer, StudySessionSerializer
from django.contrib.auth.models import User
from rest_framework import status, views
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from .serializers import UserSerializer
from django.contrib.auth import authenticate
from rest_framework.decorators import action


class UserProfileList(generics.ListCreateAPIView):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]


class StudySessionList(generics.ListCreateAPIView):
    queryset = StudySession.objects.all()
    serializer_class = StudySessionSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        session = serializer.save(poster=self.request.user)
        session.attendees.add(self.request.user)

    @action(detail=True, methods=["post"], permission_classes=[IsAuthenticated])
    def join(self, request, pk=None):
        studysession = self.get_object()
        if request.user in studysession.attendees.all():
            return Response(
                {"message": "You are already an attendee of this session."},
                status=status.HTTP_400_BAD_REQUEST,
            )
        studysession.attendees.add(request.user)
        return Response(
            {"message": "You have successfully joined the session."},
            status=status.HTTP_200_OK,
        )


class UserRegistrationView(views.APIView):
    def post(self, request):
        user_serializer = UserSerializer(data=request.data)
        if user_serializer.is_valid():
            user = user_serializer.save()
            UserProfile.objects.create(
                user=user,
                school=request.data.get("school", ""),
                major=request.data.get("major", ""),
                year=request.data.get("year", None),
            )
            token, created = Token.objects.get_or_create(user=user)
            return Response({"token": token.key}, status=status.HTTP_201_CREATED)

        return Response(user_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserLoginView(views.APIView):
    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")
        user = authenticate(username=username, password=password)
        if user:
            token, created = Token.objects.get_or_create(user=user)
            return Response({"token": token.key})
        return Response(
            {"error": "Invalid Credentials"}, status=status.HTTP_400_BAD_REQUEST
        )
