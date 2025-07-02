from rest_framework.generics import ListAPIView


from .models import Picture
from .serializers import PictureSerializer

class IndexView(ListAPIView):
    queryset = Picture.objects.all()
    serializer_class = PictureSerializer