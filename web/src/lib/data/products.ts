import { sdk } from "@lib/config"
import medusaError from "@lib/util/medusa-error"

const REGION_ID = process.env.REGION_ID

export async function getRelatedProducts(currentHandle: string) {
  try {
    const { products } = await sdk.store.product.list({
      region_id: REGION_ID,
    })
    return products.filter((p) => p.handle != currentHandle)
  } catch (error) {
    throw medusaError(error)
  }
}

export async function getProductByHandle(handle: string) {
  try {
    const { products } = await sdk.store.product.list({
      handle,
      region_id: REGION_ID,
    })
    return products[0]
  } catch (error) {
    throw medusaError(error)
  }
}
