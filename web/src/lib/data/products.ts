import { sdk } from "@lib/config"

const REGION_ID = process.env.REGION_ID

export async function getProductByHandle(handle: string) {
  const { products } = await sdk.store.product.list({
    handle,
    region_id: REGION_ID,
  })
  return products[0]
}
