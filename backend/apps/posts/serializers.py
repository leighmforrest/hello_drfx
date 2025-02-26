from django.utils.timezone import localtime
from rest_framework import serializers

from .models import Post


class PostSerializer(serializers.ModelSerializer):
    created = serializers.SerializerMethodField()
    
    class Meta:
        model = Post
        fields = ("pk", "author", "title", "body", "created")
        read_only_fields = ["author"]

    def get_created(self, obj):
        return localtime(obj.created).strftime("%B %d, %Y %I:%M %p")
    
    def create(self, validated_data):
        request = self.context.get("request")
        if request and request.user:
            validated_data["author"] = request.user
        return super().create(validated_data)