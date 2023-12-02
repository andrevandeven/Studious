from django.urls import path
from . import views

urlpatterns = [
    path(
        "Studious/userprofiles/",
        views.UserProfileList.as_view(),
        name="userprofile-list",
    ),
    path(
        "Studious/studysessions/",
        views.StudySessionList.as_view(),
        name="studysession-list",
    ),
    path("register/", views.UserRegistrationView.as_view(), name="user-register"),
    path("login/", views.UserLoginView.as_view(), name="user-login"),
]
