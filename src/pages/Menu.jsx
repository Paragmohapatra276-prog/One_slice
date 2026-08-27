import { useMemo, useState } from 'react';
import { Filter, Search } from 'lucide-react';
import { pizzas } from '../data/pizzas';
import { useCart } from '../context/CartContext';
import PizzaCard from '../components/PizzaCard';

const categories = ['All', 'Classic', 'Veg Special', 'Paneer', 'Non-Veg', 'Cheese Lovers'];

export default function Menu() {
  const { addToCart } = useCart();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [vegOnly, setVegOnly] = useState(false);
  const [maxPrice, setMaxPrice] = useState(500);
  const [sortBy, setSortBy] = useState('popular');

  const filteredPizzas = useMemo(() => {
    const normalized = pizzas.filter((pizza) => {
      const matchesSearch = pizza.name.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || pizza.category === selectedCategory;
      const matchesVeg = !vegOnly || pizza.type === 'veg';
      const matchesPrice = pizza.price <= maxPrice;

      return matchesSearch && matchesCategory && matchesVeg && matchesPrice;
    });

    const sorted = [...normalized];
    if (sortBy === 'rating') sorted.sort((a, b) => b.rating - a.rating);
    if (sortBy === 'price-low') sorted.sort((a, b) => a.price - b.price);
    if (sortBy === 'price-high') sorted.sort((a, b) => b.price - a.price);
    if (sortBy === 'popular') sorted.sort((a, b) => (b.popular ? 1 : 0) - (a.popular ? 1 : 0));

    return sorted;
  }, [search, selectedCategory, vegOnly, maxPrice, sortBy]);

  return (
    <div className="space-y-8">
      <section className="rounded-[28px] bg-gradient-to-r from-[#fff2e7] to-[#ffe7d1] p-6 shadow-[0_12px_32px_rgba(201,88,35,0.08)]">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-600">Menu</p>
            <h1 className="mt-2 text-4xl font-black text-stone-900">Build your perfect pizza</h1>
          </div>

          <div className="relative w-full max-w-md">
            <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" size={18} />
            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search pizzas..."
              className="w-full rounded-full border border-orange-200 bg-white py-3 pl-12 pr-4 text-sm text-stone-700 outline-none ring-0 transition focus:border-orange-400"
            />
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[260px_1fr]">
        <aside className="rounded-[28px] border border-orange-100 bg-white p-5 shadow-sm">
          <div className="mb-5 flex items-center gap-2 text-stone-800">
            <Filter size={18} className="text-orange-500" />
            <span className="text-lg font-bold">Filters</span>
          </div>

          <div className="space-y-6">
            <div>
              <div className="mb-3 text-sm font-semibold uppercase tracking-[0.15em] text-stone-500">Category</div>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setSelectedCategory(category)}
                    className={`rounded-full px-3 py-2 text-sm font-medium transition ${
                      selectedCategory === category
                        ? 'bg-orange-500 text-white shadow-md shadow-orange-200'
                        : 'bg-orange-50 text-stone-700 hover:bg-orange-100'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="mb-3 text-sm font-semibold uppercase tracking-[0.15em] text-stone-500">Diet</div>
              <label className="flex items-center gap-3 text-sm font-medium text-stone-700">
                <input
                  type="checkbox"
                  checked={vegOnly}
                  onChange={() => setVegOnly((value) => !value)}
                  className="h-4 w-4 accent-orange-500"
                />
                Vegetarian only
              </label>
            </div>

            <div>
              <div className="mb-3 flex items-center justify-between text-sm font-semibold uppercase tracking-[0.15em] text-stone-500">
                <span>Price</span>
                <span>₹{maxPrice}</span>
              </div>
              <input
                type="range"
                min="200"
                max="500"
                step="10"
                value={maxPrice}
                onChange={(event) => setMaxPrice(Number(event.target.value))}
                className="w-full accent-orange-500"
              />
            </div>

            <div>
              <div className="mb-3 text-sm font-semibold uppercase tracking-[0.15em] text-stone-500">Sort by</div>
              <select
                value={sortBy}
                onChange={(event) => setSortBy(event.target.value)}
                className="w-full rounded-xl border border-orange-200 bg-orange-50 px-3 py-2.5 text-sm text-stone-700 outline-none focus:border-orange-300"
              >
                <option value="popular">Popularity</option>
                <option value="rating">Top Rated</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>
        </aside>

        <div className="space-y-6">
          <div className="flex items-center justify-between gap-4">
            <div className="text-sm text-stone-600">
              Showing <span className="font-bold text-stone-900">{filteredPizzas.length}</span> pizzas
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filteredPizzas.length > 0 ? (
              filteredPizzas.map((pizza) => (
                <PizzaCard key={pizza.id} pizza={pizza} onAddToCart={() => addToCart(pizza)} />
              ))
            ) : (
              <div className="col-span-full rounded-[28px] border border-dashed border-orange-200 bg-white p-12 text-center text-stone-600">
                No pizzas match your current filter. Try widening your search.
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
