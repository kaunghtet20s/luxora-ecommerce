import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { categories } from '../data/categories'
import { SectionHeading } from './ui/Reveal'

export default function CategorySection({ onSelectCategory }) {
  return (
    <section id="categories" className="section-pad container-px mx-auto max-w-[1400px]">
      <SectionHeading
        eyebrow="Browse the edit"
        title="Shop by Category"
        subtitle="Explore our curated departments, each handpicked for design, quality and craftsmanship."
      />

      <motion.div
        className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-60px' }}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
      >
        {categories.map((cat) => (
          <motion.button
            key={cat.id}
            type="button"
            onClick={() => onSelectCategory?.(cat.id)}
            variants={{
              hidden: { opacity: 0, y: 40 },
              show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
            }}
            whileHover={{ y: -8 }}
            className="group relative overflow-hidden rounded-3xl text-left shadow-soft hover:shadow-card transition-shadow"
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <img
                src={cat.image}
                alt={cat.name}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-navy-950/20 to-transparent" />
            </div>

            <div className="absolute inset-x-0 bottom-0 p-6 text-beige-50">
              <div className="flex items-center justify-between">
                <h3 className="heading-serif text-2xl">{cat.name}</h3>
                <span className="grid h-10 w-10 place-items-center rounded-full bg-gold-400 text-navy-900 opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
                  <ArrowUpRight size={18} />
                </span>
              </div>
              <p className="mt-1 max-w-xs text-sm text-beige-100/80">{cat.description}</p>
            </div>
          </motion.button>
        ))}
      </motion.div>
    </section>
  )
}
