import Button from "@modules/common/Button"
import Footer from "@modules/footer/Footer"
import Navigation from "@modules/navigation/Navigation"
import { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "404",
  description: "Something went wrong",
}

export default function NotFound() {
  return (
    <main className="px-6 lg:px-20">
      <Navigation />
      <section className="flex flex-col lg:flex-row justify-between py-10 lg:py-20 mb-12 lg:mb-24">
        <div className="flex flex-col gap-4">
          <h1 className="text-4xl lg:text-5xl font-medium">404</h1>
          <h1 className="text-4xl lg:text-5xl font-medium">Page not found</h1>
        </div>
        <div className="flex flex-col gap-8 mt-12">
          <p className="max-w-md text-md lg:text-xl line-height-1.4">
            The page you are lookig for doesn't exist or an error occurred. Go
            back, or head over to our home page.
          </p>
          <div className="w-40">
            <Link href="/">
              <Button text="Back to home" />
            </Link>
          </div>
        </div>
      </section>
      <div className="-mx-6 lg:-mx-20">
        <Footer />
      </div>
    </main>
  )
}
