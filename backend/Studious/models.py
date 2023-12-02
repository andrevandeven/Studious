from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.utils import timezone


class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    school = models.CharField(max_length=100, blank=True)
    major = models.CharField(max_length=100, blank=True)
    year = models.IntegerField(blank=True, null=True)


class StudySession(models.Model):
    poster = models.ForeignKey(User, on_delete=models.CASCADE)
    class_name = models.CharField(max_length=100)
    description = models.TextField()
    attendees = models.ManyToManyField(User, related_name="signed_up_sessions")
    time_posted = models.DateTimeField(auto_now_add=True)
    session_time = models.DateTimeField()
    location = models.CharField(max_length=255)


# @receiver(post_save, sender=User)
# def create_or_update_user_profile(sender, instance, created, **kwargs):
#     UserProfile.objects.get_or_create(user=instance)
#     instance.userprofile.save()
