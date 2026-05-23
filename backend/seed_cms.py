import os
import django
import sys

sys.path.append(os.path.dirname(os.path.abspath(__file__)))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'barhamthuri.settings')
django.setup()

from api.models import SiteSetting, Milestone, CoreValue

# Default Site Settings
SiteSetting.objects.get_or_create(
    key='hero_headline',
    defaults={'value': 'Pure Water, Healthy Life'}
)
SiteSetting.objects.get_or_create(
    key='hero_subheadline',
    defaults={'value': 'We provide state-of-the-art water purification systems for homes, businesses, and industries across Assam.'}
)
SiteSetting.objects.get_or_create(
    key='contact_phone',
    defaults={'value': '+91 8753953744'}
)
SiteSetting.objects.get_or_create(
    key='contact_email',
    defaults={'value': 'info@barhamthuriaquasolutions.com'}
)
SiteSetting.objects.get_or_create(
    key='contact_address',
    defaults={'value': 'Ward-4, Bihpuria, Lakhimpur, Assam 784161, India'}
)

# Default Milestones
milestones = [
    {"year": "2015", "title": "Company Founded", "description": "Started our journey in Assam."},
    {"year": "2018", "title": "1000+ Installations", "description": "Reached our first major milestone of satisfied customers."},
    {"year": "2021", "title": "Industrial Expansion", "description": "Started providing large-scale RO plants."},
    {"year": "2024", "title": "State-wide Reach", "description": "Now serving customers across all of Assam."}
]

for m in milestones:
    Milestone.objects.get_or_create(year=m['year'], defaults={'title': m['title'], 'description': m['description']})

# Default Core Values
values = [
    {"title": "Quality", "description": "We never compromise on the quality of our purifiers."},
    {"title": "Service", "description": "24/7 dedicated customer support and maintenance."},
    {"title": "Health", "description": "Ensuring the best water quality for your family's health."}
]

for v in values:
    CoreValue.objects.get_or_create(title=v['title'], defaults={'description': v['description']})

print("CMS successfully seeded!")
