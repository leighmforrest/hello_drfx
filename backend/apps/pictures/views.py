from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.parsers import MultiPartParser, FormParser


from .models import Picture
from .serializers import PictureSerializer
from .permissions import IsOwnerOrReadOnly


class IndexView(ListCreateAPIView):
    queryset = Picture.objects.all()
    serializer_class = PictureSerializer
    parser_classes = (
        MultiPartParser,
        FormParser,
    )

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class DetailView(RetrieveUpdateDestroyAPIView):
    queryset = Picture.objects.all()
    serializer_class = PictureSerializer
    lookup_field = "pk"
    permission_classes = (IsOwnerOrReadOnly,)
