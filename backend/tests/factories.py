import factory


from apps.accounts.models import CustomUser


class CustomUserFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = CustomUser
        skip_postgeneration_save = True

    email = factory.Faker("email")
    password = factory.PostGenerationMethodCall("set_password", "Te$TPa$$123")
