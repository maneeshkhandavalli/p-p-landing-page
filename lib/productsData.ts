export const productsData = [
  // EV Battery Enclosures
  { name: 'EV Battery Enclosure', category: 'EV Battery Enclosures', image: '/imagesforcnc/ev-battery-case-500x500.webp', indiamartUrl: 'https://www.indiamart.com/proddetail/ev-battery-enclosure-23089070733.html' },
  { name: 'EV Battery Charger Enclosures', category: 'EV Battery Enclosures', image: '/imagesforcnc/ev-battery-charger-enclosures-500x500.webp', indiamartUrl: 'https://www.indiamart.com/proddetail/ev-battery-charger-enclosures-2851648474762.html' },

  // Electronic Enclosures
  { name: 'Electrical Metal Cabinets', category: 'Electronic Enclosures', image: '/imagesforcnc/electrical-metal-cabinets-500x500.webp', indiamartUrl: 'https://www.indiamart.com/proddetail/electrical-metal-cabinets-23019950591.html' },
  { name: 'Telecom Enclosure', category: 'Electronic Enclosures', image: '/imagesforcnc/telecom-enclosure-500x500.webp', indiamartUrl: 'https://www.indiamart.com/proddetail/telecom-enclosure-23019950673.html' },

  // Electrical Enclosures & Cabinets
  { name: 'Inverter Cabinet', category: 'Electrical Enclosures & Cabinets', image: '/imagesforcnc/inverter-cabinet-500x500.webp', indiamartUrl: 'https://www.indiamart.com/proddetail/inverter-cabinet-23089012097.html' },
  { name: 'Power Supply Cabinets', category: 'Electrical Enclosures & Cabinets', image: '/imagesforcnc/power-supply-cabinets-500x500.webp', indiamartUrl: 'https://www.indiamart.com/proddetail/power-supply-cabinets-23019950312.html' },

  // Wall Mount & Storage Cabinets
  { name: 'Metal Wall Mount Cabinet', category: 'Wall Mount & Storage Cabinets', image: '/imagesforcnc/wall-mounted-cabinet-500x500-500x500.webp', indiamartUrl: 'https://www.indiamart.com/proddetail/metal-wall-mount-cabinet-23019970288.html' },
  { name: 'Network Cabinet', category: 'Wall Mount & Storage Cabinets', image: '/imagesforcnc/network-cabinet-500x500.webp', indiamartUrl: 'https://www.indiamart.com/proddetail/network-cabinet-23019950730.html' },

  // Sheet Metal Fabrications
  { name: 'Sheet Metal Fabrications', category: 'Sheet Metal Fabrications', image: '/imagesforcnc/sheet-metal-fabrications-500x500.webp', indiamartUrl: 'https://www.indiamart.com/proddetail/sheet-metal-fabrications-4390046791.html' },
  { name: 'Aluminium Enclosure', category: 'Sheet Metal Fabrications', image: '/imagesforcnc/2-500x500.webp', indiamartUrl: 'https://www.indiamart.com/proddetail/aluminium-enclosure-6496034248.html' },

  // Doors & Enclosures
  { name: 'Metal Clean Room Door', category: 'Doors & Enclosures', image: '/imagesforcnc/clean-room-door-500x500.webp', indiamartUrl: 'https://www.indiamart.com/proddetail/metal-clean-room-door-22031776430.html' },
  { name: 'Outdoor Enclosure', category: 'Doors & Enclosures', image: '/imagesforcnc/outdoor-enclosure-500x500.webp', indiamartUrl: 'https://www.indiamart.com/proddetail/outdoor-enclosure-23019950897.html' },

  // Fire Safety & Specialty Products
  { name: 'Fire Boxes with Glass Fitting Extinguishers', category: 'Fire Safety & Specialty Products', image: '/imagesforcnc/fibreglass-extinguisher-boxes-500x500.webp', indiamartUrl: 'https://www.indiamart.com/proddetail/fire-boxs-with-glass-fitting-extinguishers-4391386130.html' },
  { name: 'Fire Hose Boxes', category: 'Fire Safety & Specialty Products', image: '/imagesforcnc/fire-hose-boxes-500x500.webp', indiamartUrl: 'https://www.indiamart.com/proddetail/fire-hose-boxes-4391383988.html' },

  // Solar & Infrastructure
  { name: 'Solar Streetlight Poles & Structures', category: 'Solar & Infrastructure', image: '/imagesforcnc/solar-streetlight-poles-structures-500x500.webp', indiamartUrl: 'https://www.indiamart.com/proddetail/solar-streetlight-poles-structures-22031890530.html' },
  { name: 'CC Camera Rack', category: 'Solar & Infrastructure', image: '/imagesforcnc/cc-camara-rack-500x500.webp', indiamartUrl: 'https://www.indiamart.com/proddetail/cc-camera-rack-23089033233.html' },

  // Furniture & Storage
  { name: 'Sheet Metal Furniture', category: 'Furniture & Storage', image: '/imagesforcnc/sheet-metal-furniture-500x500.webp', indiamartUrl: 'https://www.indiamart.com/proddetail/sheet-metal-furniture-22122992330.html' },
  { name: 'Laboratory Tables', category: 'Furniture & Storage', image: '/imagesforcnc/lab-furniture-500x500.webp', indiamartUrl: 'https://www.indiamart.com/proddetail/laboratory-tables-23089012191.html' },
]

export const productCategories = [...new Set(productsData.map(p => p.category))]
