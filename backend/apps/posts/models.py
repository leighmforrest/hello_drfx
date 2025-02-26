from django.db import models
from django.contrib.auth import get_user_model
from django_extensions.db.models import TimeStampedModel


CustomUser = get_user_model()


class Post(TimeStampedModel):
    title = models.CharField(max_length=50)
    body = models.TextField()
    author = models.ForeignKey(CustomUser, on_delete=models.CASCADE)

    def __str__(self):
        return str(self.title)