import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  Heart,
  LogOut,
  Menu,
  Moon,
  Search,
  ShoppingBag,
  Sun,
  User,
  X,
} from 'lucide-react'
import { useShop } from '../context/ShopContext'

const links = [
  { label: 'Home', href: '#home' },
  { label: 'Shop', href: '#shop' },
  { label: 'Categories', href: '#categories' },
  { label: 'Deals', href: '#deals' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const {
    cartCount,
    wishlistCount,
    openCart,
    openWishlist,
    theme,
    toggleTheme,
    searchQuery,
    setSearchQuery,
    goToHome,
    page,
    user,
    openAuth,
    logout,
  } = useShop()

  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body scroll while the mobile drawer is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => (document.body.style.overflow = '')
  }, [mobileOpen])

  const handleNav = (e, href) => {
    e.preventDefault()
    setMobileOpen(false)
    const scrollToTarget = () => {
      const el = document.querySelector(href)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }
    if (page !== 'home') {
      goToHome()
      setTimeout(scrollToTarget, 300)
    } else {
      scrollToTarget()
    }
  }

  const submitSearch = (e) => {
    e.preventDefault()
    setSearchOpen(false)
    setMobileOpen(false)
    const goShop = () => document.querySelector('#shop')?.scrollIntoView({ behavior: 'smooth' })
    if (page !== 'home') {
      goToHome()
      setTimeout(goShop, 300)
    } else {
      goShop()
    }
  }

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 inset-x-0 z-50 border-b transition-all duration-300 bg-white dark:bg-navy-950 ${
        scrolled
          ? 'border-navy-900/10 dark:border-white/10 shadow-soft py-3'
          : 'border-transparent py-4'
      }`}
    >
      <nav className="container-px mx-auto max-w-[1400px] flex items-center justify-between gap-4">
        {/* Logo */}
        <button onClick={goToHome} className="group flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-navy-900 dark:bg-gold-400 font-serif text-lg font-bold text-gold-400 dark:text-navy-900 transition-transform group-hover:scale-105">
            L
          </span>
          <span className="heading-serif text-2xl tracking-wide">Luxora</span>
        </button>

        {/* Desktop links */}
        <ul className="hidden lg:flex items-center gap-8">
          {links.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                onClick={(e) => handleNav(e, link.href)}
                className="group relative text-sm font-medium text-navy-700 dark:text-beige-100 hover:text-gold-500 transition-colors"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-gold-400 transition-all duration-300 group-hover:w-full" />
              </a>
            </li>
          ))}
        </ul>

        {/* Actions */}
        <div className="flex items-center gap-1 sm:gap-2">
          <IconButton label="Search" onClick={() => setSearchOpen((s) => !s)}>
            <Search size={20} />
          </IconButton>

          <IconButton label="Toggle theme" onClick={toggleTheme}>
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={theme}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
              </motion.span>
            </AnimatePresence>
          </IconButton>

          <IconButton label="Wishlist" onClick={openWishlist} badge={wishlistCount}>
            <Heart size={20} />
          </IconButton>

          <IconButton label="Cart" onClick={openCart} badge={cartCount}>
            <ShoppingBag size={20} />
          </IconButton>

          <AccountControl user={user} openAuth={openAuth} logout={logout} />

          {/* Mobile hamburger */}
          <button
            className="lg:hidden grid h-10 w-10 place-items-center rounded-full hover:bg-navy-900/5 dark:hover:bg-white/10 transition-colors"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={22} />
          </button>
        </div>
      </nav>

      {/* Search bar dropdown */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <form
              onSubmit={submitSearch}
              className="container-px mx-auto max-w-[1400px] pt-4"
            >
              <div className="glass flex items-center gap-3 rounded-full px-5 py-3 shadow-soft">
                <Search size={20} className="text-gold-500" />
                <input
                  autoFocus
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for products, brands and more…"
                  className="flex-1 bg-transparent text-sm outline-none placeholder:text-navy-400 dark:placeholder:text-beige-200/60"
                />
                {searchQuery && (
                  <button type="button" onClick={() => setSearchQuery('')} aria-label="Clear search">
                    <X size={18} className="text-navy-400 hover:text-navy-900 dark:hover:text-white" />
                  </button>
                )}
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-navy-950/50 backdrop-blur-sm lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              className="fixed top-0 right-0 z-50 h-full w-[78%] max-w-sm glass shadow-card lg:hidden p-6 flex flex-col"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 320, damping: 34 }}
            >
              <div className="flex items-center justify-between">
                <span className="heading-serif text-2xl">Menu</span>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="grid h-10 w-10 place-items-center rounded-full hover:bg-navy-900/5 dark:hover:bg-white/10"
                  aria-label="Close menu"
                >
                  <X size={22} />
                </button>
              </div>

              <ul className="mt-8 flex flex-col gap-1">
                {links.map((link, i) => (
                  <motion.li
                    key={link.label}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * i + 0.1 }}
                  >
                    <a
                      href={link.href}
                      onClick={(e) => handleNav(e, link.href)}
                      className="block rounded-xl px-4 py-3 text-lg font-medium hover:bg-gold-400/10 hover:text-gold-500 transition-colors"
                    >
                      {link.label}
                    </a>
                  </motion.li>
                ))}
              </ul>

              <div className="mt-auto flex items-center gap-3 pt-6 border-t border-navy-900/10 dark:border-white/10">
                <button
                  onClick={() => {
                    setMobileOpen(false)
                    user ? logout() : openAuth()
                  }}
                  className="btn-outline flex-1 py-3"
                >
                  {user ? <LogOut size={18} /> : <User size={18} />}
                  {user ? 'Sign out' : 'Account'}
                </button>
                <button onClick={toggleTheme} className="btn-outline px-4 py-3" aria-label="Toggle theme">
                  {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

function IconButton({ children, label, onClick, badge, className = '' }) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className={`relative grid h-10 w-10 place-items-center rounded-full text-navy-700 dark:text-beige-100 hover:bg-navy-900/5 dark:hover:bg-white/10 hover:text-gold-500 transition-colors ${className}`}
    >
      {children}
      {badge > 0 && (
        <motion.span
          key={badge}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 500, damping: 20 }}
          className="absolute -top-0.5 -right-0.5 grid h-5 min-w-5 place-items-center rounded-full bg-gold-400 px-1 text-[10px] font-bold text-navy-900"
        >
          {badge}
        </motion.span>
      )}
    </button>
  )
}

// Account icon — opens the auth modal when logged out, shows a menu when logged in
function AccountControl({ user, openAuth, logout }) {
  const [open, setOpen] = useState(false)

  if (!user) {
    return (
      <IconButton label="Account" onClick={openAuth} className="hidden sm:grid">
        <User size={20} />
      </IconButton>
    )
  }

  return (
    <div className="relative hidden sm:block">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Account menu"
        className="grid h-10 w-10 place-items-center rounded-full bg-gold-400 text-sm font-bold text-navy-900 hover:bg-gold-500 transition-colors"
      >
        {user.name.charAt(0).toUpperCase()}
      </button>

      <AnimatePresence>
        {open && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.96 }}
              transition={{ duration: 0.18 }}
              className="absolute right-0 top-12 z-50 w-60 rounded-2xl border border-navy-900/10 dark:border-white/10 bg-white dark:bg-navy-900 p-2 shadow-card"
            >
              <div className="px-3 py-2">
                <p className="truncate text-sm font-semibold">{user.name}</p>
                <p className="truncate text-xs text-navy-400 dark:text-beige-200/70">{user.email}</p>
              </div>
              <div className="my-1 h-px bg-navy-900/10 dark:bg-white/10" />
              <button
                onClick={() => {
                  setOpen(false)
                  logout()
                }}
                className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-red-500 hover:bg-red-500/10 transition-colors"
              >
                <LogOut size={16} /> Sign out
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
