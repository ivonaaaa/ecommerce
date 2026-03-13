import Navigation from "@modules/navigation/Navigation"
import ProductCard from "@modules/product/product-card/ProductCard"
import CollectionInspiredInterior from "@modules/product/collection-inspired-interior/CollectionInspiredInterior"

export default function ProductPage() {
  return (
    <div>
      <Navigation />
      <main>
        <ProductCard />
        <CollectionInspiredInterior />
      </main>

      {/* sitit se ovu visinu maknit nakraju */}
      <div className="h-80"></div>
    </div>
  )
}
