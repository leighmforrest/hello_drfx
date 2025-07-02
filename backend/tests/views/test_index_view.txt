import pytest
from django.urls import reverse, resolve
from rest_framework.test import APIClient

from apps.api.views import IndexView


pytestmark = pytest.mark.django_db


class TestIndexView:
    @property
    def url(self):
        return reverse("api:index")

    def test_authenticated_user_can_get(self, authenticated_client: APIClient):
        response = authenticated_client.get(self.url)
        assert response.status_code == 200
    
    def test_authenticated_user_content(self, authenticated_client: APIClient):
        response = authenticated_client.get(self.url)
        assert response.data['message'] == "Hello World"
    
    def test_anonymous_user_cannot_get(self, client: APIClient):
        response = client.get(self.url)
        assert response.status_code == 401
    
    def test_index_view_resolves_indexview(self):
        view = resolve("/api/")
        assert view.func.__name__ == IndexView.as_view().__name__