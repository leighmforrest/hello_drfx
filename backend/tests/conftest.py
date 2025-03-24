import pytest
from .factories import CustomUserFactory


@pytest.fixture(autouse=True)
def _media_storage(settings, tmpdir):
    settings.MEDIA_ROOT = tmpdir.strpath


@pytest.fixture
def test_user(db):
    yield CustomUserFactory()
