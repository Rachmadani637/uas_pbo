# Paksa gunakan PyMySQL sebagai MySQLdb
import pymysql
pymysql.install_as_MySQLdb()

import os
from pathlib import Path
from datetime import timedelta

# Base directory
BASE_DIR = Path(__file__).resolve().parent.parent

# Secret & Debug
SECRET_KEY = 'django-insecure-placeholder'
DEBUG = True
ALLOWED_HOSTS = []

# Installed apps
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    # Third-party
    'rest_framework',
    'rest_framework.authtoken',
    'corsheaders',
    'djoser',

    # Local
    'tugasakhir',
]

# Middleware
MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',  # harus paling atas
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'sitaku.urls'

# Templates
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'sitaku.wsgi.application'

# ✅ DATABASE MYSQL 8.0 (pastikan service MySQL 8.0 jalan!)
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'sistem_ta',        # Sesuaikan nama database di phpMyAdmin
        'USER': 'root',             # Atau user lain jika kamu set
        'PASSWORD': 'admin123',             # Kosongkan jika tidak pakai password
        'HOST': '127.0.0.1',
        'PORT': '3307',             # Port default MySQL 8.0
        'OPTIONS': {
            'init_command': "SET sql_mode='STRICT_TRANS_TABLES'",
        },
    }
}

# Kosongkan validasi password selama dev
AUTH_PASSWORD_VALIDATORS = []

# Bahasa & waktu
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'Asia/Jakarta'
USE_I18N = True
USE_TZ = True

# Static files
STATIC_URL = '/static/'
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# ✅ Custom user model
AUTH_USER_MODEL = 'tugasakhir.User'

# ✅ REST Framework & JWT
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ),
}

SIMPLE_JWT = {
    "AUTH_HEADER_TYPES": ("Bearer",),
    "ACCESS_TOKEN_LIFETIME": timedelta(minutes=30),
}

# ✅ Djoser config
DJOSER = {
    'USER_ID_FIELD': 'username',
    'LOGIN_FIELD': 'username',
}

# ✅ CORS (izinkan akses dari React atau frontend lokal)
CORS_ALLOW_ALL_ORIGINS = True
