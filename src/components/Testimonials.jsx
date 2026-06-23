import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import { testimonials } from '../data/testimonials'
import StarRating from './ui/StarRating'
import { SectionHeading } from './ui/Reveal'

export default function Testimonials() {
  const [[index, dir], setState] = useState([0, 0])
  const [paused, setPaused] = useState(false)

  const paginate = useCallback((newDir) => {
    setState(([prev]) => {
      const next = (prev + newDir + testimonials.length) % testimonials.length
      return [next, newDir]
    })
  }, [])

  // Auto-slide every 5s unless paused
  useEffect(() => {
    if (paused) return
    const id = setInterval(() => paginate(1), 5000)
    return () => clearInterval(id)
  }, [paused, paginate])

  const t = testimonials[index]

  const variants = {
    enter: (d) => ({ opacity: 0, x: d > 0 ? 80 : -80 }),
    center: { opacity: 1, x: 0 },
    exit: (d) => ({ opacity: 0, x: d > 0 ? -80 : 80 }),
  }

  return (
    <section
      className="section-pad container-px mx-auto max-w-[1400px]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <SectionHeading
        eyebrow="Loved worldwide"
        title="What Our Clients Say"
        subtitle="Join thousands of customers who have made Luxora a part of their everyday lives."
      />

      <div className="relative mx-auto mt-14 max-w-3xl">
        <div className="glass relative overflow-hidden rounded-3xl px-6 py-12 sm:px-14 shadow-soft">
          <Quote
            size={120}
            className="pointer-events-none absolute -right-4 -top-6 text-gold-400/10"
          />

          <div className="relative min-h-[220px]">
            <AnimatePresence mode="wait" custom={dir}>
              <motion.div
                key={t.id}
                custom={dir}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                className="flex flex-col items-center text-center"
              >
                <StarRating rating={t.rating} size={18} />
                <p className="mt-6 text-lg sm:text-xl leading-relaxed text-navy-700 dark:text-beige-100">
                  “{t.text}”
                </p>
                <div className="mt-8 flex items-center gap-3">
                  <img
                    src={t.image}
                    alt={t.name}
                    className="h-12 w-12 rounded-full object-cover ring-2 ring-gold-400"
                  />
                  <div className="text-left">
                    <p className="font-semibold">{t.name}</p>
                    <p className="text-xs text-gold-500">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Controls */}
        <div className="mt-8 flex items-center justify-center gap-4">
          <button
            onClick={() => paginate(-1)}
            aria-label="Previous review"
            className="grid h-11 w-11 place-items-center rounded-full border border-navy-900/15 dark:border-white/15 hover:border-gold-400 hover:text-gold-500 transition-colors"
          >
            <ChevronLeft size={20} />
          </button>

          <div className="flex items-center gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setState([i, i > index ? 1 : -1])}
                aria-label={`Go to review ${i + 1}`}
                className={`h-2 rounded-full transition-all ${
                  i === index ? 'w-7 bg-gold-400' : 'w-2 bg-navy-900/20 dark:bg-white/20'
                }`}
              />
            ))}
          </div>

          <button
            onClick={() => paginate(1)}
            aria-label="Next review"
            className="grid h-11 w-11 place-items-center rounded-full border border-navy-900/15 dark:border-white/15 hover:border-gold-400 hover:text-gold-500 transition-colors"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  )
}
