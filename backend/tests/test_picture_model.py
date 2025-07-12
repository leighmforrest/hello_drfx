import pytest
from pathlib import Path

pytestmark = pytest.mark.django_db


class TestPictureModel:
    def test_picture_fields(self, test_model_picture, test_user):
        assert len(test_model_picture.title) > 0
        assert test_user == test_model_picture.user

    def test_picture_image_correct_path(self, test_model_picture, tmpdir):
        full_path = Path(test_model_picture.picture.path)
        media_root = Path(tmpdir)
    
        relative_path = full_path.relative_to(media_root)
        first_dir = relative_path.parts[0]
        extension = full_path.suffix

        assert extension == ".png"
        assert first_dir == "pictures"

    def test_valid_image(self, test_model_picture, tmpdir):
        full_path = Path(test_model_picture.picture.path)

        assert full_path.exists()

    def test___str__(self, test_model_picture):
        assert str(test_model_picture) == test_model_picture.title
