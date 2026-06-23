import { motion } from 'framer-motion'
import { Eye, Heart, Move3d, ShoppingBag } from 'lucide-react'
import { useShop } from '../context/ShopContext'
import { formatPrice, discountPercent } from '../utils/format'
import StarRating from './ui/StarRating'

export default function ProductCard({ product }) {
  const { addToCart, toggleWishlist, isWished, openQuickView, open3DView } = useShop()
  const wished = isWished(product.id)
  const discount = discountPercent(product.price, product.oldPrice)

  return (
    <motion.article
      layout
      variants={{
        hidden: { opacity: 0, y: 40 },
        show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
      }}
      whileHover={{ y: -8 }}
      className="group relative flex flex-col overflow-hidden rounded-3xl bg-white dark:bg-navy-900/70 shadow-soft hover:shadow-card transition-shadow"
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-beige-100 dark:bg-navy-800">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Badges */}
        <div className="absolute left-3 top-3 flex flex-col gap-2">
          {product.bestSeller && (
            <span className="rounded-full bg-navy-900 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-gold-400">
              Best Seller
            </span>
          )}
          {discount > 0 && (
            <span className="rounded-full bg-gold-400 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-navy-900">
              -{discount}%
            </span>
          )}
        </div>

        {/* Wishlist */}
        <button
          onClick={() => toggleWishlist(product)}
          aria-label="Toggle wishlist"
          className="absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full bg-white/90 dark:bg-navy-900/90 backdrop-blur shadow-soft transition-transform hover:scale-110"
        >
          <motion.span animate={wished ? { scale: [1, 1.3, 1] } : { scale: 1 }} transition={{ duration: 0.3 }}>
            <Heart
              size={18}
              className={wished ? 'fill-gold-400 text-gold-400' : 'text-navy-500 dark:text-beige-200'}
            />
          </motion.span>
        </button>

        {/* Hover actions */}
        <div className="absolute inset-x-3 bottom-3 flex translate-y-4 gap-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <button
            onClick={() => addToCart(product, 1)}
            className="btn-gold flex-1 py-2.5 text-xs"
          >
            <ShoppingBag size={15} /> Add to Cart
          </button>
          <button
            onClick={() => open3DView(product)}
            aria-label="View in 3D"
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white/90 dark:bg-navy-900/90 backdrop-blur text-navy-900 dark:text-beige-50 shadow-soft hover:bg-white"
          >
            <Move3d size={18} />
          </button>
          <button
            onClick={() => openQuickView(product)}
            aria-label="Quick view"
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white/90 dark:bg-navy-900/90 backdrop-blur text-navy-900 dark:text-beige-50 shadow-soft hover:bg-white"
          >
            <Eye size={18} />
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs font-medium uppercase tracking-wider text-gold-500">{product.brand}</p>
        <h3 className="mt-1 line-clamp-1 font-semibold text-navy-900 dark:text-beige-50">
          {product.name}
        </h3>

        <div className="mt-2 flex items-center gap-2">
          <StarRating rating={product.rating} />
          <span className="text-xs text-navy-400 dark:text-beige-200/70">({product.reviews})</span>
        </div>

        <div className="mt-3 flex items-end gap-2">
          <span className="text-lg font-bold text-navy-900 dark:text-beige-50">
            {formatPrice(product.price)}
          </span>
          {product.oldPrice && (
            <span className="mb-0.5 text-sm text-navy-400 line-through dark:text-beige-200/60">
              {formatPrice(product.oldPrice)}
            </span>
          )}
        </div>
      </div>
    </motion.article>
  )
}
