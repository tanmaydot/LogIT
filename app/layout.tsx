import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Provider from './(components)/(context)/Provider/provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'LogIT',
  description: 'A sales management website',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}><Provider>{children}</Provider></body>
    </html>
  )
}
