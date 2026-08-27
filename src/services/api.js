import { pizzas, pizzaSizes, crustOptions, toppingOptions } from '../data/pizzas';
import { offers } from '../data/offers';
import { reviews } from '../data/reviews';

export const getPizzas = async () => pizzas;

export const getPizzaById = async (id) => pizzas.find((pizza) => pizza.id === id) || null;

export const getRecommendations = async () => pizzas.filter((pizza) => pizza.popular).slice(0, 4);

export const getOffers = async () => offers;

export const getReviews = async () => reviews;

export const getUserProfile = async () => ({
  name: 'Aarav Sharma',
  email: 'aarav@oneslice.com',
  phone: '+91 98765 43210',
  addresses: [
    { id: 1, label: 'Home', detail: '42, Maple Street, Koramangala, Bengaluru' },
    { id: 2, label: 'Office', detail: '12th Floor, Prime Tech Park, HSR Layout, Bengaluru' },
  ],
  favoritePizzas: ['Margherita Supreme', 'Veg Extravaganza'],
  paymentMethods: ['UPI', 'Visa •••• 2845', 'Cash on Delivery'],
});

export const createOrder = async (newOrder) => ({
  id: `OS-${Math.floor(1000 + Math.random() * 9000)}`,
  status: 'Order Placed',
  createdAt: new Date().toISOString(),
  ...newOrder,
});

export const getOrders = async () => [
  {
    id: 'OS-2458',
    date: 'Aug 15, 2026',
    items: ['Margherita Supreme x 2'],
    total: 789,
    status: 'Delivered',
  },
  {
    id: 'OS-3281',
    date: 'Aug 23, 2026',
    items: ['Tandoori Paneer x 1', 'Farmhouse Fusion x 1'],
    total: 689,
    status: 'Out for Delivery',
  },
];

export { pizzas, pizzaSizes, crustOptions, toppingOptions };
