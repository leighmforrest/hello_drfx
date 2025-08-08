from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _

from .managers import CustomUserManager


class CustomUser(AbstractUser):
    username = None
    email = models.EmailField(_("email address"), unique=True)
    handle = models.CharField(_("handle"), max_length=30, unique=True)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["handle"]

    objects = CustomUserManager()

    def __str__(self):
        return self.email
