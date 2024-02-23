# Generated by Django 5.0 on 2024-02-09 03:38

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("calendar_app", "0002_alter_event_creator"),
    ]

    operations = [
        migrations.AddField(
            model_name="event",
            name="allDay",
            field=models.CharField(default="", max_length=256),
        ),
        migrations.AddField(
            model_name="event",
            name="end",
            field=models.CharField(default="", max_length=256),
        ),
        migrations.AddField(
            model_name="event",
            name="endTime",
            field=models.CharField(default="", max_length=256),
        ),
        migrations.AddField(
            model_name="event",
            name="start",
            field=models.CharField(default="", max_length=256),
        ),
        migrations.AddField(
            model_name="event",
            name="startTime",
            field=models.CharField(default="", max_length=256),
        ),
        migrations.AlterField(
            model_name="event",
            name="id",
            field=models.BigAutoField(
                auto_created=True, primary_key=True, serialize=False, verbose_name="ID"
            ),
        ),
        migrations.AlterField(
            model_name="event",
            name="title",
            field=models.CharField(default="", max_length=256),
        ),
        migrations.DeleteModel(
            name="Deadline",
        ),
        migrations.DeleteModel(
            name="Meeting",
        ),
    ]
