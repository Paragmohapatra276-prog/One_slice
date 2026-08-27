import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useState } from 'react';

export default function Cart() {
  const { cart, subtotal, deliveryFee, tax, total, discount, couponCode, setCoupon, updateQuantity, removeItem } = useCart();
  const [couponInput, setCouponInput] = useState(couponCode);

  if (cart.length === 0) {
    return (
      <div className="rounded-[30px] border border-dashed border-orange-200 bg-white p-12 text-center shadow-sm">
        <h1 className="text-3xl font-black text-stone-900">Your cart is empty</h1>
        <p className="mt-3 text-stone-600">Add a few pizzas to get started with your next favorite order.</p>
        <Link to="/menu" className="mt-6 inline-flex rounded-full bg-orange-500 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-orange-200 hover:bg-orange-600">
          Explore Menu
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
      <div className="space-y-5">
        {cart.map((item) => (
          <div key={item.id} className="flex flex-col gap-4 rounded-[28px] border border-orange-100 bg-white p-4 shadow-sm sm:flex-row">
            <img src={item.image} alt={item.name} className="h-28 w-full rounded-[22px] object-cover sm:w-32" />

            <div className="flex flex-1 flex-col justify-between gap-3">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-xl font-black text-stone-900">{item.name}</h3>
                  <p className="text-sm text-stone-500">
                    {item.size} • {item.crust} • {item.toppings.length ? item.toppings.join(', ') : 'No extra toppings'}
                  </p>
                </div>
                <button type="button" onClick={() => removeItem(item.id)} className="text-stone-400 hover:text-red-500" aria-label={`Remove ${item.name}`}>
                  <Trash2 size={18} />
                </button>
              </div>

              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 rounded-full border border-orange-200 bg-orange-50 px-2 py-1">
                  <button type="button" onClick={() => updateQuantity(item.id, -1)} className="rounded-full p-1 hover:bg-white">
                    <Minus size={15} />
                  </button>
                  <span className="min-w-5 text-center text-sm font-bold text-stone-800">{item.quantity}</span>
                  <button type="button" onClick={() => updateQuantity(item.id, 1)} className="rounded-full p-1 hover:bg-white">
                    <Plus size={15} />
                  </button>
                </div>

                <div className="text-right">
                  <div className="text-sm text-stone-500">Each</div>
                  <div className="text-lg font-black text-stone-900">₹{item.totalPrice}</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <aside className="rounded-[30px] border border-orange-100 bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-black text-stone-900">Order Summary</h2>

        <div className="mt-6 space-y-3 text-sm text-stone-600">
          <div className="flex items-center justify-between"><span>Subtotal</span><span>₹{subtotal}</span></div>
          <div className="flex items-center justify-between"><span>Discount</span><span>-₹{discount}</span></div>
          <div className="flex items-center justify-between"><span>Delivery</span><span>₹{deliveryFee}</span></div>
          <div className="flex items-center justify-between"><span>Taxes</span><span>₹{tax.toFixed(2)}</span></div>
          <div className="border-t border-orange-100 pt-3 text-base font-black text-stone-900">
            <div className="flex items-center justify-between"><span>Total</span><span>₹{total.toFixed(2)}</span></div>
          </div>
        </div>

        <div className="mt-6 space-y-3">
          <div className="flex gap-2">
            <input
              value={couponInput}
              onChange={(event) => setCouponInput(event.target.value)}
              placeholder="Coupon code"
              className="w-full rounded-full border border-orange-200 bg-orange-50 px-4 py-2.5 text-sm text-stone-700 outline-none focus:border-orange-300"
            />
            <button
              type="button"
              onClick={() => setCoupon(couponInput)}
              className="rounded-full bg-stone-900 px-4 py-2.5 text-sm font-bold text-white hover:bg-stone-800"
            >
              Apply
            </button>
          </div>
          <div className="text-xs text-stone-500">Try GET20 for 20% off or FREEDEL for free delivery.</div>
        </div>

        <div className="mt-6 flex flex-col gap-3">
          <Link to="/menu" className="inline-flex items-center justify-center rounded-full border border-orange-200 bg-orange-50 px-5 py-3 text-sm font-bold text-orange-700 hover:bg-orange-100">
            Continue Shopping
          </Link>
          <Link to="/checkout" className="inline-flex items-center justify-center rounded-full bg-orange-500 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-orange-200 hover:bg-orange-600">
            Proceed to Checkout
          </Link>
        </div>
      </aside>
    </div>
  );
}
