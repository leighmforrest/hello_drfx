from django.db.models.signals import post_delete
from django.dispatch import receiver

from .models import Picture


@receiver(post_delete, sender=Picture)
def delete_picture_file(sender, instance, **kwargs):
    print("ENTERING SIGNAL...")
    if instance.picture:
        instance.picture.delete(save=False)
    print("EXITING SIGNAL...")
