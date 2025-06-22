import pytest

from rest_framework.test import APIClient, force_authenticate
from django.contrib.auth import get_user_model


User = get_user_model()


@pytest.fixture(autouse=True)
def _media_storage(settings, tmpdir):
    settings.MEDIA_ROOT = tmpdir.strpath


@pytest.fixture
def test_user():
    yield User.objects.create_user("rod@example.com", "T3$TPa$$123")

@pytest.fixture
def api_client():
    yield APIClient()


@pytest.fixture
def authenticated_client(api_client, test_user):
    api_client.force_authenticate(user=test_user)
    return api_client
