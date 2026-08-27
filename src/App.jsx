import { useState } from 'react'
import {
  ArrowRight,
  Clock3,
  CreditCard,
  Leaf,
  ShieldCheck,
  ShoppingCart,
  Star,
  Truck,
} from 'lucide-react'
import logo from '../logo.jpeg'
import './App.css'

const pizzas = [
  {
    id: 1,
    name: 'Margherita Blaze',
    image:
      'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=900&q=80',
    rating: 4.9,
    price: 299,
    tag: 'Best Seller',
    description: 'Classic tomato, basil, and molten mozzarella made extra rich.',
  },
  {
    id: 2,
    name: 'Pepperoni Rush',
    image:
      'https://images.unsplash.com/photo-1548365328-9f547fb9587c?auto=format&fit=crop&w=900&q=80',
    rating: 4.8,
    price: 349,
    tag: 'Hot Pick',
    description: 'Spicy pepperoni slices with smoky sauce and stretchy cheese.',
  },
  {
    id: 3,
    name: 'Farmhouse Feast',
    image:
      'https://images.unsplash.com/photo-1552539618-7eec9b4d86c2?auto=format&fit=crop&w=900&q=80',
    rating: 4.9,
    price: 369,
    tag: 'Fresh',
    description: 'Roasted veggies, herbs, and creamy cheese in every bite.',
  },
  {
    id: 4,
    name: 'Truffle Supreme',
    image:
      'https://images.unsplash.com/photo-1506354666786-959d6d497f1a?auto=format&fit=crop&w=900&q=80',
    rating: 5.0,
    price: 429,
    tag: 'Chef Special',
    description: 'Luxury truffle oil, mushrooms, and parmesan for a rich finish.',
  },
]

const features = [
  {
    icon: Leaf,
    title: 'Fresh Ingredients',
    description: 'Only farm-picked veggies, premium cheese, and slow-cooked sauces.',
  },
  {
    icon: Clock3,
    title: 'Fast Delivery',
    description: 'Fresh from oven to doorstep in under 30 minutes, every single time.',
  },
  {
    icon: ShieldCheck,
    title: 'Secure Payment',
    description: 'Smooth, safe checkout that keeps your ordering experience stress-free.',
  },
  {
    icon: Truck,
    title: 'Easy Customization',
    description: 'Build your perfect pizza with toppings, crusts, and spice levels.',
  },
]

const offers = [
  {
    title: 'Lunch Combo',
    text: 'Any 2 pizzas + garlic bread for just ₹699',
    badge: 'Save 25%',
  },
  {
    title: 'Student Slice',
    text: 'Get 20% off on all orders above ₹799',
    badge: 'New',
  },
  {
    title: 'Weekend Feast',
    text: 'Free dessert with every family size pizza',
    badge: 'Hot Deal',
  },
]

