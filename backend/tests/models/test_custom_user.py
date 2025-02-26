import pytest
from django.contrib.auth import get_user_model


CustomUser = get_user_model()


pytestmark = pytest.mark.django_db

class TestCustomUser:
    def test_user_created(self, test_user):
        assert isinstance(test_user, CustomUser)
        assert len(test_user.email) > 0
        assert test_user.is_active
        assert not test_user.is_staff
        assert not test_user.is_superuser
    
    def test_create_user(self):
        result = CustomUser.objects.create_user(email="testuser@example.com", password="P&$$W3rd123")
        assert result.email == "testuser@example.com"
    
    def test_create_superuser(self):
        result = CustomUser.objects.create_superuser(email="clarke@dailyplanet.com", password="P&$$W3rd123")
        assert result.email == "clarke@dailyplanet.com"


    def test_superuser_created(self, test_superuser):
        assert isinstance(test_superuser, CustomUser)
        assert len(test_superuser.email) > 0
        assert test_superuser.is_active
        assert test_superuser.is_staff
        assert test_superuser.is_superuser

    @pytest.mark.parametrize(
        "data,error",
        [
            ({}, TypeError),
            ({"email": ""}, TypeError),
            ({"email": "", "password": "FooBarBa$$"}, ValueError),
        ],
    )
    def test_create_user_errors(self, data, error):
        with pytest.raises(error):
            CustomUser.objects.create_user(**data)

    @pytest.mark.parametrize(
        "data,error",
        [
            (
                {
                    "email": "clarke@dailyplanet.com",
                    "password": "FooBarBa$$",
                    "is_staff": False,
                },
                ValueError,
            ),
            (
                {
                    "email": "clarke@dailyplanet.com",
                    "password": "FooBarBa$$",
                    "is_superuser": False,
                },
                ValueError,
            ),
        ],
    )
    def test_create_superuser_errors(self, data, error):
        with pytest.raises(error):
            CustomUser.objects.create_superuser(**data)

    def test___str__(self, test_user):
        assert str(test_user) == test_user.email
