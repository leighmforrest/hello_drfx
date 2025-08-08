from rest_framework.serializers import ModelSerializer

from .models import CustomUser


class CustomUserSerializer(ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ["pk", "email", "handle"]


class ShortCustomUserSerializer(ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ["pk", "handle"]
