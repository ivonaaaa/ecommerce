import { sdk } from "@lib/config"

const REGION_ID = process.env.REGION_ID

export async function getCart(cartId: string) {
  const { cart } = await sdk.store.cart.retrieve(cartId)
  return cart
}

export async function createCart() {
  const { cart } = await sdk.store.cart.create({
    region_id: REGION_ID,
  })
  return cart
}

export async function addItem(
  cartId: string,
  variantId: string,
  quantity: number
) {
  const { cart } = await sdk.store.cart.createLineItem(cartId, {
    variant_id: variantId,
    quantity,
  })
  return cart
}

export async function removeItem(cartId: string, lineItemId: string) {
  await sdk.store.cart.deleteLineItem(cartId, lineItemId)
  const cart = await getCart(cartId)
  return cart
}

export async function updateItem(
  cartId: string,
  lineItemId: string,
  quantity: number
) {
  const { cart } = await sdk.store.cart.updateLineItem(cartId, lineItemId, {
    quantity,
  })
  return cart
}
