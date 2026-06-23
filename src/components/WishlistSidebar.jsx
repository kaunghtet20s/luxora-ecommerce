import { AnimatePresence, motion } from 'framer-motion'
import { Heart, ShoppingBag, Trash2, X } from 'lucide-react'
import { products } from '../data/products'
import { useShop } from '../context/ShopContext'
import { formatPrice } from '../utils/format'

export default function WishlistSidebar() {
  const {
    wishlist,
    isWishlistOpen,
    closeWishlist,
    toggleWishlist,
    addToCart,
  } = useShop()

  const items = products.filter((p) => wishlist.includes(p.id))

  return (
    <AnimatePresence>
      {isWishlistOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-[80] bg-navy-950/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeWishlist}
          />

          <motion.aside
            className="fixed right-0 top-0 z-[85] flex h-full w-full max-w-md flex-col bg-white dark:bg-navy-900 shadow-card"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 34 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-navy-900/10 dark:border-white/10 p-6">
              <div className="flex items-center gap-2">
                <Heart size={20} className="text-gold-500" />
                <h2 className="heading-serif text-xl">Your Wishlist</h2>
                <span className="rounded-full bg-gold-400/20 px-2 py-0.5 text-xs font-bold text-gold-600">
                  {items.length}
                </span>
              </div>
              <button
                onClick={closeWishlist}
                aria-label="Close wishlist"
                className="grid h-10 w-10 place-items-center rounded-full hover:bg-navy-900/5 dark:hover:bg-white/10"
              >
                <X size={20} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
                  <div className="grid h-20 w-20 place-items-center rounded-full bg-beige-100 dark:bg-navy-800">
                    <Heart size={32} className="text-gold-400" />
                  </div>
                  <p className="text-lg font-semibold">Your wishlist is empty</p>
                  <p className="max-w-xs text-sm text-navy-500 dark:text-beige-200/80">
                    Tap the heart on any product to save it here for later.
                  </p>
                  <button onClick={closeWishlist} className="btn-gold px-6 py-2.5 text-sm">
                    Discover Products
                  </button>
                </div>
              ) : (
                <ul className="flex flex-col gap-4">
                  <AnimatePresence initial={false}>
                    {items.map((item) => (
                      <motion.li
                        key={item.id}
                        layout
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 40, height: 0 }}
                        className="flex gap-4 rounded-2xl bg-beige-50 dark:bg-navy-800/60 p-3"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-20 w-20 shrink-0 rounded-xl object-cover"
                        />
                        <div className="flex flex-1 flex-col">
                          <div className="flex items-start justify-between gap-2">
                            <div className="min-w-0">
                              <p className="truncate text-sm font-semibold">{item.name}</p>
                              <p className="text-xs text-navy-400 dark:text-beige-200/70">
                                {item.brand}
                              </p>
                              <p className="mt-1 text-sm font-bold text-gold-600">
                                {formatPrice(item.price)}
                              </p>
                            </div>
                            <button
                              onClick={() => toggleWishlist(item)}
                              aria-label="Remove from wishlist"
                              className="text-navy-400 hover:text-red-500 transition-colors"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>

                          <button
                            onClick={() => addToCart(item, 1)}
                            className="mt-2 inline-flex items-center justify-center gap-1.5 self-start rounded-full bg-navy-900 px-3 py-1.5 text-xs font-medium text-beige-50 hover:bg-navy-800 dark:bg-gold-400 dark:text-navy-900 dark:hover:bg-gold-500 transition-colors"
                          >
                            <ShoppingBag size={13} /> Add to Cart
                          </button>
                        </div>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-navy-900/10 dark:border-white/10 p-6">
                <button
                  onClick={() => items.forEach((item) => addToCart(item, 1))}
                  className="btn-gold w-full py-3.5"
                >
                  <ShoppingBag size={18} /> Add All to Cart
                </button>
                <button
                  onClick={closeWishlist}
                  className="mt-2 w-full py-2 text-center text-sm font-medium text-navy-500 hover:text-gold-500 transition-colors"
                >
                  Continue shopping
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
