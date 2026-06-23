import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { SlidersHorizontal, Search, X } from 'lucide-react'
import { products, priceBounds } from '../data/products'
import { categoryFilters } from '../data/categories'
import { useShop } from '../context/ShopContext'
import { formatPrice } from '../utils/format'
import ProductCard from './ProductCard'
import { SectionHeading } from './ui/Reveal'

const sortOptions = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Top Rated' },
]

export default function ProductSection({ category, setCategory }) {
  const { searchQuery, setSearchQuery } = useShop()
  const [sort, setSort] = useState('featured')
  const [maxPrice, setMaxPrice] = useState(priceBounds.max)

  const filtered = useMemo(() => {
    let list = [...products]

    if (category !== 'all') list = list.filter((p) => p.category === category)

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      )
    }

    list = list.filter((p) => p.price <= maxPrice)

    switch (sort) {
      case 'price-asc':
        list.sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        list.sort((a, b) => b.price - a.price)
        break
      case 'rating':
        list.sort((a, b) => b.rating - a.rating)
        break
      default:
        break
    }
    return list
  }, [category, searchQuery, maxPrice, sort])

  const resetFilters = () => {
    setCategory('all')
    setSearchQuery('')
    setSort('featured')
    setMaxPrice(priceBounds.max)
  }

  return (
    <section id="shop" className="section-pad container-px mx-auto max-w-[1400px]">
      <SectionHeading
        eyebrow="Our collection"
        title="Premium Products"
        subtitle="Find your next favourite piece. Filter, search and sort through our hand-selected range."
      />

      {/* Toolbar */}
      <div className="mt-12 glass rounded-3xl p-5 shadow-soft">
        {/* Search + sort row */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
          <div className="flex flex-1 items-center gap-3 rounded-full bg-white/70 dark:bg-navy-800/60 px-4 py-2.5">
            <Search size={18} className="text-gold-500" />
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products…"
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-navy-400 dark:placeholder:text-beige-200/60"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} aria-label="Clear search">
                <X size={16} className="text-navy-400 hover:text-navy-900 dark:hover:text-white" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 rounded-full bg-white/70 dark:bg-navy-800/60 px-4 py-2.5 text-sm">
              <SlidersHorizontal size={16} className="text-gold-500" />
              <span className="text-navy-500 dark:text-beige-200/80">Sort</span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="cursor-pointer bg-transparent font-medium outline-none"
              >
                {sortOptions.map((o) => (
                  <option key={o.value} value={o.value} className="text-navy-900">
                    {o.label}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>

        {/* Category chips + price range */}
        <div className="mt-4 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-2">
            {categoryFilters.map((c) => (
              <button
                key={c.id}
                onClick={() => setCategory(c.id)}
                className={`rounded-full px-4 py-2 text-xs font-medium transition-all ${
                  category === c.id
                    ? 'bg-navy-900 text-gold-400 dark:bg-gold-400 dark:text-navy-900 shadow-soft'
                    : 'bg-white/70 dark:bg-navy-800/60 text-navy-600 dark:text-beige-200 hover:text-gold-500'
                }`}
              >
                {c.name}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 lg:min-w-[260px]">
            <span className="whitespace-nowrap text-xs font-medium text-navy-500 dark:text-beige-200/80">
              Max {formatPrice(maxPrice)}
            </span>
            <input
              type="range"
              min={priceBounds.min}
              max={priceBounds.max}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="flex-1 accent-gold-400 cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Results meta */}
      <div className="mt-6 flex items-center justify-between">
        <p className="text-sm text-navy-500 dark:text-beige-200/80">
          Showing <span className="font-semibold text-navy-900 dark:text-beige-50">{filtered.length}</span>{' '}
          of {products.length} products
        </p>
        <button
          onClick={resetFilters}
          className="text-sm font-medium text-gold-500 hover:text-gold-600 transition-colors"
        >
          Reset filters
        </button>
      </div>

      {/* Grid */}
      <motion.div
        layout
        className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        initial="hidden"
        animate="show"
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((product) => (
            <motion.div
              key={product.id}
              layout
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Empty state */}
      {filtered.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-12 flex flex-col items-center gap-4 rounded-3xl border border-dashed border-navy-900/15 dark:border-white/15 py-16 text-center"
        >
          <Search size={40} className="text-gold-400" />
          <p className="text-lg font-semibold">No products found</p>
          <p className="max-w-sm text-sm text-navy-500 dark:text-beige-200/80">
            Try adjusting your search or filters to find what you’re looking for.
          </p>
          <button onClick={resetFilters} className="btn-gold px-6 py-2.5 text-sm">
            Clear all filters
          </button>
        </motion.div>
      )}
    </section>
  )
}
