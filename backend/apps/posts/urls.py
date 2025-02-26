from django.urls import path

from .views import PostListView, PostDetailView

app_name = "posts"

urlpatterns = [
    path("<int:pk>/", PostDetailView.as_view(), name="detail"),
    path("", PostListView.as_view(), name="list"),
]
