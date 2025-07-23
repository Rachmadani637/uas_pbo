# File: tugasakhir/views.py

from rest_framework import viewsets, permissions
from .models import TugasAkhir, Seminar, Bimbingan, Penguji, Nilai
from .serializers import (
    TugasAkhirSerializer,
    SeminarSerializer,
    BimbinganSerializer,
    PengujiSerializer,
    NilaiSerializer,
)

# ✅ Custom permission: hanya admin/dosen atau user pemilik
class IsOwnerOrAdmin(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated

    def has_object_permission(self, request, view, obj):
        return (
            request.user.role in ['admin', 'dosen']
            or obj.mahasiswa == request.user
        )

# ✅ ViewSet Tugas Akhir
class TugasAkhirViewSet(viewsets.ModelViewSet):
    serializer_class = TugasAkhirSerializer
    permission_classes = [IsOwnerOrAdmin]

    def get_queryset(self):
        user = self.request.user
        if user.role in ['admin', 'dosen']:
            return TugasAkhir.objects.all()
        return TugasAkhir.objects.filter(mahasiswa=user)

    def perform_create(self, serializer):
        serializer.save(mahasiswa=self.request.user)

# ✅ ViewSet Seminar
class SeminarViewSet(viewsets.ModelViewSet):
    serializer_class = SeminarSerializer
    permission_classes = [IsOwnerOrAdmin]

    def get_queryset(self):
        user = self.request.user
        if user.role in ['admin', 'dosen']:
            return Seminar.objects.all()
        return Seminar.objects.filter(mahasiswa=user)

    def perform_create(self, serializer):
        serializer.save(mahasiswa=self.request.user)

# ✅ ViewSet Bimbingan
class BimbinganViewSet(viewsets.ModelViewSet):
    serializer_class = BimbinganSerializer
    permission_classes = [IsOwnerOrAdmin]

    def get_queryset(self):
        user = self.request.user
        if user.role in ['admin', 'dosen']:
            return Bimbingan.objects.all()
        return Bimbingan.objects.filter(mahasiswa=user)

    def perform_create(self, serializer):
        serializer.save(mahasiswa=self.request.user)

# ✅ ViewSet Penguji
class PengujiViewSet(viewsets.ModelViewSet):
    serializer_class = PengujiSerializer
    permission_classes = [IsOwnerOrAdmin]

    def get_queryset(self):
        user = self.request.user
        if user.role in ['admin', 'dosen']:
            return Penguji.objects.all()
        return Penguji.objects.filter(mahasiswa=user)

    def perform_create(self, serializer):
        serializer.save(mahasiswa=self.request.user)

# ✅ ViewSet Nilai
class NilaiViewSet(viewsets.ModelViewSet):
    serializer_class = NilaiSerializer
    permission_classes = [IsOwnerOrAdmin]

    def get_queryset(self):
        user = self.request.user
        if user.role in ['admin', 'dosen']:
            return Nilai.objects.all()
        return Nilai.objects.filter(mahasiswa=user)

    def perform_create(self, serializer):
        serializer.save(mahasiswa=self.request.user)
