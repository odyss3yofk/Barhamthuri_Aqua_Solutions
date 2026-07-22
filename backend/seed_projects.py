import os
import django
import shutil
from django.core.files import File

# Setup Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'barhamthuri.settings')
django.setup()

from api.models import Project, ProjectImage

# Paths
FRONTEND_GALLERY = r"C:\Users\kulde\Desktop\BarhamthuriWebsite\frontend\public\gallery"

# Data
categoryData = {
  'commercial-ro': {
    'title': 'Commercial RO Plant Installations',
    'subtitle': 'Commercial',
    'description': 'Our commercial RO systems serve hotels, restaurants, offices, and institutions across Assam. Each installation is custom-designed to meet the specific water quality and volume requirements of the client.',
    'cover_image': 'commercial-ro-plant.jpg',
    'images': [
      {'src': 'commercial-ro-plant.jpg', 'caption': 'Hotel RO system — Guwahati'},
      {'src': 'commercial-ro-2.jpg', 'caption': 'Restaurant installation in progress'},
      {'src': 'commercial-ro-3.jpg', 'caption': 'Office water purification unit'},
      {'src': 'commercial-ro-4.jpg', 'caption': 'Control panel and piping'},
    ],
  },
  'iron-removal': {
    'title': 'Iron Removal System Setups',
    'subtitle': 'Community',
    'description': 'North East India faces severe iron contamination in groundwater. Our iron removal systems are engineered to handle iron levels up to 30 ppm, serving communities, schools, and residential areas.',
    'cover_image': 'iron-removal-system.jpg',
    'images': [
      {'src': 'iron-removal-system.jpg', 'caption': 'Community filtration plant — Bihpuria'},
      {'src': 'iron-removal-2.jpg', 'caption': 'Village water treatment system'},
      {'src': 'iron-removal-3.jpg', 'caption': 'Water quality testing on site'},
    ],
  },
  'chimney': {
    'title': 'Residential Chimney Installations',
    'subtitle': 'Residential',
    'description': 'Our premium kitchen chimney installations transform cooking spaces with powerful suction, auto-clean technology, and sleek modern design. We handle everything from ducting to final testing.',
    'cover_image': 'chimney-installation.jpg',
    'images': [
      {'src': 'chimney-installation.jpg', 'caption': 'Auto-clean chimney — Dibrugarh'},
      {'src': 'chimney-2.jpg', 'caption': 'Installation in progress'},
      {'src': 'chimney-3.jpg', 'caption': 'Premium modular kitchen setup'},
    ],
  },
  'industrial-ro': {
    'title': 'Industrial RO Units',
    'subtitle': 'Industrial',
    'description': 'Our high-capacity industrial RO plants power tea factories, food processing units, hospitals, and large institutions. PLC-based automatic operation ensures consistent water quality 24/7.',
    'cover_image': 'industrial-ro-unit.jpg',
    'images': [
      {'src': 'industrial-ro-unit.jpg', 'caption': 'Tea factory RO unit — Upper Assam'},
      {'src': 'industrial-ro-2.jpg', 'caption': 'Industrial water treatment facility'},
      {'src': 'industrial-ro-3.jpg', 'caption': 'Water output quality testing'},
    ],
  },
}

def seed_projects():
    # Clear existing data
    Project.objects.all().delete()
    print("Deleted all existing projects.")

    order = 1
    for slug, data in categoryData.items():
        print(f"Creating project: {data['title']}")
        
        project = Project(
            title=data['title'],
            slug=slug,
            subtitle=data['subtitle'],
            description=data['description'],
            order=order
        )
        
        # Add cover image
        cover_path = os.path.join(FRONTEND_GALLERY, data['cover_image'])
        if os.path.exists(cover_path):
            with open(cover_path, 'rb') as f:
                project.cover_image.save(data['cover_image'], File(f), save=False)
        else:
            print(f"Warning: Cover image not found at {cover_path}")
            
        project.save()
        
        # Add gallery images
        img_order = 1
        for img_data in data['images']:
            img_path = os.path.join(FRONTEND_GALLERY, img_data['src'])
            if os.path.exists(img_path):
                project_img = ProjectImage(
                    project=project,
                    caption=img_data['caption'],
                    order=img_order
                )
                with open(img_path, 'rb') as f:
                    project_img.image.save(img_data['src'], File(f), save=False)
                project_img.save()
                img_order += 1
            else:
                print(f"Warning: Gallery image not found at {img_path}")
        
        order += 1
        print(f"Added {img_order - 1} images for {data['title']}.")

    print("Project seeding complete!")

if __name__ == '__main__':
    seed_projects()
