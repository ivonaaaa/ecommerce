import { CartProvider } from "@lib/context/CartContext"
import { Toaster } from "react-hot-toast"
import localFont from "next/font/local"
import "styles/globals.css"

const monaSans = localFont({
  src: [
    {
      path: "../../public/fonts/MonaSans-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/MonaSans-Medium.ttf",
      weight: "500",
      style: "normal",
    },
  ],
  variable: "--font-mona-sans",
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={monaSans.variable}>
      <CartProvider>
        <body>
          {children}
          <Toaster position="bottom-center" />
        </body>
      </CartProvider>
    </html>
  )
}
