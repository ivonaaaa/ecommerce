"use client"

export default function RelatedProducts() {
  return (
    <section>
      <h1>Related products</h1>

      <div className="flex gap-4">
        <div className="flex flex-col gap-3">
          <img src="/images/RelatedProducts1.png" alt="camden retreat sofa" />
          <div className="flex">
            <div className="flex flex-col gap-1">
              <p>Camden Retreat</p>
              <p>Boho Chic</p>
            </div>
            <p>1000€</p>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <img src="/images/RelatedProducts2.png" alt="oslo drift sofa" />
          <div className="flex">
            <div className="flex flex-col gap-1">
              <p>Oslo Drift</p>
              <p>Scandinavian Simplicity</p>
            </div>
            <div>
              <p>2000€</p>
              <p>3000€</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <img src="/images/RelatedProducts3.png" alt="sutton royale sofa" />
          <div className="flex">
            <div className="flex flex-col gap-1">
              <p>Sutton Royale</p>
              <p>Modern Luxe</p>
            </div>
            <p>2500€</p>
          </div>
        </div>
      </div>
    </section>
  )
}
