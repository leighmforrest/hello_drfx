from django.urls import path

from .views import IndexView, DetailView, LikeView, CommentsView

app_name = "pictures"

urlpatterns = [
    path("", IndexView.as_view(), name="index"),
    path("<uuid:pk>", DetailView.as_view(), name="detail"),
    path("<uuid:pk>/like", LikeView.as_view(), name="like"),
    path("<uuid:pk>/comments", CommentsView.as_view(), name="comments"),
]
