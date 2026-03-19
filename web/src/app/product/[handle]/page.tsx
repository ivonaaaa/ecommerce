import Navigation from "@modules/navigation/Navigation"
import ProductCard from "@modules/product/product-card/ProductCard"
import CollectionInspiredInterior from "@modules/product/collection-inspired-interior/CollectionInspiredInterior"
import RelatedProducts from "@modules/product/related-products/RelatedProducts"
import Footer from "@modules/footer/Footer"
import { sdk } from "@lib/config"

export default async function ProductPage({
  params,
}: {
  params: { handle: string }
}) {
  const { products } = await sdk.store.product.list({
    handle: params.handle,
    region_id: "reg_01KM1M0JFJQANAHGS7BF05GGM7",
  })
  const product = products[0]

  return (
    <main>
      <div className="px-6 lg:px-20 overflow-hidden">
        <Navigation />
        <ProductCard product={product} />
        <CollectionInspiredInterior />
        <RelatedProducts />
      </div>
      <Footer />
    </main>
  )
}
