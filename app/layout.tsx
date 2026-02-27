import type { Metadata } from 'next'
import { Geist, Geist_Mono, Space_Grotesk, VT323 } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/providers/ThemeProvider'
import { QueryProvider } from '@/components/providers/QueryProvider'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

const spaceGrotesk = Space_Grotesk({
  variable: '--font-space-grotesk',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
})

const vt323 = VT323({
  variable: '--font-vt323',
  subsets: ['latin'],
  weight: '400',
})

export const metadata: Metadata = {
  title: 'Bao Pham — Creative Frontend Engineer',
  description:
    'Frontend engineer passionate about building beautiful, interactive experiences at the intersection of code and design.',
  keywords: ['Frontend Engineer', 'React', 'Next.js', 'TypeScript', 'UI/UX', 'Creative Coding'],
  authors: [{ name: 'Bao Pham' }],
  openGraph: {
    title: 'Bao Pham — Creative Frontend Engineer',
    description: 'Building beautiful things at the intersection of code and design.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} ${vt323.variable} antialiased`}
      >
        <ThemeProvider>
          <QueryProvider>{children}</QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
