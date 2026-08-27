import { ArrowRight, ChefHat, Clock3, ShieldCheck, Sparkles, Star } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { pizzas } from '../data/pizzas';
import { offers } from '../data/offers';
import { reviews } from '../data/reviews';
import { useCart } from '../context/CartContext';
import PizzaCard from '../components/PizzaCard';

const categories = [
  { name: 'Classic', icon: '🍕' },
  { name: 'Veg Special', icon: '🥬' },
  { name: 'Paneer', icon: '🧀' },
  { name: 'Non-Veg', icon: '🍗' },
  { name: 'Cheese Lovers', icon: '🫓' },
];

export default function Home() {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const featured = pizzas.slice(0, 3);
  const dealOffers = offers.slice(0, 3);

  return (
    <div className="space-y-16 pb-12">
      <section className="overflow-hidden rounded-[32px] bg-gradient-to-br from-[#fffaf4] via-[#fff3e5] to-[#ffe8d2] p-6 shadow-[0_20px_60px_rgba(207,98,36,0.12)] sm:p-10">
        <div className="grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white/90 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-orange-600">
              <Sparkles size={14} /> Freshly Crafted
            </div>
            <h1 className="max-w-xl text-4xl font-black leading-tight text-stone-900 sm:text-5xl lg:text-6xl">
              Your Perfect Pizza, One Slice Away.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-stone-600">
              Customize every bite, track every order, and enjoy premium pizza made for busy lives and big cravings.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <button
                type="button"
                onClick={() => navigate('/menu')}
                className="inline-flex items-center gap-2 rounded-full bg-orange-500 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-orange-200 transition hover:bg-orange-600"
              >
                Order Now
                <ArrowRight size={16} />
              </button>
              <button
                type="button"
                onClick={() => navigate('/menu')}
                className="rounded-full border border-stone-300 bg-white px-6 py-3.5 text-sm font-semibold text-stone-800 transition hover:border-orange-200 hover:text-orange-600"
              >
                Explore Menu
              </button>
            </div>
            <div className="mt-8 flex items-center gap-8 text-sm text-stone-600">
              <div>
                <div className="text-2xl font-black text-stone-900">15k+</div>
                <div>happy pizzas</div>
              </div>
              <div>
                <div className="text-2xl font-black text-stone-900">4.9/5</div>
                <div>average rating</div>
              </div>
              <div>
                <div className="text-2xl font-black text-stone-900">18 min</div>
                <div>avg. delivery</div>
              </div>
            </div>
          </div>

          <div className="relative flex justify-center">
            <div className="absolute -left-6 top-8 h-40 w-40 rounded-full bg-orange-300/30 blur-3xl"></div>
            <div className="absolute -bottom-8 right-4 h-48 w-48 rounded-full bg-yellow-300/25 blur-3xl"></div>
            <div className="relative overflow-hidden rounded-[30px] border border-white/60 bg-white/70 p-4 shadow-[0_18px_45px_rgba(153,87,22,0.14)] backdrop-blur-sm">
              <img
                src="https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1200&q=80"
                alt="Delicious pizza"
                className="h-[460px] w-full rounded-[24px] object-cover"
              />
              <div className="absolute bottom-8 left-8 rounded-2xl bg-white/90 p-4 shadow-xl shadow-orange-100 backdrop-blur-sm">
                <div className="flex items-center gap-2 text-orange-600">
                  <Star size={16} fill="currentColor" />
                  <span className="text-sm font-bold">4.9 rating</span>
                </div>
                <div className="mt-2 text-lg font-bold text-stone-800">Margherita Supreme</div>
                <div className="text-sm text-stone-600">Fresh basil • cheese burst • roasted tomatoes</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="mb-7 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-orange-600">Popular picks</p>
            <h2 className="mt-2 text-3xl font-black text-stone-900">Most loved pizzas</h2>
          </div>
          <Link to="/menu" className="text-sm font-semibold text-orange-600 hover:text-orange-700">
            View full menu →
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {featured.map((pizza) => (
            <PizzaCard key={pizza.id} pizza={pizza} onAddToCart={(item) => addToCart(item)} />
          ))}
        </div>
      </section>

      <section className="rounded-[28px] bg-stone-900 p-8 text-white sm:p-10">
        <div className="mb-8 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-300">Browse by taste</p>
            <h2 className="mt-2 text-3xl font-black">Find your perfect slice</h2>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {categories.map((category) => (
            <div key={category.name} className="rounded-2xl border border-white/10 bg-white/5 p-5 text-center transition hover:bg-white/10">
              <div className="mb-3 text-3xl">{category.icon}</div>
              <div className="text-base font-semibold">{category.name}</div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <div className="mb-8 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-600">Special deals</p>
            <h2 className="mt-2 text-3xl font-black text-stone-900">Offers made for cravings</h2>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {dealOffers.map((offer) => (
            <div key={offer.id} className={`rounded-[26px] bg-gradient-to-br ${offer.accent} p-[1px]`}>
              <div className="h-full rounded-[25px] bg-white p-6">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <span className="rounded-full bg-orange-100 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-orange-700">
                    {offer.badge}
                  </span>
                  <span className="text-xl font-black text-stone-900">{offer.code}</span>
                </div>
                <h3 className="text-2xl font-black text-stone-900">{offer.title}</h3>
                <p className="mt-3 text-sm leading-6 text-stone-600">{offer.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-[30px] bg-[#fff3e2] p-8 sm:p-10">
        <div className="grid gap-8 lg:grid-cols-4">
          <div className="rounded-[24px] bg-white p-6 shadow-sm">
            <ChefHat className="mb-4 text-orange-500" size={28} />
            <h3 className="text-xl font-bold text-stone-800">Artisan Pizza</h3>
            <p className="mt-2 text-sm text-stone-600">Fresh ingredients and handmade dough for every order.</p>
          </div>
          <div className="rounded-[24px] bg-white p-6 shadow-sm">
            <Clock3 className="mb-4 text-orange-500" size={28} />
            <h3 className="text-xl font-bold text-stone-800">Fast Delivery</h3>
            <p className="mt-2 text-sm text-stone-600">Track the cooking and delivery timeline in real time.</p>
          </div>
          <div className="rounded-[24px] bg-white p-6 shadow-sm">
            <ShieldCheck className="mb-4 text-orange-500" size={28} />
            <h3 className="text-xl font-bold text-stone-800">Secure Checkout</h3>
            <p className="mt-2 text-sm text-stone-600">Safe payments and smooth order confirmation every time.</p>
          </div>
          <div className="rounded-[24px] bg-white p-6 shadow-sm">
            <Sparkles className="mb-4 text-orange-500" size={28} />
            <h3 className="text-xl font-bold text-stone-800">Smart Customization</h3>
            <p className="mt-2 text-sm text-stone-600">Choose size, crust, toppings, and personalized extras.</p>
          </div>
        </div>
      </section>

      <section>
        <div className="mb-8 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-600">Customer stories</p>
            <h2 className="mt-2 text-3xl font-black text-stone-900">Loved by pizza fans</h2>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {reviews.map((review) => (
            <div key={review.id} className="rounded-[24px] border border-orange-100 bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <div className="font-bold text-stone-800">{review.name}</div>
                  <div className="text-sm text-stone-500">{review.date}</div>
                </div>
                <div className="flex items-center gap-1 text-amber-500">
                  {Array.from({ length: review.rating }).map((_, index) => (
                    <Star key={`${review.id}-${index}`} size={16} fill="currentColor" />
                  ))}
                </div>
              </div>
              <p className="text-sm leading-6 text-stone-600">“{review.review}”</p>
              <div className="mt-4 text-sm font-semibold text-orange-700">Ordered: {review.pizza}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-[30px] bg-gradient-to-r from-orange-500 to-red-500 p-8 text-white shadow-[0_18px_50px_rgba(234,88,12,0.3)] sm:p-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-100">Ready to order?</p>
            <h2 className="mt-2 text-3xl font-black">Build your dream pizza today.</h2>
          </div>
          <button
            type="button"
            onClick={() => navigate('/menu')}
            className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3.5 text-sm font-bold text-orange-600 transition hover:bg-orange-50"
          >
            Start Customizing
          </button>
        </div>
      </section>
    </div>
  );
}
