import type React from "react"
import type { Metadata } from "next"
import { IBM_Plex_Sans } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { LanguageProvider } from "@/lib/i18n/language-context"
import "./globals.css"

const ibmPlexSans = IBM_Plex_Sans({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin", "cyrillic"],
})

export const metadata: Metadata = {
  title: "KISHOVARZ - Портали иттилооти кишоварзӣ",
  description: "Манбаи боэътимоди шумо барои маслиҳатҳои кишоварзӣ, хабарҳо ва захираҳо",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="tj">
      <body className={`${ibmPlexSans.className} antialiased`}>
        <LanguageProvider>{children}</LanguageProvider>
        <Analytics />
      </body>
    </html>
  )
}
