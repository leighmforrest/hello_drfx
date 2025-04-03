from django.urls import path, include

from .views import IndexView

app_name = "api"

urlpatterns = [path("", IndexView.as_view(), name="index"),
               path("accounts/", include("djoser.urls")),
               path("accounts/", include("djoser.urls.jwt"))]
