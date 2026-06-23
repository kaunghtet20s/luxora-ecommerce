// Featured categories for Luxora
export const categories = [
  {
    id: 'fashion',
    name: 'Fashion',
    description: 'Timeless apparel crafted from premium fabrics.',
    image:
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=900&q=80&auto=format&fit=crop',
  },
  {
    id: 'electronics',
    name: 'Electronics',
    description: 'Cutting-edge tech for the modern lifestyle.',
    image:
      'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=900&q=80&auto=format&fit=crop',
  },
  {
    id: 'watches',
    name: 'Watches',
    description: 'Swiss-grade timepieces that define elegance.',
    image:
      'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=900&q=80&auto=format&fit=crop',
  },
  {
    id: 'shoes',
    name: 'Shoes',
    description: 'Handcrafted footwear for every occasion.',
    image:
      'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=900&q=80&auto=format&fit=crop',
  },
  {
    id: 'bags',
    name: 'Bags',
    description: 'Luxury leather goods built to last a lifetime.',
    image:
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=900&q=80&auto=format&fit=crop',
  },
  {
    id: 'home-decor',
    name: 'Home Decor',
    description: 'Curated pieces that elevate your space.',
    image:
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=900&q=80&auto=format&fit=crop',
  },
]

// Used by the filter dropdown — includes the "all" option
export const categoryFilters = [
  { id: 'all', name: 'All Products' },
  ...categories.map(({ id, name }) => ({ id, name })),
]
