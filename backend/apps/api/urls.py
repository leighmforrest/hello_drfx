from django.urls import path, include


urlpatterns = [
    path("", include("apps.notes.urls")),
    path("api-auth/", include("rest_framework.urls")),
    path("auth/", include('djoser.urls')),
    path("auth/", include('djoser.urls.jwt'))
]