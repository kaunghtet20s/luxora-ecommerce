import { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react'

const ShopContext = createContext(null)

// Build a unique key for a cart line based on chosen variants
const lineKey = (id, size, color) => `${id}-${size ?? ''}-${color ?? ''}`

export function ShopProvider({ children }) {
  // ---- Theme (dark / light) ----
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') return 'light'
    const saved = localStorage.getItem('luxora-theme')
    if (saved) return saved
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  })

  useEffect(() => {
    const root = document.documentElement
    root.classList.toggle('dark', theme === 'dark')
    localStorage.setItem('luxora-theme', theme)
  }, [theme])

  const toggleTheme = useCallback(() => setTheme((t) => (t === 'dark' ? 'light' : 'dark')), [])

  // ---- Toasts ----
  const [toasts, setToasts] = useState([])

  const removeToast = useCallback((id) => {
    setToasts((list) => list.filter((t) => t.id !== id))
  }, [])

  const addToast = useCallback(
    (message, type = 'success') => {
      const id = Date.now() + Math.random()
      setToasts((list) => [...list, { id, message, type }])
      setTimeout(() => removeToast(id), 2800)
    },
    [removeToast]
  )

  // ---- Cart ----
  const [cart, setCart] = useState([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isWishlistOpen, setIsWishlistOpen] = useState(false)

  const openCart = useCallback(() => {
    setIsCartOpen(true)
    setIsWishlistOpen(false)
  }, [])

  const addToCart = useCallback(
    (product, qty = 1, { size = null, color = null } = {}) => {
      const key = lineKey(product.id, size, color)
      setCart((prev) => {
        const existing = prev.find((item) => item.key === key)
        if (existing) {
          return prev.map((item) =>
            item.key === key ? { ...item, qty: item.qty + qty } : item
          )
        }
        return [...prev, { ...product, key, qty, selectedSize: size, selectedColor: color }]
      })
      addToast(`${product.name} added to cart`, 'success')
      setIsCartOpen(true)
      setIsWishlistOpen(false)
    },
    [addToast]
  )

  const removeFromCart = useCallback((key) => {
    setCart((prev) => prev.filter((item) => item.key !== key))
  }, [])

  const updateQty = useCallback((key, delta) => {
    setCart((prev) =>
      prev
        .map((item) => (item.key === key ? { ...item, qty: item.qty + delta } : item))
        .filter((item) => item.qty > 0)
    )
  }, [])

  const clearCart = useCallback(() => setCart([]), [])

  // ---- Wishlist ----
  const [wishlist, setWishlist] = useState([])

  const openWishlist = useCallback(() => {
    setIsWishlistOpen(true)
    setIsCartOpen(false)
  }, [])
  const closeWishlist = useCallback(() => setIsWishlistOpen(false), [])

  const isWished = useCallback((id) => wishlist.includes(id), [wishlist])

  const toggleWishlist = useCallback(
    (product) => {
      setWishlist((prev) => {
        if (prev.includes(product.id)) {
          addToast(`${product.name} removed from wishlist`, 'info')
          return prev.filter((id) => id !== product.id)
        }
        addToast(`${product.name} added to wishlist`, 'success')
        return [...prev, product.id]
      })
    },
    [addToast]
  )

  // ---- Global search (shared between navbar + shop) ----
  const [searchQuery, setSearchQuery] = useState('')

  // ---- Quick View modal ----
  const [quickViewProduct, setQuickViewProduct] = useState(null)
  const openQuickView = useCallback((product) => setQuickViewProduct(product), [])
  const closeQuickView = useCallback(() => setQuickViewProduct(null), [])

  // ---- 3D viewer ----
  const [view3DProduct, setView3DProduct] = useState(null)
  const open3DView = useCallback((product) => setView3DProduct(product), [])
  const close3DView = useCallback(() => setView3DProduct(null), [])

  // ---- Auth (mock, persisted to localStorage) ----
  const [user, setUser] = useState(() => {
    if (typeof window === 'undefined') return null
    try {
      return JSON.parse(localStorage.getItem('luxora-user')) || null
    } catch {
      return null
    }
  })
  const [isAuthOpen, setIsAuthOpen] = useState(false)
  const openAuth = useCallback(() => setIsAuthOpen(true), [])
  const closeAuth = useCallback(() => setIsAuthOpen(false), [])

  const login = useCallback(
    (userData) => {
      setUser(userData)
      try {
        localStorage.setItem('luxora-user', JSON.stringify(userData))
      } catch {
        /* ignore storage errors */
      }
      setIsAuthOpen(false)
      addToast(`Welcome back, ${userData.name}!`, 'success')
    },
    [addToast]
  )
  const register = useCallback(
    (userData) => {
      setUser(userData)
      try {
        localStorage.setItem('luxora-user', JSON.stringify(userData))
      } catch {
        /* ignore storage errors */
      }
      setIsAuthOpen(false)
      addToast(`Welcome to Luxora, ${userData.name}!`, 'success')
    },
    [addToast]
  )
  const logout = useCallback(() => {
    setUser(null)
    try {
      localStorage.removeItem('luxora-user')
    } catch {
      /* ignore storage errors */
    }
    addToast('You have been signed out', 'info')
  }, [addToast])

  // ---- Simple page routing (home / checkout) ----
  const [page, setPage] = useState('home')
  const goToCheckout = useCallback(() => {
    setPage('checkout')
    setIsCartOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])
  const goToHome = useCallback(() => {
    setPage('home')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  // ---- Derived totals ----
  const cartCount = useMemo(() => cart.reduce((sum, item) => sum + item.qty, 0), [cart])
  const cartSubtotal = useMemo(
    () => cart.reduce((sum, item) => sum + item.price * item.qty, 0),
    [cart]
  )

  const value = {
    // theme
    theme,
    toggleTheme,
    // toasts
    toasts,
    addToast,
    removeToast,
    // cart
    cart,
    isCartOpen,
    setIsCartOpen,
    openCart,
    addToCart,
    removeFromCart,
    updateQty,
    clearCart,
    cartCount,
    cartSubtotal,
    // wishlist
    wishlist,
    wishlistCount: wishlist.length,
    isWished,
    toggleWishlist,
    isWishlistOpen,
    setIsWishlistOpen,
    openWishlist,
    closeWishlist,
    // search
    searchQuery,
    setSearchQuery,
    // quick view
    quickViewProduct,
    openQuickView,
    closeQuickView,
    // 3d view
    view3DProduct,
    open3DView,
    close3DView,
    // auth
    user,
    isAuthOpen,
    openAuth,
    closeAuth,
    login,
    register,
    logout,
    // routing
    page,
    goToCheckout,
    goToHome,
  }

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useShop() {
  const ctx = useContext(ShopContext)
  if (!ctx) throw new Error('useShop must be used within a ShopProvider')
  return ctx
}
