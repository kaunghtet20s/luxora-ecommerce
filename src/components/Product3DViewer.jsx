import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useMotionValue, useSpring } from 'framer-motion'
import {
  Move3d,
  Pause,
  Play,
  RotateCcw,
  RotateCw,
  ShoppingBag,
  X,
  ZoomIn,
  ZoomOut,
} from 'lucide-react'
import { useShop } from '../context/ShopContext'
import { formatPrice } from '../utils/format'

// Product dimensions (px) — just the item, with a whisper of depth
const W = 220
const H = 286
const D = 2

/**
 * Dependency-free interactive 3D product viewer.
 * The product photo is presented as a slim floating panel with subtle depth
 * inside a `preserve-3d` stage. Drag to rotate, scroll/buttons to zoom,
 * gently sways when idle. Pure CSS transforms — works everywhere, no WebGL.
 */
export default function Product3DViewer() {
  const { view3DProduct, close3DView, addToCart } = useShop()
  const product = view3DProduct

  const prefersReduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const [auto, setAuto] = useState(!prefersReduced)
  const [zoom, setZoom] = useState(1)
  const dragging = useRef(false)
  const last = useRef({ x: 0, y: 0 })

  const rotY = useMotionValue(-14)
  const rotX = useMotionValue(6)
  const springY = useSpring(rotY, { stiffness: 90, damping: 18, mass: 0.6 })
  const springX = useSpring(rotX, { stiffness: 90, damping: 18, mass: 0.6 })

  useEffect(() => {
    if (product) {
      rotY.set(-14)
      rotX.set(6)
      setZoom(1)
      setAuto(!prefersReduced)
    }
  }, [product, rotY, rotX, prefersReduced])

  // Gentle floating sway when idle
  useEffect(() => {
    if (!product || !auto) return
    let raf
    let t = 0
    let prev = performance.now()
    const loop = (now) => {
      const dt = Math.min(0.05, (now - prev) / 1000)
      prev = now
      t += dt
      rotY.set(Math.sin(t * 0.6) * 22)
      rotX.set(5 + Math.sin(t * 0.45) * 3)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [product, auto, rotY, rotX])

  // Escape + scroll lock
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && close3DView()
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = product ? 'hidden' : ''
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [product, close3DView])

  const onPointerDown = (e) => {
    dragging.current = true
    setAuto(false)
    last.current = { x: e.clientX, y: e.clientY }
    e.currentTarget.setPointerCapture?.(e.pointerId)
  }
  const onPointerMove = (e) => {
    if (!dragging.current) return
    const dx = e.clientX - last.current.x
    const dy = e.clientY - last.current.y
    last.current = { x: e.clientX, y: e.clientY }
    rotY.set(rotY.get() + dx * 0.5)
    rotX.set(Math.max(-32, Math.min(32, rotX.get() - dy * 0.4)))
  }
  const onPointerUp = () => (dragging.current = false)

  const nudge = (dir) => {
    setAuto(false)
    rotY.set(rotY.get() + dir * 45)
  }
  const reset = () => {
    setAuto(false)
    rotY.set(-14)
    rotX.set(6)
    setZoom(1)
  }
  const onWheel = (e) => setZoom((z) => Math.max(0.6, Math.min(1.9, z - e.deltaY * 0.0012)))

  return (
    <AnimatePresence>
      {product && (
        <motion.div
          className="fixed inset-0 z-[95] flex items-center justify-center p-3 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-navy-950/85" onClick={close3DView} />

          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 24 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="relative z-10 flex w-full max-w-3xl flex-col overflow-hidden rounded-3xl bg-navy-900 shadow-card"
          >
            {/* Header */}
            <div className="flex items-center justify-between gap-4 border-b border-white/10 px-5 py-4 text-beige-50">
              <div className="min-w-0">
                <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gold-400">
                  <Move3d size={14} /> Interactive 3D View
                </p>
                <h3 className="truncate heading-serif text-lg">{product.name}</h3>
              </div>
              <button
                onClick={close3DView}
                aria-label="Close 3D view"
                className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* 3D Stage */}
            <div
              className="relative h-[52vh] min-h-[330px] w-full touch-none select-none overflow-hidden"
              style={{
                background:
                  'radial-gradient(circle at 50% 32%, #1a2238 0%, #0b1220 58%, #070b16 100%)',
              }}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
              onPointerLeave={onPointerUp}
              onWheel={onWheel}
            >
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    'radial-gradient(circle at 50% 36%, rgba(212,175,55,0.18), transparent 45%)',
                }}
              />

              {/* Perspective scene */}
              <div
                className="absolute inset-0 grid cursor-grab place-items-center active:cursor-grabbing"
                style={{ perspective: '1200px' }}
              >
                <div className="relative" style={{ transformStyle: 'preserve-3d' }}>
                  <motion.div
                    style={{
                      transformStyle: 'preserve-3d',
                      rotateX: springX,
                      rotateY: springY,
                      scale: zoom,
                    }}
                  >
                    <Slab image={product.image} />
                  </motion.div>
                </div>

                {/* Soft floating shadow (gradient, no expensive blur filter) */}
                <div
                  className="pointer-events-none absolute bottom-[12%] h-10 w-48 sm:w-64"
                  style={{
                    background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.55), transparent 70%)',
                  }}
                />
              </div>

              {/* Hints */}
              <div className="pointer-events-none absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2 text-[11px] text-beige-100/80">
                <span className="flex items-center gap-1.5 rounded-full bg-navy-800/85 px-3 py-1.5 ring-1 ring-white/10">
                  <RotateCw size={13} className="text-gold-400" /> Drag to rotate
                </span>
                <span className="flex items-center gap-1.5 rounded-full bg-navy-800/85 px-3 py-1.5 ring-1 ring-white/10">
                  <ZoomIn size={13} className="text-gold-400" /> Scroll to zoom
                </span>
              </div>

              {/* Controls */}
              <div className="absolute right-4 top-4 flex flex-col gap-2">
                <CtrlBtn label="Rotate left" onClick={() => nudge(-1)}>
                  <RotateCcw size={16} />
                </CtrlBtn>
                <CtrlBtn label="Rotate right" onClick={() => nudge(1)}>
                  <RotateCw size={16} />
                </CtrlBtn>
                <CtrlBtn
                  label={auto ? 'Pause rotation' : 'Auto rotate'}
                  active={auto}
                  onClick={() => setAuto((a) => !a)}
                >
                  {auto ? <Pause size={16} /> : <Play size={16} />}
                </CtrlBtn>
                <CtrlBtn label="Zoom in" onClick={() => setZoom((z) => Math.min(1.9, z + 0.15))}>
                  <ZoomIn size={16} />
                </CtrlBtn>
                <CtrlBtn label="Zoom out" onClick={() => setZoom((z) => Math.max(0.6, z - 0.15))}>
                  <ZoomOut size={16} />
                </CtrlBtn>
                <CtrlBtn label="Reset view" onClick={reset}>
                  <Move3d size={16} />
                </CtrlBtn>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between gap-4 border-t border-white/10 px-5 py-4">
              <div>
                <p className="text-xs uppercase tracking-wider text-gold-400">{product.brand}</p>
                <p className="text-xl font-bold text-beige-50">{formatPrice(product.price)}</p>
              </div>
              <button
                onClick={() => {
                  addToCart(product, 1)
                  close3DView()
                }}
                className="btn-gold px-6 py-3 text-sm"
              >
                <ShoppingBag size={16} /> Add to Cart
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/** Just the product image, rotatable in 3D space (front + mirrored back). */
function Slab({ image }) {
  return (
    <div className="relative" style={{ width: W, height: H, transformStyle: 'preserve-3d' }}>
      {/* Front — just the product */}
      <FaceBox w={W} h={H} radius={16} transform={`translateZ(${D / 2}px)`}>
        <img src={image} alt="" className="h-full w-full object-cover" draggable={false} />
      </FaceBox>

      {/* Back — same product mirrored, so it reads as the item from any angle */}
      <FaceBox w={W} h={H} radius={16} transform={`rotateY(180deg) translateZ(${D / 2}px)`}>
        <img src={image} alt="" className="h-full w-full object-cover" draggable={false} />
        <div className="pointer-events-none absolute inset-0 bg-navy-950/40" />
      </FaceBox>
    </div>
  )
}

function FaceBox({ w, h, transform, edge, radius = 6, children }) {
  return (
    <div
      className="absolute left-1/2 top-1/2 overflow-hidden"
      style={{
        width: w,
        height: h,
        borderRadius: radius,
        transform: `translate(-50%, -50%) ${transform}`,
        backfaceVisibility: 'hidden',
        background: edge ? 'linear-gradient(180deg, #28324a, #161e30 55%, #0b1220)' : '#0b1220',
      }}
    >
      {children}
    </div>
  )
}

function CtrlBtn({ children, label, onClick, active }) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      title={label}
      className={`grid h-9 w-9 place-items-center rounded-full transition-colors ${
        active
          ? 'bg-gold-400 text-navy-900'
          : 'bg-navy-800/85 text-beige-50 ring-1 ring-white/10 hover:bg-navy-700'
      }`}
    >
      {children}
    </button>
  )
}
