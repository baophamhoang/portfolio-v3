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
  metadataBase: new URL('https://phambao.dev'),
  title: 'Bao Pham — Software Engineer',
  description:
    'Full-stack software engineer specializing in TypeScript/JavaScript across the entire stack — NestJS APIs, SQS workers, and Next.js frontends.',
  keywords: [
    'Frontend Engineer',
    'Software Engineer',
    'React',
    'Next.js',
    'TypeScript',
    'UI/UX',
    'Creative Coding',
    'Pham Bao',
    'Pham Hoang Bao',
    'Pham Bao dev',
    'Pham Bao software engineer',
    'phambao',
    'phambao dev',
  ],
  authors: [{ name: 'Bao Pham' }],
  alternates: { canonical: 'https://phambao.dev' },
  openGraph: {
    title: 'Bao Pham — Software Engineer',
    description: 'Building robust systems at the intersection of product, AI, and engineering.',
    type: 'website',
    url: 'https://phambao.dev',
    siteName: 'Bao Pham',
    locale: 'en_US',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'Bao Pham — Software Engineer' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bao Pham — Software Engineer',
    description: 'Building robust systems at the intersection of product, AI, and engineering.',
    creator: '@phambao',
    images: ['/opengraph-image'],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const personJsonLd = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Bao Pham',
    alternateName: 'Pham Hoang Bao',
    url: 'https://phambao.dev',
    jobTitle: 'Software Engineer',
    sameAs: ['https://github.com/baopham', 'https://linkedin.com/in/baopham'],
  })

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script type="application/ld+json">{personJsonLd}</script>
      </head>
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
