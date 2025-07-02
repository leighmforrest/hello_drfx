from rest_framework.serializers import ModelSerializer

from .models import Picture


class PictureSerializer(ModelSerializer):
    class Meta:
        model = Picture
        fields = ["pk","title", "picture"]