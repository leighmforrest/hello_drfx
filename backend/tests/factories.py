import factory

from django.contrib.auth import get_user_model


CustomUser = get_user_model()


class CustomUserFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = CustomUser
        skip_postgeneration_save = True

    email = factory.Faker("email")
    password = factory.PostGenerationMethodCall("set_password", "TEstP&$$32`")
    is_staff = False
    is_superuser = False
    is_active = True
