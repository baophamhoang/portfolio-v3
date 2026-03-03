import type { Metadata } from 'next'
import { Geist, Geist_Mono, Space_Grotesk, VT323 } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/providers/ThemeProvider'
import { QueryProvider } from '@/components/providers/QueryProvider'
import { ViewTracker } from '@/components/ViewTracker'

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
  metadataBase: new URL('https://www.phambao.dev'),
  title: 'Bao Pham — Software Engineer',
  description:
    'Full-stack engineer who ships end-to-end — from scalable backends and AI integrations to polished frontends.',
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
  alternates: { canonical: 'https://www.phambao.dev' },
  openGraph: {
    title: 'Bao Pham — Software Engineer',
    description: 'Building robust systems at the intersection of AI, healthcare, and full-stack engineering.',
    type: 'website',
    url: 'https://www.phambao.dev',
    siteName: 'Bao Pham',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bao Pham — Software Engineer',
    description: 'Building robust systems at the intersection of AI, healthcare, and full-stack engineering.',
    creator: '@baophamhoang',
  },
  other: {
    'og:image:secure_url': 'https://www.phambao.dev/opengraph-image',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const profilePageJsonLd = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    dateModified: '2026-01-01T00:00:00Z',
    mainEntity: {
      '@type': 'Person',
      name: 'Bao Pham',
      alternateName: 'Pham Hoang Bao',
      url: 'https://www.phambao.dev',
      image: 'https://www.phambao.dev/opengraph-image',
      jobTitle: 'Software Engineer',
      description:
        'Full-stack engineer with 4+ years of experience building production systems end-to-end — from backend APIs and AI integrations to polished frontends.',
      email: 'phamhoangbao2710@gmail.com',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Da Nang',
        addressCountry: 'VN',
      },
      worksFor: {
        '@type': 'Organization',
        name: 'Spartan',
      },
      knowsAbout: [
        'React',
        'Next.js',
        'TypeScript',
        'NestJS',
        'Node.js',
        'Python',
        'FastAPI',
        'PostgreSQL',
        'AWS',
        'Docker',
        'Kubernetes',
        'OpenAI',
        'AI integrations',
      ],
      sameAs: ['https://github.com/baophamhoang', 'https://linkedin.com/in/baophamhoang'],
    },
  })

  const websiteJsonLd = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Bao Pham',
    url: 'https://www.phambao.dev',
  })

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script type="application/ld+json">{profilePageJsonLd}</script>
        <script type="application/ld+json">{websiteJsonLd}</script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} ${vt323.variable} antialiased`}
      >
        <ThemeProvider>
          <QueryProvider>{children}</QueryProvider>
        </ThemeProvider>
        <ViewTracker />
      </body>
    </html>
  )
}
