import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-orange-100 bg-[#fffaf4]">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div>
          <div className="mb-3 text-xl font-black tracking-[0.16em] text-stone-800">ONE SLICE</div>
          <p className="text-sm text-stone-600">
            Premium pizza experiences crafted for cravings, convenience, and community.
          </p>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-stone-800">Explore</h3>
          <div className="space-y-2 text-sm text-stone-600">
            <Link to="/menu" className="block hover:text-orange-600">Menu</Link>
            <Link to="/offers" className="block hover:text-orange-600">Offers</Link>
            <Link to="/orders" className="block hover:text-orange-600">Order History</Link>
          </div>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-stone-800">Company</h3>
          <div className="space-y-2 text-sm text-stone-600">
            <Link to="/about" className="block hover:text-orange-600">About</Link>
            <Link to="/profile" className="block hover:text-orange-600">Profile</Link>
            <Link to="/login" className="block hover:text-orange-600">Login</Link>
          </div>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-stone-800">Support</h3>
          <div className="space-y-2 text-sm text-stone-600">
            <p>hello@oneslice.com</p>
            <p>+91 98765 43210</p>
            <p>Open daily, 11 AM - 12 AM</p>
          </div>
        </div>
      </div>

      <div className="border-t border-orange-100 py-4 text-center text-sm text-stone-500">
        © 2026 One Slice. Crafted for pizza lovers.
      </div>
    </footer>
  );
}
