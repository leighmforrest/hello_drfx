from django.contrib import admin
from django.urls import path, include

admin.site.site_header = "Hello DRFX"
admin.site.site_title = "Tab Title"
admin.site.index_title = "Index Title"

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include("apps.api.urls"))
]
