import { motion } from 'framer-motion'
import { ArrowRight, ShieldCheck, Sparkles, Star, Truck } from 'lucide-react'
import { formatPrice } from '../utils/format'

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
}

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
}

export default function Hero() {
  const scrollToShop = () =>
    document.querySelector('#shop')?.scrollIntoView({ behavior: 'smooth' })
  const scrollToCategories = () =>
    document.querySelector('#categories')?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section
      id="home"
      className="relative min-h-screen overflow-hidden pt-28 lg:pt-32"
    >
      {/* Background flourishes */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-gold-400/20 blur-3xl" />
        <div className="absolute top-1/3 -right-24 h-96 w-96 rounded-full bg-navy-400/20 blur-3xl" />
      </div>

      <div className="container-px mx-auto max-w-[1400px] grid lg:grid-cols-2 gap-12 items-center pb-20">
        {/* Copy */}
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.span variants={item} className="eyebrow">
            <Sparkles size={14} /> New Season · 2026 Collection
          </motion.span>

          <motion.h1
            variants={item}
            className="heading-serif mt-5 text-4xl sm:text-5xl xl:text-6xl leading-[1.08]"
          >
            Discover Premium Products for{' '}
            <span className="text-gradient-gold animate-shimmer">Modern Living</span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-6 max-w-lg text-base sm:text-lg text-navy-500 dark:text-beige-200/80 leading-relaxed"
          >
            Curated luxury for the everyday. From handcrafted timepieces to refined home
            essentials — experience quality, elegance, and a lifestyle worth investing in.
          </motion.p>

          <motion.div variants={item} className="mt-8 flex flex-wrap items-center gap-4">
            <button onClick={scrollToShop} className="btn-gold group px-7 py-3.5 text-sm">
              Shop Now
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </button>
            <button onClick={scrollToCategories} className="btn-outline px-7 py-3.5 text-sm">
              Explore Collection
            </button>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            variants={item}
            className="mt-10 flex flex-wrap gap-x-8 gap-y-4 text-sm text-navy-500 dark:text-beige-200/80"
          >
            <span className="flex items-center gap-2">
              <Truck size={18} className="text-gold-500" /> Free worldwide shipping
            </span>
            <span className="flex items-center gap-2">
              <ShieldCheck size={18} className="text-gold-500" /> 2-year warranty
            </span>
          </motion.div>
        </motion.div>

        {/* Visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="relative"
        >
          <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-3xl shadow-card">
            <img
              src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=900&q=80&auto=format&fit=crop"
              alt="Premium lifestyle shopping"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-950/40 to-transparent" />
          </div>

          {/* Floating product preview card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="absolute -left-3 sm:-left-8 bottom-10 w-60 animate-float"
          >
            <div className="glass rounded-2xl p-4 shadow-card">
              <div className="flex items-center gap-3">
                <img
                  src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&q=80&auto=format&fit=crop"
                  alt="Celestia Automatic Watch"
                  className="h-14 w-14 rounded-xl object-cover"
                />
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold">Celestia Watch</p>
                  <div className="flex items-center gap-1 text-xs text-navy-500 dark:text-beige-200">
                    <Star size={12} className="fill-gold-400 text-gold-400" /> 4.7 · Bestseller
                  </div>
                  <p className="mt-0.5 text-sm font-bold text-gold-500">{formatPrice(1290)}</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Floating rating chip */}
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="absolute -right-2 sm:-right-6 top-10 glass rounded-2xl px-4 py-3 shadow-card animate-float"
            style={{ animationDelay: '1.5s' }}
          >
            <p className="text-2xl font-bold heading-serif text-gold-500">12k+</p>
            <p className="text-xs text-navy-500 dark:text-beige-200">Happy customers</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
