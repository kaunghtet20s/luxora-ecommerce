import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle2, Info, X } from 'lucide-react'
import { useShop } from '../context/ShopContext'

export default function Toast() {
  const { toasts, removeToast } = useShop()

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-3 w-[calc(100%-3rem)] max-w-sm">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            layout
            initial={{ opacity: 0, x: 80, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 80, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            className="glass flex items-center gap-3 rounded-2xl px-4 py-3 shadow-card"
          >
            <span
              className={
                toast.type === 'info' ? 'text-navy-400 dark:text-beige-200' : 'text-gold-400'
              }
            >
              {toast.type === 'info' ? <Info size={20} /> : <CheckCircle2 size={20} />}
            </span>
            <p className="flex-1 text-sm font-medium text-navy-900 dark:text-beige-50">
              {toast.message}
            </p>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-navy-400 hover:text-navy-900 dark:hover:text-white transition-colors"
              aria-label="Dismiss notification"
            >
              <X size={16} />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
