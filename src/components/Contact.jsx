import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  CheckCircle2,
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Send,
  Twitter,
  Youtube,
} from 'lucide-react'
import { useShop } from '../context/ShopContext'
import Reveal, { SectionHeading } from './ui/Reveal'

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const details = [
  { icon: Mail, label: 'Email', value: 'hello@luxora.com' },
  { icon: Phone, label: 'Phone', value: '+1 (800) 555-0192' },
  { icon: MapPin, label: 'Address', value: '128 Madison Avenue, New York, NY' },
]

const socials = [Instagram, Facebook, Twitter, Youtube]

export default function Contact() {
  const { addToast } = useShop()
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(false)

  const validate = () => {
    const next = {}
    if (!form.name.trim()) next.name = 'Please enter your name.'
    if (!emailRegex.test(form.email)) next.email = 'Please enter a valid email.'
    if (form.message.trim().length < 10) next.message = 'Message must be at least 10 characters.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return
    setSent(true)
    addToast('Message sent! We’ll be in touch soon.', 'success')
    setForm({ name: '', email: '', message: '' })
    setTimeout(() => setSent(false), 4000)
  }

  const update = (field) => (e) => {
    setForm((f) => ({ ...f, [field]: e.target.value }))
    if (errors[field]) setErrors((er) => ({ ...er, [field]: '' }))
  }

  return (
    <section id="contact" className="section-pad container-px mx-auto max-w-[1400px]">
      <SectionHeading
        eyebrow="Get in touch"
        title="Contact Us"
        subtitle="Questions about an order or just want to say hello? Our concierge team is here to help."
      />

      <div className="mt-14 grid gap-8 lg:grid-cols-2">
        {/* Info */}
        <Reveal className="flex flex-col gap-6">
          <div className="glass rounded-3xl p-8 shadow-soft">
            <h3 className="heading-serif text-2xl">Visit our flagship</h3>
            <p className="mt-2 text-sm text-navy-500 dark:text-beige-200/80">
              Open Monday–Saturday, 10am to 8pm. Personal styling available by appointment.
            </p>

            <ul className="mt-8 flex flex-col gap-5">
              {details.map(({ icon: Icon, label, value }) => (
                <li key={label} className="flex items-center gap-4">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gold-400/15 text-gold-500">
                    <Icon size={20} />
                  </span>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-navy-400 dark:text-beige-200/60">
                      {label}
                    </p>
                    <p className="font-medium">{value}</p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex gap-3">
              {socials.map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  aria-label="Social link"
                  className="grid h-11 w-11 place-items-center rounded-full bg-navy-900 text-beige-50 dark:bg-white/10 hover:bg-gold-400 hover:text-navy-900 transition-colors"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Form */}
        <Reveal delay={0.1}>
          <form
            onSubmit={handleSubmit}
            noValidate
            className="glass rounded-3xl p-8 shadow-soft"
          >
            <div className="flex flex-col gap-5">
              <Field label="Full name" error={errors.name}>
                <input
                  value={form.name}
                  onChange={update('name')}
                  placeholder="Jane Doe"
                  className="field-input"
                />
              </Field>

              <Field label="Email address" error={errors.email}>
                <input
                  type="email"
                  value={form.email}
                  onChange={update('email')}
                  placeholder="jane@email.com"
                  className="field-input"
                />
              </Field>

              <Field label="Message" error={errors.message}>
                <textarea
                  rows={5}
                  value={form.message}
                  onChange={update('message')}
                  placeholder="How can we help you?"
                  className="field-input resize-none"
                />
              </Field>

              <button type="submit" className="btn-gold w-full py-3.5 group">
                {sent ? (
                  <>
                    <CheckCircle2 size={18} /> Message Sent
                  </>
                ) : (
                  <>
                    Send Message
                    <Send size={16} className="transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </button>
            </div>
          </form>
        </Reveal>
      </div>

      {/* Local field styles */}
      <style>{`
        .field-input {
          width: 100%;
          border-radius: 1rem;
          background: rgba(255,255,255,0.6);
          padding: 0.85rem 1rem;
          font-size: 0.875rem;
          outline: none;
          border: 1px solid rgba(11,18,32,0.1);
          transition: border-color .2s, box-shadow .2s;
        }
        .dark .field-input {
          background: rgba(26,34,56,0.5);
          border-color: rgba(255,255,255,0.12);
          color: #f5efe6;
        }
        .field-input:focus {
          border-color: #d4af37;
          box-shadow: 0 0 0 3px rgba(212,175,55,0.2);
        }
      `}</style>
    </section>
  )
}

function Field({ label, error, children }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-navy-500 dark:text-beige-200/80">
        {label}
      </span>
      {children}
      <AnimatePresence>
        {error && (
          <motion.span
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-1.5 block text-xs font-medium text-red-500"
          >
            {error}
          </motion.span>
        )}
      </AnimatePresence>
    </label>
  )
}
