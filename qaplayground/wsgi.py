"""
WSGI config for QA Playground project.
"""
import os
from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'qaplayground.settings')
application = get_wsgi_application()
