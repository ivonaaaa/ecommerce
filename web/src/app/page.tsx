import Navigation from "@modules/navigation/Navigation"
import ProductCard from "@modules/product/product-card/ProductCard"
import CollectionInspiredInterior from "@modules/product/collection-inspired-interior/CollectionInspiredInterior"
import RelatedProducts from "@modules/product/related-products/RelatedProducts"
import Footer from "@modules/footer/Footer"

export default function ProductPage() {
  return (
    <div>
      <Navigation />
      <main>
        <ProductCard />
        <CollectionInspiredInterior />
        <RelatedProducts />
      </main>
      <Footer />

      {/* sitit se ovu visinu maknit nakraju */}
      <div className="h-80"></div>
    </div>
  )
}
