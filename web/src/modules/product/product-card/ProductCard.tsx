"use client"

import { HttpTypes } from "@medusajs/types/dist/bundles"
import { useState } from "react"
import { findVariant } from "@lib/util/product"
import { COLORS } from "@lib/constants/colors"
import { useCart } from "@lib/context/CartContext"
import ProductSlideShow from "./ProductSlideShow"
import Button from "../../common/Button"

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
  const selectedVariant = findVariant(
    product.variants ?? undefined,
    selectedMaterial,
    selectedColor
  )

  const price = selectedVariant?.calculated_price?.calculated_amount || ""
  const images = product.images || []

  const [quantity, setQuantity] = useState(1)
  const { addToCart } = useCart()

  const handleAddToCart = async () => {
    if (!selectedVariant?.id) return
    await addToCart(selectedVariant.id, quantity)
  }

  return (
    <section className="lg:mt-16">
      <div className="flex flex-col lg:flex-row">
        <div className="w-screen lg:w-auto -ml-6 lg:ml-0">
          <ProductSlideShow images={images} title={product.title} />
        </div>

        <div className="bg-white mt-12 lg:mt-0 lg:ml-8 lg:px-20">
          <p className="text-gray-400">{product.subtitle}</p>
          <h1 className="text-2xl lg:text-3xl font-medium my-2 lg:my-3">
            {product.title}
          </h1>
          <p className="text-2xl lg:text-xl">{(price as number) / 100}€</p>
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
              <button onClick={() => setQuantity((q) => Math.max(1, q - 1))}>
                <img src="/icons/Minus.png" alt="minus sign" />
              </button>
              <p>{quantity}</p>
              <button onClick={() => setQuantity((q) => q + 1)}>
                <img src="/icons/Plus.png" alt="plus sign" />
              </button>
            </div>
            <Button text="Add to cart" onClick={handleAddToCart} />
          </div>
          <p className="text-xs text-gray-400 lg:text-base">
            Estimate delivery 2-3 days
          </p>
        </div>
      </div>
    </section>
  )
}
