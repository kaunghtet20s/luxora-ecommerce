import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Send,
} from 'lucide-react'
import { useShop } from '../context/ShopContext'

const columns = [
  {
    title: 'Shop',
    links: ['New Arrivals', 'Best Sellers', 'Watches', 'Bags', 'Home Decor'],
  },
  {
    title: 'Customer Service',
    links: ['Help Center', 'Shipping & Returns', 'Order Tracking', 'Size Guide', 'Warranty'],
  },
  {
    title: 'Company',
    links: ['About Us', 'Careers', 'Sustainability', 'Press', 'Privacy Policy'],
  },
]

const socials = [Instagram, Facebook, Twitter, Youtube]
const payments = ['VISA', 'MC', 'AMEX', 'PayPal', 'Apple Pay']

export default function Footer() {
  const { goToHome } = useShop()

  return (
    <footer className="bg-navy-900 text-beige-100">
      <div className="container-px mx-auto max-w-[1400px] py-16">
        <div className="grid gap-10 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-2">
            <button onClick={goToHome} className="flex items-center gap-2">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-gold-400 font-serif text-lg font-bold text-navy-900">
                L
              </span>
              <span className="heading-serif text-2xl text-beige-50">Luxora</span>
            </button>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-beige-100/70">
              Curated luxury for modern living. We bring you timeless, handcrafted products
              designed to elevate every part of your lifestyle.
            </p>

            {/* Mini newsletter */}
            <form
              onSubmit={(e) => e.preventDefault()}
              className="mt-6 flex max-w-sm items-center gap-2 rounded-full bg-white/10 p-1.5"
            >
              <input
                placeholder="Your email"
                className="flex-1 bg-transparent px-3 text-sm outline-none placeholder:text-beige-100/50"
              />
              <button
                className="grid h-9 w-9 place-items-center rounded-full bg-gold-400 text-navy-900 hover:bg-gold-500 transition-colors"
                aria-label="Subscribe"
              >
                <Send size={16} />
              </button>
            </form>
          </div>

          {/* Link columns */}
          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-beige-50">
                {col.title}
              </h4>
              <ul className="mt-4 flex flex-col gap-3 text-sm text-beige-100/70">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      onClick={(e) => e.preventDefault()}
                      className="transition-colors hover:text-gold-400"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider row */}
        <div className="mt-12 flex flex-col gap-6 border-t border-white/10 pt-8 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            {socials.map((Icon, i) => (
              <a
                key={i}
                href="#"
                onClick={(e) => e.preventDefault()}
                aria-label="Social"
                className="grid h-10 w-10 place-items-center rounded-full bg-white/10 hover:bg-gold-400 hover:text-navy-900 transition-colors"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {payments.map((p) => (
              <span
                key={p}
                className="rounded-lg bg-white/10 px-3 py-1.5 text-[11px] font-semibold tracking-wide text-beige-100/80"
              >
                {p}
              </span>
            ))}
          </div>
        </div>

        <p className="mt-8 text-center text-xs text-beige-100/50">
          © {new Date().getFullYear()} Luxora. All rights reserved. Crafted with care for the
          discerning few.
        </p>
      </div>
    </footer>
  )
}
