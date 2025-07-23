# File: sitaku/urls.py

from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from django.http import JsonResponse
from tugasakhir.views import (
    TugasAkhirViewSet,
    SeminarViewSet,
    BimbinganViewSet,
    PengujiViewSet,
    NilaiViewSet,
)

# Router utama
router = routers.DefaultRouter()
router.register(r'tugas-akhir', TugasAkhirViewSet, basename='tugasakhir')
router.register(r'seminar', SeminarViewSet, basename='seminar')
router.register(r'bimbingan', BimbinganViewSet, basename='bimbingan')
router.register(r'penguji', PengujiViewSet, basename='penguji')
router.register(r'nilai', NilaiViewSet, basename='nilai')

# Root view
def home(request):
    return JsonResponse({
        "message": "API aktif. Gunakan endpoint /api/ atau /auth/jwt/create/ untuk login."
    })

urlpatterns = [
    path('', home),
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),  # Semua endpoint API
    path('auth/', include('djoser.urls')),       # Untuk register & user
    path('auth/', include('djoser.urls.jwt')),   # Untuk login (JWT)
]
