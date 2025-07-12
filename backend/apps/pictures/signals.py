from django.db.models.signals import post_delete
from django.dispatch import receiver
import logging

from .models import Picture


logger = logging.getLogger(__name__)


@receiver(post_delete, sender=Picture)
def delete_picture_file(sender, instance, **kwargs):
    instance.picture.delete(save=False)
    logger.debug(f"Deleted file for Picture id={instance.pk}")
