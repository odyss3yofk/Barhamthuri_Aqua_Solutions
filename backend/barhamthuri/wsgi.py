"""
WSGI config for barhamthuri project.
"""

import os
from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'barhamthuri.settings')
application = get_wsgi_application()
