import pytest
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
        data = response.data["results"]

        assert isinstance(data, list)
        assert any(pic["pk"] == str(test_model_picture.pk) for pic in data)

        for datum in data:
            url = datum["picture"]
            pk = datum["pk"]
            total_likes = datum["total_likes"]
            self.pk_in_image_name(url, pk)
            assert total_likes == 0

        def test_authenticated_user_content_five_likes(
            self, authenticated_client: APIClient, test_model_picture_five_likes
        ):
            response = authenticated_client.get(self.url)
            data = response.data["results"]

            assert isinstance(data, list)
            assert any(pic["pk"] == str(test_model_picture.pk) for pic in data)

            for datum in data:
                url = datum["picture"]
                pk = datum["pk"]
                total_likes = datum["total_likes"]
                self.pk_in_image_name(url, pk)
                assert total_likes == 5

    def test_authenticated_user_content_paginated(
        self, authenticated_client: APIClient, test_model_pictures_paginated
    ):
        response = authenticated_client.get(self.url)
        assert response.status_code == 200

        count = response.data["count"]
        results = response.data["results"]
        next_url = response.data["next"]
        previous_url = response.data["previous"]

        assert count == 12
        assert isinstance(results, list)
        assert len(results) == 6

        assert previous_url is None

        assert next_url is not None

        assert "limit=" in next_url
        assert "offset=" in next_url

        # Follow the next page link and test
        next_response = authenticated_client.get(next_url)
        assert next_response.status_code == 200
        next_results = next_response.data["results"]
        next_previous_url = next_response.data["previous"]

        assert next_response.data["next"] is None
        assert next_previous_url is not None
        assert len(next_results) == 6

        # You can also test that items are different between pages (if you want)
        first_page_pks = {item["pk"] for item in results}
        second_page_pks = {item["pk"] for item in next_results}
        assert not first_page_pks.intersection(second_page_pks)

    def test_authenticated_upload_image(
        self, authenticated_client: APIClient, test_model_image_file, test_user
    ):
        response = authenticated_client.post(
            self.url,
            data={"title": "lorem ipsum", "picture": test_model_image_file},
            format="multipart",
        )

        data = response.data

        assert test_user.handle in data["user"]["handle"]
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

    def test_anonymous_user_cannot_upload_user(
        self, client: APIClient, test_model_image_file
    ):
        response = client.post(
            self.url,
            data={"title": "lorem ipsum", "picture": test_model_image_file},
            format="multipart",
        )
        assert response.status_code == 401

    def test_index_view_resolves_indexview(self):
        view = resolve("/api/")
        assert view.func.__name__ == IndexView.as_view().__name__
