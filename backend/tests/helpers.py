from PIL import Image
from io import BytesIO

from django.core.files.uploadedfile import SimpleUploadedFile
from rest_framework.test import APIClient


def generate_image_file(name="test.png"):
    image = Image.new("RGB", (100, 100))
    buffer = BytesIO()
    image.save(buffer, format="PNG")
    buffer.seek(0)
    return SimpleUploadedFile(name, buffer.getvalue(), content_type="image/png")


def standard_pagination_tests(url: str, client: APIClient, page_size: int = 6):
    """Test pagination, given a view using StandardPaginationClass"""
    all_results = []
    previous_url = None

    while url:
            response = client.get(url)
            assert response.status_code == 200

            data = response.data
            results = data["results"]
            all_results.extend(results)

            # Assert page-specific things if needed, e.g. length
            # For example, each page should have <= page size (10 in your case)
            assert  0 < len(results) <= page_size

            # Check pagination links
            next_url = data["next"]
            prev_url = data["previous"]

            # The previous url should either be None or not equal to current url
            if previous_url:
                assert prev_url is not None
            previous_url = prev_url

            url = next_url  # move to next page or exit if None

    # After fetching all pages, verify total count matches
    assert len(all_results) == data["count"]

    # Optionally, verify uniqueness of PKs across all pages
    all_pks = {item["pk"] for item in all_results}
    assert len(all_pks) == len(all_results)
    