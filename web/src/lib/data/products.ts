import { sdk } from "@lib/config"

const REGION_ID = process.env.REGION_ID

export async function getRelatedProducts(currentHandle: string) {
  const { products } = await sdk.store.product.list({
    region_id: REGION_ID,
  })
  return products.filter((p) => p.handle != currentHandle)
}

export async function getProductByHandle(handle: string) {
  const { products } = await sdk.store.product.list({
    handle,
    region_id: REGION_ID,
  })
  return products[0]
}
