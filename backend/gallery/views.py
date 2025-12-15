"""
VIEWS.PY - Purpose: Handle API requests and return responses

What this file does:
- Receives HTTP requests from the frontend (GET, POST, PUT, DELETE)
- Queries the database for data
- Uses serializers to convert data to JSON
- Sends JSON response back to frontend

Key concepts:
- ViewSet: A class that handles all CRUD operations for a model
  (list, create, retrieve, update, destroy)
- ModelViewSet: Provides default implementations of all CRUD actions
- queryset: Defines which database records to work with
- serializer_class: Which serializer to use for converting data
- permission_classes: Who is allowed to access this API
"""

from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from .models import Category, Picture
from .serializers import CategorySerializer, PictureSerializer


class CategoryViewSet(viewsets.ModelViewSet):
    """
    API endpoint for Categories

    Automatically provides:
    - GET /api/categories/ - List all categories
    - POST /api/categories/ - Create new category
    - GET /api/categories/1/ - Get specific category
    - PUT /api/categories/1/ - Update category
    - DELETE /api/categories/1/ - Delete category
    """
    queryset = Category.objects.all()  # Get all categories from database
    serializer_class = CategorySerializer  # Use CategorySerializer to convert to JSON
    permission_classes = [IsAuthenticatedOrReadOnly]  # Anyone can read, must login to write


class PictureViewSet(viewsets.ModelViewSet):
    """
    API endpoint for Pictures

    Automatically provides:
    - GET /api/pictures/ - List all pictures
    - POST /api/pictures/ - Upload new picture
    - GET /api/pictures/1/ - Get specific picture
    - PUT /api/pictures/1/ - Update picture
    - DELETE /api/pictures/1/ - Delete picture

    Extra features:
    - Filter by category: /api/pictures/?category=1
    """
    queryset = Picture.objects.all()  # Get all pictures from database
    serializer_class = PictureSerializer  # Use PictureSerializer to convert to JSON
    permission_classes = [IsAuthenticatedOrReadOnly]  # Anyone can read, must login to write

    def get_queryset(self):
        """
        Override default queryset to add filtering capability

        Example: GET /api/pictures/?category=1
        Returns only pictures in category 1
        """
        queryset = Picture.objects.all()

        # Get 'category' parameter from URL query string
        # e.g., ?category=1 returns "1"
        category = self.request.query_params.get('category', None)

        if category:
            # Filter queryset to only pictures that have this category
            queryset = queryset.filter(categories__id=category)

        return queryset
