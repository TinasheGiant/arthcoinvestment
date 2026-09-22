import { CoreValue, GalleryImage, ServiceItem, TimberProduct } from '../types';

export const COMPANY_INFO = {
  name: 'Arthco Investments',
  tradeName: 'Arthco Timbers',
  motto: 'for your quality timber',
  tagline: 'A rapidly growing timber producer: harvesting, transporting, and processing logs into premium sawn timber for wholesale and retail supply.',
  shortBio: 'Based in Mutare, Zimbabwe, Arthco Investments (operating as Arthco Timbers) transforms sustainably harvested raw logs into precision-milled sawn timber for construction, furniture, roofing, and manufacturing across Zimbabwe.',
  logoUrl: '/images/arthco_logo.png',
  logoSvg: '/logo.svg',
  mission: 'To source quality logs and process them into high-standard sawn timber products tailored to meet the unique needs of builders, businesses, and individuals—delivered reliably through our wholesale and retail networks across Zimbabwe.',
  vision: "To become Zimbabwe's most trusted and accessible supplier of quality sawn timber, supporting construction, manufacturing, and community development across the nation.",
  address: 'Nixwood 10314, Nyakamete, Mutare, Zimbabwe',
  locationDetail: 'Nixwood 10314, Nyakamete Industrial Area, Mutare, Manicaland Province, Zimbabwe',
  phones: [
    { number: '0773 412 197', formatted: '+263 773 412 197', clean: '263773412197', label: 'Sales & Orders' },
    { number: '0771 744 334', formatted: '+263 771 744 334', clean: '263771744334', label: 'Operations & Mill' },
    { number: '0777 076 797', formatted: '+263 777 076 797', clean: '263777076797', label: 'Logistics & Dispatch' }
  ],
  email: 'info@arthcoinvestments.co.zw',
  copyright: '© 2026 Arthco Investments. All rights reserved.',
  footerTagline: 'Arthco Timbers · For your quality timber · Mutare, Zimbabwe',
  operatingHours: [
    { days: 'Monday – Friday', hours: '07:30 AM – 05:00 PM' },
    { days: 'Saturday', hours: '08:00 AM – 01:00 PM' },
    { days: 'Sunday & Public Holidays', hours: 'Closed (Pre-scheduled collections by appointment)' }
  ]
};

export const CORE_VALUES: CoreValue[] = [
  {
    title: 'Quality',
    subtitle: 'Consistent and reliable timber products',
    description: 'We adhere to stringent sawing tolerances and grading standards. From selecting dense mature logs to operating precision thin-kerf band sawmills, every piece of sawn timber meets builder expectations.',
    iconName: 'ShieldCheck'
  },
  {
    title: 'Integrity',
    subtitle: 'Honest sourcing and fair business practices',
    description: 'Transparent volume calculations, fair market pricing, and ethical forestry partnerships. We honor our commitments to delivery deadlines, specifications, and commercial agreements.',
    iconName: 'Scale'
  },
  {
    title: 'Customer Focus',
    subtitle: 'Meeting the needs of builders, carpenters, and retailers',
    description: 'Whether you need one bundle of roofing battens for a residential home or truckloads of structural timber for a commercial development, our team provides prompt and attentive service.',
    iconName: 'Users'
  },
  {
    title: 'Sustainability',
    subtitle: 'Responsible timber sourcing and waste reduction',
    description: 'We partner with managed plantation concessions in the Eastern Highlands and pursue 100% log utilization, converting offcuts, bark, and sawdust into valuable biomass and secondary wood products.',
    iconName: 'Leaf'
  },
  {
    title: 'Growth',
    subtitle: 'Expanding retail presence across Zimbabwe',
    description: 'Steadily expanding our reach from our Mutare industrial sawmilling base to distribution points, hardware partners, and retail outlets throughout Harare, Bulawayo, Masvingo, and beyond.',
    iconName: 'TrendingUp'
  }
];

export const REAL_ARTHCO_IMAGES = {
  sawmillYard: '/images/arthco_sawmill_yard.jpg',
  woodmizerLt15: '/images/arthco_woodmizer_lt15.jpg',
  milledTimberBed: '/images/arthco_milled_timber.jpg',
  timberStackYard: '/images/arthco_timber_stack.jpg',
};

