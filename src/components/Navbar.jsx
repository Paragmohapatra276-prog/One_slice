import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, ShoppingBag, X } from 'lucide-react';
import { useCart } from '../context/CartContext';

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/menu', label: 'Menu' },
  { to: '/offers', label: 'Offers' },
  { to: '/orders', label: 'Orders' },
  { to: '/profile', label: 'Profile' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { cartCount } = useCart();

  return (
    <header className="sticky top-0 z-50 border-b border-orange-100 bg-[#fffaf4]/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-500 text-lg font-black text-white shadow-sm">
            O
          </div>
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.25em] text-orange-600">One Slice</div>
            <div className="text-lg font-black tracking-[0.12em] text-stone-800">ONE SLICE</div>
          </div>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `text-sm font-medium transition ${
                  isActive ? 'text-orange-600' : 'text-stone-700 hover:text-orange-600'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link to="/login" className="hidden rounded-full border border-orange-200 bg-white px-4 py-2 text-sm font-semibold text-stone-800 shadow-sm transition hover:border-orange-300 md:inline-flex">
            Login
          </Link>
          <Link to="/cart" className="relative inline-flex items-center gap-2 rounded-full bg-orange-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-orange-200 transition hover:bg-orange-600">
            <ShoppingBag size={18} />
            Cart
            <span className="inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-white px-1.5 text-xs font-bold text-orange-600">
              {cartCount}
            </span>
          </Link>
          <button
            type="button"
            className="inline-flex rounded-full border border-stone-200 p-2 md:hidden"
            onClick={() => setMobileOpen((open) => !open)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-orange-100 bg-white md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-4">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `rounded-xl px-3 py-2 text-sm font-medium transition ${
                    isActive ? 'bg-orange-50 text-orange-600' : 'text-stone-700 hover:bg-stone-50'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
            <Link to="/login" onClick={() => setMobileOpen(false)} className="rounded-xl border border-orange-200 px-3 py-2 text-sm font-medium text-stone-700">
              Login
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
