import Navigation from "@modules/navigation/Navigation"
import ProductCard from "@modules/product/product-card/ProductCard"
import CollectionInspiredInterior from "@modules/product/collection-inspired-interior/CollectionInspiredInterior"
import RelatedProducts from "@modules/product/related-products/RelatedProducts"
import Footer from "@modules/footer/Footer"
import { getProductByHandle, getRelatedProducts } from "@lib/data/products"

export default async function ProductPage({
  params,
}: {
  params: { handle: string }
}) {
  const { handle } = await params
  const [product, relatedProducts] = await Promise.all([
    getProductByHandle(handle),
    getRelatedProducts(handle),
  ])

  return (
    <main>
      <div className="px-6 lg:px-20 overflow-hidden">
        <Navigation />
        <ProductCard product={product} />
        <CollectionInspiredInterior />
        <RelatedProducts relatedProducts={relatedProducts} />
      </div>
      <Footer />
    </main>
  )
}
