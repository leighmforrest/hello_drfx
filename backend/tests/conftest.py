import pytest

from .factories import CustomUserFactory


@pytest.fixture
def test_user(db):
    yield CustomUserFactory()


@pytest.fixture
def test_superuser(db):
    yield CustomUserFactory(is_staff=True, is_superuser=True)
