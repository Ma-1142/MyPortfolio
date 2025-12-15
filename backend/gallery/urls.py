"""
URLS.PY (Gallery App) - Purpose: Map URL paths to views

What this file does:
- Defines which URLs trigger which views
- Creates RESTful URL patterns automatically using Router
- Acts like a phone book: URL → View

Key concepts:
- Router: Automatically generates URLs for ViewSets
- DefaultRouter: Creates standard RESTful URL patterns
- register(): Maps a URL prefix to a ViewSet
- urlpatterns: List of URL patterns that Django will match

URL Pattern Examples:
router.register(r'pictures', PictureViewSet) creates:
- /pictures/ → List all (GET) or create new (POST)
- /pictures/1/ → Get (GET), update (PUT), or delete (DELETE) picture 1
"""

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CategoryViewSet, PictureViewSet

# Create a router that will automatically generate URL patterns
router = DefaultRouter()

# Register our ViewSets with the router
# Format: router.register(r'url-prefix', ViewSetClass)
router.register(r'categories', CategoryViewSet)  # Creates /categories/ and /categories/1/
router.register(r'pictures', PictureViewSet)     # Creates /pictures/ and /pictures/1/

# Include all the router-generated URLs
urlpatterns = [
    path('', include(router.urls)),  # '' means these URLs start at the base (defined in main urls.py)
]
