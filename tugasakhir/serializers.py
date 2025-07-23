from rest_framework import serializers
from .models import User, TugasAkhir, Seminar, Bimbingan, Penguji, Nilai

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

class TugasAkhirSerializer(serializers.ModelSerializer):
    mahasiswa = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = TugasAkhir
        fields = '__all__'

class SeminarSerializer(serializers.ModelSerializer):
    mahasiswa = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = Seminar
        fields = '__all__'

class BimbinganSerializer(serializers.ModelSerializer):
    mahasiswa = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = Bimbingan
        fields = '__all__'

class PengujiSerializer(serializers.ModelSerializer):
    mahasiswa = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = Penguji
        fields = '__all__'

# File: tugasakhir/serializers.py
class NilaiSerializer(serializers.ModelSerializer):
    nama_mahasiswa = serializers.CharField(source='mahasiswa.username', read_only=True)
    nilai = serializers.FloatField(source='nilai_akhir')

    class Meta:
        model = Nilai
        fields = ['id', 'nilai', 'keterangan', 'nama_mahasiswa']