export const TIMBER_PRODUCTS: TimberProduct[] = [
  {
    id: 'structural-timber',
    name: 'Structural Framing Timber',
    category: 'Structural',
    standardSizes: ['38mm x 114mm', '38mm x 152mm', '38mm x 228mm', '50mm x 76mm', '50mm x 100mm'],
    description: 'High-strength structural pine timber engineered for wall framing, floor joists, ceiling rafters, and heavy industrial load-bearing construction.',
    applications: ['Residential framework', 'Industrial warehouses', 'Sub-floor joists', 'Decking supports'],
    species: 'Pinus patula & Pinus elliottii (Eastern Highlands Pine)',
    image: '/images/arthco_timber_stack.jpg'
  },
  {
    id: 'roofing-timber',
    name: 'Roof Truss & Purlin Timber',
    category: 'Roofing',
    standardSizes: ['38mm x 38mm (Battens)', '38mm x 76mm (Purlins)', '50mm x 76mm (Wall Plates)', '76mm x 76mm'],
    description: 'Dimensioned roofing battens, purlins, and truss members produced to resist sagging, warping, and bowing under sheet and tile roofing loads.',
    applications: ['Roof truss manufacturing', 'Tile & IBR sheeting battens', 'Purlins & facia supports', 'Ceiling grid runners'],
    species: 'Treated and untreated Pine & Saligna Gum',
    image: '/images/arthco_milled_timber.jpg'
  },
  {
    id: 'planks-boards',
    name: 'Sawn Planks & Furniture Boards',
    category: 'Planks & Boards',
    standardSizes: ['25mm x 150mm', '25mm x 225mm', '25mm x 300mm', '32mm x 150mm', '50mm x 150mm'],
    description: 'Smooth, clean-sawn pine boards ideal for fine joinery, cabinet making, shelving, door frames, scaffold boards, and interior architectural finishes.',
    applications: ['Furniture manufacturing', 'Fascia & barge boards', 'Shelving & cabinetry', 'Wall cladding & paneling'],
    species: 'Selected Clear & Knotty Eastern Pine',
    image: '/images/arthco_sawmill_yard.jpg'
  },
  {
    id: 'industrial-packaging',
    name: 'Pallet & Packaging Timber',
    category: 'Industrial & Packaging',
    standardSizes: ['20mm x 75mm', '20mm x 100mm', '75mm x 75mm (Bearers)', 'Custom lengths on request'],
    description: 'Cost-effective, robust timber cut to exact packing specifications for export pallet manufacturers, agricultural fruit crates, and industrial crating.',
    applications: ['Wooden pallets', 'Agricultural shipping crates', 'Industrial dunnage', 'Mining support timber'],
    species: 'Mixed Pine & Hardwood Gum',
    image: '/images/arthco_woodmizer_lt15.jpg'
  }
];

