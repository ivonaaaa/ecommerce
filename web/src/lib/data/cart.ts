import { sdk } from "@lib/config"
import medusaError from "@lib/util/medusa-error"

const REGION_ID = process.env.REGION_ID

export async function getCart(cartId: string) {
  try {
    const { cart } = await sdk.store.cart.retrieve(cartId)
    return cart
  } catch (error) {
    throw medusaError(error)
  }
}

export async function createCart() {
  try {
    const { cart } = await sdk.store.cart.create({
      region_id: REGION_ID,
    })
    return cart
  } catch (error) {
    throw medusaError(error)
  }
}

export async function addItem(
  cartId: string,
  variantId: string,
  quantity: number
) {
  try {
    const { cart } = await sdk.store.cart.createLineItem(cartId, {
      variant_id: variantId,
      quantity,
    })
    return cart
  } catch (error) {
    throw medusaError(error)
  }
}

export async function updateItem(
  cartId: string,
  lineItemId: string,
  quantity: number
) {
  try {
    const { cart } = await sdk.store.cart.updateLineItem(cartId, lineItemId, {
      quantity,
    })
    return cart
  } catch (error) {
    throw medusaError(error)
  }
}
