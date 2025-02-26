import pytest
from datetime import datetime
from django.urls import reverse
from django.utils.timezone import localtime
from apps.posts.models import Post

pytestmark = pytest.mark.django_db


class TestPostListView:
    url = reverse("posts:list")

    def test_create_post(self, authenticated_client, test_user):
        response = authenticated_client.post(
            self.url,
            data={"title": "test title", "body": "This is a journey into sound!"},
        )
        pk = response.data["pk"]
        post = Post.objects.get(pk=pk)

        assert response.status_code == 201
        assert response.data["created"] == localtime(post.created).strftime(
            "%B %d, %Y %I:%M %p"
        )  # Fixed
        assert post.author == test_user
        assert post.title == "test title"
        assert post.body == "This is a journey into sound!"
        assert isinstance(post.created, datetime)

    def test_unauthenticated_user_cannot_get(self, client):
        response = client.get(self.url)
        assert response.status_code in [401, 403]

    def test_unauthenticated_user_cannot_post(self, client):
        response = client.post(
            self.url,
            data={"title": "test title", "body": "This is a journey into sound!"},
        )
        assert response.status_code in [401, 403]


class TestPostListDetail:
    def get_url(self, pk):
        return reverse("posts:detail", kwargs={"pk": pk})

    def test_any_user_can_get(self, alternate_user, api_client, test_post):
        url = self.get_url(test_post.pk)
        api_client.force_authenticate(alternate_user)
        response = api_client.get(url)

        assert response.status_code == 200

    def test_author_can_update(self, test_user, authenticated_client, test_post):
        url = self.get_url(test_post.pk)
        old_modified = test_post.modified
        response = authenticated_client.put(
            url, data={"title": "UPDATE Title", "body": "BODY UPDATED"}
        )
        post = Post.objects.get(pk=test_post.pk)

        assert response.status_code == 200
        assert post.title == "UPDATE Title"
        assert post.body == "BODY UPDATED"
        assert post.author == test_user
        assert old_modified != localtime(post.modified).strftime("%B %d, %Y %I:%M %p")

    def test_non_author_cannot_update(self, alternate_user, api_client, test_post):
        api_client.force_authenticate(alternate_user)
        url = self.get_url(test_post.pk)
        response = api_client.put(
            url, data={"title": "Joke Title", "body": "AHAHAHHAAHHAHAH"}
        )

        assert response.status_code == 403
