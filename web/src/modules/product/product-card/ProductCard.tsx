"use client"

import { useState } from "react"
import Button from "../../common/Button"
import { HttpTypes } from "@medusajs/types/dist/bundles"
import { COLORS } from "@lib/constants/colors"

export default function ProductCard({
  product,
}: {
  product: HttpTypes.StoreProduct
}) {
  const [selectedMaterial, setSelectedMaterial] = useState("Linen")
  const [selectedColor, setSelectedColor] = useState("Dark Gray")

  const materials =
    product.options
      ?.find((o) => o.title === "Material")
      ?.values?.map((v) => v.value) || []
  const colors =
    product.options
      ?.find((o) => o.title === "Color")
      ?.values?.map((v) => v.value) || []
  const selectedVariant = product.variants?.find(
    (v) =>
      v.options?.find(
        (o) => o.option?.title === "Material" && o.value === selectedMaterial
      ) &&
      v.options?.find(
        (o) => o.option?.title === "Color" && o.value === selectedColor
      )
  )
  const price = selectedVariant?.calculated_price?.calculated_amount || ""
  const images = product.images || []

  return (
    <section className="lg:mt-16">
      <div className="flex flex-col lg:flex-row">
        <div className="flex flex-col items-center">
          <div className="flex lg:gap-4">
            <img
              src={images[0].url}
              alt={product.title}
              className="lg:hidden w-screen max-w-none -mx-6"
            />
            <img
              src={images[0].url}
              alt={product.title}
              className="hidden lg:flex"
            />
            <img
              src={images[0].url}
              alt={product.title}
              className="hidden lg:flex"
            />
          </div>
          <div className="flex gap-3 -mt-12 lg:mt-4 lg:ml-96">
            <span className="border-b-2 border-black w-4">1</span>
            <span>2</span>
          </div>
        </div>

        <div className="bg-white mt-12 lg:mt-0 lg:ml-24 lg:px-20">
          <p className="text-gray-400">{product.subtitle}</p>
          <h1 className="text-2xl lg:text-3xl font-medium my-2 lg:my-3">
            {product.title}
          </h1>
          <p className="text-2xl lg:text-xl">{(price as any) / 100}€</p>
          <p className="text-xs text-gray-400 lg:text-base lg:text-black lg:max-w-[56rem] my-8 lg:my-10">
            {product.description}
          </p>
          <div>
            <div className="flex gap-6">
              <span>Materials</span>
              <span className="text-gray-400">{selectedMaterial}</span>
            </div>
            <div className="relative w-full lg:w-60">
              <select
                value={selectedMaterial}
                onChange={(e) => setSelectedMaterial(e.target.value)}
                className="appearance-none border border-gray-300 rounded w-full h-12 px-2 py-1 mt-4 mb-4 cursor-pointer"
              >
                {materials.map((material) => (
                  <option key={material} value={material}>
                    {material}
                  </option>
                ))}
              </select>
              <img
                src="/icons/ArrowDown.png"
                alt="arrow down"
                className="absolute right-4 top-9 pointer-events-none"
              />
            </div>

            <div className="flex gap-6">
              <span>Colors</span>
              <span className="text-gray-400">{selectedColor}</span>
            </div>
            <div className="flex gap-6 mt-4 mb-4">
              {colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className="flex flex-col items-center gap-1"
                >
                  <span
                    className="w-8 h-8"
                    style={{ backgroundColor: COLORS[color] }}
                  />
                  {selectedColor === color && (
                    <span className="w-8 h-0.5 bg-black" />
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 mt-12 lg:mt-28 mb-4">
            <div className="flex items-center justify-center lg:justify-between gap-4 lg:gap-0 border border-gray-300 rounded w-full lg:w-36 h-12 px-4 py-1">
              <img src="/icons/Minus.png" alt="minus sign" />
              <p>1</p>
              <img src="/icons/Plus.png" alt="plus sign" />
            </div>
            <Button text="Add to cart" />
          </div>
          <p className="text-xs text-gray-400 lg:text-base">
            Estimate delivery 2-3 days
          </p>
        </div>
      </div>
    </section>
  )
}
