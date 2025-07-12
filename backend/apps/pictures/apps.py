from django.apps import AppConfig


class PicturesConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "apps.pictures"

    def ready(self):
        import apps.pictures.signals
