from django.shortcuts import get_object_or_404
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from apps.api.pagination import CommentsPaginationClass
from .models import Picture, Comment
from .serializers import PictureSerializer, CommentSerializer
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


class LikeView(APIView):
    permission_classes = (IsAuthenticated,)

    def _get_picture(self, pk):
        return get_object_or_404(Picture, pk=pk)

    def post(self, request, format=None, *args, **kwargs):
        user = request.user

        picture = self._get_picture(kwargs.get("pk"))

        if picture.likes.filter(pk=user.pk).exists():
            return Response(status=status.HTTP_400_BAD_REQUEST)
        
        picture.likes.add(user)
        return Response(status=status.HTTP_204_NO_CONTENT)
    
    def delete(self, request, format=None, *args, **kwargs):
        user = request.user
        picture = self._get_picture(kwargs.get("pk"))

        if picture.likes.filter(pk=user.pk).exists():
            picture.likes.remove(user)
            return Response(status=status.HTTP_204_NO_CONTENT)
        
        return Response(status=status.HTTP_400_BAD_REQUEST)


class CommentsView(ListCreateAPIView):
    serializer_class = CommentSerializer
    pagination_class = CommentsPaginationClass
    
    def get_queryset(self):
        picture_id = self.kwargs.get("pk")
        return Comment.objects.filter(picture__pk=picture_id).select_related("user", "picture")
    
    def perform_create(self, serializer):
        picture_id = self.kwargs.get("pk")
        picture = Picture.objects.get(pk=picture_id)
        serializer.save(user=self.request.user, picture=picture)
