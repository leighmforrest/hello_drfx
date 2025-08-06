from django.urls import path

from .views import IndexView, DetailView

app_name = "pictures"

urlpatterns = [
    path("", IndexView.as_view(), name="index"),
    path("<uuid:pk>", DetailView.as_view(), name="detail"),
]
