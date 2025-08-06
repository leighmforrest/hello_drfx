from django.core.files.uploadedfile import SimpleUploadedFile
from PIL import Image
from io import BytesIO


def generate_image_file(name="test.png"):
    image = Image.new("RGB", (100, 100))
    buffer = BytesIO()
    image.save(buffer, format="PNG")
    buffer.seek(0)
    return SimpleUploadedFile(name, buffer.getvalue(), content_type="image/png")
