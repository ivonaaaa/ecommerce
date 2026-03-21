"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { CartContext as CartContextType } from "../../types/global"
import { createCart, getCart, addItem, updateItem } from "@lib/data/cart"
import { HttpTypes } from "@medusajs/types"

const CART_ID_COOKIE = "cart_id"
const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<HttpTypes.StoreCart | undefined>(undefined)
  const cartCount =
    cart?.items?.reduce((counter, item) => counter + item.quantity, 0) || 0

  useEffect(() => {
    const initCart = async () => {
      const cartId = document.cookie
        .split("; ")
        .find((row) => row.startsWith(`${CART_ID_COOKIE}=`))
        ?.split("=")[1]

      if (cartId) {
        const existingCart = await getCart(cartId)
        setCart(existingCart)
      } else {
        const newCart = await createCart()
        document.cookie = `${CART_ID_COOKIE}=${newCart.id}`
        setCart(newCart)
      }
    }
    initCart()
  }, [])

  const addToCart = async (variantId: string, quantity: number) => {
    if (!cart) return
    const updatedCart = await addItem(cart.id, variantId, quantity)
    setCart(updatedCart)
  }

  const updateQuantity = async (lineItemId: string, quantity: number) => {
    if (!cart) return
    const updatedCart = await updateItem(cart.id, lineItemId, quantity)
    setCart(updatedCart)
  }

  return (
    <CartContext.Provider
      value={{ cart, cartCount, addToCart, updateQuantity }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) throw new Error("useCart must be used within a CartProvider")
  return context
}
