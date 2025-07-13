import uuid 

from django.urls import reverse

from apps.pictures.models import Picture
from tests.helpers import generate_image_file

class TestDetailView:
    def get_url(self, pk: uuid.UUID) -> str:
        return reverse("pictures:detail", kwargs={'pk': pk})
    
    def test_get_picture_200(self, test_model_picture, authenticated_client):
        url = self.get_url(test_model_picture.pk)
        response = authenticated_client.get(url)

        assert response.status_code == 200
    
    def test_put_owner_returns_200(self, authenticated_client, test_model_picture):
        url = self.get_url(test_model_picture.pk)
        image_file = generate_image_file()
        response = authenticated_client.put(
            url,
            data={"title": "lorem ipsum hahah", "picture": image_file},
            format="multipart",
        )
        print(response.data)
        assert response.status_code == 200
        assert response.data["title"] == "lorem ipsum hahah"
        assert str(test_model_picture.pk) in response.data["picture"]
    
    def test_patch_title_owner_returns_200(self, authenticated_client, test_model_picture):
        url = self.get_url(test_model_picture.pk)
        response = authenticated_client.patch(
            url,
            data={"title": "lorem ipsum patch"},
        )

        assert response.status_code == 200
        assert response.data["title"] == "lorem ipsum patch"
    
    def test_delete_picture_204(self, test_model_picture, authenticated_client):
        pk = test_model_picture.pk
        url = self.get_url(pk)
        response = authenticated_client.delete(url)

        assert response.status_code == 204

        assert not Picture.objects.filter(pk=pk).exists()

    
    def test_anonymous_cannot_get_401(self, test_model_picture, client):
        url = self.get_url(test_model_picture.pk)
        response = client.get(url)

        assert response.status_code == 401
    
    def test_get_picture_nonexistant_404(self, authenticated_client):
        url = self.get_url(uuid.uuid4())
        response = authenticated_client.get(url)

        assert response.status_code == 404
    
    def test_put_non_owner_returns_403(self, alt_authenticated_client, test_model_picture, test_model_image_file):
        url = self.get_url(test_model_picture.pk)
        response = alt_authenticated_client.put(
            url,
            data={"title": "lorem ipsum hahah", "picture": test_model_image_file},
            format="multipart",
        )

        assert response.status_code == 403
    
    def test_delete_non_owner_returns_403(self, alt_authenticated_client, test_model_picture, test_model_image_file):
        pk =test_model_picture.pk
        url = self.get_url(pk)
        response = alt_authenticated_client.delete(url)

        assert response.status_code == 403
        assert Picture.objects.filter(pk=pk).exists()
