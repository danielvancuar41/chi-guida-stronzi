import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'CHI GUIDA STRONZI? 🚗',
  description: 'Decidi chi è il cojone della settimana',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="it">
      <body className="bg-gradient-to-br from-gray-900 via-black to-gray-900 min-h-screen">
        {children}
      </body>
    </html>
  )
}
