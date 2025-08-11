import uuid

from django.urls import reverse
from rest_framework.test import APIClient

from apps.pictures.models import Picture


class TestDetailView:
    def get_url(self, pk: uuid.UUID) -> str:
        return reverse("pictures:like", kwargs={"pk": pk})
    
    def test_post_like_picture_success(self, test_model_picture: Picture, test_user, authenticated_client: APIClient):
        url = self.get_url(test_model_picture.pk)
        response = authenticated_client.post(url)

        assert response.status_code == 204
        assert test_model_picture.likes.contains(test_user)

    def test_post_like_picture_fail(self, test_model_picture_liked_by_user: Picture, test_user, authenticated_client: APIClient):
        url = self.get_url(test_model_picture_liked_by_user.pk)
        response = authenticated_client.post(url)

        assert response.status_code == 400
        assert test_model_picture_liked_by_user.likes.contains(test_user)
    
    def test_post_unauthenticated_fail(self, test_model_picture: Picture, client):
        url = self.get_url(test_model_picture.pk)
        response = client.post(url)

        assert response.status_code == 401

    def test_delete_like_picture_success(self, test_model_picture_liked_by_user: Picture, test_user, authenticated_client: APIClient):
        url = self.get_url(test_model_picture_liked_by_user.pk)
        response = authenticated_client.delete(url)

        assert response.status_code == 204
        assert not test_model_picture_liked_by_user.likes.contains(test_user)

    def test_delete_like_picture_fail(self, test_model_picture: Picture, test_user, authenticated_client: APIClient):
        url = self.get_url(test_model_picture.pk)
        response = authenticated_client.delete(url)

        assert response.status_code == 400
        assert not test_model_picture.likes.contains(test_user)

    def test_delete_unauthenticated_fail(self, test_model_picture: Picture, client):
        url = self.get_url(test_model_picture.pk)
        response = client.delete(url)

        assert response.status_code == 401