export const SERVICES_LIST: ServiceItem[] = [
  {
    id: 'log-harvesting',
    title: 'Log Sourcing & Harvesting',
    tagline: 'Selective, sustainable timber extraction in Manicaland',
    description: 'We work closely with certified plantation estates across the Eastern Highlands mist belt to procure mature, high-density pine and hardwood sawlogs. Our harvesting teams ensure minimal ground disturbance and strict sorting at felling.',
    bulletPoints: [
      'High-grade sawlog grading directly in plantation stands',
      'Responsible selective thinning and mature felling',
      'Strong partnerships with sustainable forestry growers',
      'Continuous replenishment of our Nyakamete yard stock'
    ],
    icon: 'Trees',
    image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 'log-transport',
    title: 'Timber Transport & Logistics',
    tagline: 'Reliable fleet hauling logs to mill and timber to customers',
    description: 'Operating heavy timber transport rigs equipped for rugged mountain logging routes and long-haul highway delivery. We transport raw round logs directly from forest compartments into our Nyakamete sawmill, and dispatch bulk sawn lumber nationwide.',
    bulletPoints: [
      'Dedicated log trailers and self-loading transport',
      'Timely transit minimizing log drying and insect degradation',
      'Wholesale bulk haulage to Harare, Bulawayo, and regional centers',
      'Local site drop-offs throughout Mutare and surrounding districts'
    ],
    icon: 'Truck',
    image: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 'sawmill-processing',
    title: 'Precision Sawmilling & Processing',
    tagline: 'State-of-the-art Wood-Mizer thin-kerf band sawing',
    description: 'At our Nixwood Nyakamete facility, our Wood-Mizer LT15 sawmill cuts logs with razor-sharp band blades. This thin-kerf technology yields maximum usable wood recovery with razor-straight cuts, minimal sawdust waste, and precise tolerances.',
    bulletPoints: [
      'Wood-Mizer LT15 band sawmill operation with micro-fine kerf',
      'True-to-size cutting matching exact architectural blueprints',
      'Both Wet-Off-Saw (WOS) and Air-Seasoned timber options',
      'Continuous quality inspection on knots, grain, and squareness'
    ],
    icon: 'Hammer',
    image: '/images/arthco_woodmizer_lt15.jpg'
  },
  {
    id: 'wholesale-supply',
    title: 'Wholesale Timber Supply',
    tagline: 'Volume agreements for merchants, contractors, and developers',
    description: 'Supplying bulk truckload quantities to timber merchants, commercial building contractors, truss plants, and hardware chains with competitive tier pricing and priority milling schedules.',
    bulletPoints: [
      'Bulk cubic-meter bundle rates for volume buyers',
      'Consistent scheduled deliveries to maintain merchant inventories',
      'Certified structural sizing complying with construction codes',
      'Flexible payment terms for long-term supply partners'
    ],
    icon: 'Building2',
    image: '/images/arthco_timber_stack.jpg'
  },
  {
    id: 'retail-supply',
    title: 'Retail & Builder Timber Supply',
    tagline: 'Direct yard walk-in and bespoke order fulfillment',
    description: 'Welcoming local builders, carpenters, roofers, and homeowners directly at our Nyakamete yard. We assist in selecting the best timber dimensions, offering custom cross-cutting, and loading on-site.',
    bulletPoints: [
      'No minimum order size for local Mutare customers',
      'Walk-in inspection of timber stacks before purchase',
      'Expert advice on spans, roofing battens, and species durability',
      'Same-day collection or swift local delivery within Mutare'
    ],
    icon: 'Store',
    image: '/images/arthco_sawmill_yard.jpg'
  },
  {
    id: 'byproduct-biomass',
    title: 'Biomass & Eco Waste Utilization',
    tagline: 'Circular economy through sawdust and timber offcuts',
    description: 'In line with our sustainability value, we repurpose 100% of mill residues. Clean pine sawdust is packaged for poultry bedding, livestock farming, and biofuel briquettes, while solid offcuts provide high-heat curing firewood.',
    bulletPoints: [
      'Dry, clean pine sawdust for poultry bedding and mushroom farming',
      'Kiln and curing firewood from slabwood and end trimmings',
      'Substantial reduction of landfill waste through full log recovery',
      'Eco-friendly fuel alternative for local industrial boilers'
    ],
    icon: 'Recycle',
    image: '/images/arthco_milled_timber.jpg'
  }
];

