import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { createOrder as createMockOrder } from '../services/api';

const CartContext = createContext();

const readStorage = (key, fallback) => {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
};

const formatItemId = (pizza, customization = {}) => {
  const selectedToppings = (customization.toppings || []).join('-');
  return `${pizza.id}-${customization.size || 'Medium'}-${customization.crust || 'Classic'}-${selectedToppings}`;
};

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => readStorage('oneslice-cart', []));
  const [orderHistory, setOrderHistory] = useState(() => readStorage('oneslice-orders', []));
  const [lastOrder, setLastOrder] = useState(() => readStorage('oneslice-last-order', null));
  const [couponCode, setCouponCode] = useState(() => readStorage('oneslice-coupon', ''));

  useEffect(() => {
    localStorage.setItem('oneslice-cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('oneslice-orders', JSON.stringify(orderHistory));
  }, [orderHistory]);

  useEffect(() => {
    localStorage.setItem('oneslice-last-order', JSON.stringify(lastOrder));
  }, [lastOrder]);

  useEffect(() => {
    localStorage.setItem('oneslice-coupon', JSON.stringify(couponCode));
  }, [couponCode]);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const subtotal = useMemo(
    () => cart.reduce((sum, item) => sum + item.totalPrice * item.quantity, 0),
    [cart],
  );

  const discount = useMemo(() => {
    if (couponCode === 'GET20') return subtotal * 0.2;
    if (couponCode === 'FREEDEL') return 59;
    return 0;
  }, [couponCode, subtotal]);

  const deliveryFee = subtotal > 0 ? (subtotal > 799 ? 0 : 59) : 0;
  const tax = subtotal * 0.05;
  const total = Math.max(subtotal + deliveryFee + tax - discount, 0);

  const addToCart = (pizza, customization = {}) => {
    const itemId = formatItemId(pizza, customization);
    const price = customization.totalPrice ?? pizza.price;

    setCart((currentCart) => {
      const existing = currentCart.find((item) => item.id === itemId);

      if (existing) {
        return currentCart.map((item) =>
          item.id === itemId ? { ...item, quantity: item.quantity + (customization.quantity || 1) } : item,
        );
      }

      return [
        ...currentCart,
        {
          id: itemId,
          pizzaId: pizza.id,
          name: pizza.name,
          image: pizza.image,
          basePrice: pizza.price,
          quantity: customization.quantity || 1,
          size: customization.size || 'Medium',
          crust: customization.crust || 'Classic',
          toppings: customization.toppings || [],
          totalPrice: price,
          description: pizza.description,
        },
      ];
    });
  };

  const updateQuantity = (id, delta) => {
    setCart((currentCart) =>
      currentCart
        .map((item) => {
          if (item.id !== id) return item;
          const nextQuantity = item.quantity + delta;
          return nextQuantity > 0 ? { ...item, quantity: nextQuantity } : null;
        })
        .filter(Boolean),
    );
  };

  const removeItem = (id) => {
    setCart((currentCart) => currentCart.filter((item) => item.id !== id));
  };

  const clearCart = () => setCart([]);

  const setCoupon = (code) => setCouponCode(code.trim().toUpperCase());

  const placeOrder = async ({ address, paymentMethod, items }) => {
    const payload = {
      id: `OS-${Math.floor(1000 + Math.random() * 9000)}`,
      status: 'Order Placed',
      address,
      paymentMethod,
      items,
      total,
      createdAt: new Date().toISOString(),
    };

    const order = await createMockOrder(payload);
    setLastOrder(order);
    setOrderHistory((current) => [order, ...current]);
    clearCart();
    return order;
  };

  const reorderOrder = (order) => {
    if (!order?.items) return;

    order.items.forEach((item) => {
      addToCart(item.pizza, {
        ...item.customization,
        quantity: item.quantity,
      });
    });
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        cartCount,
        subtotal,
        deliveryFee,
        tax,
        total,
        discount,
        couponCode,
        setCoupon,
        addToCart,
        updateQuantity,
        removeItem,
        clearCart,
        placeOrder,
        orderHistory,
        lastOrder,
        reorderOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }

  return context;
}
