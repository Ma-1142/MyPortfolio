"""
SERIALIZERS.PY - Purpose: Convert Django Models to JSON and vice versa

What this file does:
- Translates Python objects (from database) into JSON format for the API
- Translates JSON data (from API requests) back into Python objects
- Like a translator between Django's database language and JavaScript's JSON language

Key concepts:
- Serializer: Converts complex data types (like Django models) to native Python datatypes
  that can then be easily rendered into JSON
- ModelSerializer: Shortcut that automatically creates serializers based on your models
- Fields: Specify which model fields should be included in the JSON response
"""

from rest_framework import serializers
from .models import Category, Picture


class CategorySerializer(serializers.ModelSerializer):
    """
    Serializer for Category model
    Converts Category objects to/from JSON
    """
    class Meta:
        model = Category  # Which model to serialize
        fields = ['id', 'name', 'description', 'created_at']  # Which fields to include


class PictureSerializer(serializers.ModelSerializer):
    """
    Serializer for Picture model
    Converts Picture objects to/from JSON

    Extra feature: Includes categories with their names
    so frontend gets both category IDs and names
    """
    # Nested serializer to include full category details
    categories = CategorySerializer(many=True, read_only=True)
    # For writing (POST/PUT), accept category IDs
    category_ids = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.all(),
        many=True,
        write_only=True,
        source='categories'
    )

    class Meta:
        model = Picture  # Which model to serialize
        fields = [  # Which fields to include in JSON response
            'id',
            'title',
            'description',
            'image',  # This becomes a full URL like: http://localhost:8000/media/pictures/image.jpg
            'price',
            'categories',  # ManyToMany - returns list of category objects
            'category_ids',  # For creating/updating - accepts list of category IDs
            'artist',
            'status',
            'created_at',
            'updated_at'
        ]
