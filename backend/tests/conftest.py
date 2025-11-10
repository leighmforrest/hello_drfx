import pytest

from rest_framework.test import APIClient
from django.core.files.uploadedfile import SimpleUploadedFile

from apps.pictures.models import Picture
from tests.helpers import generate_image_file
from tests.factories import UserFactory, PictureFactory, CommentFactory


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
    return UserFactory.create()


@pytest.fixture
def alternate_test_user(db):
    return UserFactory.create(email="scrubby@example.com", password="JEKKJEKKJEKK")


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
def test_model_picture(db, test_user):
    return PictureFactory(user=test_user)


@pytest.fixture
def test_model_pictures_paginated(db):
    return PictureFactory.create_batch(25)


@pytest.fixture
def test_model_picture_five_likes(db, test_model_picture):
    likers = UserFactory.create_batch(5)

    test_model_picture.likes.add(*likers)

    yield test_model_picture

    test_model_picture.likes.clear()


@pytest.fixture
def test_model_picture_liked_by_user(db, test_model_picture, test_user):
    test_model_picture.likes.add(test_user)

    yield test_model_picture

    test_model_picture.likes.clear()


@pytest.fixture
def test_model_picture_five_comments(db, test_model_picture: Picture):

    CommentFactory.create_batch(5, picture=test_model_picture)

    yield test_model_picture


@pytest.fixture
def test_model_picture_paginated_comments(db, test_model_picture: Picture):
    CommentFactory.create_batch(50, picture=test_model_picture)

    yield test_model_picture
