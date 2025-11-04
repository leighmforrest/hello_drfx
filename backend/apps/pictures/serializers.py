from rest_framework import serializers
from .models import Picture, Comment
from apps.accounts.serializers import ShortCustomUserSerializer


class PictureSerializer(serializers.ModelSerializer):
    user = ShortCustomUserSerializer(read_only=True)
    is_user = serializers.SerializerMethodField(read_only=True)
    total_likes = serializers.SerializerMethodField(read_only=True)
    is_liked = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Picture
        fields = ["pk", "title", "picture", "user", "is_user", "total_likes", "is_liked"]
        read_only_fields = ["id", "user"]

    def get_is_user(self, obj:Picture):
        request = self.context.get('request')

        return request.user.is_authenticated and obj.user == request.user
    
    def get_total_likes(self, obj: Picture):
        return obj.likes.count()
    
    def get_is_liked(self, obj: Picture):
        request = self.context.get('request')

        return request.user.is_authenticated and obj.likes.filter(id=request.user.pk).exists()


class CommentSerializer(serializers.ModelSerializer):
    user = ShortCustomUserSerializer(read_only=True)
    is_user = serializers.SerializerMethodField(read_only=True)


    class Meta:
        model = Comment
        fields = ["pk", "comment", "user", "is_user", "created"]
        read_only_fields = ["id", "user"]
    
    def get_is_user(self, obj:Picture):
        request = self.context.get('request')

        return request.user.is_authenticated and obj.user == request.user
