import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const addressOptions = [
  '42, Maple Street, Koramangala, Bengaluru',
  '12th Floor, Prime Tech Park, HSR Layout, Bengaluru',
  '18, Sunset Avenue, Indiranagar, Bengaluru',
];

export default function Checkout() {
  const navigate = useNavigate();
  const { cart, subtotal, discount, deliveryFee, tax, total, placeOrder } = useCart();
  const [selectedAddress, setSelectedAddress] = useState(addressOptions[0]);
  const [paymentMethod, setPaymentMethod] = useState('UPI');

  const handlePlaceOrder = async () => {
    if (!cart.length) return;

    const items = cart.map((item) => ({
      pizza: {
        id: item.pizzaId,
        name: item.name,
        image: item.image,
        description: item.description,
      },
      customization: {
        size: item.size,
        crust: item.crust,
        toppings: item.toppings,
      },
      quantity: item.quantity,
      total: item.totalPrice * item.quantity,
    }));

    await placeOrder({ address: selectedAddress, paymentMethod, items });
    navigate('/tracking');
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="space-y-6">
        <section className="rounded-[28px] border border-orange-100 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-black text-stone-900">Delivery Address</h2>
          <div className="mt-5 space-y-3">
            {addressOptions.map((address) => (
              <label key={address} className="flex cursor-pointer items-start gap-3 rounded-2xl border border-orange-100 bg-orange-50 p-4">
                <input
                  type="radio"
                  name="address"
                  checked={selectedAddress === address}
                  onChange={() => setSelectedAddress(address)}
                  className="mt-1 h-4 w-4 accent-orange-500"
                />
                <span className="text-sm text-stone-700">{address}</span>
              </label>
            ))}
          </div>
        </section>

        <section className="rounded-[28px] border border-orange-100 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-black text-stone-900">Payment Method</h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            {['UPI', 'Credit/Debit Card', 'Cash on Delivery'].map((method) => (
              <button
                key={method}
                type="button"
                onClick={() => setPaymentMethod(method)}
                className={`rounded-2xl border px-4 py-3 text-sm font-semibold transition ${
                  paymentMethod === method
                    ? 'border-orange-500 bg-orange-500 text-white shadow-md shadow-orange-200'
                    : 'border-orange-200 bg-orange-50 text-stone-700 hover:border-orange-300'
                }`}
              >
                {method}
              </button>
            ))}
          </div>
        </section>
      </div>

      <aside className="rounded-[30px] border border-orange-100 bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-black text-stone-900">Order Summary</h2>

        <div className="mt-5 space-y-4">
          {cart.map((item) => (
            <div key={item.id} className="flex items-center gap-3 rounded-2xl bg-orange-50 p-3">
              <img src={item.image} alt={item.name} className="h-16 w-16 rounded-xl object-cover" />
              <div className="flex-1 text-sm">
                <div className="font-bold text-stone-800">{item.name}</div>
                <div className="text-stone-500">{item.quantity}x • {item.size}</div>
              </div>
              <div className="font-bold text-stone-800">₹{item.totalPrice * item.quantity}</div>
            </div>
          ))}
        </div>

        <div className="mt-6 space-y-3 text-sm text-stone-600">
          <div className="flex items-center justify-between"><span>Subtotal</span><span>₹{subtotal}</span></div>
          <div className="flex items-center justify-between"><span>Discount</span><span>-₹{discount}</span></div>
          <div className="flex items-center justify-between"><span>Delivery</span><span>₹{deliveryFee}</span></div>
          <div className="flex items-center justify-between"><span>Taxes</span><span>₹{tax.toFixed(2)}</span></div>
          <div className="border-t border-orange-100 pt-3 text-base font-black text-stone-900">
            <div className="flex items-center justify-between"><span>Total</span><span>₹{total.toFixed(2)}</span></div>
          </div>
        </div>

        <button
          type="button"
          onClick={handlePlaceOrder}
          className="mt-7 inline-flex w-full items-center justify-center rounded-full bg-orange-500 px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-orange-200 transition hover:bg-orange-600"
        >
          Place Order
        </button>
      </aside>
    </div>
  );
}
