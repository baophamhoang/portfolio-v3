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
  title: 'Bao Pham — Creative Frontend Engineer',
  description:
    'Frontend engineer passionate about building beautiful, interactive experiences at the intersection of code and design.',
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
    title: 'Bao Pham — Creative Frontend Engineer',
    description: 'Building beautiful things at the intersection of code and design.',
    type: 'website',
    url: 'https://phambao.dev',
    siteName: 'Bao Pham',
    locale: 'en_US',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'Bao Pham — Creative Frontend Engineer' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bao Pham — Creative Frontend Engineer',
    description: 'Building beautiful things at the intersection of code and design.',
    creator: '@phambao',
    images: ['/opengraph-image'],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Bao Pham',
              alternateName: 'Pham Hoang Bao',
              url: 'https://phambao.dev',
              jobTitle: 'Creative Frontend Engineer',
              sameAs: ['https://github.com/baopham', 'https://linkedin.com/in/baopham'],
            }),
          }}
        />
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
