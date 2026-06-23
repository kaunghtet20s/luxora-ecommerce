import { useEffect } from 'react'
import { useMotionValue, useTransform, animate, motion } from 'framer-motion'

/**
 * Smoothly animates a number when its value changes.
 * Used for the live cart total. `prefix` lets us show "$".
 */
export default function AnimatedNumber({ value, prefix = '$', className = '' }) {
  const count = useMotionValue(value)
  const rounded = useTransform(count, (latest) =>
    `${prefix}${Math.round(latest).toLocaleString('en-US')}`
  )

  useEffect(() => {
    const controls = animate(count, value, {
      duration: 0.6,
      ease: 'easeOut',
    })
    return controls.stop
  }, [value, count])

  return <motion.span className={className}>{rounded}</motion.span>
}
