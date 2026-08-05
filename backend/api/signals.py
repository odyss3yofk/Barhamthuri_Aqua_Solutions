import os
from django.db.models.signals import post_delete, pre_save
from django.dispatch import receiver
from .models import Product, Project, ProjectImage

def delete_file_if_exists(file_field):
    if file_field and hasattr(file_field, 'path') and os.path.isfile(file_field.path):
        os.remove(file_field.path)

# --- Auto-delete on object deletion ---

@receiver(post_delete, sender=Product)
def auto_delete_product_image_on_delete(sender, instance, **kwargs):
    delete_file_if_exists(instance.image)

@receiver(post_delete, sender=Project)
def auto_delete_project_cover_on_delete(sender, instance, **kwargs):
    delete_file_if_exists(instance.cover_image)

@receiver(post_delete, sender=ProjectImage)
def auto_delete_project_image_on_delete(sender, instance, **kwargs):
    delete_file_if_exists(instance.image)

# --- Auto-delete old file on object update ---

@receiver(pre_save, sender=Product)
def auto_delete_product_image_on_change(sender, instance, **kwargs):
    if not instance.pk:
        return False
    try:
        old_file = Product.objects.get(pk=instance.pk).image
    except Product.DoesNotExist:
        return False
    
    new_file = instance.image
    if old_file and old_file != new_file:
        delete_file_if_exists(old_file)

@receiver(pre_save, sender=Project)
def auto_delete_project_cover_on_change(sender, instance, **kwargs):
    if not instance.pk:
        return False
    try:
        old_file = Project.objects.get(pk=instance.pk).cover_image
    except Project.DoesNotExist:
        return False
    
    new_file = instance.cover_image
    if old_file and old_file != new_file:
        delete_file_if_exists(old_file)

@receiver(pre_save, sender=ProjectImage)
def auto_delete_project_image_on_change(sender, instance, **kwargs):
    if not instance.pk:
        return False
    try:
        old_file = ProjectImage.objects.get(pk=instance.pk).image
    except ProjectImage.DoesNotExist:
        return False
    
    new_file = instance.image
    if old_file and old_file != new_file:
        delete_file_if_exists(old_file)
