import os
from django.conf import settings
from django.core.management.base import BaseCommand
from api.models import Product, Project, ProjectImage

class Command(BaseCommand):
    help = 'Cleans up orphaned media files that are no longer referenced by the database'

    def handle(self, *args, **options):
        # 1. Get all valid file paths from DB
        valid_paths = set()
        
        for p in Product.objects.all():
            if p.image and hasattr(p.image, 'path'):
                valid_paths.add(p.image.path)
                
        for p in Project.objects.all():
            if p.cover_image and hasattr(p.cover_image, 'path'):
                valid_paths.add(p.cover_image.path)
                
        for pi in ProjectImage.objects.all():
            if pi.image and hasattr(pi.image, 'path'):
                valid_paths.add(pi.image.path)
                
        # 2. Walk through media directory
        media_root = settings.MEDIA_ROOT
        deleted_count = 0
        
        self.stdout.write(f"Scanning {media_root} for orphaned files...")
        
        if not os.path.exists(media_root):
            self.stdout.write(self.style.WARNING("Media root does not exist yet. Nothing to clean."))
            return
            
        for root, dirs, files in os.walk(media_root):
            for file_name in files:
                file_path = os.path.join(root, file_name)
                
                # Only clean files in products and projects folders to be safe
                if 'products' in file_path or 'projects' in file_path:
                    if file_path not in valid_paths:
                        self.stdout.write(self.style.WARNING(f"Deleting orphaned file: {file_path}"))
                        os.remove(file_path)
                        deleted_count += 1
                        
        self.stdout.write(self.style.SUCCESS(f"Cleanup complete. Deleted {deleted_count} orphaned files."))
