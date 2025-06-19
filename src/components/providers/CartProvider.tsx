// src/components/providers/CartProvider.tsx
"use client";

import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useProducts } from "@/hooks/useProducts";
import type { IProduct } from "@/types";
import {
  type ReactNode,
  createContext,
  useContext,
  useMemo,
  useState,
} from "react";
import CartWidget from "../sections/CartWidget";

type CartWidgetProps = {
  children: ReactNode;
};

type CartItem = IProduct & {
  quantity: number;
};

type CartWidgetContext = {
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  getItemQuantity: (id: string) => number;
  increaseCartQuantity: (id: string, amount: number) => Promise<void>;
  decreaseCartQuantity: (id: string) => void;
  removeFromCart: (id: string) => void;
  resetCart: () => void;
  cartQuantity: number;
  cartItems: CartItem[];
};

const CartWidgetContext = createContext({} as CartWidgetContext);

export function useCartWidget() {
  return useContext(CartWidgetContext);
}

export function CartWidgetProvider({ children }: CartWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>(
    "cart-items",
    [],
  );
  const { getProduct } = useProducts();

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  const cartQuantity = useMemo(
    () => cartItems.reduce((quantity, item) => item.quantity + quantity, 0),
    [cartItems],
  );

  function getItemQuantity(id: string) {
    return cartItems.find((item) => item._id.toString() === id)?.quantity ?? 0;
  }

  async function increaseCartQuantity(id: string, amount: number = 1) {
    const result = await (async (currItems: CartItem[]) => {
      const product = currItems.find((item) => item?._id.toString() === id);
      if (product == null) {
        const productResponse = await getProduct(id);
        if (productResponse.success && productResponse.product) {
          return [
            ...currItems,
            { ...productResponse.product, quantity: amount },
          ];
        }
      }
      return currItems.map((item) => {
        if (item._id.toString() === id) {
          return { ...item, quantity: item.quantity + amount };
        }
        return item;
      });
    })(cartItems);
    setCartItems(result);
  }

  function decreaseCartQuantity(id: string) {
    setCartItems((currItems) => {
      if (
        currItems.find((item) => item._id.toString() === id)?.quantity === 1
      ) {
        return currItems.filter((item) => item._id.toString() !== id);
      }
      return currItems.map((item) => {
        if (item._id.toString() === id) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      });
    });
  }

  function removeFromCart(id: string) {
    setCartItems((currItems) => {
      return currItems.filter((item) => item._id.toString() !== id);
    });
  }

  function resetCart() {
    setCartItems([]);
  }

  return (
    <CartWidgetContext.Provider
      value={{
        isOpen,
        openCart,
        closeCart,
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
        resetCart,
        cartItems,
        cartQuantity,
      }}
    >
      {children}
      <CartWidget />
    </CartWidgetContext.Provider>
  );
}
