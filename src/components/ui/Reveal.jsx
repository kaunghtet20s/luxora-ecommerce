import { motion } from 'framer-motion'

/**
 * Generic scroll-reveal wrapper. Fades + slides children into view once.
 */
export default function Reveal({ children, delay = 0, y = 40, className = '', as = 'div' }) {
  const MotionTag = motion[as] || motion.div
  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionTag>
  )
}

// Shared section heading used by most sections
export function SectionHeading({ eyebrow, title, subtitle, center = true }) {
  return (
    <Reveal className={`max-w-2xl ${center ? 'mx-auto text-center' : ''}`}>
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2 className="heading-serif mt-3 text-3xl sm:text-4xl lg:text-5xl">{title}</h2>
      {subtitle && (
        <p className="mt-4 text-navy-500 dark:text-beige-200/80 leading-relaxed">{subtitle}</p>
      )}
    </Reveal>
  )
}
