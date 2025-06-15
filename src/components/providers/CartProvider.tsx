// src/components/providers/CartProvider.tsx
'use client';

import { createContext, ReactNode, useContext, useState } from "react";
import CartWidget from "../sections/CartWidget";
import { useLocalStorage } from "@/hooks/useLocalStorage";

type CartWidgetProps = {
  children: ReactNode
}
 
type CartItem = {
  id: string
  quantity: number
}

type CartWidgetContext = {
  isOpen: boolean;
  openCart: () => void
  closeCart: () => void
  getItemQuantity: (id: string) => number
  increaseCartQuantity: (id: string, amount: number) => void
  decreaseCartQuantity: (id: string) => void
  removeFromCart: (id: string) => void
  resetCart: () => void
  cartQuantity: number
  cartItems: CartItem[]
}

const CartWidgetContext = createContext({} as CartWidgetContext)

export function useCartWidget() {
    return useContext(CartWidgetContext)
}

export function CartWidgetProvider({ children }: CartWidgetProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>('cart-items', [])
  
  const openCart = () => setIsOpen(true)
  const closeCart = () => setIsOpen(false)  

  const cartQuantity = cartItems.reduce(
    (quantity, item) => item.quantity + quantity,
    0
  )

  function getItemQuantity(id: string) {
    return cartItems.find(item => item.id === id)?.quantity ?? 0
  }
  
  function increaseCartQuantity(id: string, amount: number = 1) {
    setCartItems(currItems => {
      if (currItems.find(item => item.id === id) == null) {
        return [...currItems, { id, quantity: amount }]
      } else {
        return currItems.map(item => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity + amount }
          } else {
            return item
          }
        })
      }
    })
  }
  
  function decreaseCartQuantity(id: string) {
    setCartItems(currItems => {
      if (currItems.find(item => item.id === id)?.quantity === 1) {
        return currItems.filter(item => item.id !== id)
      } else {
        return currItems.map(item => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity - 1 }
          } else {
            return item
          }
        })
      }
    })
  }
  
  function removeFromCart(id: string) {
    setCartItems(currItems => {
      return currItems.filter(item => item.id !== id)
    })
  }

  function resetCart() {
    setCartItems([])
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
        cartQuantity
      }}
    >
      {children}
      <CartWidget />
    </CartWidgetContext.Provider>
  )
}