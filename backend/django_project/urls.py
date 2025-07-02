from django.contrib import admin
from django.urls import path, include
from django.conf import settings 
from django.conf.urls.static import static 


admin.site.site_header = "Hello DRFX"
admin.site.site_title = "Tab Title"
admin.site.index_title = "Index Title"

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api-auth/", include("rest_framework.urls")),
    path("api/", include("apps.api.urls")),
    path("api/accounts/", include("djoser.urls")),
    path("api/accounts/", include("djoser.urls.jwt")),
]

if not settings.S3:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)