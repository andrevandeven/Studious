# Generated by Django 4.2.7 on 2023-12-02 03:53

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("Studious", "0003_studysession_location_studysession_session_time_and_more"),
    ]

    operations = [
        migrations.AlterField(
            model_name="studysession",
            name="location",
            field=models.CharField(max_length=255),
        ),
        migrations.AlterField(
            model_name="studysession",
            name="session_time",
            field=models.DateTimeField(),
        ),
        migrations.AlterField(
            model_name="studysession",
            name="time_posted",
            field=models.DateTimeField(auto_now_add=True),
        ),
    ]
