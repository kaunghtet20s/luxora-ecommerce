# Luxora — Premium E-Commerce Website

A high-end, fully responsive e-commerce front-end built with **React + Vite**, **Tailwind CSS**, **Framer Motion**, and **Lucide React**. It features smooth animations, interactive shopping actions, dark/light mode, a product image gallery, an animated cart total, a floating contact button, and a complete checkout page UI.

![Luxora](https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200&q=80&auto=format&fit=crop)

## ✨ Features

- **Sticky glassmorphism navbar** with search, wishlist, cart count, profile, theme toggle and a mobile drawer
- **Animated hero** with floating product preview cards
- **Featured categories** with hover zoom and lift animations
- **Product grid** with live search, category filter, price range, and sorting (price / rating)
- **Quick View modal** with image gallery, colour/size selectors and quantity stepper
- **Interactive 3D product view** — drag to rotate, scroll to zoom, gentle sway; shows just the product (pure CSS 3D, **no WebGL** — runs smoothly on every device)
- **Account system** — login / register modal with form validation, show/hide password, social buttons, a persisted session, and a navbar account menu (sign out)
- **Slide-in cart sidebar** with quantity controls, free-shipping progress bar and an **animated total**
- **Wishlist drawer** — slide-in panel with saved items, add-to-cart, remove, "add all to cart", toast notifications and a live navbar count
- **Deals section** with a live **countdown timer**
- **Best sellers**, **testimonials slider** (auto-play), **newsletter** and **contact** forms with validation
- **Dark / light mode** (persisted to `localStorage`)
- **Checkout page UI** with order summary and animated total
- **Floating WhatsApp / contact** button
- Fully **responsive** across desktop, tablet and mobile

## 🛠 Tech Stack

| Purpose      | Library          |
| ------------ | ---------------- |
| Framework    | React 18 + Vite  |
| Styling      | Tailwind CSS 3   |
| Animation    | Framer Motion 11 |
| Icons        | Lucide React     |

## 🚀 Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Run the development server

```bash
npm run dev
```

The app opens automatically at **http://localhost:5173**.

### 3. Build for production

```bash
npm run build
```

### 4. Preview the production build

```bash
npm run preview
```

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/
│   │   ├── AnimatedNumber.jsx   # animated cart total
│   │   ├── Reveal.jsx           # scroll-reveal + section heading
│   │   └── StarRating.jsx
│   ├── Navbar.jsx
│   ├── Hero.jsx
│   ├── CategorySection.jsx
│   ├── ProductSection.jsx       # search / filter / sort
│   ├── ProductCard.jsx
│   ├── ProductModal.jsx         # quick view + gallery
│   ├── Product3DViewer.jsx      # interactive CSS 3D product viewer
│   ├── CartSidebar.jsx
│   ├── DealsSection.jsx         # countdown timer
│   ├── BestSellers.jsx
│   ├── Testimonials.jsx
│   ├── Newsletter.jsx
│   ├── Contact.jsx
│   ├── Footer.jsx
│   ├── Toast.jsx
│   ├── FloatingContact.jsx      # WhatsApp / contact button
│   └── CheckoutPage.jsx
├── context/
│   └── ShopContext.jsx          # cart, wishlist, theme, toasts, routing
├── data/
│   ├── products.js              # 16 sample products
│   ├── categories.js
│   └── testimonials.js
├── utils/
│   └── format.js
├── App.jsx
├── main.jsx
└── index.css
```

## 🎨 Design

- **Palette:** deep navy, gold, beige and clean white space
- **Typography:** Playfair Display (headings) + Inter (body)
- **Effects:** soft shadows, rounded corners, glassmorphism, gradient accents

## 📝 Notes

- Product imagery is loaded from [Unsplash](https://unsplash.com) via direct URLs — no API key required. An internet connection is needed for images to display.
- State is managed with React Context (`ShopContext`) and local component state.

---

Crafted with care for the discerning few. © Luxora
