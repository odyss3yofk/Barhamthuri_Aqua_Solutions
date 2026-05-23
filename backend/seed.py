import os
import django
import sys

# Set up Django environment
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'barhamthuri.settings')
django.setup()

from api.models import Product

products_data = [
  {
    "name": "AquaPure 7-Stage RO",
    "slug": "aquapure-7-stage-ro",
    "category": "DOMESTIC",
    "description": "Advanced 7-stage RO water purifier with mineral booster technology. Removes up to 99% of dissolved impurities including arsenic, fluoride, and heavy metals while retaining essential minerals. Perfect for Indian water conditions with TDS up to 2000 ppm.",
    "price": 12999,
    "specifications": "Purification Stages: 7 (Sediment, Pre-Carbon, RO Membrane, UV, UF, Post-Carbon, Mineral Booster)\nStorage Capacity: 10 Litres\nPurification Capacity: 15 Litres/Hour\nMax TDS Handling: 2000 ppm\nFilter Life: 6000 Litres\nPower Consumption: 36W\nWarranty: 1 Year Comprehensive + 3 Years on RO Membrane\nInstallation: Wall Mount / Countertop",
    "is_active": True
  },
  {
    "name": "AquaGuard UV+UF",
    "slug": "aquaguard-uv-uf",
    "category": "DOMESTIC",
    "description": "Dual purification with UV and UF technology for municipal water supply. Ideal for low TDS water where RO is not needed. Energy-efficient design with auto-shutoff and LED indicators for filter change alerts.",
    "price": 8499,
    "specifications": "Purification Technology: UV + UF Double Protection\nStorage Capacity: 7 Litres\nPurification Capacity: 20 Litres/Hour\nSuitable Water TDS: Up to 200 ppm\nUV Lamp Life: 8000 Hours\nPower Consumption: 20W\nWarranty: 1 Year Comprehensive\nInstallation: Wall Mount",
    "is_active": True
  },
  {
    "name": "Iron Shield Home",
    "slug": "iron-shield-home",
    "category": "DOMESTIC",
    "description": "Specially designed for North East India's iron-rich water. Advanced iron removal technology combined with RO+UV purification. Removes iron, manganese, and other heavy metals for crystal-clear, safe drinking water.",
    "price": 15999,
    "specifications": "Iron Removal Capacity: Up to 15 ppm\nPurification: Iron Filter + RO + UV + UF\nStorage Capacity: 12 Litres\nPurification Capacity: 12 Litres/Hour\nMax TDS Handling: 2500 ppm\nSpecial Feature: Auto-flush for iron filter\nWarranty: 2 Years Comprehensive\nInstallation: Wall Mount / Floor Stand",
    "is_active": True
  },
  {
    "name": "IndusFlow 500 LPH RO",
    "slug": "indusflow-500-lph-ro",
    "category": "INDUSTRIAL",
    "description": "Commercial-grade 500 Litres Per Hour RO plant suitable for offices, restaurants, hotels, and small-scale industries. Built with industrial-grade stainless steel frame, automatic operation, and remote monitoring capabilities.",
    "price": 125000,
    "specifications": "Output Capacity: 500 Litres/Hour\nRecovery Rate: 55-65%\nFeed Water TDS: Up to 5000 ppm\nMembrane Type: 4040 Industrial Grade\nNumber of Membranes: 2\nPump: Grundfos / CRI High-Pressure\nFrame: SS 304 Powder Coated\nWarranty: 1 Year on Parts + AMC Available",
    "is_active": True
  },
  {
    "name": "IndusFlow 1000 LPH RO",
    "slug": "indusflow-1000-lph-ro",
    "category": "INDUSTRIAL",
    "description": "High-capacity 1000 LPH reverse osmosis plant for large industries, hospitals, and institutional use. Features PLC-based automatic operation, multi-stage pre-treatment, and real-time TDS monitoring with data logging.",
    "price": 250000,
    "specifications": "Output Capacity: 1000 Litres/Hour\nRecovery Rate: 60-70%\nFeed Water TDS: Up to 8000 ppm\nMembrane Type: 4040 High-Rejection\nNumber of Membranes: 4\nControl System: PLC with HMI Touch Panel\nPre-treatment: Multi-Grade + Activated Carbon + Antiscalant\nWarranty: 1 Year Comprehensive + AMC Available",
    "is_active": True
  },
  {
    "name": "Iron Remover Plant",
    "slug": "iron-remover-plant",
    "category": "INDUSTRIAL",
    "description": "Industrial-scale iron and manganese removal system designed for North East India's challenging water conditions. Aeration-based oxidation with multi-grade sand filtration. Ideal for community water supply projects and industries.",
    "price": 85000,
    "specifications": "Capacity: 1000-5000 Litres/Hour\nIron Removal: Up to 30 ppm\nManganese Removal: Up to 5 ppm\nTechnology: Aeration + Oxidation + Filtration\nFilter Media: Birm / Manganese Greensand\nBackwash: Automatic Timed\nConstruction: FRP / MS Epoxy Coated\nWarranty: 1 Year",
    "is_active": True
  },
  {
    "name": "ChefAir 60cm Auto-Clean",
    "slug": "chefair-60cm-auto-clean",
    "category": "CHIMNEYS",
    "description": "Premium 60cm auto-clean kitchen chimney with powerful 1200 m³/hr suction. Features thermal auto-clean technology, touch control panel, LED lights, and oil collector. Perfect for Indian cooking with heavy frying and tadka.",
    "price": 14999,
    "specifications": "Size: 60 cm\nSuction Power: 1200 m³/hr\nType: Wall Mount, Filterless\nAuto-Clean: Thermal Auto-Clean with Oil Collector\nControl: Touch + Motion Sensor\nNoise Level: 58 dB\nLED Lights: 2 x Energy-Efficient LED\nWarranty: 5 Years on Motor, 1 Year Comprehensive",
    "is_active": True
  },
  {
    "name": "ChefAir 90cm Baffle",
    "slug": "chefair-90cm-baffle",
    "category": "CHIMNEYS",
    "description": "Large 90cm baffle filter chimney for spacious kitchens. Heavy-duty stainless steel baffle filters for superior oil and grease capture. Powerful 1400 m³/hr suction handles the heaviest Indian cooking with ease.",
    "price": 19999,
    "specifications": "Size: 90 cm\nSuction Power: 1400 m³/hr\nType: Wall Mount, Baffle Filter\nFilter: SS 304 Baffle Filters (Dishwasher Safe)\nControl: Push Button + Remote Control\nNoise Level: 52 dB\nLED Lights: 2 x Halogen\nWarranty: 5 Years on Motor, 2 Years Comprehensive",
    "is_active": True
  },
  {
    "name": "RO Membrane 75GPD",
    "slug": "ro-membrane-75gpd",
    "category": "SPARES",
    "description": "High-quality 75 GPD (Gallons Per Day) RO membrane compatible with most domestic water purifiers. Provides excellent TDS rejection rate of 95%+. Recommended replacement every 12-18 months for optimal performance.",
    "price": 1299,
    "specifications": "Type: Thin Film Composite (TFC)\nCapacity: 75 GPD\nTDS Rejection: 95-97%\nCompatibility: Universal - fits most domestic RO systems\nLife Span: 12-18 Months (depending on usage)\nOperating Pressure: 40-100 PSI",
    "is_active": True
  },
  {
    "name": "Sediment Filter Set",
    "slug": "sediment-filter-set",
    "category": "SPARES",
    "description": "Complete set of pre-filters including PP sediment filter and activated carbon block. Essential maintenance kit to extend RO membrane life. Recommended replacement every 3-6 months.",
    "price": 499,
    "specifications": "Set Includes: PP Sediment + Granular Activated Carbon + Carbon Block\nMicron Rating: 5 Micron (Sediment), 10 Micron (Carbon)\nCompatibility: Universal 10-inch standard housing\nLife Span: 3-6 Months\nMaterial: Food-Grade Polypropylene & Coconut Shell Carbon",
    "is_active": True
  },
  {
    "name": "UV Lamp Replacement",
    "slug": "uv-lamp-replacement",
    "category": "SPARES",
    "description": "High-intensity 11W UV lamp for water purifier UV chambers. Effectively eliminates 99.9% of bacteria, viruses, and cysts. Essential replacement to maintain purification efficacy - recommended annually.",
    "price": 899,
    "specifications": "Wattage: 11W\nType: Germicidal UV-C (254nm wavelength)\nLife Span: 8000 Hours / ~1 Year\nCompatibility: Standard 4-pin UV chamber\nEffectiveness: 99.9% bacteria & virus elimination\nCertification: ISI Marked",
    "is_active": True
  },
  {
    "name": "SMPS Adapter 24V",
    "slug": "smps-adapter-24v",
    "category": "SPARES",
    "description": "Reliable 24V 2.5A SMPS power adapter for RO water purifiers. Built-in surge protection and short-circuit safety. Compatible with most domestic RO booster pump systems.",
    "price": 649,
    "specifications": "Output: 24V DC, 2.5A\nInput: 100-240V AC, 50/60Hz\nProtection: Over-voltage, Short-circuit, Over-current\nCompatibility: Most RO booster pumps\nCertification: BIS Approved\nWarranty: 6 Months",
    "is_active": True
  }
]

for pdata in products_data:
    Product.objects.get_or_create(
        slug=pdata['slug'],
        defaults=pdata
    )

print("Database seeded with products!")
