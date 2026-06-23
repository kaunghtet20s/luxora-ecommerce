import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Heart, Minus, Move3d, Plus, ShoppingBag, Truck, RotateCcw, X } from 'lucide-react'
import { useShop } from '../context/ShopContext'
import { formatPrice, discountPercent } from '../utils/format'
import StarRating from './ui/StarRating'

export default function ProductModal() {
  const { quickViewProduct, closeQuickView, addToCart, toggleWishlist, isWished, open3DView } =
    useShop()
  const product = quickViewProduct

  const [activeImg, setActiveImg] = useState(0)
  const [qty, setQty] = useState(1)
  const [size, setSize] = useState(null)
  const [color, setColor] = useState(null)

  // Reset local state whenever a new product opens
  useEffect(() => {
    if (product) {
      setActiveImg(0)
      setQty(1)
      setSize(product.sizes?.[0] ?? null)
      setColor(product.colors?.[0] ?? null)
    }
  }, [product])

  // Close on Escape
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && closeQuickView()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [closeQuickView])

  // Lock scroll while open
  useEffect(() => {
    document.body.style.overflow = product ? 'hidden' : ''
    return () => (document.body.style.overflow = '')
  }, [product])

  return (
    <AnimatePresence>
      {product && (
        <motion.div
          className="fixed inset-0 z-[90] flex items-center justify-center p-4 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-navy-950/60 backdrop-blur-sm"
            onClick={closeQuickView}
          />

          {/* Dialog */}
          <motion.div
            role="dialog"
            aria-modal="true"
            initial={{ opacity: 0, scale: 0.94, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 24 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="relative z-10 grid w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white dark:bg-navy-900 shadow-card md:grid-cols-2"
          >
            <button
              onClick={closeQuickView}
              aria-label="Close"
              className="absolute right-4 top-4 z-20 grid h-10 w-10 place-items-center rounded-full bg-white/90 dark:bg-navy-800/90 shadow-soft hover:scale-105 transition-transform"
            >
              <X size={18} />
            </button>

            {/* Gallery */}
            <div className="bg-beige-100 dark:bg-navy-800 p-5 sm:p-6">
              <div className="relative aspect-square overflow-hidden rounded-2xl">
                <button
                  onClick={() => open3DView(product)}
                  className="absolute left-3 top-3 z-10 flex items-center gap-1.5 rounded-full bg-navy-900/85 px-3 py-1.5 text-xs font-semibold text-gold-400 backdrop-blur transition-transform hover:scale-105"
                >
                  <Move3d size={14} /> View in 3D
                </button>
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeImg}
                    src={product.images?.[activeImg] ?? product.image}
                    alt={product.name}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="h-full w-full object-cover"
                  />
                </AnimatePresence>
              </div>

              {product.images?.length > 1 && (
                <div className="mt-4 flex gap-3">
                  {product.images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImg(i)}
                      className={`relative h-16 w-16 overflow-hidden rounded-xl ring-2 transition-all ${
                        activeImg === i ? 'ring-gold-400' : 'ring-transparent opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="" className="h-full w-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Details */}
            <div className="flex flex-col p-6 sm:p-8">
              <p className="text-xs font-medium uppercase tracking-wider text-gold-500">
                {product.brand}
              </p>
              <h2 className="heading-serif mt-1 text-2xl sm:text-3xl">{product.name}</h2>

              <div className="mt-3 flex items-center gap-3">
                <StarRating rating={product.rating} showValue />
                <span className="text-sm text-navy-400 dark:text-beige-200/70">
                  {product.reviews} reviews
                </span>
              </div>

              <div className="mt-4 flex items-end gap-3">
                <span className="text-3xl font-bold text-navy-900 dark:text-beige-50">
                  {formatPrice(product.price)}
                </span>
                {product.oldPrice && (
                  <>
                    <span className="mb-1 text-lg text-navy-400 line-through dark:text-beige-200/60">
                      {formatPrice(product.oldPrice)}
                    </span>
                    <span className="mb-1 rounded-full bg-gold-400/20 px-2 py-0.5 text-xs font-bold text-gold-600">
                      Save {discountPercent(product.price, product.oldPrice)}%
                    </span>
                  </>
                )}
              </div>

              <p className="mt-4 text-sm leading-relaxed text-navy-500 dark:text-beige-200/80">
                {product.description}
              </p>

              {/* Colors */}
              {product.colors?.length > 0 && (
                <div className="mt-5">
                  <p className="text-xs font-semibold uppercase tracking-wider text-navy-500 dark:text-beige-200/80">
                    Colour
                  </p>
                  <div className="mt-2 flex gap-2">
                    {product.colors.map((c) => (
                      <button
                        key={c}
                        onClick={() => setColor(c)}
                        aria-label={`Colour ${c}`}
                        className={`h-8 w-8 rounded-full ring-2 ring-offset-2 ring-offset-white dark:ring-offset-navy-900 transition-all ${
                          color === c ? 'ring-gold-400 scale-110' : 'ring-transparent'
                        }`}
                        style={{ backgroundColor: c }}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Sizes */}
              {product.sizes?.length > 0 && (
                <div className="mt-5">
                  <p className="text-xs font-semibold uppercase tracking-wider text-navy-500 dark:text-beige-200/80">
                    Size
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {product.sizes.map((s) => (
                      <button
                        key={s}
                        onClick={() => setSize(s)}
                        className={`min-w-[44px] rounded-xl border px-3 py-2 text-sm font-medium transition-all ${
                          size === s
                            ? 'border-gold-400 bg-gold-400/10 text-gold-600'
                            : 'border-navy-900/15 dark:border-white/15 hover:border-gold-400'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity + actions */}
              <div className="mt-6 flex items-center gap-4">
                <div className="flex items-center rounded-full border border-navy-900/15 dark:border-white/15">
                  <button
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    className="grid h-10 w-10 place-items-center rounded-full hover:text-gold-500"
                    aria-label="Decrease quantity"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="w-8 text-center font-semibold">{qty}</span>
                  <button
                    onClick={() => setQty((q) => q + 1)}
                    className="grid h-10 w-10 place-items-center rounded-full hover:text-gold-500"
                    aria-label="Increase quantity"
                  >
                    <Plus size={16} />
                  </button>
                </div>

                <button
                  onClick={() => {
                    addToCart(product, qty, { size, color })
                    closeQuickView()
                  }}
                  className="btn-gold flex-1 py-3 text-sm"
                >
                  <ShoppingBag size={18} /> Add to Cart
                </button>

                <button
                  onClick={() => toggleWishlist(product)}
                  aria-label="Add to wishlist"
                  className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-navy-900/15 dark:border-white/15 hover:border-gold-400"
                >
                  <Heart
                    size={20}
                    className={isWished(product.id) ? 'fill-gold-400 text-gold-400' : ''}
                  />
                </button>
              </div>

              {/* Perks */}
              <div className="mt-6 grid grid-cols-2 gap-3 border-t border-navy-900/10 dark:border-white/10 pt-5 text-xs text-navy-500 dark:text-beige-200/80">
                <span className="flex items-center gap-2">
                  <Truck size={16} className="text-gold-500" /> Free express shipping
                </span>
                <span className="flex items-center gap-2">
                  <RotateCcw size={16} className="text-gold-500" /> 30-day returns
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
