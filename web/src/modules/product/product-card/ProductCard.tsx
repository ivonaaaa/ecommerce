"use client"

import { useState } from "react"
import Button from "../../common/components/Button"

export default function ProductCard() {
  const [selectedMaterial, setSelectedMaterial] = useState("Linen")
  const [selectedColor, setSelectedColor] = useState("Dark Gray")

  const materials = ["Linen", "Leather"]
  const colors = ["Dark Gray", "Black", "Light Gray"]

  return (
    <section className="lg:mt-16">
      <div className="flex flex-col lg:flex-row">
        <div className="flex flex-col items-center">
          <div className="flex lg:gap-4">
            <img
              src="/images/Product0.png"
              alt="product"
              className="lg:hidden w-screen max-w-none -mx-6"
            />
            <img
              src="/images/Product1.png"
              alt="product"
              className="hidden lg:flex"
            />
            <img
              src="/images/Product2.png"
              alt="product"
              className="hidden lg:flex"
            />
          </div>
          <div className="flex gap-3 -mt-12 lg:mt-4 lg:ml-96">
            <span className="border-b-2 border-black w-4">1</span>
            <span>2</span>
          </div>
        </div>

        <div className="bg-white mt-12 lg:mt-0 lg:ml-24 lg:px-20">
          <p className="text-gray-400">Modern Luxe</p>
          <h1 className="text-2xl lg:text-3xl font-medium my-2 lg:my-3">
            Paloma Haven
          </h1>
          <p className="text-2xl lg:text-xl">€12000</p>
          <p className="text-xs text-gray-400 lg:text-base lg:text-black lg:max-w-[56rem] my-8 lg:my-10">
            Minimalistic designs, neutral colors, and high-quality textures.
            Perfect for those who seek comfort with a clean and understated
            aesthetic. This collection brings the essence of Scandinavian
            elegance to your living room.
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
                  value={color}
                  onClick={() => setSelectedColor(color)}
                  className="flex flex-col items-center gap-1"
                >
                  <span
                    className="w-8 h-8"
                    style={{
                      backgroundColor:
                        color === "Dark Gray"
                          ? "#b3b3b3"
                          : color === "Black"
                          ? "#000000"
                          : "#d9d9d9",
                    }}
                  />
                  {selectedColor === color && (
                    <span className="w-8 h-0.5 bg-black"></span>
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
