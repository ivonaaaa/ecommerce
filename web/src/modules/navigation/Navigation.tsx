"use client"

import Link from "next/link"

export default function Navigation() {
  return (
    <nav className="flex items-center justify-between py-4">
      <Link href="/" className="text-lg font-weight-500 cursor-pointer">
        SofaSocietyCo.
      </Link>

      <div className="flex gap-8">
        <Link href="/" className="cursor-pointer">
          About
        </Link>
        <Link href="/" className="cursor-pointer">
          Inspiration
        </Link>
        <Link href="/" className="cursor-pointer">
          Shop
        </Link>
      </div>

      <div className="flex items-center gap-7 cursor-pointer">
        <div className="flex items-center gap-1">
          <p>HR</p>
          <img src="/icons/ArrowDown.png" alt="search icon" />
        </div>
        <img
          src="/icons/Search.png"
          alt="search icon"
          className="cursor-pointer"
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
