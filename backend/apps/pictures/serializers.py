from rest_framework.serializers import ModelSerializer

from .models import Picture
from apps.accounts.serializers import ShortCustomUserSerializer


class PictureSerializer(ModelSerializer):
    user = ShortCustomUserSerializer(read_only=True)

    class Meta:
        model = Picture
        fields = ["pk", "title", "picture", "user"]
        read_only_fields = ["id", "user"]
