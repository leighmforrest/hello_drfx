from django.conf import settings
from django.contrib import admin
from django.urls import path, include, re_path
from debug_toolbar.toolbar import debug_toolbar_urls
from dj_rest_auth.views import PasswordResetConfirmView, PasswordResetView


urlpatterns = [
    path('api/v1/auth/password_reset/',PasswordResetView.as_view(), name='password_reset'),
    path('api/v1/auth/password_reset_confirm/<uidb64>/<token>/', PasswordResetConfirmView.as_view(), name='password_reset_confirm'),    # path('api/v1/password/reset/confirm/', PasswordResetConfirmView.as_view(), name='password_reset_confirm'),
    path("admin/", admin.site.urls),
    path("api/v1/", include("apps.posts.urls")),
    path("api/v1/auth/", include("dj_rest_auth.urls")),
    path("api-auth/", include("rest_framework.urls"))
]

if settings.DEBUG:
    urlpatterns += debug_toolbar_urls()