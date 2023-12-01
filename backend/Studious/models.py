from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver


class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    school = models.CharField(max_length=100)
    major = models.CharField(max_length=100)
    year = models.CharField(max_length=100)
    # Additional fields if needed, other than first_name, last_name, email


class StudySession(models.Model):
    poster = models.ForeignKey(User, on_delete=models.CASCADE)
    class_name = models.CharField(max_length=100)
    description = models.TextField()
    attendees = models.ManyToManyField(User, related_name="signed_up_sessions")


@receiver(post_save, sender=User)
def create_or_update_user_profile(sender, instance, created, **kwargs):
    UserProfile.objects.get_or_create(user=instance)
    instance.userprofile.save()
