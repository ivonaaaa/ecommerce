import { CartProvider } from "@lib/context/CartContext"
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

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" className={monaSans.variable}>
      <body>
        <CartProvider>
          <main>{props.children}</main>
        </CartProvider>
      </body>
    </html>
  )
}
