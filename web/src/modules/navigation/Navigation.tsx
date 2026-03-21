"use client"

import Link from "next/link"
import { useCart } from "@lib/context/CartContext"

export default function Navigation() {
  const { cartCount } = useCart()

  return (
    <nav className="flex items-center justify-between px-2 py-6 lg:px-0 lg:py-4">
      <Link href="/" className="text-2xl lg:text-lg font-medium cursor-pointer">
        SofaSocietyCo.
      </Link>

      <div className="hidden md:flex gap-8 -ml-24">
        <Link href="/">About</Link>
        <Link href="/">Inspiration</Link>
        <Link href="/">Shop</Link>
      </div>

      <div className="flex gap-8 items-center md:gap-7 cursor-pointer">
        <div className="hidden md:flex items-center gap-1">
          <p>HR</p>
          <img src="/icons/ArrowDown.png" alt="search icon" />
        </div>
        <img
          src="/icons/Search.png"
          alt="search icon"
          className="hidden md:flex"
        />
        <div className="relative cursor-pointer">
          <img src="/icons/Bag.png" alt="bag/cart icon" />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </div>
        <img
          src="/icons/Menu.png"
          alt="menu icon"
          className="cursor-pointer lg:hidden"
        />
      </div>
    </nav>
  )
}
