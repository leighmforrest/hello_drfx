import uuid
from datetime import datetime
import pytest
from django.urls import reverse, resolve
from rest_framework.test import APIClient

from apps.pictures.views import CommentsView



class TestCommentsView:
    def get_url(self, pk: uuid.UUID) -> str:
        return reverse("pictures:comments", kwargs={"pk": pk})

    def test_get_picture_comments_200(self, test_model_picture_five_comments, authenticated_client: APIClient):
        url = self.get_url(test_model_picture_five_comments.pk)
        response = authenticated_client.get(url)

        assert response.status_code == 200
    
    def test_get_picture_comments_five_comments_data(self, test_model_picture_five_comments, authenticated_client: APIClient):
        url = self.get_url(test_model_picture_five_comments.pk)
        response = authenticated_client.get(url)

        results = response.data["results"]
        assert len(results) == 5

        for result in results:
            assert len(result["comment"]) > 0
            assert len(result["user"]["handle"]) > 0
            assert datetime.fromisoformat(result["created"]) is not None
    

    def test_get_picture_post_new_comment_201(self, test_model_picture_five_comments, authenticated_client: APIClient, test_user):
        url = self.get_url(test_model_picture_five_comments.pk)
        response = authenticated_client.post(url, {"comment": "Gunter Glieben Glauten Globen"})

        assert response.status_code == 201


    def test_get_picture_post_new_comment_data(self, test_model_picture_five_comments, authenticated_client: APIClient, test_user):
        url = self.get_url(test_model_picture_five_comments.pk)
        response = authenticated_client.post(url, {"comment": "Gunter Glieben Glauten Globen"})

        response_data = response.data

        assert response_data["comment"] == "Gunter Glieben Glauten Globen"
        assert test_user.handle == response_data["user"]["handle"]
    
    def test_anonymous_user_cannot_get(self, test_model_picture_five_comments, api_client: APIClient):
        url = self.get_url(test_model_picture_five_comments.pk)
        response = api_client.get(url)
        
        assert response.status_code == 401


    def test_index_view_resolves_commentsview(self, test_model_picture_five_comments):
        view = resolve(f"/api/{test_model_picture_five_comments.pk}/comments")
        assert view.func.__name__ == CommentsView.as_view().__name__

