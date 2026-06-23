import { Star } from 'lucide-react'

/**
 * Renders a 5-star rating with support for fractional fills.
 */
export default function StarRating({ rating = 0, size = 14, showValue = false, className = '' }) {
  return (
    <div className={`flex items-center gap-1 ${className}`}>
      <div className="flex items-center">
        {Array.from({ length: 5 }).map((_, i) => {
          const fill = Math.max(0, Math.min(1, rating - i)) * 100
          return (
            <span key={i} className="relative inline-block" style={{ width: size, height: size }}>
              <Star size={size} className="text-navy-300 dark:text-navy-600" />
              <span
                className="absolute inset-0 overflow-hidden"
                style={{ width: `${fill}%` }}
              >
                <Star size={size} className="text-gold-400 fill-gold-400" />
              </span>
            </span>
          )
        })}
      </div>
      {showValue && (
        <span className="text-xs font-medium text-navy-500 dark:text-beige-200">
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  )
}
