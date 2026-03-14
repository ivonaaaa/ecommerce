"use client"

import Link from "next/link"

export default function Navigation() {
  return (
    <nav className="flex items-center justify-between py-4">
      <Link href="/" className="text-lg font-medium cursor-pointer">
        SofaSocietyCo.
      </Link>

      <div className="hidden md:flex gap-8">
        <Link href="/">About</Link>
        <Link href="/">Inspiration</Link>
        <Link href="/">Shop</Link>
      </div>

      <div className="flex items-center md:gap-7 cursor-pointer">
        <div className="hidden md:flex items-center gap-1">
          <p>HR</p>
          <img src="/icons/ArrowDown.png" alt="search icon" />
        </div>
        <img
          src="/icons/Search.png"
          alt="search icon"
          className="hidden md:flex"
        />
        <img
          src="/icons/Bag.png"
          alt="bag/cart icon"
          className="cursor-pointer"
        />
      </div>
    </nav>
  )
}
