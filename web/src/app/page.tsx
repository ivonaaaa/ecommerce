import Navigation from "@modules/navigation/Navigation"
import ProductCard from "@modules/product/product-card/ProductCard"

export default function ProductPage() {
  return (
    <div>
      <Navigation />
      <main>
        <ProductCard />
      </main>

      {/* sitit se ovu visinu maknit nakraju */}
      <div className="h-80"></div>
    </div>
  )
}
