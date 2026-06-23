import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle2, Mail, Sparkles } from 'lucide-react'
import { useShop } from '../context/ShopContext'

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function Newsletter() {
  const { addToast } = useShop()
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [done, setDone] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.')
      return
    }
    setError('')
    setDone(true)
    addToast('Welcome to the Luxora club! 🎉', 'success')
  }

  return (
    <section className="section-pad container-px mx-auto max-w-[1400px]">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7 }}
        className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-gold-400 to-gold-500 px-6 py-14 sm:px-12 lg:px-20 text-navy-900"
      >
        <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/20 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-16 -left-10 h-64 w-64 rounded-full bg-navy-900/10 blur-2xl" />

        <div className="relative mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em]">
            <Sparkles size={14} /> Exclusive access
          </span>
          <h2 className="heading-serif mt-4 text-3xl sm:text-4xl lg:text-5xl">
            Join Our Exclusive Club
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-navy-900/80">
            Be the first to know about new arrivals, private sales and members-only offers.
            Get <span className="font-bold">15% off</span> your first order.
          </p>

          <AnimatePresence mode="wait">
            {done ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mx-auto mt-8 flex max-w-md items-center justify-center gap-3 rounded-2xl bg-navy-900 px-6 py-4 text-beige-50"
              >
                <CheckCircle2 className="text-gold-400" />
                <span className="font-medium">You’re in! Check your inbox for your 15% code.</span>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="mx-auto mt-8 max-w-md"
                noValidate
              >
                <div className="flex flex-col gap-3 sm:flex-row">
                  <div className="flex flex-1 items-center gap-2 rounded-full bg-white px-5 py-3.5 shadow-soft">
                    <Mail size={18} className="text-gold-500" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value)
                        if (error) setError('')
                      }}
                      placeholder="Enter your email"
                      className="flex-1 bg-transparent text-sm text-navy-900 outline-none placeholder:text-navy-400"
                    />
                  </div>
                  <button type="submit" className="btn-dark px-7 py-3.5 text-sm">
                    Subscribe
                  </button>
                </div>
                <AnimatePresence>
                  {error && (
                    <motion.p
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="mt-3 text-sm font-medium text-navy-900"
                    >
                      {error}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </section>
  )
}
