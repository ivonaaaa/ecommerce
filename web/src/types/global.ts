import { HttpTypes, StorePrice } from "@medusajs/types"

export type FeaturedProduct = {
  id: string
  title: string
  handle: string
  thumbnail?: string
}

export type VariantPrice = {
  calculated_price_number: number
  calculated_price: string
  original_price_number: number
  original_price: string
  currency_code: string
  price_type: string
  percentage_diff: string
}

export type StoreFreeShippingPrice = StorePrice & {
  target_reached: boolean
  target_remaining: number
  remaining_percentage: number
}

export type CartContext = {
  cart: HttpTypes.StoreCart | undefined
  cartCount: number
  addToCart: (variantId: string, quantity: number) => Promise<void>
  removeFromCart: (lineItemId: string, quantity: number) => Promise<void>
  updateQuantity: (lineItemId: string, quantity: number) => Promise<void>
}
