"use client"

import { HttpTypes } from "@medusajs/types"
import Link from "next/link"

export default function RelatedProducts({
  relatedProducts,
}: {
  relatedProducts: HttpTypes.StoreProduct[]
}) {
  return (
    <section className="my-24 lg:my-28">
      <h1 className="text-2xl lg:text-5xl font-medium mb-8 lg:mb-12">
        Related products
      </h1>

      <div className="flex gap-4 lg:gap-10 w-full">
        {relatedProducts.toReversed().map((product, index) => {
          const image = product.images?.[0].url
          const price =
            product.variants?.[0].calculated_price?.calculated_amount
          const compareAt =
            product.variants?.[0].calculated_price?.original_amount
          const isOnSale = compareAt && compareAt > (price || 0)

          return (
            <Link
              key={product.id}
              href={`/product/${product.handle}`}
              className={`flex flex-col gap-6 lg:w-1/3 ${
                index === 0 ? "hidden lg:flex" : ""
              }`}
            >
              <img
                src={image}
                alt={product.title}
                className="w-full aspect-square lg:aspect-auto max-h-80 object-cover"
              />
              <div className="flex flex-col lg:flex-row lg:justify-between gap-1 lg:gap-0">
                <div className="flex flex-col gap-1">
                  <p className="text-xs lg:text-base">{product.title}</p>
                  <p className="hidden lg:flex text-xs text-gray-400 mt-1">
                    {product.subtitle}
                  </p>
                </div>
                {isOnSale ? (
                  <div className="flex justify-between lg:flex-col">
                    <p className="text-xs lg:text-base font-medium text-red-500">
                      {price! / 100}€
                    </p>
                    <p className="text-xs lg:text-base text-gray-400 line-through">
                      {compareAt / 100}€
                    </p>
                  </div>
                ) : (
                  <p className="text-xs lg:text-base font-medium">
                    {price ? `${price / 100}€` : ""}
                  </p>
                )}
              </div>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
