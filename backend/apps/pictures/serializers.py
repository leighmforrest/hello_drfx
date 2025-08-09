from rest_framework import serializers
from .models import Picture
from apps.accounts.serializers import ShortCustomUserSerializer


class PictureSerializer(serializers.ModelSerializer):
    user = ShortCustomUserSerializer(read_only=True)
    total_likes = serializers.SerializerMethodField()

    class Meta:
        model = Picture
        fields = ["pk", "title", "picture", "user", "total_likes"]
        read_only_fields = ["id", "user"]
    
    def get_total_likes(self, obj: Picture):
        return obj.likes.count()
