"use client"

import { useState } from "react"
import { HttpTypes } from "@medusajs/types/dist/bundles"

export default function ProductSlideShow({
  images,
  title,
}: {
  images: HttpTypes.StoreProductImage[]
  title: string | null
}) {
  const [current, setCurrent] = useState(0)

  const slides = [
    { url: images[0]?.url, zoom: false },
    { url: images[0]?.url, zoom: true },
  ]

  const prev = () => setCurrent((c) => (c === 0 ? 0 : c - 1))
  const next = () =>
    setCurrent((c) => (c === slides.length - 1 ? slides.length - 1 : c + 1))

  return (
    <div className="flex flex-col items-center w-full lg:w-[110%]">
      <div className="relative w-full overflow-hidden">
        <button
          onClick={prev}
          className="hidden lg:flex absolute left-3 top-1/2 -translate-y-1/2 z-10 rounded-full p-2"
        >
          <img
            src="/icons/ArrowLeftScroll.png"
            alt="previous"
            className="w-10 h-10"
          />
        </button>
        <button
          onClick={next}
          className="hidden lg:flex absolute right-3 top-1/2 -translate-y-1/2 z-10 rounded-full p-2"
        >
          <img
            src="/icons/ArrowRightScroll.png"
            alt="next"
            className="w-10 h-10"
          />
        </button>

        <div className="lg:hidden w-full h-[490px]">
          <img
            src={slides[current].url}
            alt={title || "product"}
            className="w-full h-full object-cover"
            style={{
              transform: slides[current].zoom ? "scale(2)" : "scale(1)",
            }}
          />
        </div>

        <div className="hidden lg:flex">
          <div
            className="flex gap-4 transition-transform duration-500"
            style={{ transform: `translateX(-${current * 51}%)` }}
          >
            {slides.map((slide, index) => (
              <div key={index} className="shrink-0 h-[612px] overflow-hidden">
                <img
                  src={slide.url}
                  alt={title || "product"}
                  className="w-[459px] h-full object-cover"
                  style={{ transform: slide.zoom ? "scale(2)" : "scale(1)" }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex gap-3 -mt-10 lg:mt-4 lg:ml-64 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={
              index === current ? "border-b-2 border-black w-4" : "w-4"
            }
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  )
}
