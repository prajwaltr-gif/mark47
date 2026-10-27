/**
 * Aura & Bean - Artisan Coffee Roasters & Botanical Café
 * Comprehensive Menu Database & Recommendation Rules
 */

const MENU_CATEGORIES = [
  { id: 'all', name: 'Full Menu', icon: 'fa-utensils' },
  { id: 'coffee', name: 'Signature Coffee', icon: 'fa-mug-hot' },
  { id: 'cold-brew', name: 'Cold Brew & Iced', icon: 'fa-glass-water' },
  { id: 'matcha-tea', name: 'Tea & Matcha', icon: 'fa-leaf' },
  { id: 'bakery', name: 'Artisan Bakery', icon: 'fa-bread-slice' },
  { id: 'brunch', name: 'Gourmet Brunch', icon: 'fa-egg' }
];

const MENU_ITEMS = [
  {
    id: 'item-1',
    name: 'Velvet Golden Swan Latte',
    category: 'coffee',
    price: 6.50,
    rating: 4.9,
    reviewsCount: 342,
    image: 'images/hero-latte.jpg',
    badge: "Barista's Signature",
    description: 'Double shot of single-origin Ethiopian espresso with velvety steamed oat milk, finished with our signature swan latte art and a touch of wild honey.',
    flavorNotes: ['Roasted Hazelnut', 'Floral Jasmine', 'Velvety Crema'],
    dietary: ['Vegetarian', 'Oat Milk Available'],
    origin: 'Yirgacheffe, Ethiopia (Altitude 1,950m)',
    calories: '160 kcal',
    customizable: true,
    sizes: [
      { name: 'Regular (12 oz)', extra: 0 },
      { name: 'Large (16 oz)', extra: 0.80 }
    ],
    temperatures: ['Hot', 'Iced'],
    strength: 'balanced'
  },
  {
    id: 'item-2',
    name: 'Artisanal Nitro Velvet Cold Brew',
    category: 'cold-brew',
    price: 6.25,
    rating: 4.95,
    reviewsCount: 288,
    image: 'images/nitro-cold-brew.jpg',
    badge: 'Popular Choice',
    description: 'Slow-steeped for 24 hours in small batches, nitrogen-infused for a Guinness-like silky cascade head, topped with sweet bourbon cream.',
    flavorNotes: ['Dark Cocoa', 'Bourbon Vanilla', 'Caramelized Fig'],
    dietary: ['Vegetarian', 'Gluten-Free'],
    origin: 'Huila, Colombia (Washed Process)',
    calories: '90 kcal',
    customizable: true,
    sizes: [
      { name: 'Regular (12 oz)', extra: 0 },
      { name: 'Large (16 oz)', extra: 0.85 }
    ],
    temperatures: ['Cold / Draft'],
    strength: 'bold'
  },
  {
    id: 'item-3',
    name: 'French Butter Croissant & Pain au Chocolat',
    category: 'bakery',
    price: 6.50,
    rating: 4.88,
    reviewsCount: 215,
    image: 'images/croissant-pastries.jpg',
    badge: 'Freshly Baked Daily',
    description: 'Traditional French viennoiserie baked at sunrise with pure Normandy butter, featuring paper-thin flaky layers and Valrhona 70% dark chocolate.',
    flavorNotes: ['Normandy Butter', 'Rich Bittersweet Cocoa', 'Flaky Crispness'],
    dietary: ['Vegetarian'],
    origin: 'Baked fresh in our in-house pastry lab',
    calories: '320 kcal',
    customizable: false,
    sizes: [
      { name: 'Standard Platter', extra: 0 },
      { name: 'Tasting Box (Trio)', extra: 4.50 }
    ],
    temperatures: ['Warm', 'Room Temp'],
    strength: 'sweet'
  },
  {
    id: 'item-4',
    name: 'Ceremonial Uji Iced Matcha Latte',
    category: 'matcha-tea',
    price: 7.00,
    rating: 4.92,
    reviewsCount: 194,
    image: 'images/matcha-latte.jpg',
    badge: 'First Harvest',
    description: 'Authentic stone-ground ceremonial matcha sourced directly from Kyoto, Japan, layered smoothly over sweetened vanilla oat milk and hand-cut ice.',
    flavorNotes: ['Vibrant Umami', 'Subtle Sweet Grass', 'Smooth Vanilla Oat'],
    dietary: ['Vegan', 'Gluten-Free', 'Organic'],
    origin: 'Uji, Kyoto, Japan',
    calories: '130 kcal',
    customizable: true,
    sizes: [
      { name: 'Regular (12 oz)', extra: 0 },
      { name: 'Large (16 oz)', extra: 0.90 }
    ],
    temperatures: ['Iced', 'Hot'],
    strength: 'balanced'
  },
  {
    id: 'item-5',
    name: 'Madagascar Vanilla Bean Cortado',
    category: 'coffee',
    price: 5.75,
    rating: 4.85,
    reviewsCount: 160,
    image: 'images/hero-latte.jpg',
    badge: 'Connoisseur Pick',
    description: 'Equal parts single-origin espresso and silky textured milk infused with authentic whole Madagascar bourbon vanilla pods and a pinch of raw cane sugar.',
    flavorNotes: ['Bourbon Vanilla', 'Brown Sugar', 'Nutty Crema'],
    dietary: ['Vegetarian'],
    origin: 'Antioquia, Colombia',
    calories: '110 kcal',
    customizable: true,
    sizes: [
      { name: 'Classic 4.5 oz', extra: 0 },
      { name: 'Double 6.5 oz', extra: 0.75 }
    ],
    temperatures: ['Hot'],
    strength: 'bold'
  },
  {
    id: 'item-6',
    name: 'Citrus Sparkler Cold Brew',
    category: 'cold-brew',
    price: 6.50,
    rating: 4.8,
    reviewsCount: 112,
    image: 'images/nitro-cold-brew.jpg',
    badge: 'Summer Special',
    description: 'Concentrated cold brew pulled over elderflower botanical tonic, topped with a torched blood orange slice and fresh garden rosemary sprig.',
    flavorNotes: ['Candied Citrus', 'Crisp Botanical', 'Effervescent Sparkle'],
    dietary: ['Vegan', 'Gluten-Free'],
    origin: 'Guji, Ethiopia',
    calories: '45 kcal',
    customizable: true,
    sizes: [
      { name: 'Regular (14 oz)', extra: 0 }
    ],
    temperatures: ['Iced'],
    strength: 'light'
  },
  {
    id: 'item-7',
    name: 'Smoked Vanilla Cardamom Chai',
    category: 'matcha-tea',
    price: 6.25,
    rating: 4.9,
    reviewsCount: 178,
    image: 'images/hero-latte.jpg',
    badge: 'House Specialty',
    description: 'Assam black tea slowly simmered with fresh green cardamom, cracked cinnamon, crushed ginger, star anise, and creamy steamed whole milk.',
    flavorNotes: ['Warming Spice', 'Aromatic Cardamom', 'Sweet Golden Honey'],
    dietary: ['Vegetarian'],
    origin: 'Assam Valley, India',
    calories: '180 kcal',
    customizable: true,
    sizes: [
      { name: 'Regular (12 oz)', extra: 0 },
      { name: 'Large (16 oz)', extra: 0.80 }
    ],
    temperatures: ['Hot', 'Iced'],
    strength: 'balanced'
  },
  {
    id: 'item-8',
    name: 'Pistachio Raspberry Cruffin',
    category: 'bakery',
    price: 6.25,
    rating: 4.93,
    reviewsCount: 220,
    image: 'images/croissant-pastries.jpg',
    badge: "Baker's Trophy",
    description: 'A crisp, caramelized croissant-muffin hybrid generously piped with roasted Sicilian pistachio ganache and a vibrant wild raspberry coulis core.',
    flavorNotes: ['Bronte Pistachio', 'Tart Wild Berries', 'Caramelized Sugar'],
    dietary: ['Vegetarian'],
    origin: 'Aura & Bean Patisserie Atelier',
    calories: '360 kcal',
    customizable: false,
    sizes: [
      { name: 'Single Cruffin', extra: 0 }
    ],
    temperatures: ['Room Temp'],
    strength: 'sweet'
  },
  {
    id: 'item-9',
    name: 'Truffled Hass Avocado & Poached Egg Tartine',
    category: 'brunch',
    price: 14.50,
    rating: 4.91,
    reviewsCount: 310,
    image: 'images/croissant-pastries.jpg',
    badge: "Chef's Brunch",
    description: 'Rustic artisanal sourdough toast, Hass avocado mash, free-range poached egg with runny golden yolk, shaved Pecorino Romano, white truffle oil and micro-greens.',
    flavorNotes: ['Creamy Avocado', 'Rich Truffle Essence', 'Crusty Sourdough'],
    dietary: ['Vegetarian'],
    origin: 'Local Organic Farms & Bakery',
    calories: '420 kcal',
    customizable: true,
    sizes: [
      { name: 'Standard Plate', extra: 0 },
      { name: 'With Smoked Salmon', extra: 4.00 }
    ],
    temperatures: ['Warm'],
    strength: 'savory'
  },
  {
    id: 'item-10',
    name: 'Botanical Brioche French Toast',
    category: 'brunch',
    price: 15.00,
    rating: 4.89,
    reviewsCount: 185,
    image: 'images/croissant-pastries.jpg',
    badge: 'Weekend Favorite',
    description: 'Triple-thick brioche soaked in vanilla-cinnamon custard, seared to golden perfection. Topped with caramelized bananas, Canadian maple syrup, and edible orchid petals.',
    flavorNotes: ['Pure Maple', 'Caramelized Banana', 'Spiced Brioche'],
    dietary: ['Vegetarian'],
    origin: 'Aura & Bean Kitchen',
    calories: '510 kcal',
    customizable: true,
    sizes: [
      { name: 'Full Brunch Plate', extra: 0 }
    ],
    temperatures: ['Hot'],
    strength: 'sweet'
  },
  {
    id: 'item-11',
    name: 'Spanish Honey Cinnamon Cortadito',
    category: 'coffee',
    price: 5.50,
    rating: 4.82,
    reviewsCount: 140,
    image: 'images/hero-latte.jpg',
    badge: 'Classic Craft',
    description: 'Layer of caramelized sweetened condensed milk, double shot of dark roasted espresso, frothed whole milk, and a dusting of Mexican cinnamon.',
    flavorNotes: ['Dulce de Leche', 'Warm Cinnamon', 'Intense Espresso'],
    dietary: ['Vegetarian'],
    origin: 'Medellín, Colombia',
    calories: '145 kcal',
    customizable: true,
    sizes: [
      { name: 'Regular (6 oz)', extra: 0 }
    ],
    temperatures: ['Hot'],
    strength: 'bold'
  },
  {
    id: 'item-12',
    name: 'Espresso Tiramisu Crème Tart',
    category: 'bakery',
    price: 7.50,
    rating: 4.96,
    reviewsCount: 264,
    image: 'images/croissant-pastries.jpg',
    badge: 'Decadent',
    description: 'Crisp sable pastry shell filled with espresso-soaked savoiardi biscuits, airy mascarpone sabayon, dark Dutch cocoa, and delicate 24k edible gold leaf.',
    flavorNotes: ['Italian Mascarpone', 'Dark Dutch Cacao', 'Roast Espresso'],
    dietary: ['Vegetarian'],
    origin: 'Aura & Bean Patisserie',
    calories: '380 kcal',
    customizable: false,
    sizes: [
      { name: 'Individual Tart', extra: 0 }
    ],
    temperatures: ['Chilled'],
    strength: 'sweet'
  }
];

