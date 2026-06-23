import { motion } from 'framer-motion'
import { bestSellers } from '../data/products'
import ProductCard from './ProductCard'
import { SectionHeading } from './ui/Reveal'

export default function BestSellers() {
  return (
    <section className="section-pad bg-beige-100/60 dark:bg-navy-900/40">
      <div className="container-px mx-auto max-w-[1400px]">
        <SectionHeading
          eyebrow="Customer favourites"
          title="Best Sellers"
          subtitle="The pieces our community can’t stop talking about — tried, tested and adored."
        />

        <motion.div
          className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
        >
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
