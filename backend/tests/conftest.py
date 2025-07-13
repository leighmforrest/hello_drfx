import pytest

from rest_framework.test import APIClient
from django.contrib.auth import get_user_model
from django.core.files.uploadedfile import SimpleUploadedFile

from apps.pictures.models import Picture
from tests.helpers import generate_image_file


User = get_user_model()


@pytest.fixture(autouse=True)
def _media_storage(settings, tmpdir):
    settings.S3 = False  # keep this if needed elsewhere

    settings.STORAGES = {
        "default": {
            "BACKEND": "django.core.files.storage.FileSystemStorage",
        },
        "staticfiles": {
            "BACKEND": "django.contrib.staticfiles.storage.StaticFilesStorage",
        },
    }
    settings.MEDIA_ROOT = tmpdir.strpath


@pytest.fixture
def test_user(db):
    return User.objects.create_user("rod@example.com", "T3$TPa$$123")


@pytest.fixture
def alternate_test_user(db):
    return User.objects.create_user("scrubby@example.com", "T3$TPa$$123")



@pytest.fixture
def api_client():
    yield APIClient()


@pytest.fixture
def authenticated_client(api_client, test_user):
    api_client.force_authenticate(user=test_user)
    return api_client


@pytest.fixture
def alt_authenticated_client(api_client, alternate_test_user):
    api_client.force_authenticate(user=alternate_test_user)
    return api_client


@pytest.fixture(scope="function")
def test_model_image_file():
    yield generate_image_file("test.png")


@pytest.fixture
def test_text_file():
    yield SimpleUploadedFile(
        "not_an_image.txt",
        b"This is a text image. You hacker. You suck!",
        content_type="text/plain",
    )


@pytest.fixture
def test_model_picture(test_model_image_file, test_user):
    picture = Picture(user=test_user, title="HELLO THERE")
    picture.picture.save("test.png", test_model_image_file, save=True)
    return picture
