from django.urls import path

from .views import IndexView

app_name = "pictures"

urlpatterns = [path("", IndexView.as_view(), name="index")]
