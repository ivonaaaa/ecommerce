"use client"

import Link from "next/link"
import Button from "../common/components/Button"

export default function Footer() {
  return (
    <footer className="relative">
      <div className="flex flex-col lg:flex-row gap-16">
        <div className="absolute inset-0 bg-gray-100 -z-10"></div>

        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-36 py-16">
          <div className="lg:w-2/12 pr-12">
            <h1 className="text-4xl font-medium mb-4">Sofa Society Co.</h1>
            <p>© 2024, Sofa Society</p>
          </div>

          <div className="lg:w-5/12 flex gap-20">
            <div className="flex flex-col gap-4">
              <Link href="/">FAQ</Link>
              <Link href="/">Help</Link>
              <Link href="/">Delivery</Link>
              <Link href="/">Returns</Link>
            </div>

            <div className="flex flex-col gap-4">
              <Link href="/">Instagram</Link>
              <Link href="/">TikTok</Link>
              <Link href="/">Pinterest</Link>
              <Link href="/">Facebook</Link>
            </div>

            <div className="flex flex-col gap-4">
              <Link href="/">Privacy Policy</Link>
              <Link href="/">Cookie Policy</Link>
              <Link href="/">Terms of Use</Link>
            </div>
          </div>

          <div className="lg:w-5/12">
            <h1 className="text-3xl font-medium mb-2">Join our newsletter</h1>
            <p>We will also send you our discount coupons!</p>
            <div className="flex gap-2 my-3">
              <input
                placeholder="Your email"
                className="text-sm w-9/12 rounded px-4"
              />
              <div className="w-3/12">
                <Button text="Subscribe" className="text-sm" />
              </div>
            </div>
            <p className="text-sm text-gray-400">
              By subscribing your agree with out{" "}
              <span className="underline cursor-pointer">Privacy Policy</span>{" "}
              and provide consent to receive updates from our company.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
