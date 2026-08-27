export const pizzas = [
  {
    id: 'margherita-supreme',
    name: 'Margherita Supreme',
    category: 'Classic',
    type: 'veg',
    price: 289,
    rating: 4.8,
    reviews: 187,
    image:
      'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=900&q=80',
    description: 'A timeless classic with fresh basil, rich tomato sauce, and a perfect melt of mozzarella.',
    tags: ['Best Seller', 'Chef Pick'],
    popular: true,
  },
  {
    id: 'farmhouse-fusion',
    name: 'Farmhouse Fusion',
    category: 'Veg Special',
    type: 'veg',
    price: 339,
    rating: 4.7,
    reviews: 128,
    image:
      'https://images.unsplash.com/photo-1548365328-9f547fb9587c?auto=format&fit=crop&w=900&q=80',
    description: 'Loaded with onions, capsicum, tomatoes, olives, and a dazzling blend of cheese.',
    tags: ['Fresh', 'Loaded'],
    popular: true,
  },
  {
    id: 'pepperoni-passion',
    name: 'Pepperoni Passion',
    category: 'Non-Veg',
    type: 'nonveg',
    price: 369,
    rating: 4.9,
    reviews: 214,
    image:
      'https://images.unsplash.com/photo-1552539618-7eec9b4d778d?auto=format&fit=crop&w=900&q=80',
    description: 'Crisp pepperoni slices, smoky sauces, and a bold cheese finish for meat lovers.',
    tags: ['Hot Pick', 'Popular'],
    popular: true,
  },
  {
    id: 'tandoori-paneer',
    name: 'Tandoori Paneer',
    category: 'Paneer',
    type: 'veg',
    price: 349,
    rating: 4.8,
    reviews: 162,
    image:
      'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=900&q=80',
    description: 'Smoky tandoori paneer, onion, peppers, and creamy sauces with a vibrant finish.',
    tags: ['Spicy', 'Signature'],
    popular: false,
  },
  {
    id: 'veg-extravaganza',
    name: 'Veg Extravaganza',
    category: 'Veg Special',
    type: 'veg',
    price: 389,
    rating: 4.9,
    reviews: 303,
    image:
      'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?auto=format&fit=crop&w=900&q=80',
    description: 'A massive mix of veggies, sweet corn, olives, jalapenos, and extra cheese.',
    tags: ['Party', 'Value'],
    popular: true,
  },
  {
    id: 'bbq-chicken',
    name: 'BBQ Chicken Blast',
    category: 'Non-Veg',
    type: 'nonveg',
    price: 409,
    rating: 4.7,
    reviews: 146,
    image:
      'https://images.unsplash.com/photo-1506354666786-959d6d497f1a?auto=format&fit=crop&w=900&q=80',
    description: 'Tangy barbecue chicken with smoky sauce, jalapenos, and onions over crisp crust.',
    tags: ['Smoky', 'Bold'],
    popular: false,
  },
  {
    id: 'cheese-burst-delight',
    name: 'Cheese Burst Delight',
    category: 'Cheese Lovers',
    type: 'veg',
    price: 429,
    rating: 4.9,
    reviews: 271,
    image:
      'https://images.unsplash.com/photo-1594007654729-407eedc4be65?auto=format&fit=crop&w=900&q=80',
    description: 'Extra cheese, loaded toppings, and a buttery cheese-burst base that goes all in.',
    tags: ['Cheesy', 'Premium'],
    popular: true,
  },
];

export const pizzaSizes = [
  { label: 'Small', price: 0 },
  { label: 'Medium', price: 120 },
  { label: 'Large', price: 220 },
];

export const crustOptions = [
  { label: 'Classic', price: 0 },
  { label: 'Thin Crust', price: 40 },
  { label: 'Cheese Burst', price: 120 },
  { label: 'Stuffed Crust', price: 150 },
];

export const toppingOptions = [
  { label: 'Onion', price: 30 },
  { label: 'Capsicum', price: 35 },
  { label: 'Mushroom', price: 40 },
  { label: 'Jalapeno', price: 35 },
  { label: 'Corn', price: 30 },
  { label: 'Olives', price: 45 },
  { label: 'Extra Cheese', price: 60 },
  { label: 'Paneer', price: 55 },
];
