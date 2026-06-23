import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { MessageCircle, Phone, Mail, X } from 'lucide-react'

const actions = [
  {
    label: 'WhatsApp',
    icon: MessageCircle,
    href: 'https://wa.me/18005550192',
    color: 'bg-[#25D366]',
  },
  { label: 'Call us', icon: Phone, href: 'tel:+18005550192', color: 'bg-navy-700' },
  { label: 'Email', icon: Mail, href: 'mailto:hello@luxora.com', color: 'bg-gold-500' },
]

export default function FloatingContact() {
  const [open, setOpen] = useState(false)

  return (
    <div className="fixed bottom-6 left-6 z-[70] flex flex-col items-start gap-3">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="flex flex-col gap-3"
          >
            {actions.map((a, i) => (
              <motion.a
                key={a.label}
                href={a.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center gap-3"
              >
                <span
                  className={`grid h-12 w-12 place-items-center rounded-full text-white shadow-card ${a.color}`}
                >
                  <a.icon size={20} />
                </span>
                <span className="glass rounded-full px-3 py-1.5 text-sm font-medium shadow-soft">
                  {a.label}
                </span>
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setOpen((o) => !o)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        aria-label="Contact options"
        className="relative grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-card"
      >
        {!open && (
          <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366]/50" />
        )}
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={open ? 'close' : 'open'}
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {open ? <X size={24} /> : <MessageCircle size={26} />}
          </motion.span>
        </AnimatePresence>
      </motion.button>
    </div>
  )
}
