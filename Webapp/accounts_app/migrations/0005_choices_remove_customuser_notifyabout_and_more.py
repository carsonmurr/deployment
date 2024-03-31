# Generated by Django 5.0 on 2024-03-27 00:47

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        (
            "accounts_app",
            "0004_customuser_allownotifications_customuser_notifyabout_and_more",
        ),
    ]

    operations = [
        migrations.CreateModel(
            name="Choices",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "name",
                    models.CharField(
                        choices=[
                            ("EVENTS", "Events"),
                            ("TASKS", "Tasks"),
                            ("MESSAGES", "Messages"),
                        ],
                        default="Messages",
                        max_length=30,
                    ),
                ),
            ],
        ),
        migrations.RemoveField(
            model_name="customuser",
            name="notifyAbout",
        ),
        migrations.AddField(
            model_name="customuser",
            name="notifyAbout",
            field=models.ManyToManyField(to="accounts_app.choices"),
        ),
    ]
