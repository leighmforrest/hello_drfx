from django.contrib import admin
from django.utils.html import format_html

from .models import Picture


@admin.register(Picture)
class PictureAdmin(admin.ModelAdmin):
    list_display = ("title", "image_tag")
    readonly_fields = ("image_tag",)

    def image_tag(self, obj):
        if obj.picture:
            return format_html(
                '<img src="{}" width="100" height="auto" />', obj.picture.url
            )
