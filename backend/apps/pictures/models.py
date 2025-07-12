import uuid
from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()


def upload_to(instance, filename: str):
    ext = filename.split(".")[-1]
    new_filename = f"{instance.id}.{ext}"
    return f"pictures/{new_filename}"


class Picture(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=126)
    picture = models.ImageField(upload_to=upload_to)

    def __str__(self):
        return self.title
