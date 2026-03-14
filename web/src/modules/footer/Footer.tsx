"use client"

import Link from "next/link"
import Button from "../common/components/Button"

export default function Footer() {
  return (
    <footer>
      <div>
        <div>
          <h1>Sofa Society Co.</h1>
          <p>(c) 2024, Sofa Society</p>
        </div>

        <div>
          <Link href="/">FAQ</Link>
          <Link href="/">Help</Link>
          <Link href="/">Delivery</Link>
          <Link href="/">Returns</Link>
        </div>

        <div>
          <Link href="/">Instagram</Link>
          <Link href="/">TikTok</Link>
          <Link href="/">Pinterest</Link>
          <Link href="/">Facebook</Link>
        </div>

        <div>
          <Link href="/">Privacy Policy</Link>
          <Link href="/">Cookie Policy</Link>
          <Link href="/">Terms of Use</Link>
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
    </footer>
  )
}
