import Navigation from "@modules/navigation/Navigation"
import ProductCard from "@modules/product/product-card/ProductCard"
import CollectionInspiredInterior from "@modules/product/collection-inspired-interior/CollectionInspiredInterior"
import RelatedProducts from "@modules/product/related-products/RelatedProducts"
import Footer from "@modules/footer/Footer"

export default function ProductPage() {
  return (
    <main>
      <div className="px-6 lg:px-20">
        <Navigation />
        <ProductCard />
        <CollectionInspiredInterior />
        <RelatedProducts />
      </div>
      <Footer />
    </main>
  )
}
