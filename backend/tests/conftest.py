import pytest
from tests.factories import CustomUserFactory, PostFactory


@pytest.fixture
def test_user(db):
    yield CustomUserFactory()


@pytest.fixture
def test_superuser(db):
    yield CustomUserFactory(email="clarke@dailyplanet.com", is_staff=True, is_superuser=True)


@pytest.fixture
def test_post(db, test_user):
    yield PostFactory(author=test_user)