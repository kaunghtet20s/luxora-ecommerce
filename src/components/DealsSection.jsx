import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Zap } from 'lucide-react'

// Counts down to a target date and returns days/hours/mins/secs
function useCountdown(target) {
  const [now, setNow] = useState(Date.now())
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(id)
  }, [])

  const diff = Math.max(0, target - now)
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff / 3600000) % 24),
    minutes: Math.floor((diff / 60000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  }
}

export default function DealsSection() {
  // Target: 3 days, 6 hours from first mount
  const target = useMemo(() => Date.now() + (3 * 86400000 + 6 * 3600000 + 42 * 60000), [])
  const { days, hours, minutes, seconds } = useCountdown(target)

  const blocks = [
    { label: 'Days', value: days },
    { label: 'Hours', value: hours },
    { label: 'Minutes', value: minutes },
    { label: 'Seconds', value: seconds },
  ]

  const scrollToShop = () =>
    document.querySelector('#shop')?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section id="deals" className="section-pad container-px mx-auto max-w-[1400px]">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7 }}
        className="relative overflow-hidden rounded-[2rem] bg-navy-900 px-6 py-14 sm:px-12 lg:px-16 text-beige-50"
      >
        {/* Decorative glows + floating product */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-20 -right-10 h-72 w-72 rounded-full bg-gold-400/30 blur-3xl" />
          <div className="absolute -bottom-24 -left-10 h-72 w-72 rounded-full bg-gold-400/10 blur-3xl" />
        </div>
        <motion.img
          src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80&auto=format&fit=crop"
          alt=""
          className="pointer-events-none absolute -right-6 bottom-0 hidden w-64 rounded-3xl opacity-90 lg:block animate-float"
        />

        <div className="relative max-w-xl">
          <span className="eyebrow text-gold-400">
            <Zap size={14} /> Limited Time Offer
          </span>
          <h2 className="heading-serif mt-4 text-3xl sm:text-4xl lg:text-5xl">
            Up to <span className="text-gradient-gold">40% Off</span> the Signature Collection
          </h2>
          <p className="mt-4 text-beige-100/80">
            Our biggest seasonal event. Indulge in handpicked luxury essentials before the
            clock runs out — these prices won’t last long.
          </p>

          {/* Countdown */}
          <div className="mt-8 flex gap-3 sm:gap-4">
            {blocks.map((b) => (
              <div
                key={b.label}
                className="glass min-w-[68px] rounded-2xl px-3 py-3 text-center sm:min-w-[84px] sm:px-4"
              >
                <motion.p
                  key={b.value}
                  initial={{ y: -8, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="heading-serif text-2xl sm:text-3xl text-gold-400"
                >
                  {String(b.value).padStart(2, '0')}
                </motion.p>
                <p className="mt-1 text-[10px] uppercase tracking-widest text-beige-100/70">
                  {b.label}
                </p>
              </div>
            ))}
          </div>

          <button onClick={scrollToShop} className="btn-gold mt-8 px-7 py-3.5 text-sm">
            <Zap size={16} /> Grab the Deal
          </button>
        </div>
      </motion.div>
    </section>
  )
}
