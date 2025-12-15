"""
ADMIN.PY - Purpose: Configure Django Admin interface

What this file does:
- Registers models with Django Admin (makes them manageable via web interface)
- Customizes how models appear in the admin panel
- Adds search, filtering, and display options

Key concepts:
- @admin.register(): Decorator that registers a model with admin
- ModelAdmin: Class that customizes admin interface for a model
- list_display: Which fields to show in the list view
- search_fields: Which fields can be searched
- list_filter: Which fields can be used to filter results

Access admin at: http://localhost:8000/admin/
"""

from django.contrib import admin
from django.core.exceptions import ValidationError
from django import forms
from .models import Category, Picture


class PictureAdminForm(forms.ModelForm):
    """Custom form to limit category selection to maximum 2"""
    class Meta:
        model = Picture
        fields = '__all__'

    def clean_categories(self):
        categories = self.cleaned_data.get('categories')
        if categories and categories.count() > 2:
            raise ValidationError('You can select a maximum of 2 categories.')
        return categories

    class Media:
        js = ('admin/js/hide_select_all.js',)


@admin.register(Category)  # Register Category model with admin
class CategoryAdmin(admin.ModelAdmin):
    """
    Customize how Category appears in Django Admin

    Features:
    - Shows name and creation date in list view
    - Can search by category name
    """
    # Columns to show in the category list page
    list_display = ['name', 'created_at']

    # Fields that can be searched using the search box
    search_fields = ['name']


@admin.register(Picture)  # Register Picture model with admin
class PictureAdmin(admin.ModelAdmin):
    """
    Customize how Picture appears in Django Admin

    Features:
    - Shows key info in list view (title, artist, price, etc.)
    - Can filter by category, availability, and date
    - Can search by title or artist
    - Allows selecting up to 2 categories per picture
    """
    form = PictureAdminForm

    # Columns to show in the picture list page
    list_display = ['title', 'artist', 'price', 'get_categories', 'status', 'created_at']

    # Add filters in the right sidebar (filter by category, status, date)
    list_filter = ['categories', 'status', 'created_at']

    # Fields that can be searched using the search box
    search_fields = ['title', 'artist']

    # Use filter_horizontal for a better multi-select interface
    filter_horizontal = ['categories']

    def get_categories(self, obj):
        """Display categories as comma-separated list"""
        return ", ".join([c.name for c in obj.categories.all()])
    get_categories.short_description = 'Categories'
