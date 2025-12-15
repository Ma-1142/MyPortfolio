"""
MODELS.PY - Purpose: Define database structure (tables and fields)

What this file does:
- Defines the structure of your database tables
- Each class = one database table
- Each field = one column in the table
- Django automatically creates the SQL to build these tables

Key concepts:
- Model: A Python class that represents a database table
- Field: Defines the type of data stored (CharField, ImageField, etc.)
- ForeignKey: Creates a relationship between tables
- Meta class: Provides metadata about the model
- __str__: How the object appears when printed
"""

from django.db import models
from django.contrib.auth.models import User


class Category(models.Model):
    """
    Category Model - Organizes pictures into categories
    Database table: gallery_category

    Example categories: Paintings, Sculptures, Photography, Architecture
    """
    # CharField: Short text field (like VARCHAR in SQL)
    # max_length: Maximum number of characters allowed
    name = models.CharField(max_length=100)

    # TextField: Long text field (like TEXT in SQL)
    # blank=True: Optional field (can be empty)
    description = models.TextField(blank=True)

    # DateTimeField: Stores date and time
    # auto_now_add=True: Automatically set when object is created
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        # Changes "Categorys" to "Categories" in Django admin
        verbose_name_plural = "categories"

    def __str__(self):
        # How this object appears in Django admin and when printed
        # Returns the category name (e.g., "Paintings")
        return self.name


class Picture(models.Model):
    """
    Picture Model - Stores artwork/picture information
    Database table: gallery_picture

    Each picture has: title, image, price, category, artist info
    """
    # CharField: Store the picture title
    title = models.CharField(max_length=200)

    # TextField: Store longer description (optional)
    description = models.TextField(blank=True)

    # ImageField: Store image files
    # upload_to='pictures/': Save files to backend/media/pictures/
    # The database stores the PATH, not the actual image
    image = models.ImageField(upload_to='pictures/')

    # DecimalField: Store prices (better than FloatField for money)
    # max_digits=10: Total digits (e.g., 12345678.90 = 10 digits)
    # decimal_places=2: Digits after decimal (e.g., $100.00)
    price = models.DecimalField(max_digits=10, decimal_places=2)

    # ManyToManyField: Allows multiple categories per picture (up to 2)
    # related_name='pictures': Access pictures from category: category.pictures.all()
    # blank=True: Optional field (picture can have no categories)
    categories = models.ManyToManyField(
        Category,
        blank=True,
        related_name='pictures'
    )

    # Artist name (optional)
    artist = models.CharField(max_length=200, blank=True)

    # Status choices for artwork availability
    STATUS_CHOICES = [
        ('available', 'Available'),
        ('not_for_sale', 'Not For Sale'),
        ('discuss_pricing', 'Discuss Pricing'),
    ]

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='available',
        help_text="Available: price displayed. Not For Sale: price hidden. Discuss Pricing: price hidden, buyer should contact owner."
    )

    # Automatically set when picture is created
    created_at = models.DateTimeField(auto_now_add=True)

    # auto_now=True: Updates every time the picture is saved
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        # Returns the picture title in Django admin
        return self.title
