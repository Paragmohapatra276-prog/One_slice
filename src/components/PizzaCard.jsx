import { ArrowRight, Plus, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import Rating from './Rating';

export default function PizzaCard({ pizza, onAddToCart }) {
  return (
    <article className="group overflow-hidden rounded-[28px] border border-orange-100 bg-white shadow-[0_10px_30px_rgba(220,86,30,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_42px_rgba(220,86,30,0.12)]">
      <div className="relative overflow-hidden">
        <img
          src={pizza.image}
          alt={pizza.name}
          className="h-56 w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute left-4 top-4 flex flex-wrap gap-2">
          {pizza.tags?.slice(0, 2).map((tag) => (
            <span key={tag} className="rounded-full bg-white/90 px-2 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-orange-700">
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="space-y-4 p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-xl font-bold text-stone-800">{pizza.name}</h3>
            <p className="text-sm text-stone-500">{pizza.category}</p>
          </div>
          <div className="rounded-full bg-orange-50 px-2.5 py-1 text-sm font-bold text-orange-700">₹{pizza.price}</div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Rating value={pizza.rating} />
            <span className="text-sm text-stone-500">({pizza.reviews})</span>
          </div>
          <span className="rounded-full bg-lime-100 px-2 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-lime-700">
            {pizza.type === 'veg' ? 'Veg' : 'Non-Veg'}
          </span>
        </div>

        <p className="text-sm leading-6 text-stone-600">{pizza.description}</p>

        <div className="flex items-center gap-3">
          <Link
            to={`/pizza/${pizza.id}`}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-4 py-3 text-sm font-semibold text-orange-700 transition hover:border-orange-300 hover:bg-orange-100"
          >
            Customize
            <ArrowRight size={16} />
          </Link>

          <button
            type="button"
            onClick={() => onAddToCart(pizza)}
            className="inline-flex items-center justify-center rounded-full bg-orange-500 p-3 text-white shadow-lg shadow-orange-200 transition hover:bg-orange-600"
            aria-label={`Add ${pizza.name} to cart`}
          >
            <ShoppingCart size={18} />
          </button>
        </div>
      </div>
    </article>
  );
}
