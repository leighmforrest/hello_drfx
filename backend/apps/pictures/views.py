from rest_framework.generics import ListCreateAPIView
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.parsers import MultiPartParser, FormParser


from .models import Picture
from .serializers import PictureSerializer


class IndexView(ListCreateAPIView):
    queryset = Picture.objects.all()
    serializer_class = PictureSerializer
    parser_classes = (
        MultiPartParser,
        FormParser,
    )

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)