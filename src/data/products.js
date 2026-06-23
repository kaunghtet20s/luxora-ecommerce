// Sample product catalogue for Luxora.
// `price` is the current price, `oldPrice` (optional) is the pre-discount price.
// `images` powers the Quick View gallery; `image` is the card thumbnail.

export const products = [
  {
    id: 1,
    name: 'Aurelia Cashmere Coat',
    brand: 'Maison Lux',
    category: 'fashion',
    price: 489,
    oldPrice: 640,
    rating: 4.8,
    reviews: 214,
    bestSeller: true,
    colors: ['#1a2238', '#c9ac8b', '#0b1220'],
    sizes: ['S', 'M', 'L', 'XL'],
    description:
      'A double-faced cashmere coat tailored in Italy. Effortlessly elegant with a relaxed silhouette and signature horn buttons.',
    image:
      'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=800&q=80&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80&auto=format&fit=crop',
    ],
  },
  {
    id: 2,
    name: 'Noir Pro Wireless Headphones',
    brand: 'Sonexa',
    category: 'electronics',
    price: 299,
    oldPrice: 379,
    rating: 4.9,
    reviews: 512,
    bestSeller: true,
    colors: ['#0b1220', '#d4af37', '#f5efe6'],
    description:
      'Studio-grade active noise cancellation, 40-hour battery life and plush memory-foam cushions for all-day comfort.',
    image:
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&q=80&auto=format&fit=crop',
    ],
  },
  {
    id: 3,
    name: 'Celestia Automatic Watch',
    brand: 'Vernier',
    category: 'watches',
    price: 1290,
    oldPrice: 1590,
    rating: 4.7,
    reviews: 138,
    bestSeller: true,
    colors: ['#d4af37', '#0b1220', '#c9ac8b'],
    description:
      'A Swiss automatic movement housed in a 40mm sapphire-crystal case. Genuine alligator strap and 100m water resistance.',
    image:
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=800&q=80&auto=format&fit=crop',
    ],
  },
  {
    id: 4,
    name: 'Milano Leather Derby',
    brand: 'Corveau',
    category: 'shoes',
    price: 349,
    rating: 4.6,
    reviews: 96,
    colors: ['#3b2a1a', '#0b1220'],
    sizes: ['40', '41', '42', '43', '44', '45'],
    description:
      'Goodyear-welted derby shoes in full-grain Italian leather. Resoleable construction designed to age beautifully.',
    image:
      'https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=800&q=80&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1449505278894-297fdb3edbc1?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800&q=80&auto=format&fit=crop',
    ],
  },
  {
    id: 5,
    name: 'Heritage Tote Bag',
    brand: 'Atelier Vè',
    category: 'bags',
    price: 420,
    oldPrice: 520,
    rating: 4.8,
    reviews: 176,
    bestSeller: true,
    colors: ['#c9ac8b', '#0b1220', '#7a1f1f'],
    description:
      'A structured tote in vegetable-tanned leather with suede lining and a detachable shoulder strap. Handmade in Florence.',
    image:
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&q=80&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1591561954557-26941169b49e?w=800&q=80&auto=format&fit=crop',
    ],
  },
  {
    id: 6,
    name: 'Lumen Ceramic Vase Set',
    brand: 'Casa Nova',
    category: 'home-decor',
    price: 145,
    oldPrice: 189,
    rating: 4.5,
    reviews: 64,
    colors: ['#f5efe6', '#c9ac8b', '#1a2238'],
    description:
      'A trio of hand-thrown ceramic vases with a matte glaze finish. Each piece is unique and signed by the maker.',
    image:
      'https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=800&q=80&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1493106641515-6b5631de4bb9?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=800&q=80&auto=format&fit=crop',
    ],
  },
  {
    id: 7,
    name: 'Silk Slip Dress',
    brand: 'Maison Lux',
    category: 'fashion',
    price: 218,
    rating: 4.4,
    reviews: 88,
    colors: ['#7a1f1f', '#0b1220', '#c9ac8b'],
    sizes: ['XS', 'S', 'M', 'L'],
    description:
      '100% mulberry silk slip dress with a bias cut that drapes elegantly. A versatile staple from day to evening.',
    image:
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&q=80&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&q=80&auto=format&fit=crop',
    ],
  },
  {
    id: 8,
    name: 'Vista 4K Smart Camera',
    brand: 'Sonexa',
    category: 'electronics',
    price: 659,
    oldPrice: 799,
    rating: 4.7,
    reviews: 142,
    colors: ['#0b1220', '#c9ac8b'],
    description:
      'Mirrorless 4K camera with AI subject tracking, in-body stabilisation and a weather-sealed magnesium body.',
    image:
      'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&q=80&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1510127034890-ba27508e9f1c?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800&q=80&auto=format&fit=crop',
    ],
  },
  {
    id: 9,
    name: 'Onyx Chronograph Watch',
    brand: 'Vernier',
    category: 'watches',
    price: 875,
    rating: 4.6,
    reviews: 109,
    colors: ['#0b1220', '#d4af37'],
    description:
      'A bold chronograph with a brushed-steel case, luminous indices and a tachymeter bezel for the modern explorer.',
    image:
      'https://images.unsplash.com/photo-1533139502658-0198f920d8e8?w=800&q=80&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1533139502658-0198f920d8e8?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1434056886845-dac89ffe9b56?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1508057198894-247b23fe5ade?w=800&q=80&auto=format&fit=crop',
    ],
  },
  {
    id: 10,
    name: 'Cloud Runner Sneakers',
    brand: 'Corveau',
    category: 'shoes',
    price: 189,
    oldPrice: 240,
    rating: 4.5,
    reviews: 203,
    bestSeller: true,
    colors: ['#f5efe6', '#0b1220', '#d4af37'],
    sizes: ['39', '40', '41', '42', '43', '44'],
    description:
      'Featherweight knit sneakers with a responsive foam midsole and recycled-rubber outsole. Built for all-day comfort.',
    image:
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&q=80&auto=format&fit=crop',
    ],
  },
  {
    id: 11,
    name: 'Quilted Crossbody Bag',
    brand: 'Atelier Vè',
    category: 'bags',
    price: 310,
    rating: 4.3,
    reviews: 71,
    colors: ['#0b1220', '#7a1f1f', '#c9ac8b'],
    description:
      'A diamond-quilted lambskin crossbody with antique-gold hardware and a convertible chain strap.',
    image:
      'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=800&q=80&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1559563458-527698bf5295?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1594223274512-ad4803739b7c?w=800&q=80&auto=format&fit=crop',
    ],
  },
  {
    id: 12,
    name: 'Aria Linen Throw Blanket',
    brand: 'Casa Nova',
    category: 'home-decor',
    price: 98,
    oldPrice: 130,
    rating: 4.6,
    reviews: 54,
    colors: ['#f5efe6', '#c9ac8b', '#1a2238'],
    description:
      'A stonewashed pure-linen throw with hand-knotted tassels. Softens with every wash for cosy, lived-in luxury.',
    image:
      'https://images.unsplash.com/photo-1600369671236-e74521d4b6ad?w=800&q=80&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1600369671236-e74521d4b6ad?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1616627561839-074385245ff6?w=800&q=80&auto=format&fit=crop',
    ],
  },
  {
    id: 13,
    name: 'Tailored Wool Blazer',
    brand: 'Maison Lux',
    category: 'fashion',
    price: 365,
    oldPrice: 459,
    rating: 4.7,
    reviews: 121,
    colors: ['#1a2238', '#3b2a1a', '#0b1220'],
    sizes: ['S', 'M', 'L', 'XL'],
    description:
      'A single-breasted blazer in Super 120s wool with a half-canvas construction for a sharp, sculpted fit.',
    image:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?w=800&q=80&auto=format&fit=crop',
    ],
  },
  {
    id: 14,
    name: 'Pulse Smart Speaker',
    brand: 'Sonexa',
    category: 'electronics',
    price: 179,
    rating: 4.4,
    reviews: 167,
    colors: ['#0b1220', '#c9ac8b', '#f5efe6'],
    description:
      'Room-filling 360° sound with adaptive tuning and a fabric-wrapped enclosure that blends into any space.',
    image:
      'https://images.unsplash.com/photo-1589003077984-894e133dabab?w=800&q=80&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1589003077984-894e133dabab?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1558537348-c0f8e733989d?w=800&q=80&auto=format&fit=crop',
    ],
  },
  {
    id: 15,
    name: 'Suede Chelsea Boots',
    brand: 'Corveau',
    category: 'shoes',
    price: 279,
    oldPrice: 329,
    rating: 4.5,
    reviews: 84,
    colors: ['#3b2a1a', '#0b1220', '#c9ac8b'],
    sizes: ['40', '41', '42', '43', '44'],
    description:
      'Italian suede Chelsea boots with elastic side panels and a cushioned leather footbed. Understated and versatile.',
    image:
      'https://images.unsplash.com/photo-1638247025967-b4e38f787b76?w=800&q=80&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1638247025967-b4e38f787b76?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1605812860427-4024433a70fd?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1520639888713-7851133b1ed0?w=800&q=80&auto=format&fit=crop',
    ],
  },
  {
    id: 16,
    name: 'Marble Table Lamp',
    brand: 'Casa Nova',
    category: 'home-decor',
    price: 165,
    rating: 4.6,
    reviews: 49,
    colors: ['#f5efe6', '#1a2238', '#d4af37'],
    description:
      'A sculptural table lamp with a Carrara marble base and brushed-brass stem. Warm dimmable light for cosy evenings.',
    image:
      'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&q=80&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1517991104123-1d56a6e81ed9?w=800&q=80&auto=format&fit=crop',
    ],
  },
]

// Derived helpers
export const bestSellers = products.filter((p) => p.bestSeller)

export const priceBounds = {
  min: Math.min(...products.map((p) => p.price)),
  max: Math.max(...products.map((p) => p.price)),
}