// Single Origin Coffee Roastery Showcase
const COFFEE_ORIGINS = [
  {
    country: 'Ethiopia',
    region: 'Yirgacheffe • Gedeo Zone',
    altitude: '1,950m - 2,200m',
    process: 'Natural Heirloom Sun-Dried',
    roastLevel: 'Light - Medium',
    profile: 'Bergamot, Jasmine Blossoms, Wild Blueberry & Honey',
    acidity: 'Vibrant & Citrusy',
    body: 'Silky & Tea-like',
    farmerStory: 'Grown by smallholder farmers in misty mountain valleys, dried on raised African beds for 21 days.'
  },
  {
    country: 'Colombia',
    region: 'Huila • San Agustin',
    altitude: '1,750m - 1,900m',
    process: 'Fully Washed • 36h Fermentation',
    roastLevel: 'Medium Roast',
    profile: 'Milk Chocolate, Crisp Red Apple, Panela & Toasted Almond',
    acidity: 'Crisp Malic',
    body: 'Round & Velvety',
    farmerStory: 'Direct partnership with the Los Naranjos cooperative paying 45% above Fair-Trade minimums.'
  },
  {
    country: 'Guatemala',
    region: 'Antigua • Volcanic Valley',
    altitude: '1,600m - 1,800m',
    process: 'Washed Mountain Spring Water',
    roastLevel: 'Medium - Dark',
    profile: 'Dark Cocoa, Roasted Hazelnut, Warm Spices & Plum',
    acidity: 'Mild & Balanced',
    body: 'Full & Rich',
    farmerStory: 'Shade-grown under gravilea trees on the mineral-rich slopes of Agua and Fuego volcanoes.'
  }
];

// Customer Testimonials
const REVIEWS_DATA = [
  {
    name: 'Elena Rostova',
    role: 'Architect & Coffee Enthusiast',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    stars: 5,
    source: 'Google Reviews',
    date: '2 days ago',
    comment: 'The atmosphere at Aura & Bean is simply unmatched. The warm timber and lush botanical plants make it the most peaceful sanctuary in the city. The Swan Latte is a work of art, both visually and in taste!'
  },
  {
    name: 'Marcus Sterling',
    role: 'Creative Director',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    stars: 5,
    source: 'Coffee Guide Daily',
    date: '1 week ago',
    comment: 'Easily the finest Nitro Cold Brew I have ever tasted. The cascading foam was velvety like fine stout, with notes of dark cacao and zero bitterness. Their pastry team also deserves a Michelin star for that pistachio cruffin.'
  },
  {
    name: 'Aria Takahashi',
    role: 'Food & Lifestyle Journalist',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80',
    stars: 5,
    source: 'Yelp Elite',
    date: '2 weeks ago',
    comment: 'The Uji Matcha Latte here is truly authentic ceremonial grade. You can taste the difference immediately. Pair it with the truffled avocado toast on the botanical garden patio for the dreamiest weekend brunch.'
  }
];
