import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from 'sonner';

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
}

export const dynamic = 'force-dynamic';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
        >
        {children}
        <Toaster />
        </ThemeProvider>
        </body>
    </html>
  )
}
