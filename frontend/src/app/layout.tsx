import "./globals.css"

import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "AI Vehicle Inspector",
  description: "AI-powered vehicle inspection"
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="uk">
      <body>{children}</body>
    </html>
  )
}
