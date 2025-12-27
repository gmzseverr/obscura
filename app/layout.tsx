import type { Metadata } from "next"
import { IBM_Plex_Mono } from "next/font/google"
import "./globals.css"

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-plex-mono",
})

export const metadata: Metadata = {
  title: "Obscura",
  description: "Analog Photo Booth Experience",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${plexMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  )
}
