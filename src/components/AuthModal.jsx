import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Eye, EyeOff, Lock, Mail, User as UserIcon, X } from 'lucide-react'
import { useShop } from '../context/ShopContext'

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const titleCase = (s) => s.charAt(0).toUpperCase() + s.slice(1)

const empty = { name: '', email: '', password: '', confirm: '' }

export default function AuthModal() {
  const { isAuthOpen, closeAuth, login, register, addToast } = useShop()

  const [mode, setMode] = useState('login') // 'login' | 'register'
  const [form, setForm] = useState(empty)
  const [errors, setErrors] = useState({})
  const [showPw, setShowPw] = useState(false)

  // Reset whenever the modal opens
  useEffect(() => {
    if (isAuthOpen) {
      setForm(empty)
      setErrors({})
      setShowPw(false)
    }
  }, [isAuthOpen])

  // Escape + scroll lock
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && closeAuth()
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = isAuthOpen ? 'hidden' : ''
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [isAuthOpen, closeAuth])

  const update = (field) => (e) => {
    setForm((f) => ({ ...f, [field]: e.target.value }))
    if (errors[field]) setErrors((er) => ({ ...er, [field]: '' }))
  }

  const validate = () => {
    const next = {}
    if (mode === 'register' && form.name.trim().length < 2) next.name = 'Please enter your name.'
    if (!emailRegex.test(form.email)) next.email = 'Enter a valid email address.'
    if (form.password.length < 6) next.password = 'Password must be at least 6 characters.'
    if (mode === 'register' && form.confirm !== form.password)
      next.confirm = 'Passwords do not match.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const submit = (e) => {
    e.preventDefault()
    if (!validate()) return
    if (mode === 'login') {
      login({ name: titleCase(form.email.split('@')[0]), email: form.email })
    } else {
      register({ name: form.name.trim(), email: form.email })
    }
  }

  const socialLogin = (provider) => {
    login({ name: `${provider} User`, email: `guest@luxora.com` })
  }

  return (
    <AnimatePresence>
      {isAuthOpen && (
        <motion.div
          className="fixed inset-0 z-[95] flex items-center justify-center p-3 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-navy-950/80 backdrop-blur-sm" onClick={closeAuth} />

          <motion.div
            role="dialog"
            aria-modal="true"
            initial={{ opacity: 0, scale: 0.94, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 24 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="relative z-10 grid w-full max-w-3xl overflow-hidden rounded-3xl bg-white dark:bg-navy-900 shadow-card md:grid-cols-2"
          >
            <button
              onClick={closeAuth}
              aria-label="Close"
              className="absolute right-4 top-4 z-20 grid h-10 w-10 place-items-center rounded-full bg-white/90 dark:bg-navy-800/90 shadow-soft hover:scale-105 transition-transform"
            >
              <X size={18} />
            </button>

            {/* Decorative side */}
            <div className="relative hidden md:block">
              <img
                src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80&auto=format&fit=crop"
                alt="Luxora"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-navy-950/30 to-navy-950/20" />
              <div className="absolute inset-x-0 bottom-0 p-8 text-beige-50">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-gold-400 font-serif text-xl font-bold text-navy-900">
                  L
                </span>
                <h3 className="heading-serif mt-4 text-2xl">Welcome to Luxora</h3>
                <p className="mt-2 text-sm text-beige-100/80">
                  Sign in to track orders, save your wishlist and unlock members-only offers.
                </p>
              </div>
            </div>

            {/* Form side */}
            <div className="flex flex-col p-7 sm:p-9">
              {/* Tabs */}
              <div className="mb-6 flex rounded-full bg-beige-100 dark:bg-navy-800 p-1">
                {['login', 'register'].map((m) => (
                  <button
                    key={m}
                    onClick={() => {
                      setMode(m)
                      setErrors({})
                    }}
                    className={`relative flex-1 rounded-full py-2.5 text-sm font-medium transition-colors ${
                      mode === m ? 'text-navy-900' : 'text-navy-500 dark:text-beige-200/70'
                    }`}
                  >
                    {mode === m && (
                      <motion.span
                        layoutId="authTab"
                        className="absolute inset-0 rounded-full bg-gold-400"
                        transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                      />
                    )}
                    <span className="relative z-10">{m === 'login' ? 'Sign In' : 'Register'}</span>
                  </button>
                ))}
              </div>

              <h2 className="heading-serif text-2xl">
                {mode === 'login' ? 'Welcome back' : 'Create your account'}
              </h2>
              <p className="mt-1 text-sm text-navy-500 dark:text-beige-200/70">
                {mode === 'login'
                  ? 'Sign in to continue your shopping journey.'
                  : 'Join the club in just a few seconds.'}
              </p>

              <form onSubmit={submit} noValidate className="mt-6 flex flex-col gap-4">
                {mode === 'register' && (
                  <AuthField
                    icon={UserIcon}
                    label="Full name"
                    placeholder="Jane Doe"
                    value={form.name}
                    onChange={update('name')}
                    error={errors.name}
                  />
                )}

                <AuthField
                  icon={Mail}
                  type="email"
                  label="Email address"
                  placeholder="jane@email.com"
                  value={form.email}
                  onChange={update('email')}
                  error={errors.email}
                />

                <AuthField
                  icon={Lock}
                  type={showPw ? 'text' : 'password'}
                  label="Password"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={update('password')}
                  error={errors.password}
                  trailing={
                    <button
                      type="button"
                      onClick={() => setShowPw((s) => !s)}
                      aria-label={showPw ? 'Hide password' : 'Show password'}
                      className="text-navy-400 hover:text-gold-500"
                    >
                      {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  }
                />

                {mode === 'register' && (
                  <AuthField
                    icon={Lock}
                    type={showPw ? 'text' : 'password'}
                    label="Confirm password"
                    placeholder="••••••••"
                    value={form.confirm}
                    onChange={update('confirm')}
                    error={errors.confirm}
                  />
                )}

                {mode === 'login' && (
                  <button
                    type="button"
                    onClick={() => addToast('Password reset link sent (demo).', 'info')}
                    className="self-end text-xs font-medium text-gold-500 hover:text-gold-600"
                  >
                    Forgot password?
                  </button>
                )}

                <button type="submit" className="btn-gold mt-1 w-full py-3.5">
                  {mode === 'login' ? 'Sign In' : 'Create Account'}
                </button>
              </form>

              {/* Divider */}
              <div className="my-5 flex items-center gap-3 text-xs text-navy-400 dark:text-beige-200/60">
                <span className="h-px flex-1 bg-navy-900/10 dark:bg-white/10" />
                or continue with
                <span className="h-px flex-1 bg-navy-900/10 dark:bg-white/10" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button onClick={() => socialLogin('Google')} className="btn-outline py-3 text-sm">
                  <GoogleIcon /> Google
                </button>
                <button onClick={() => socialLogin('Apple')} className="btn-outline py-3 text-sm">
                  <AppleIcon /> Apple
                </button>
              </div>

              <p className="mt-6 text-center text-sm text-navy-500 dark:text-beige-200/70">
                {mode === 'login' ? "Don't have an account?" : 'Already have an account?'}{' '}
                <button
                  onClick={() => {
                    setMode(mode === 'login' ? 'register' : 'login')
                    setErrors({})
                  }}
                  className="font-semibold text-gold-500 hover:text-gold-600"
                >
                  {mode === 'login' ? 'Register' : 'Sign in'}
                </button>
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function AuthField({ icon: Icon, label, error, trailing, ...props }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-navy-500 dark:text-beige-200/80">
        {label}
      </span>
      <div
        className={`flex items-center gap-2 rounded-xl border bg-white/60 dark:bg-navy-800/50 px-3.5 py-2.5 transition-all focus-within:border-gold-400 focus-within:ring-2 focus-within:ring-gold-400/20 ${
          error ? 'border-red-400' : 'border-navy-900/10 dark:border-white/12'
        }`}
      >
        <Icon size={18} className="shrink-0 text-gold-500" />
        <input
          {...props}
          className="flex-1 bg-transparent text-sm outline-none placeholder:text-navy-400 dark:text-beige-50 dark:placeholder:text-beige-200/50"
        />
        {trailing}
      </div>
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

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden>
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.18a11 11 0 0 0 0 9.88l3.66-2.84z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1A11 11 0 0 0 2.18 7.06l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z"
      />
    </svg>
  )
}

function AppleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M16.36 12.3c-.02-2.07 1.69-3.06 1.77-3.11-0.97-1.41-2.47-1.61-3-1.63-1.27-.13-2.49.75-3.14.75-.65 0-1.65-.73-2.71-.71-1.39.02-2.68.81-3.4 2.06-1.45 2.51-.37 6.23 1.04 8.27.69.99 1.51 2.11 2.59 2.07 1.04-.04 1.43-.67 2.69-.67 1.25 0 1.61.67 2.71.65 1.12-.02 1.83-1.01 2.51-2.01.79-1.15 1.12-2.27 1.14-2.33-.03-.01-2.18-.84-2.2-3.31zM14.3 5.59c.57-.69.96-1.65.85-2.61-.83.03-1.83.55-2.42 1.24-.53.61-.99 1.59-.87 2.53.92.07 1.87-.47 2.44-1.16z" />
    </svg>
  )
}
