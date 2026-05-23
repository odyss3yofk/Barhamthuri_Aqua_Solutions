from django.core.management.base import BaseCommand
from api.models import Product, Category


class Command(BaseCommand):
    help = 'Seeds the database with sample products for Barhamthuri Aqua Solutions'

    def handle(self, *args, **options):
        self.stdout.write(self.style.NOTICE('Seeding database with sample products...'))

        products = [
            # ── DOMESTIC PURIFIERS ──────────────────────────────────
            {
                'name': 'Barhamthuri AquaPure 7-Stage RO+UV+UF',
                'slug': 'aquapure-7-stage-ro-uv-uf',
                'category': Category.DOMESTIC,
                'description': (
                    'Advanced 7-stage water purification system designed for Indian households. '
                    'Combines RO, UV, and UF technologies to remove dissolved impurities, bacteria, '
                    'and viruses. Features a mineral cartridge that adds essential minerals back into '
                    'purified water. Ideal for borewell and municipal water sources in Assam.'
                ),
                'specifications': {
                    'Purification Technology': 'RO + UV + UF + Mineral Cartridge',
                    'Storage Capacity': '10 Litres',
                    'Purification Rate': '15 Litres/Hour',
                    'TDS Range': 'Up to 2000 ppm',
                    'Power Consumption': '60 Watts',
                    'Dimensions': '38 x 26 x 50 cm',
                    'Warranty': '1 Year Comprehensive',
                    'Filter Life': '6000 Litres / 6 Months',
                },
                'price': 12999.00,
            },
            {
                'name': 'Barhamthuri CrystalFlow RO+UV Table Top',
                'slug': 'crystalflow-ro-uv-table-top',
                'category': Category.DOMESTIC,
                'description': (
                    'Compact table-top water purifier perfect for small kitchens and rental homes. '
                    'Features 5-stage RO+UV purification with an 8-litre storage tank. '
                    'Easy to install without drilling. Sleek design with LED indicators for filter '
                    'change and UV alert.'
                ),
                'specifications': {
                    'Purification Technology': 'RO + UV',
                    'Storage Capacity': '8 Litres',
                    'Purification Rate': '12 Litres/Hour',
                    'TDS Range': 'Up to 1500 ppm',
                    'Power Consumption': '45 Watts',
                    'Dimensions': '33 x 23 x 45 cm',
                    'Warranty': '1 Year',
                    'Installation': 'Table Top / Wall Mount',
                },
                'price': 8999.00,
            },
            {
                'name': 'Barhamthuri NaturalPure Gravity-Based UF',
                'slug': 'naturalpure-gravity-based-uf',
                'category': Category.DOMESTIC,
                'description': (
                    'Non-electric gravity-based water purifier ideal for areas with low TDS water '
                    'and frequent power cuts. Uses advanced UF membrane to remove bacteria and cysts '
                    'without electricity. Perfect for municipal water supply in Guwahati and other '
                    'cities in Assam.'
                ),
                'specifications': {
                    'Purification Technology': 'UF + Activated Carbon',
                    'Storage Capacity': '16 Litres',
                    'Purification Rate': '3 Litres/Hour',
                    'TDS Range': 'Up to 500 ppm (Low TDS only)',
                    'Power Required': 'No Electricity Needed',
                    'Dimensions': '28 x 28 x 52 cm',
                    'Warranty': '6 Months',
                    'Filter Life': '4000 Litres / 4 Months',
                },
                'price': 3499.00,
            },

            # ── INDUSTRIAL RO SYSTEMS ──────────────────────────────
            {
                'name': 'Barhamthuri IndusFlow 500 LPH Commercial RO',
                'slug': 'indusflow-500-lph-commercial-ro',
                'category': Category.INDUSTRIAL,
                'description': (
                    '500 Litres Per Hour commercial-grade RO plant suitable for schools, offices, '
                    'restaurants, and small industries. Built with SS304 frame and FRP membrane '
                    'housings. Includes pre-treatment with sediment and carbon filters, antiscalant '
                    'dosing system, and auto-flush mechanism.'
                ),
                'specifications': {
                    'Capacity': '500 LPH',
                    'Membrane': '4040 FRP Membrane x 2',
                    'Feed Water TDS': 'Up to 5000 ppm',
                    'Recovery Rate': '50-60%',
                    'Power Consumption': '1.5 HP Pump',
                    'Frame Material': 'SS304 Stainless Steel',
                    'Pre-Treatment': 'Sediment + Carbon + Antiscalant Dosing',
                    'Warranty': '1 Year on Pump & Frame',
                },
                'price': 85000.00,
            },
            {
                'name': 'Barhamthuri IndusFlow 1000 LPH Industrial RO',
                'slug': 'indusflow-1000-lph-industrial-ro',
                'category': Category.INDUSTRIAL,
                'description': (
                    'High-capacity 1000 LPH industrial reverse osmosis plant for factories, '
                    'hospitals, housing complexes, and water bottling units. Features multi-stage '
                    'pre-filtration, high-rejection membranes, and PLC-based automatic operation. '
                    'Designed to handle the high iron content found in Assam groundwater.'
                ),
                'specifications': {
                    'Capacity': '1000 LPH',
                    'Membrane': '4040 FRP Membrane x 4',
                    'Feed Water TDS': 'Up to 7500 ppm',
                    'Recovery Rate': '55-65%',
                    'Power Consumption': '3 HP Pump',
                    'Frame Material': 'SS304 Stainless Steel',
                    'Pre-Treatment': 'Iron Removal + Sediment + Carbon + Softener + Antiscalant',
                    'Control': 'PLC-based Auto Operation',
                    'Warranty': '1 Year Comprehensive',
                },
                'price': 175000.00,
            },
            {
                'name': 'Barhamthuri IndusFlow 250 LPH Mini Commercial RO',
                'slug': 'indusflow-250-lph-mini-commercial-ro',
                'category': Category.INDUSTRIAL,
                'description': (
                    'Compact 250 LPH commercial RO system perfect for tea gardens, small offices, '
                    'and retail shops. Easy to install with minimal space requirement. Includes '
                    'basic pre-filtration and manual flush system.'
                ),
                'specifications': {
                    'Capacity': '250 LPH',
                    'Membrane': '4040 FRP Membrane x 1',
                    'Feed Water TDS': 'Up to 3000 ppm',
                    'Recovery Rate': '45-55%',
                    'Power Consumption': '1 HP Pump',
                    'Frame Material': 'MS Powder Coated',
                    'Pre-Treatment': 'Sediment + Carbon Filter',
                    'Warranty': '1 Year on Pump',
                },
                'price': 45000.00,
            },

            # ── KITCHEN CHIMNEYS ───────────────────────────────────
            {
                'name': 'Barhamthuri SmokeFree 60cm Auto-Clean Chimney',
                'slug': 'smokefree-60cm-auto-clean-chimney',
                'category': Category.CHIMNEY,
                'description': (
                    'Filterless auto-clean kitchen chimney with powerful 1200 m³/hr suction. '
                    'Features motion sensor control, LED lighting, and oil collector. '
                    'Perfect for 2-3 burner stoves in Indian kitchens. Low noise operation '
                    'at just 58 dB.'
                ),
                'specifications': {
                    'Suction Power': '1200 m³/hr',
                    'Size': '60 cm',
                    'Type': 'Filterless Auto-Clean',
                    'Noise Level': '58 dB',
                    'Control': 'Touch + Motion Sensor',
                    'Lighting': 'LED Lamps x 2',
                    'Material': 'Stainless Steel + Tempered Glass',
                    'Warranty': '5 Years on Motor, 1 Year Comprehensive',
                },
                'price': 8499.00,
            },
            {
                'name': 'Barhamthuri SmokeFree 90cm Curved Glass Chimney',
                'slug': 'smokefree-90cm-curved-glass-chimney',
                'category': Category.CHIMNEY,
                'description': (
                    'Premium 90cm curved glass chimney with 1500 m³/hr suction capacity. '
                    'Designed for larger kitchens with 3-4 burner stoves. Features auto-clean '
                    'technology, touch control panel, and baffle filter. Elegant curved glass '
                    'design adds a modern touch to your kitchen.'
                ),
                'specifications': {
                    'Suction Power': '1500 m³/hr',
                    'Size': '90 cm',
                    'Type': 'Curved Glass with Baffle Filter',
                    'Noise Level': '55 dB',
                    'Control': 'Touch Panel',
                    'Lighting': 'LED Lamps x 2',
                    'Material': 'SS304 + Curved Tempered Glass',
                    'Warranty': '5 Years on Motor, 2 Years Comprehensive',
                },
                'price': 13999.00,
            },

            # ── SPARE PARTS ────────────────────────────────────────
            {
                'name': 'RO Membrane 75 GPD (Domestic)',
                'slug': 'ro-membrane-75-gpd-domestic',
                'category': Category.SPARES,
                'description': (
                    'High-rejection 75 GPD RO membrane compatible with all major domestic '
                    'water purifier brands. Removes up to 95% of dissolved solids. '
                    'Recommended replacement every 12 months for optimal performance.'
                ),
                'specifications': {
                    'Type': 'Thin Film Composite (TFC)',
                    'Capacity': '75 GPD',
                    'Rejection Rate': '95%+',
                    'Compatible With': 'All standard domestic RO purifiers',
                    'Replacement Interval': 'Every 12 months',
                    'Size': '1812 standard',
                },
                'price': 550.00,
            },
            {
                'name': 'Sediment Filter Cartridge 10-inch PP',
                'slug': 'sediment-filter-10-inch-pp',
                'category': Category.SPARES,
                'description': (
                    '10-inch polypropylene spun sediment filter cartridge. Removes sand, silt, '
                    'rust, and suspended particles from water. First-stage pre-filter for both '
                    'domestic and commercial RO systems. Recommended replacement every 3 months.'
                ),
                'specifications': {
                    'Type': 'PP Spun',
                    'Size': '10 inches',
                    'Micron Rating': '5 Micron',
                    'Compatible With': 'Standard 10" filter housings',
                    'Replacement Interval': 'Every 3 months',
                    'Material': 'Polypropylene',
                },
                'price': 120.00,
            },
            {
                'name': 'UV Lamp 11W for Domestic Purifiers',
                'slug': 'uv-lamp-11w-domestic',
                'category': Category.SPARES,
                'description': (
                    '11W UV lamp for domestic water purifiers. Provides effective UV-C radiation '
                    'to eliminate 99.99% of bacteria and viruses. Compatible with most domestic '
                    'UV and RO+UV purifiers. Replace annually for continued protection.'
                ),
                'specifications': {
                    'Wattage': '11W',
                    'Type': 'UV-C Germicidal',
                    'Kill Rate': '99.99% bacteria & viruses',
                    'Compatible With': 'Most domestic UV purifiers',
                    'Replacement Interval': 'Every 12 months',
                    'Connector': 'Standard 4-pin',
                },
                'price': 450.00,
            },
            {
                'name': 'Complete Filter Kit (RO+UV Domestic)',
                'slug': 'complete-filter-kit-ro-uv-domestic',
                'category': Category.SPARES,
                'description': (
                    'All-in-one annual replacement kit for domestic RO+UV purifiers. Includes '
                    'sediment filter, pre-carbon filter, post-carbon filter, RO membrane, '
                    'and UV lamp. Everything you need for a full service in one convenient package.'
                ),
                'specifications': {
                    'Includes': 'Sediment Filter, Pre-Carbon, Post-Carbon, RO Membrane (75 GPD), UV Lamp (11W)',
                    'Compatible With': 'Most domestic RO+UV purifiers',
                    'Replacement Interval': 'Annual',
                    'Kit Contents': '5 items',
                },
                'price': 1899.00,
            },
        ]

        created_count = 0
        skipped_count = 0

        for product_data in products:
            obj, created = Product.objects.get_or_create(
                slug=product_data['slug'],
                defaults=product_data,
            )
            if created:
                created_count += 1
                self.stdout.write(self.style.SUCCESS(f'  [OK] Created: {obj.name}'))
            else:
                skipped_count += 1
                self.stdout.write(self.style.WARNING(f'  [SKIP] Skipped (exists): {obj.name}'))

        self.stdout.write('')
        self.stdout.write(self.style.SUCCESS(
            f'Seeding complete! Created: {created_count}, Skipped: {skipped_count}'
        ))
