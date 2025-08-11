from django.urls import path

from .views import IndexView, DetailView, LikeView

app_name = "pictures"

urlpatterns = [
    path("", IndexView.as_view(), name="index"),
    path("<uuid:pk>", DetailView.as_view(), name="detail"),
    path("<uuid:pk>/like", LikeView.as_view(), name="like"),
]
