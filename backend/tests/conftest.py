import pytest
from apps.accounts.models import CustomUser
from rest_framework.test import APIClient
from tests.factories import CustomUserFactory, PostFactory


@pytest.fixture
def test_user(db):
    yield CustomUserFactory()


@pytest.fixture
def alternate_user(db):
    yield CustomUserFactory()


@pytest.fixture
def test_superuser(db):
    yield CustomUserFactory(
        email="clarke@dailyplanet.com", is_staff=True, is_superuser=True
    )


@pytest.fixture
def test_post(db, test_user):
    yield PostFactory(author=test_user)


@pytest.fixture
def api_client():
    yield APIClient()


@pytest.fixture
def authenticated_client(api_client: APIClient, test_user: CustomUser):
    api_client.force_authenticate(test_user)
    yield api_client
