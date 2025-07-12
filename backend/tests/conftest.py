import pytest
from PIL import Image
from io import BytesIO

from rest_framework.test import APIClient, force_authenticate
from django.contrib.auth import get_user_model
from django.core.files.uploadedfile import SimpleUploadedFile

from apps.pictures.models import Picture


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
    yield User.objects.create_user("rod@example.com", "T3$TPa$$123")


@pytest.fixture
def api_client():
    yield APIClient()


@pytest.fixture
def authenticated_client(api_client, test_user):
    api_client.force_authenticate(user=test_user)
    return api_client


@pytest.fixture
def test_model_image_file():
    image = Image.new("RGB", (100, 100))
    buffer = BytesIO()
    image.save(buffer, format="png")

    yield SimpleUploadedFile("test.png", buffer.getvalue(), content_type="image/png")


@pytest.fixture
def test_text_file():
    yield SimpleUploadedFile(
        "not_an_image.txt",
        b"This is a text image. You hacker. You suck!",
        content_type="text/plain",
    )


@pytest.fixture
def test_model_picture(test_model_image_file, test_user):
    yield Picture.objects.create(
        user=test_user, title="HELLO THERE", picture=test_model_image_file
    )
