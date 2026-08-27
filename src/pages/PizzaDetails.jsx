import { Minus, Plus, ShoppingCart, Star } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { crustOptions, pizzaSizes, toppingOptions } from '../data/pizzas';
import { pizzas } from '../data/pizzas';
import { useCart } from '../context/CartContext';

export default function PizzaDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const pizza = pizzas.find((item) => item.id === id) || pizzas[0];
  const [selectedSize, setSelectedSize] = useState('Medium');
  const [selectedCrust, setSelectedCrust] = useState('Classic');
  const [selectedToppings, setSelectedToppings] = useState(['Extra Cheese']);
  const [quantity, setQuantity] = useState(1);

  const sizePrice = useMemo(
    () => pizzaSizes.find((size) => size.label === selectedSize)?.price || 0,
    [selectedSize],
  );

  const crustPrice = useMemo(
    () => crustOptions.find((crust) => crust.label === selectedCrust)?.price || 0,
    [selectedCrust],
  );

  const toppingsPrice = useMemo(
    () => selectedToppings.reduce((sum, topping) => {
      const match = toppingOptions.find((option) => option.label === topping);
      return sum + (match?.price || 0);
    }, 0),
    [selectedToppings],
  );

  const totalPrice = (pizza.price + sizePrice + crustPrice + toppingsPrice) * quantity;

  const toggleTopping = (topping) => {
    setSelectedToppings((current) =>
      current.includes(topping)
        ? current.filter((item) => item !== topping)
        : [...current, topping],
    );
  };

  const handleAddToCart = () => {
    addToCart(pizza, {
      size: selectedSize,
      crust: selectedCrust,
      toppings: selectedToppings,
      quantity,
      totalPrice: totalPrice / quantity,
    });
    navigate('/cart');
  };

  return (
    <div className="space-y-8">
      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="overflow-hidden rounded-[30px] border border-orange-100 bg-white p-4 shadow-[0_18px_40px_rgba(175,90,30,0.08)]">
          <img src={pizza.image} alt={pizza.name} className="h-[520px] w-full rounded-[24px] object-cover" />
        </div>

        <div className="rounded-[30px] border border-orange-100 bg-white p-6 shadow-[0_18px_40px_rgba(175,90,30,0.08)]">
          <div className="mb-4 flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-orange-600">{pizza.category}</p>
              <h1 className="mt-2 text-4xl font-black text-stone-900">{pizza.name}</h1>
            </div>
            <div className="rounded-full bg-orange-50 px-3 py-1.5 text-lg font-black text-orange-700">₹{pizza.price}</div>
          </div>

          <div className="mb-5 flex items-center gap-2 text-amber-500">
            <Star size={18} fill="currentColor" />
            <span className="text-sm font-bold text-stone-800">{pizza.rating} ({pizza.reviews} reviews)</span>
          </div>

          <p className="text-base leading-7 text-stone-600">{pizza.description}</p>

          <div className="mt-8 space-y-8">
            <div>
              <div className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-stone-500">Size</div>
              <div className="grid grid-cols-3 gap-3">
                {pizzaSizes.map((size) => (
                  <button
                    key={size.label}
                    type="button"
                    onClick={() => setSelectedSize(size.label)}
                    className={`rounded-2xl border px-4 py-3 text-sm font-semibold transition ${
                      selectedSize === size.label
                        ? 'border-orange-500 bg-orange-500 text-white shadow-md shadow-orange-200'
                        : 'border-orange-200 bg-orange-50 text-stone-700 hover:border-orange-300'
                    }`}
                  >
                    {size.label}
                    <span className="ml-2 text-xs opacity-80">₹{size.price}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-stone-500">Crust</div>
              <div className="grid gap-3 sm:grid-cols-2">
                {crustOptions.map((crust) => (
                  <button
                    key={crust.label}
                    type="button"
                    onClick={() => setSelectedCrust(crust.label)}
                    className={`rounded-2xl border px-4 py-3 text-left text-sm font-semibold transition ${
                      selectedCrust === crust.label
                        ? 'border-orange-500 bg-orange-500 text-white shadow-md shadow-orange-200'
                        : 'border-orange-200 bg-orange-50 text-stone-700 hover:border-orange-300'
                    }`}
                  >
                    {crust.label}
                    <span className="ml-2 text-xs opacity-80">₹{crust.price}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-stone-500">Toppings</div>
              <div className="grid gap-3 sm:grid-cols-2">
                {toppingOptions.map((topping) => (
                  <button
                    key={topping.label}
                    type="button"
                    onClick={() => toggleTopping(topping.label)}
                    className={`rounded-2xl border px-4 py-3 text-left text-sm font-medium transition ${
                      selectedToppings.includes(topping.label)
                        ? 'border-orange-500 bg-orange-50 text-orange-700'
                        : 'border-orange-200 bg-white text-stone-700 hover:border-orange-300'
                    }`}
                  >
                    {topping.label}
                    <span className="ml-2 text-xs text-stone-500">₹{topping.price}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="rounded-[30px] border border-orange-100 bg-white p-6 shadow-[0_18px_40px_rgba(175,90,30,0.08)]">
        <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
          <div>
            <h2 className="text-2xl font-black text-stone-900">Your Pizza</h2>
            <div className="mt-5 space-y-3 text-sm text-stone-600">
              <div className="flex items-center justify-between"><span>Base Price</span><span>₹{pizza.price}</span></div>
              <div className="flex items-center justify-between"><span>Size Price</span><span>₹{sizePrice}</span></div>
              <div className="flex items-center justify-between"><span>Crust Price</span><span>₹{crustPrice}</span></div>
              <div className="flex items-center justify-between"><span>Topping Price</span><span>₹{toppingsPrice}</span></div>
            </div>
          </div>

          <div className="rounded-[22px] bg-[#fff7f0] p-5">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-sm font-semibold uppercase tracking-[0.15em] text-stone-500">Quantity</span>
              <div className="flex items-center gap-3 rounded-full border border-orange-200 bg-white px-2 py-1">
                <button type="button" onClick={() => setQuantity((value) => Math.max(1, value - 1))} className="rounded-full p-1 hover:bg-orange-50">
                  <Minus size={16} className="text-stone-700" />
                </button>
                <span className="min-w-6 text-center font-bold text-stone-800">{quantity}</span>
                <button type="button" onClick={() => setQuantity((value) => value + 1)} className="rounded-full p-1 hover:bg-orange-50">
                  <Plus size={16} className="text-stone-700" />
                </button>
              </div>
            </div>

            <div className="border-t border-orange-100 pt-4">
              <div className="flex items-center justify-between text-lg font-black text-stone-900">
                <span>Final Price</span>
                <span>₹{totalPrice}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleAddToCart}
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-orange-500 px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-orange-200 transition hover:bg-orange-600"
            >
              <ShoppingCart size={18} />
              Add Customized Pizza to Cart
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
