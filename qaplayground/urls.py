"""
Main URL Configuration for QA Playground.
"""
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('playground.urls')),
]
