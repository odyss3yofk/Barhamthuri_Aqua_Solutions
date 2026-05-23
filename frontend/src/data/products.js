const products = [
  // ========== DOMESTIC PURIFIERS ==========
  {
    id: 1,
    name: 'AquaPure 7-Stage RO',
    slug: 'aquapure-7-stage-ro',
    category: 'Domestic',
    description:
      'Advanced 7-stage RO water purifier with mineral booster technology. Removes up to 99% of dissolved impurities including arsenic, fluoride, and heavy metals while retaining essential minerals. Perfect for Indian water conditions with TDS up to 2000 ppm.',
    price: 12999,
    specifications: {
      'Purification Stages': '7 (Sediment, Pre-Carbon, RO Membrane, UV, UF, Post-Carbon, Mineral Booster)',
      'Storage Capacity': '10 Litres',
      'Purification Capacity': '15 Litres/Hour',
      'Max TDS Handling': '2000 ppm',
      'Filter Life': '6000 Litres',
      'Power Consumption': '36W',
      'Warranty': '1 Year Comprehensive + 3 Years on RO Membrane',
      'Installation': 'Wall Mount / Countertop',
    },
    isFeatured: true,
    gradient: 'product-gradient-1',
  },
  {
    id: 2,
    name: 'AquaGuard UV+UF',
    slug: 'aquaguard-uv-uf',
    category: 'Domestic',
    description:
      'Dual purification with UV and UF technology for municipal water supply. Ideal for low TDS water where RO is not needed. Energy-efficient design with auto-shutoff and LED indicators for filter change alerts.',
    price: 8499,
    specifications: {
      'Purification Technology': 'UV + UF Double Protection',
      'Storage Capacity': '7 Litres',
      'Purification Capacity': '20 Litres/Hour',
      'Suitable Water TDS': 'Up to 200 ppm',
      'UV Lamp Life': '8000 Hours',
      'Power Consumption': '20W',
      'Warranty': '1 Year Comprehensive',
      'Installation': 'Wall Mount',
    },
    isFeatured: true,
    gradient: 'product-gradient-2',
  },
  {
    id: 3,
    name: 'Iron Shield Home',
    slug: 'iron-shield-home',
    category: 'Domestic',
    description:
      'Specially designed for North East India\'s iron-rich water. Advanced iron removal technology combined with RO+UV purification. Removes iron, manganese, and other heavy metals for crystal-clear, safe drinking water.',
    price: 15999,
    specifications: {
      'Iron Removal Capacity': 'Up to 15 ppm',
      'Purification': 'Iron Filter + RO + UV + UF',
      'Storage Capacity': '12 Litres',
      'Purification Capacity': '12 Litres/Hour',
      'Max TDS Handling': '2500 ppm',
      'Special Feature': 'Auto-flush for iron filter',
      'Warranty': '2 Years Comprehensive',
      'Installation': 'Wall Mount / Floor Stand',
    },
    isFeatured: true,
    gradient: 'product-gradient-3',
  },

  // ========== INDUSTRIAL RO SYSTEMS ==========
  {
    id: 4,
    name: 'IndusFlow 500 LPH RO',
    slug: 'indusflow-500-lph-ro',
    category: 'Industrial',
    description:
      'Commercial-grade 500 Litres Per Hour RO plant suitable for offices, restaurants, hotels, and small-scale industries. Built with industrial-grade stainless steel frame, automatic operation, and remote monitoring capabilities.',
    price: 125000,
    specifications: {
      'Output Capacity': '500 Litres/Hour',
      'Recovery Rate': '55-65%',
      'Feed Water TDS': 'Up to 5000 ppm',
      'Membrane Type': '4040 Industrial Grade',
      'Number of Membranes': '2',
      'Pump': 'Grundfos / CRI High-Pressure',
      'Frame': 'SS 304 Powder Coated',
      'Warranty': '1 Year on Parts + AMC Available',
    },
    isFeatured: true,
    gradient: 'product-gradient-4',
  },
  {
    id: 5,
    name: 'IndusFlow 1000 LPH RO',
    slug: 'indusflow-1000-lph-ro',
    category: 'Industrial',
    description:
      'High-capacity 1000 LPH reverse osmosis plant for large industries, hospitals, and institutional use. Features PLC-based automatic operation, multi-stage pre-treatment, and real-time TDS monitoring with data logging.',
    price: 250000,
    specifications: {
      'Output Capacity': '1000 Litres/Hour',
      'Recovery Rate': '60-70%',
      'Feed Water TDS': 'Up to 8000 ppm',
      'Membrane Type': '4040 High-Rejection',
      'Number of Membranes': '4',
      'Control System': 'PLC with HMI Touch Panel',
      'Pre-treatment': 'Multi-Grade + Activated Carbon + Antiscalant',
      'Warranty': '1 Year Comprehensive + AMC Available',
    },
    isFeatured: false,
    gradient: 'product-gradient-1',
  },
  {
    id: 6,
    name: 'Iron Remover Plant',
    slug: 'iron-remover-plant',
    category: 'Industrial',
    description:
      'Industrial-scale iron and manganese removal system designed for North East India\'s challenging water conditions. Aeration-based oxidation with multi-grade sand filtration. Ideal for community water supply projects and industries.',
    price: 85000,
    specifications: {
      'Capacity': '1000-5000 Litres/Hour',
      'Iron Removal': 'Up to 30 ppm',
      'Manganese Removal': 'Up to 5 ppm',
      'Technology': 'Aeration + Oxidation + Filtration',
      'Filter Media': 'Birm / Manganese Greensand',
      'Backwash': 'Automatic Timed',
      'Construction': 'FRP / MS Epoxy Coated',
      'Warranty': '1 Year',
    },
    isFeatured: false,
    gradient: 'product-gradient-2',
  },

  // ========== KITCHEN CHIMNEYS ==========
  {
    id: 7,
    name: 'ChefAir 60cm Auto-Clean',
    slug: 'chefair-60cm-auto-clean',
    category: 'Chimneys',
    description:
      'Premium 60cm auto-clean kitchen chimney with powerful 1200 m³/hr suction. Features thermal auto-clean technology, touch control panel, LED lights, and oil collector. Perfect for Indian cooking with heavy frying and tadka.',
    price: 14999,
    specifications: {
      'Size': '60 cm',
      'Suction Power': '1200 m³/hr',
      'Type': 'Wall Mount, Filterless',
      'Auto-Clean': 'Thermal Auto-Clean with Oil Collector',
      'Control': 'Touch + Motion Sensor',
      'Noise Level': '58 dB',
      'LED Lights': '2 × Energy-Efficient LED',
      'Warranty': '5 Years on Motor, 1 Year Comprehensive',
    },
    isFeatured: false,
    gradient: 'product-gradient-3',
  },
  {
    id: 8,
    name: 'ChefAir 90cm Baffle',
    slug: 'chefair-90cm-baffle',
    category: 'Chimneys',
    description:
      'Large 90cm baffle filter chimney for spacious kitchens. Heavy-duty stainless steel baffle filters for superior oil and grease capture. Powerful 1400 m³/hr suction handles the heaviest Indian cooking with ease.',
    price: 19999,
    specifications: {
      'Size': '90 cm',
      'Suction Power': '1400 m³/hr',
      'Type': 'Wall Mount, Baffle Filter',
      'Filter': 'SS 304 Baffle Filters (Dishwasher Safe)',
      'Control': 'Push Button + Remote Control',
      'Noise Level': '52 dB',
      'LED Lights': '2 × Halogen',
      'Warranty': '5 Years on Motor, 2 Years Comprehensive',
    },
    isFeatured: false,
    gradient: 'product-gradient-4',
  },

  // ========== SPARE PARTS ==========
  {
    id: 9,
    name: 'RO Membrane 75GPD',
    slug: 'ro-membrane-75gpd',
    category: 'Spares',
    description:
      'High-quality 75 GPD (Gallons Per Day) RO membrane compatible with most domestic water purifiers. Provides excellent TDS rejection rate of 95%+. Recommended replacement every 12-18 months for optimal performance.',
    price: 1299,
    specifications: {
      'Type': 'Thin Film Composite (TFC)',
      'Capacity': '75 GPD',
      'TDS Rejection': '95-97%',
      'Compatibility': 'Universal — fits most domestic RO systems',
      'Life Span': '12-18 Months (depending on usage)',
      'Operating Pressure': '40-100 PSI',
    },
    isFeatured: false,
    gradient: 'product-gradient-1',
  },
  {
    id: 10,
    name: 'Sediment Filter Set',
    slug: 'sediment-filter-set',
    category: 'Spares',
    description:
      'Complete set of pre-filters including PP sediment filter and activated carbon block. Essential maintenance kit to extend RO membrane life. Recommended replacement every 3-6 months.',
    price: 499,
    specifications: {
      'Set Includes': 'PP Sediment + Granular Activated Carbon + Carbon Block',
      'Micron Rating': '5 Micron (Sediment), 10 Micron (Carbon)',
      'Compatibility': 'Universal 10-inch standard housing',
      'Life Span': '3-6 Months',
      'Material': 'Food-Grade Polypropylene & Coconut Shell Carbon',
    },
    isFeatured: false,
    gradient: 'product-gradient-2',
  },
  {
    id: 11,
    name: 'UV Lamp Replacement',
    slug: 'uv-lamp-replacement',
    category: 'Spares',
    description:
      'High-intensity 11W UV lamp for water purifier UV chambers. Effectively eliminates 99.9% of bacteria, viruses, and cysts. Essential replacement to maintain purification efficacy — recommended annually.',
    price: 899,
    specifications: {
      'Wattage': '11W',
      'Type': 'Germicidal UV-C (254nm wavelength)',
      'Life Span': '8000 Hours / ~1 Year',
      'Compatibility': 'Standard 4-pin UV chamber',
      'Effectiveness': '99.9% bacteria & virus elimination',
      'Certification': 'ISI Marked',
    },
    isFeatured: false,
    gradient: 'product-gradient-3',
  },
  {
    id: 12,
    name: 'SMPS Adapter 24V',
    slug: 'smps-adapter-24v',
    category: 'Spares',
    description:
      'Reliable 24V 2.5A SMPS power adapter for RO water purifiers. Built-in surge protection and short-circuit safety. Compatible with most domestic RO booster pump systems.',
    price: 649,
    specifications: {
      'Output': '24V DC, 2.5A',
      'Input': '100-240V AC, 50/60Hz',
      'Protection': 'Over-voltage, Short-circuit, Over-current',
      'Compatibility': 'Most RO booster pumps',
      'Certification': 'BIS Approved',
      'Warranty': '6 Months',
    },
    isFeatured: false,
    gradient: 'product-gradient-4',
  },
]

export const categories = ['All', 'Domestic', 'Industrial', 'Chimneys', 'Spares']

export const getCategoryIcon = (category) => {
  const icons = {
    All: '🔍',
    Domestic: '🏠',
    Industrial: '🏭',
    Chimneys: '🍳',
    Spares: '🔧',
  }
  return icons[category] || '📦'
}

export const formatPrice = (price) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(price)
}

export const getFeaturedProducts = () => products.filter((p) => p.isFeatured)

export const getProductBySlug = (slug) => products.find((p) => p.slug === slug)

export const getProductsByCategory = (category) => {
  if (category === 'All') return products
  return products.filter((p) => p.category === category)
}

export const getRelatedProducts = (currentSlug, limit = 4) => {
  const current = getProductBySlug(currentSlug)
  if (!current) return products.slice(0, limit)
  return products
    .filter((p) => p.slug !== currentSlug && p.category === current.category)
    .slice(0, limit)
    .concat(
      products
        .filter((p) => p.slug !== currentSlug && p.category !== current.category)
        .slice(0, limit)
    )
    .slice(0, limit)
}

export default products
