import pytest
from django.urls import reverse, resolve
from rest_framework.test import APIClient

from apps.pictures.views import IndexView


pytestmark = pytest.mark.django_db


class TestIndexView:
    @property
    def url(self):
        """Helper to get the view's URL."""
        return reverse("pictures:index")

    def pk_in_image_name(self, path_str, picture_pk):
        """Assert that the picture PK is embedded in the image URL."""
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
        assert any(pic["pk"] == str(test_model_picture_five_likes.pk) for pic in data)

        for datum in data:
            url = datum["picture"]
            pk = datum["pk"]
            total_likes = datum["total_likes"]
            self.pk_in_image_name(url, pk)
            # Only test for 5 likes on the specific picture
            if pk == str(test_model_picture_five_likes.pk):
                assert total_likes == 5

    def test_authenticated_user_content_all_pages(
        self, authenticated_client: APIClient, test_model_pictures_paginated
    ):
        url = self.url
        all_results = []
        previous_url = None

        while url:
            response = authenticated_client.get(url)
            assert response.status_code == 200

            data = response.data
            results = data["results"]
            all_results.extend(results)

            # Assert page-specific things if needed, e.g. length
            # For example, each page should have <= page size (6 in your case)
            assert  0 < len(results) <= 6

            # Check pagination links
            next_url = data["next"]
            prev_url = data["previous"]

            # The previous url should either be None or not equal to current url
            if previous_url:
                assert prev_url is not None
            previous_url = prev_url

            url = next_url  # move to next page or exit if None

        # After fetching all pages, verify total count matches
        assert len(all_results) == data["count"]

        # Optionally, verify uniqueness of PKs across all pages
        all_pks = {item["pk"] for item in all_results}
        assert len(all_pks) == len(all_results)

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
