import pytest
from pathlib import Path
from django.urls import reverse, resolve
from rest_framework.test import APIClient

from apps.pictures.views import IndexView


pytestmark = pytest.mark.django_db


class TestIndexView:
    @property
    def url(self):
        """
        Helper to get the view's url.
        """
        return reverse("pictures:index")

    def pk_in_image_name(self, path_str, picture_pk):
        """
        Assert that the picture PK is embedded in the uploaded image url.
        """
        assert str(picture_pk) in str(path_str)

    def test_authenticated_user_can_get(self, authenticated_client: APIClient):
        response = authenticated_client.get(self.url)
        assert response.status_code == 200

    def test_authenticated_user_content(
        self, authenticated_client: APIClient, test_model_picture
    ):
        response = authenticated_client.get(self.url)
        data = response.data

        assert isinstance(data, list)
        assert any(pic["pk"] == str(test_model_picture.pk) for pic in data)

        for datum in data:
            url = datum["picture"]
            pk = datum["pk"]
            self.pk_in_image_name(url, pk)

    def test_authenticated_upload_image(
        self, authenticated_client: APIClient, test_model_image_file, test_user
    ):
        response = authenticated_client.post(
            self.url,
            data={"title": "lorem ipsum", "picture": test_model_image_file},
            format="multipart",
        )

        data = response.data

        assert test_user.email in data["user"]["email"]
        assert test_user.pk == data["user"]["pk"]
        assert data["title"] == "lorem ipsum"
        self.pk_in_image_name(data["picture"], data["pk"])

    def test_authenticated_upload_image_fail_no_title(
        self, authenticated_client: APIClient, test_model_image_file, test_user
    ):
        response = authenticated_client.post(
            self.url,
            data={"picture": test_model_image_file},
            format="multipart",
        )

        assert response.status_code == 400
        assert "this field is required." in str(response.data["title"][0]).lower()

        
    def test_upload_fail_invalid_image(self, authenticated_client, test_text_file):
        response = authenticated_client.post(
            self.url,
            data={"title": "lorem ipsum", "picture": test_text_file},
            format="multipart",
        )

        data = response.data
        assert response.status_code == 400
        assert "valid image" in str(data["picture"][0]).lower()


    def test_anonymous_user_cannot_get(self, client: APIClient):
        response = client.get(self.url)
        assert response.status_code == 401

    def test_index_view_resolves_indexview(self):
        view = resolve("/api/")
        assert view.func.__name__ == IndexView.as_view().__name__
