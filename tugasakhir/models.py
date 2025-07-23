from django.contrib.auth.models import AbstractUser
from django.db import models

# ============================
# Inheritance (User Kustom)
class User(AbstractUser):
    ROLE_CHOICES = [
        ('mahasiswa', 'Mahasiswa'),
        ('dosen', 'Dosen'),
        ('admin', 'Admin'),
    ]
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='mahasiswa')

    def __str__(self):
        return f"{self.username} ({self.role})"
# ============================


# ============================
# Encapsulation - Tugas Akhir
class TugasAkhir(models.Model):
    STATUS_CHOICES = [
        ('diajukan', 'Diajukan'),
        ('disetujui', 'Disetujui'),
        ('revisi', 'Revisi'),
        ('ditolak', 'Ditolak'),
    ]
    mahasiswa = models.ForeignKey(User, on_delete=models.CASCADE)
    judul = models.CharField(max_length=200)
    proposal = models.FileField(upload_to='proposals/', null=True, blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='diajukan')
    tanggal_pengajuan = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.judul} - {self.status}"
# ============================


# ============================
# Seminar
class Seminar(models.Model):
    mahasiswa = models.ForeignKey(User, on_delete=models.CASCADE)
    tanggal = models.DateTimeField()
    tempat = models.CharField(max_length=100)
    status = models.CharField(max_length=50, default='menunggu')  # Default agar tidak error

    def __str__(self):
        return f"Seminar {self.mahasiswa.username} - {self.status}"
# ============================


# ============================
# Bimbingan
class Bimbingan(models.Model):
    mahasiswa = models.ForeignKey(User, on_delete=models.CASCADE)
    tanggal = models.DateTimeField(auto_now_add=True)  # Auto tanggal saat dibuat
    catatan = models.TextField()
    status = models.CharField(max_length=50, default='diajukan')  # Default supaya tidak wajib dikirim dari frontend

    def __str__(self):
        return f"Bimbingan {self.mahasiswa.username} - {self.status}"
# ============================


# ============================
# Proposal
class Proposal(models.Model):
    mahasiswa = models.ForeignKey(User, on_delete=models.CASCADE)
    file = models.FileField(upload_to='proposal/')
    status = models.CharField(max_length=50, default='diajukan')

    def __str__(self):
        return f"Proposal {self.mahasiswa.username} - {self.status}"
# ============================


# ============================
# Penguji
class Penguji(models.Model):
    mahasiswa = models.ForeignKey(User, on_delete=models.CASCADE)
    dosen = models.CharField(max_length=100)

    def __str__(self):
        return f"Penguji {self.dosen} untuk {self.mahasiswa.username}"
# ============================


# ============================
# Nilai
class Nilai(models.Model):
    mahasiswa = models.ForeignKey(User, on_delete=models.CASCADE)
    nilai_akhir = models.FloatField()
    keterangan = models.CharField(max_length=100)

    def __str__(self):
        return f"Nilai {self.mahasiswa.username} - {self.nilai_akhir}"
# ============================
