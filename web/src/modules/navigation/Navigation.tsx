"use client"

import Link from "next/link"
import { useState } from "react"
import { useCart } from "@lib/context/CartContext"

export default function Navigation() {
  const { cartCount } = useCart()
  const [menuOpen, setMenuOpen] = useState(false)

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
        <button onClick={() => setMenuOpen(true)} className="lg:hidden">
          <img src="/icons/Menu.png" alt="menu icon" />
        </button>
      </div>

      {menuOpen && (
        <div className="fixed inset-0 bg-white z-20 flex flex-col px-6 py-6">
          <div className="flex justify-between items-center">
            <span className="text-2xl font-medium">SofaSocietyCo.</span>
            <button onClick={() => setMenuOpen(false)}>
              <img
                src="/icons/Plus.png"
                alt="close menu"
                className="w-4 h-4 rotate-45"
              />
            </button>
          </div>
          <div className="flex flex-col gap-6 mt-16 text-xl">
            <Link href="/" onClick={() => setMenuOpen(false)}>
              About
            </Link>
            <Link href="/" onClick={() => setMenuOpen(false)}>
              Inspiration
            </Link>
            <Link href="/" onClick={() => setMenuOpen(false)}>
              Shop
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
