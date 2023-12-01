from django.urls import path
from . import views

urlpatterns = [
    path("Studious/userprofiles/", views.UserProfileList.as_view(), name="userprofile-list"),
    path(
        "Studious/studysessions/", views.StudySessionList.as_view(), name="studysession-list"
    ),
]