export const GALLERY_ITEMS: GalleryImage[] = [
  {
    id: 'gal-1',
    title: 'Wood-Mizer LT15 Band Sawmill & Bed Track',
    category: 'operations',
    categoryLabel: 'Sawmill Operations',
    description: 'Our Wood-Mizer LT15 sawmill under the shelter canopy at Nixwood 10314, Nyakamete, cutting fresh timber planks with thin-kerf precision.',
    url: '/images/arthco_woodmizer_lt15.jpg',
    highlight: 'Wood-Mizer LT15 Mill'
  },
  {
    id: 'gal-2',
    title: 'Arthco Sawmill Yard & Mountain View, Mutare',
    category: 'yard',
    categoryLabel: 'Yard & Milling Site',
    description: 'Our active timber processing yard in Nyakamete, Mutare showing stacked sawn timber planks, golden sawdust mounds, and scenic mountain backdrop.',
    url: '/images/arthco_sawmill_yard.jpg',
    highlight: 'Nyakamete Sawmill Yard'
  },
  {
    id: 'gal-3',
    title: 'Freshly Milled Timber Planks on Sawmill Bed',
    category: 'products',
    categoryLabel: 'Sawn Timber Products',
    description: 'Freshly milled pine boards lying on the long Wood-Mizer bed track with cleanly sliced surfaces, ready for dimensioning and stacking.',
    url: '/images/arthco_milled_timber.jpg',
    highlight: 'Milled Planks'
  },
  {
    id: 'gal-4',
    title: 'Sawn Timber Stacks in Yard for Seasoning',
    category: 'products',
    categoryLabel: 'Sawn Timber Products',
    description: 'Clean uniform stacks of sawn structural pine timber boards drying naturally in our Nyakamete yard.',
    url: '/images/arthco_timber_stack.jpg',
    highlight: 'Sawn Pine Stacks'
  },
  {
    id: 'gal-5',
    title: 'Wood-Mizer LT15 Track & Sawhead Carriage',
    category: 'operations',
    categoryLabel: 'Sawmill Operations',
    description: 'Close-up perspective of the Wood-Mizer LT15 track rollers and saw carriage under the canopy roof during production.',
    url: '/images/woodmizer_lt15_1790075731423.jpg',
    highlight: 'Sawmill Machinery'
  },
  {
    id: 'gal-6',
    title: 'Sawdust Recovery Mounds & Timber Yard',
    category: 'sustainability',
    categoryLabel: 'Forestry & Sustainability',
    description: 'Golden sawdust mounds generated by our thin-kerf sawing, collected for poultry bedding and clean agricultural biomass.',
    url: '/images/sawmill_yard_1790075715761.jpg',
    highlight: '100% Residue Recovery'
  },
  {
    id: 'gal-7',
    title: 'High-Yield Sawlog Breakdown',
    category: 'operations',
    categoryLabel: 'Sawmill Operations',
    description: 'Mature Eastern Highlands pine log mounted on the mill bed and sliced into uniform structural boards.',
    url: '/images/milled_timber_bed_1790075746906.jpg',
    highlight: 'High Recovery Sawing'
  },
  {
    id: 'gal-8',
    title: 'Finished Structural Timber Bundles Ready for Dispatch',
    category: 'yard',
    categoryLabel: 'Yard & Milling Site',
    description: 'Sorted and bundled sawn timber packs prepared for wholesale truck loading and delivery across Zimbabwe.',
    url: '/images/timber_stack_yard_1790075759910.jpg',
    highlight: 'Wholesale Supply'
  }
];

export const TIMBER_SPECS_GUIDE = [
  {
    title: 'Roofing Battens',
    dimension: '38mm x 38mm',
    commonLengths: '3.0m, 3.6m, 4.2m, 4.8m',
    idealFor: 'Tile and corrugated iron sheet purlins, ceiling battens'
  },
  {
    title: 'Roof Purlins & Wall Plates',
    dimension: '38mm x 76mm & 50mm x 76mm',
    commonLengths: '3.6m, 4.2m, 4.8m, 5.4m, 6.0m',
    idealFor: 'Light truss top/bottom chords, wall plates, bracing'
  },
  {
    title: 'Structural Rafters & Joists',
    dimension: '38mm x 114mm & 38mm x 152mm',
    commonLengths: '4.2m, 4.8m, 5.4m, 6.0m, 6.6m',
    idealFor: 'Heavy roof trusses, floor joists, mezzanine framing'
  },
  {
    title: 'Heavy Beams & Ridge Timbers',
    dimension: '38mm x 228mm & 50mm x 228mm',
    commonLengths: '4.8m, 5.4m, 6.0m, 6.6m',
    idealFor: 'Ridge beams, heavy veranda posts, industrial framing'
  },
  {
    title: 'Sawn Planks & Joinery Boards',
    dimension: '25mm x 150mm & 25mm x 225mm',
    commonLengths: '3.0m, 3.6m, 4.2m',
    idealFor: 'Fascia boards, shelving, scaffolding, furniture manufacturing'
  }
];
