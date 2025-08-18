from django.contrib import admin
from django.utils.html import format_html

from .models import Picture


@admin.register(Picture)
class PictureAdmin(admin.ModelAdmin):
    list_per_page = 5
    list_display = ("title", "user", "created", "image_tag")
    readonly_fields = ("created", "image_tag",)
    exclude = ("likes", "user")

    def save_model(self, request, obj, form, change):
        # If the object is being added (not changed), set the 'created_by' field
        if not change:
            obj.user = request.user
        super().save_model(request, obj, form, change)

    def image_tag(self, obj):
        if obj.picture:
            return format_html(
                '<img src="{}" width="100" height="auto" />', obj.picture.url
            )
