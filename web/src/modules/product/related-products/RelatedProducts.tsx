"use client"

export default function RelatedProducts() {
  return (
    <section className="my-24 lg:my-28">
      <h1 className="text-2xl lg:text-5xl font-medium mb-8 lg:mb-12">
        Related products
      </h1>

      <div className="flex gap-4 lg:gap-10 w-full">
        <div className="flex flex-col gap-6 lg:w-1/3">
          <img
            src="/images/RelatedProducts1.png"
            alt="camden retreat sofa"
            className="w-full aspect-square lg:aspect-auto"
          />
          <div className="flex flex-col lg:flex-row lg:justify-between gap-1 lg:gap-0">
            <div className="flex flex-col gap-1">
              <p className="text-xs lg:text-base">Camden Retreat</p>
              <p className="hidden lg:flex text-xs text-gray-400 mt-1">
                Boho Chic
              </p>
            </div>
            <p className="text-xs lg:text-base font-medium">1000€</p>
          </div>
        </div>

        <div className="flex flex-col gap-6 lg:w-1/3">
          <img
            src="/images/RelatedProducts2.png"
            alt="oslo drift sofa"
            className="w-full aspect-square lg:aspect-auto"
          />
          <div className="flex flex-col lg:flex-row lg:justify-between gap-1 lg:gap-0">
            <div className="flex flex-col gap-1">
              <p className="text-xs lg:text-base">Oslo Drift</p>
              <p className="hidden lg:flex text-xs text-gray-400 mt-1">
                Scandinavian Simplicity
              </p>
            </div>
            <div className="flex justify-between lg:flex-col">
              <p className="text-xs lg:text-base font-medium text-red-500">
                2000€
              </p>
              <p className="text-xs lg:text-base text-gray-400 line-through">
                3000€
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6 hidden lg:flex lg:w-1/3">
          <img src="/images/RelatedProducts3.png" alt="sutton royale sofa" />
          <div className="flex justify-between">
            <div className="flex flex-col gap-1">
              <p>Sutton Royale</p>
              <p className="text-xs text-gray-400 mt-1">Modern Luxe</p>
            </div>
            <p>2500€</p>
          </div>
        </div>
      </div>
    </section>
  )
}
