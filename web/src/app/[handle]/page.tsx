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
  const { products } = await sdk.store.product.list({ handle: params.handle })
  const product = products[0]

  return (
    <main>
      <div className="px-6 lg:px-20">
        <Navigation />
        <ProductCard product={product} />
        <CollectionInspiredInterior />
        <RelatedProducts />
      </div>
      <Footer />
    </main>
  )
}