function App() {
  const [cartCount, setCartCount] = useState(0)

  const addToCart = () => {
    setCartCount((count) => count + 1)
  }

  return (
    <div className="page-shell">
      <header className="topbar">
        <div className="brand" aria-label="One Slice home">
          <img src={logo} alt="One Slice logo" />
          <div>
            <span className="brand-name">ONE SLICE</span>
            <small>Fresh. Fast. Fire-baked.</small>
          </div>
        </div>

        <nav className="main-nav" aria-label="Main navigation">
          <a href="#home">Home</a>
          <a href="#menu">Menu</a>
          <a href="#offers">Offers</a>
          <a href="#about">About</a>
          <a href="#cart">Cart</a>
        </nav>

        <div className="nav-actions">
          <button type="button" className="login-btn">
            Login
          </button>
          <a href="#cart" className="cart-pill" aria-label="Shopping cart">
            <ShoppingCart size={18} />
            <span>Cart</span>
            <b>{cartCount}</b>
          </a>
        </div>
      </header>

      <main>
        <section id="home" className="hero-section">
          <div className="hero-copy">
            <span className="eyebrow">Hot & fresh every day</span>
            <h1>Pizza nights that feel legendary.</h1>
            <p>
              From crispy crusts to gooey cheese, One Slice brings handcrafted pizza,
              bold flavors, and speedy delivery stuffed into every slice.
            </p>

            <div className="cta-row">
              <a href="#menu" className="primary-btn">
                Order Now
                <ArrowRight size={18} />
              </a>
              <a href="#menu" className="secondary-btn">
                Explore Menu
              </a>
            </div>

            <div className="hero-stats">
              <div>
                <strong>4.9/5</strong>
                <span>Customer rating</span>
              </div>
              <div>
                <strong>12k+</strong>
                <span>Orders served</span>
              </div>
              <div>
                <strong>25 min</strong>
                <span>Average delivery</span>
              </div>
            </div>
          </div>

          <div className="hero-visual" aria-label="Featured pizza illustration">
            <div className="pizza-visual-card">
              <div className="pizza-glow"></div>
              <img
                src="https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=900&q=80"
                alt="Fresh pizza"
              />
            </div>
            <div className="floating-card top-card">
              <span>🔥</span>
              <div>
                <strong>Truffle Supreme</strong>
                <small>Chef’s favorite</small>
              </div>
            </div>
            <div className="floating-card price-card">
              <strong>₹429</strong>
              <small>From</small>
            </div>
          </div>
        </section>

        <section id="menu" className="menu-section">
          <div className="section-heading">
            <span className="eyebrow">Popular Pizza</span>
            <h2>Fan favorites, baked to order</h2>
          </div>

          <div className="pizza-grid">
            {pizzas.map((pizza) => (
              <article key={pizza.id} className="pizza-card">
                <div className="image-wrap">
                  <img src={pizza.image} alt={pizza.name} />
                  <span className="pizza-badge">{pizza.tag}</span>
                </div>

                <div className="pizza-info">
                  <div className="pizza-header">
                    <h3>{pizza.name}</h3>
                    <span className="rating">
                      <Star size={14} fill="currentColor" />
                      {pizza.rating}
                    </span>
                  </div>

                  <p>{pizza.description}</p>

                  <div className="pizza-footer">
                    <strong>₹{pizza.price}</strong>
                    <button type="button" onClick={addToCart}>
                      Add to Cart
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="features-section">
          <div className="section-heading centered">
            <span className="eyebrow">Why One Slice</span>
            <h2>Made for pizza lovers who want more</h2>
          </div>

          <div className="feature-grid">
            {features.map(({ icon: Icon, title, description }) => (
              <div key={title} className="feature-card">
                <div className="feature-icon">
                  <Icon size={24} />
                </div>
                <h3>{title}</h3>
                <p>{description}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="offers" className="offers-section">
          <div className="section-heading">
            <span className="eyebrow">Offers</span>
            <h2>Big flavor, bigger savings</h2>
          </div>

          <div className="offers-grid">
            {offers.map((offer) => (
              <div key={offer.title} className="offer-card">
                <span className="offer-badge">{offer.badge}</span>
                <h3>{offer.title}</h3>
                <p>{offer.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="about" className="about-section">
          <div className="about-copy">
            <span className="eyebrow">About us</span>
            <h2>Bringing handcrafted pizza to your everyday cravings.</h2>
            <p>
              One Slice blends premium ingredients, bold flavor profiles, and a fast,
              friendly ordering experience to make every pizza run feel effortless.
            </p>
          </div>

          <div className="stats-panel">
            <div>
              <strong>500+</strong>
              <span>Recipes tested</span>
            </div>
            <div>
              <strong>10k+</strong>
              <span>Happy customers</span>
            </div>
            <div>
              <strong>7 days</strong>
              <span>Fresh every week</span>
            </div>
          </div>
        </section>

        <section id="cart" className="cart-summary">
          <div>
            <span className="eyebrow">Cart</span>
            <h3>{cartCount} item{cartCount === 1 ? '' : 's'} in your order</h3>
          </div>
          <button type="button" className="primary-btn small-btn">
            Checkout
          </button>
        </section>
      </main>

      <footer className="site-footer">
        <div className="brand footer-brand">
          <img src={logo} alt="One Slice logo" />
          <div>
            <span className="brand-name">ONE SLICE</span>
          </div>
        </div>
        <p>© 2026 One Slice. Crafted for pizza lovers.</p>
      </footer>
    </div>
  )
}

export default App
