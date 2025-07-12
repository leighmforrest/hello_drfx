import pytest
from django.contrib.auth import get_user_model


CustomUser = get_user_model()
pytestmark = pytest.mark.django_db


class TestCustomUser:
    def test_create_user(self, test_user):
        assert isinstance(test_user, CustomUser)
        assert test_user.username is None
        assert test_user.email == "rod@example.com"
        assert test_user.is_active == True
        assert test_user.is_staff == False
        assert test_user.is_superuser == False

    def test_create_superuser(self):
        result = CustomUser.objects.create_superuser(
            "clarke@dailyplanet.com", "T3$TP&$$321"
        )
        assert result.email == "clarke@dailyplanet.com"
        assert result.is_active == True
        assert result.is_staff == True
        assert result.is_superuser == True

    @pytest.mark.parametrize(
        "data,error",
        [
            ({}, TypeError),
            ({"email": ""}, TypeError),
            ({"email": "", "password": "FooBarBaz"}, ValueError),
        ],
    )
    def test_errors_raised(self, data, error):
        with pytest.raises(error):
            CustomUser.objects.create_user(**data)

    @pytest.mark.parametrize(
        "data",
        [
            {
                "email": "clarke@dailyplanet.com",
                "password": "T3$TPa$$123",
                "is_superuser": False,
            },
            {
                "email": "clarke@dailyplanet.com",
                "password": "T3$TPa$$123",
                "is_staff": False,
            },
        ],
    )
    def test_superuser_errors_raised(self, data):
        with pytest.raises(ValueError):
            CustomUser.objects.create_superuser(**data)
