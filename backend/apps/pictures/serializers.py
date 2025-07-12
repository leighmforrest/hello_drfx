from rest_framework.serializers import ModelSerializer

from .models import Picture
from apps.accounts.serializers import CustomUserSerializer


class PictureSerializer(ModelSerializer):
    user = CustomUserSerializer(read_only=True)

    class Meta:
        model = Picture
        fields = ["pk", "title", "picture", "user"]
        read_only_fields = ["id", "user"]
