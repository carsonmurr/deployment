# Generated by Django 5.0 on 2024-02-16 15:04

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("calendar_app", "0007_alter_event_allday"),
    ]

    operations = [
        migrations.AlterField(
            model_name="event",
            name="end",
            field=models.CharField(blank=True, default="", max_length=200),
        ),
    ]
