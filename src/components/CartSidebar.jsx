import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react'
import { useShop } from '../context/ShopContext'
import { formatPrice } from '../utils/format'
import AnimatedNumber from './ui/AnimatedNumber'

const FREE_SHIP_THRESHOLD = 250

export default function CartSidebar() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateQty,
    removeFromCart,
    cartSubtotal,
    cartCount,
    goToCheckout,
  } = useShop()

  const remaining = Math.max(0, FREE_SHIP_THRESHOLD - cartSubtotal)
  const progress = Math.min(100, (cartSubtotal / FREE_SHIP_THRESHOLD) * 100)

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-[80] bg-navy-950/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
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
                <ShoppingBag size={20} className="text-gold-500" />
                <h2 className="heading-serif text-xl">Your Cart</h2>
                <span className="rounded-full bg-gold-400/20 px-2 py-0.5 text-xs font-bold text-gold-600">
                  {cartCount}
                </span>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                aria-label="Close cart"
                className="grid h-10 w-10 place-items-center rounded-full hover:bg-navy-900/5 dark:hover:bg-white/10"
              >
                <X size={20} />
              </button>
            </div>

            {/* Free shipping progress */}
            {cart.length > 0 && (
              <div className="border-b border-navy-900/10 dark:border-white/10 px-6 py-4">
                <p className="text-xs text-navy-500 dark:text-beige-200/80">
                  {remaining > 0 ? (
                    <>
                      Add <span className="font-semibold text-gold-600">{formatPrice(remaining)}</span>{' '}
                      more for free shipping
                    </>
                  ) : (
                    <span className="font-semibold text-gold-600">You’ve unlocked free shipping! 🎉</span>
                  )}
                </p>
                <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-navy-900/10 dark:bg-white/10">
                  <motion.div
                    className="h-full rounded-full bg-gold-400"
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>
            )}

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {cart.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
                  <div className="grid h-20 w-20 place-items-center rounded-full bg-beige-100 dark:bg-navy-800">
                    <ShoppingBag size={32} className="text-gold-400" />
                  </div>
                  <p className="text-lg font-semibold">Your cart is empty</p>
                  <p className="max-w-xs text-sm text-navy-500 dark:text-beige-200/80">
                    Looks like you haven’t added anything yet. Let’s change that.
                  </p>
                  <button onClick={() => setIsCartOpen(false)} className="btn-gold px-6 py-2.5 text-sm">
                    Start Shopping
                  </button>
                </div>
              ) : (
                <ul className="flex flex-col gap-4">
                  <AnimatePresence initial={false}>
                    {cart.map((item) => (
                      <motion.li
                        key={item.key}
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
                                {item.selectedSize ? ` · Size ${item.selectedSize}` : ''}
                              </p>
                            </div>
                            <button
                              onClick={() => removeFromCart(item.key)}
                              aria-label="Remove item"
                              className="text-navy-400 hover:text-red-500 transition-colors"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>

                          <div className="mt-auto flex items-center justify-between pt-2">
                            <div className="flex items-center rounded-full border border-navy-900/15 dark:border-white/15">
                              <button
                                onClick={() => updateQty(item.key, -1)}
                                className="grid h-7 w-7 place-items-center rounded-full hover:text-gold-500"
                                aria-label="Decrease quantity"
                              >
                                <Minus size={13} />
                              </button>
                              <span className="w-6 text-center text-sm font-semibold">{item.qty}</span>
                              <button
                                onClick={() => updateQty(item.key, 1)}
                                className="grid h-7 w-7 place-items-center rounded-full hover:text-gold-500"
                                aria-label="Increase quantity"
                              >
                                <Plus size={13} />
                              </button>
                            </div>
                            <span className="text-sm font-bold text-gold-600">
                              {formatPrice(item.price * item.qty)}
                            </span>
                          </div>
                        </div>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="border-t border-navy-900/10 dark:border-white/10 p-6">
                <div className="flex items-center justify-between">
                  <span className="text-navy-500 dark:text-beige-200/80">Subtotal</span>
                  <AnimatedNumber
                    value={cartSubtotal}
                    className="text-2xl font-bold heading-serif text-navy-900 dark:text-beige-50"
                  />
                </div>
                <p className="mt-1 text-xs text-navy-400 dark:text-beige-200/60">
                  Shipping &amp; taxes calculated at checkout.
                </p>
                <button onClick={goToCheckout} className="btn-gold mt-4 w-full py-3.5 group">
                  Checkout
                  <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                </button>
                <button
                  onClick={() => setIsCartOpen(false)}
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
