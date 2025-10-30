import uuid
from django.db import models
from django.contrib.auth import get_user_model
from django_extensions.db.models import TimeStampedModel

User = get_user_model()


def upload_to(instance, filename: str):
    ext = filename.split('.')[-1]
    new_filename = f"{instance.id or uuid.uuid4()}.{ext}"
    return f"pictures/{new_filename}"


class Picture(TimeStampedModel, models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=126)
    picture = models.ImageField(upload_to=upload_to)

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="uploaded_pictures")
    likes = models.ManyToManyField(User, related_name="liked_pictures", blank=True)
    comments = models.ManyToManyField(User, through="Comment", related_name="commented_pictures")

    class Meta:
        ordering = ['-created']

    def __str__(self):
        return self.title


class Comment(TimeStampedModel, models.Model):
    picture = models.ForeignKey(Picture, on_delete=models.CASCADE, related_name="picture_comments")
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="user_comments")
    comment = models.TextField()

    def __str__(self):
        return f"{self.user.handle}:{self.picture.title}"
