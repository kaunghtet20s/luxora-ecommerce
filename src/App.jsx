import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Award, Headphones, ShieldCheck, Truck } from 'lucide-react'
import { useShop } from './context/ShopContext'

import Navbar from './components/Navbar'
import Hero from './components/Hero'
import CategorySection from './components/CategorySection'
import ProductSection from './components/ProductSection'
import DealsSection from './components/DealsSection'
import BestSellers from './components/BestSellers'
import Testimonials from './components/Testimonials'
import Newsletter from './components/Newsletter'
import Contact from './components/Contact'
import Footer from './components/Footer'
import CartSidebar from './components/CartSidebar'
import WishlistSidebar from './components/WishlistSidebar'
import ProductModal from './components/ProductModal'
import Product3DViewer from './components/Product3DViewer'
import AuthModal from './components/AuthModal'
import Toast from './components/Toast'
import FloatingContact from './components/FloatingContact'
import CheckoutPage from './components/CheckoutPage'
import Reveal from './components/ui/Reveal'

const perks = [
  { icon: Truck, title: 'Free Shipping', text: 'On all orders over $250 worldwide.' },
  { icon: ShieldCheck, title: '2-Year Warranty', text: 'Quality guaranteed on every piece.' },
  { icon: Headphones, title: '24/7 Support', text: 'Concierge help whenever you need it.' },
  { icon: Award, title: 'Authentic Luxury', text: 'Handpicked, certified premium goods.' },
]

export default function App() {
  const { page } = useShop()
  // Shared category filter so category cards can drive the shop grid
  const [category, setCategory] = useState('all')

  const selectCategory = (id) => {
    setCategory(id)
    document.querySelector('#shop')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen">
      <Navbar />

      <AnimatePresence mode="wait">
        {page === 'checkout' ? (
          <motion.main
            key="checkout"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <CheckoutPage />
          </motion.main>
        ) : (
          <motion.main
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Hero />

            {/* Perks strip */}
            <section className="container-px mx-auto max-w-[1400px] -mt-6">
              <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                {perks.map((perk, i) => (
                  <Reveal key={perk.title} delay={i * 0.08}>
                    <div className="glass flex items-center gap-3 rounded-2xl p-4 shadow-soft">
                      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gold-400/15 text-gold-500">
                        <perk.icon size={20} />
                      </span>
                      <div>
                        <p className="text-sm font-semibold">{perk.title}</p>
                        <p className="text-xs text-navy-500 dark:text-beige-200/70">{perk.text}</p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </section>

            <CategorySection onSelectCategory={selectCategory} />
            <ProductSection category={category} setCategory={setCategory} />
            <DealsSection />
            <BestSellers />

            {/* About / brand story */}
            <section id="about" className="section-pad container-px mx-auto max-w-[1400px]">
              <div className="grid items-center gap-12 lg:grid-cols-2">
                <Reveal className="order-2 lg:order-1">
                  <span className="eyebrow">Our story</span>
                  <h2 className="heading-serif mt-3 text-3xl sm:text-4xl lg:text-5xl">
                    Crafted for Those Who Appreciate the Finer Things
                  </h2>
                  <p className="mt-5 text-navy-500 dark:text-beige-200/80 leading-relaxed">
                    Born from a passion for design and craftsmanship, Luxora curates the
                    world’s most refined lifestyle products. Every item is selected for its
                    quality, character and the story it tells.
                  </p>
                  <p className="mt-4 text-navy-500 dark:text-beige-200/80 leading-relaxed">
                    We believe luxury should be effortless — beautifully made, responsibly
                    sourced and delivered with care to your door.
                  </p>
                  <div className="mt-8 grid grid-cols-3 gap-6">
                    {[
                      ['12k+', 'Happy clients'],
                      ['250+', 'Premium products'],
                      ['40+', 'Countries served'],
                    ].map(([num, label]) => (
                      <div key={label}>
                        <p className="heading-serif text-3xl text-gold-500">{num}</p>
                        <p className="mt-1 text-xs text-navy-500 dark:text-beige-200/70">{label}</p>
                      </div>
                    ))}
                  </div>
                </Reveal>

                <Reveal delay={0.1} className="order-1 lg:order-2">
                  <div className="relative">
                    <div className="overflow-hidden rounded-3xl shadow-card">
                      <img
                        src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=900&q=80&auto=format&fit=crop"
                        alt="Luxora boutique"
                        className="aspect-[4/3] w-full object-cover"
                      />
                    </div>
                    <div className="glass absolute -bottom-5 -left-5 hidden rounded-2xl p-4 shadow-card sm:block">
                      <p className="heading-serif text-2xl text-gold-500">Est. 2018</p>
                      <p className="text-xs text-navy-500 dark:text-beige-200/70">New York · Milan · Tokyo</p>
                    </div>
                  </div>
                </Reveal>
              </div>
            </section>

            <Testimonials />
            <Newsletter />
            <Contact />
          </motion.main>
        )}
      </AnimatePresence>

      <Footer />

      {/* Global overlays */}
      <CartSidebar />
      <WishlistSidebar />
      <ProductModal />
      <Product3DViewer />
      <AuthModal />
      <Toast />
      <FloatingContact />
    </div>
  )
}
