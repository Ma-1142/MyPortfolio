"""
URLS.PY (Main Project) - Purpose: Main URL router for the entire Django project

What this file does:
- Acts as the main entry point for all URLs
- Delegates URLs to different apps
- Serves media files (images) in development mode

Key concepts:
- urlpatterns: Master list of all URL routes
- include(): Includes URL patterns from other apps
- static(): Helper to serve uploaded media files during development

URL Structure:
http://localhost:8000/admin/         → Django admin panel
http://localhost:8000/api/pictures/  → Gallery API (delegated to gallery/urls.py)
http://localhost:8000/media/...      → Uploaded images (served in development)

How URLs flow:
1. Request comes to http://localhost:8000/api/pictures/
2. Django checks urlpatterns in this file
3. Matches path('api/', ...)
4. Includes gallery.urls
5. Gallery app's urls.py handles the rest (/pictures/)
"""

from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    # Django admin panel: http://localhost:8000/admin/
    path('admin/', admin.site.urls),

    # API endpoints: http://localhost:8000/api/
    # All URLs starting with /api/ are handled by gallery app's urls.py
    path('api/', include('gallery.urls')),
]

# Serve media files (uploaded images) in development mode only
# In production, nginx or another web server should serve these
if settings.DEBUG:
    # Makes uploaded images accessible at http://localhost:8000/media/pictures/image.jpg
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
