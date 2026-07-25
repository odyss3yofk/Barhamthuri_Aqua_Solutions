import os
from io import BytesIO
from PIL import Image
from django.core.files.uploadedfile import InMemoryUploadedFile, UploadedFile

def compress_image(image_field, max_width=1920):
    """
    Compresses an uploaded image to WebP format and resizes it if it exceeds max_width.
    Only processes newly uploaded files.
    """
    if not image_field:
        return image_field

    # Check if the file is a new upload. If it's already saved, it will be a FieldFile, not an UploadedFile.
    if not getattr(image_field, 'file', None) or not isinstance(image_field.file, UploadedFile):
        return image_field

    try:
        # Open image using Pillow
        img = Image.open(image_field)
        
        # Ensure image is in a compatible mode for WebP
        if img.mode in ("RGBA", "P"):
            img = img.convert("RGBA")
        elif img.mode != "RGB":
            img = img.convert("RGB")
            
        # Resize if width is larger than max_width
        if img.width > max_width:
            ratio = max_width / img.width
            new_height = int(img.height * ratio)
            img = img.resize((max_width, new_height), Image.Resampling.LANCZOS)

        # Save to BytesIO in WebP format
        output = BytesIO()
        img.save(output, format='WEBP', quality=80)
        output.seek(0)
        
        # Update filename extension
        file_name = os.path.splitext(image_field.name)[0] + '.webp'
        
        # Return new InMemoryUploadedFile
        return InMemoryUploadedFile(
            output,
            'ImageField',
            file_name,
            'image/webp',
            output.tell(),
            None
        )
    except Exception as e:
        print(f"Error compressing image: {e}")
        # Return original field if compression fails
        return image_field
