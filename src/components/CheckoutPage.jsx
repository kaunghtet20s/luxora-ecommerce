import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  ArrowLeft,
  CreditCard,
  Lock,
  CheckCircle2,
  ShoppingBag,
  Truck,
} from 'lucide-react'
import { useShop } from '../context/ShopContext'
import { formatPrice } from '../utils/format'
import AnimatedNumber from './ui/AnimatedNumber'

export default function CheckoutPage() {
  const { cart, cartSubtotal, goToHome, clearCart, addToast } = useShop()
  const [placed, setPlaced] = useState(false)

  const shipping = cartSubtotal >= 250 || cartSubtotal === 0 ? 0 : 15
  const tax = Math.round(cartSubtotal * 0.08)
  const total = cartSubtotal + shipping + tax

  const placeOrder = (e) => {
    e.preventDefault()
    setPlaced(true)
    addToast('Order placed successfully! 🎉', 'success')
    clearCart()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (placed) {
    return (
      <div className="container-px mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center py-32 text-center">
        <motion.div
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          className="grid h-24 w-24 place-items-center rounded-full bg-gold-400/20 text-gold-500"
        >
          <CheckCircle2 size={56} />
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="heading-serif mt-8 text-3xl sm:text-4xl"
        >
          Thank you for your order!
        </motion.h1>
        <p className="mt-4 max-w-md text-navy-500 dark:text-beige-200/80">
          Your order has been confirmed and a receipt is on its way to your inbox. We can’t
          wait for you to enjoy your new pieces.
        </p>
        <button onClick={goToHome} className="btn-gold mt-8 px-7 py-3.5 text-sm">
          Continue Shopping
        </button>
      </div>
    )
  }

  return (
    <div className="container-px mx-auto max-w-[1400px] py-28 lg:py-32">
      <button
        onClick={goToHome}
        className="group mb-8 inline-flex items-center gap-2 text-sm font-medium text-navy-500 hover:text-gold-500 transition-colors"
      >
        <ArrowLeft size={18} className="transition-transform group-hover:-translate-x-1" />
        Back to store
      </button>

      <h1 className="heading-serif text-3xl sm:text-4xl">Checkout</h1>

      {cart.length === 0 ? (
        <div className="mt-10 flex flex-col items-center gap-4 rounded-3xl border border-dashed border-navy-900/15 dark:border-white/15 py-20 text-center">
          <ShoppingBag size={40} className="text-gold-400" />
          <p className="text-lg font-semibold">Your cart is empty</p>
          <button onClick={goToHome} className="btn-gold px-6 py-2.5 text-sm">
            Browse products
          </button>
        </div>
      ) : (
        <div className="mt-10 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
          {/* Form */}
          <form onSubmit={placeOrder} className="flex flex-col gap-6">
            <Card title="Contact information" icon={ShoppingBag}>
              <div className="grid gap-4 sm:grid-cols-2">
                <Input label="First name" placeholder="Jane" required />
                <Input label="Last name" placeholder="Doe" required />
                <Input label="Email" type="email" placeholder="jane@email.com" required className="sm:col-span-2" />
                <Input label="Phone" type="tel" placeholder="+1 (555) 000-0000" className="sm:col-span-2" />
              </div>
            </Card>

            <Card title="Shipping address" icon={Truck}>
              <div className="grid gap-4 sm:grid-cols-2">
                <Input label="Address" placeholder="128 Madison Avenue" required className="sm:col-span-2" />
                <Input label="City" placeholder="New York" required />
                <Input label="State / Region" placeholder="NY" required />
                <Input label="ZIP code" placeholder="10016" required />
                <Input label="Country" placeholder="United States" required />
              </div>
            </Card>

            <Card title="Payment" icon={CreditCard}>
              <div className="grid gap-4 sm:grid-cols-2">
                <Input label="Card number" placeholder="4242 4242 4242 4242" required className="sm:col-span-2" />
                <Input label="Name on card" placeholder="Jane Doe" required className="sm:col-span-2" />
                <Input label="Expiry" placeholder="MM / YY" required />
                <Input label="CVC" placeholder="123" required />
              </div>
              <p className="mt-4 flex items-center gap-2 text-xs text-navy-400 dark:text-beige-200/60">
                <Lock size={14} className="text-gold-500" /> Your payment is encrypted and secure.
              </p>
            </Card>
          </form>

          {/* Summary */}
          <div className="lg:sticky lg:top-28 h-fit">
            <div className="glass rounded-3xl p-6 shadow-soft">
              <h3 className="heading-serif text-xl">Order Summary</h3>

              <ul className="mt-5 flex flex-col gap-4">
                {cart.map((item) => (
                  <li key={item.key} className="flex gap-3">
                    <div className="relative">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-16 w-16 rounded-xl object-cover"
                      />
                      <span className="absolute -right-2 -top-2 grid h-6 w-6 place-items-center rounded-full bg-navy-900 text-[11px] font-bold text-gold-400">
                        {item.qty}
                      </span>
                    </div>
                    <div className="flex flex-1 items-center justify-between gap-2">
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold">{item.name}</p>
                        <p className="text-xs text-navy-400 dark:text-beige-200/70">{item.brand}</p>
                      </div>
                      <span className="text-sm font-semibold">{formatPrice(item.price * item.qty)}</span>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex flex-col gap-2.5 border-t border-navy-900/10 dark:border-white/10 pt-5 text-sm">
                <Row label="Subtotal" value={formatPrice(cartSubtotal)} />
                <Row label="Shipping" value={shipping === 0 ? 'Free' : formatPrice(shipping)} />
                <Row label="Estimated tax" value={formatPrice(tax)} />
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-navy-900/10 dark:border-white/10 pt-4">
                <span className="font-semibold">Total</span>
                <AnimatedNumber
                  value={total}
                  className="heading-serif text-2xl font-bold text-gold-600"
                />
              </div>

              <button onClick={placeOrder} className="btn-gold mt-6 w-full py-3.5">
                <Lock size={16} /> Place Order · {formatPrice(total)}
              </button>
              <p className="mt-3 text-center text-xs text-navy-400 dark:text-beige-200/60">
                By placing your order you agree to our Terms &amp; Privacy Policy.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function Card({ title, icon: Icon, children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass rounded-3xl p-6 shadow-soft"
    >
      <h3 className="flex items-center gap-2 heading-serif text-lg">
        <Icon size={18} className="text-gold-500" /> {title}
      </h3>
      <div className="mt-5">{children}</div>
    </motion.div>
  )
}

function Input({ label, className = '', ...props }) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-navy-500 dark:text-beige-200/80">
        {label}
      </span>
      <input
        {...props}
        className="w-full rounded-xl border border-navy-900/10 dark:border-white/12 bg-white/60 dark:bg-navy-800/50 px-4 py-2.5 text-sm outline-none transition-all focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 dark:text-beige-50"
      />
    </label>
  )
}

function Row({ label, value }) {
  return (
    <div className="flex items-center justify-between text-navy-500 dark:text-beige-200/80">
      <span>{label}</span>
      <span className="font-medium text-navy-900 dark:text-beige-50">{value}</span>
    </div>
  )
}
