"use client"

import Link from "next/link"
import Button from "../common/components/Button"

export default function Footer() {
  return (
    <footer className="relative">
      <div className="flex flex-col lg:flex-row gap-16">
        <div className="absolute inset-0 bg-gray-100 -z-10"></div>

        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 py-16">
          <div>
            <h1 className="text-4xl font-medium">Sofa Society Co.</h1>
            <p>© 2024, Sofa Society</p>
          </div>

          <div className="flex gap-6">
            <div className="flex flex-col gap-2">
              <Link href="/">FAQ</Link>
              <Link href="/">Help</Link>
              <Link href="/">Delivery</Link>
              <Link href="/">Returns</Link>
            </div>

            <div className="flex flex-col gap-2">
              <Link href="/">Instagram</Link>
              <Link href="/">TikTok</Link>
              <Link href="/">Pinterest</Link>
              <Link href="/">Facebook</Link>
            </div>

            <div className="flex flex-col gap-2">
              <Link href="/">Privacy Policy</Link>
              <Link href="/">Cookie Policy</Link>
              <Link href="/">Terms of Use</Link>
            </div>
          </div>

          <div>
            <h1>Join our newsletter</h1>
            <p>We will also send you our discount coupons!</p>
            <div>
              <input placeholder="Your email" />
              <Button text="Subscribe" />
            </div>
            <p>
              By subscribing your agree with out <span>Privacy Policy</span> and
              provide consent to receive updates from our company.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
