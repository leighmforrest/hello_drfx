import pytest
from django.contrib.auth import get_user_model


CustomUser = get_user_model()
pytestmark = pytest.mark.django_db


class TestCustomUser:
    def test_create_user(self, test_user):
        assert isinstance(test_user, CustomUser)
        assert test_user.username is None
        assert len(test_user.email) > 0
        assert len(test_user.handle) > 0
        assert test_user.is_active == True
        assert test_user.is_staff == False
        assert test_user.is_superuser == False

    def test_create_superuser(self):
        result = CustomUser.objects.create_superuser(
            "clarke@dailyplanet.com", "T3$TP&$$321", "supes"
        )
        assert result.email == "clarke@dailyplanet.com"
        assert result.handle == "supes"
        assert result.is_active == True
        assert result.is_staff == True
        assert result.is_superuser == True

    @pytest.mark.parametrize(
        "data,error",
        [
            ({}, TypeError),
            ({"email": ""}, ValueError),
            ({"email": "rod@example.com", "password": "FooBarBaz"}, ValueError),
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

    def test___str__custom_user(self, test_user):
        assert str(test_user) == test_user.email

    def test_delete_custom_user(self, test_user):
        def test_delete_custom_user(self, test_user):
            pk = test_user.pk
            test_user.delete()
            assert not CustomUser.objects.filter(pk=pk).exists()
