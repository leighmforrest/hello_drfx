import factory
from faker import Faker

from django.contrib.auth import get_user_model

from apps.pictures.models import Picture, Comment
from .helpers import generate_image_file


User = get_user_model()
fake = Faker()


class UserFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = User

    email = factory.Faker("email")
    handle = factory.Faker("user_name")
    password = factory.django.Password("TesP&$$123")


class PictureFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Picture

    user = factory.SubFactory(UserFactory)
    title = fake.sentence(nb_words=17)
    picture = factory.django.ImageField(from_func=generate_image_file)

    @factory.post_generation
    def likes(self, create, extracted, **kwargs):
        if not create or not extracted:
            # Simple build, or nothing to add, do nothing.
            return

        # Add the iterable of likes using bulk addition
        self.likes.add(*extracted)


class CommentFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Comment

    user = factory.SubFactory(UserFactory)
    picture = factory.SubFactory(PictureFactory)
    comment = fake.paragraph(nb_sentences=10)
