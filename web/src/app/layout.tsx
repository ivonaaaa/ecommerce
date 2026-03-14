import { getBaseURL } from "@lib/util/env"
import { Metadata } from "next"
import localFont from "next/font/local"
import "styles/globals.css"

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
}

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
        <main>{props.children}</main>
      </body>
    </html>
  )
}
