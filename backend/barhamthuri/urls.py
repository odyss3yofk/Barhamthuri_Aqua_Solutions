"""
URL configuration for barhamthuri project.
"""
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('hq-control/', admin.site.urls),
    path('api/', include('api.urls')),
]

# Serve media files (uploaded product images, etc.)
# On PythonAnywhere, also configure a Static Files mapping in the Web tab:
#   URL: /media/   ->   Directory: /home/your_username/your_project/backend/media
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
