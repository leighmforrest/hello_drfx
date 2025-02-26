from django.utils.timezone import localtime
from rest_framework import serializers

from .models import Post


class PostSerializer(serializers.ModelSerializer):
    created = serializers.SerializerMethodField()
    
    class Meta:
        model = Post
        fields = ("pk", "author", "title", "body", "created")
    
    def get_created(self, obj):
        return localtime(obj.created).strftime("%B %d, %Y %I:%M %p")