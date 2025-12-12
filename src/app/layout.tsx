// app/layout.tsx
import '@/styles/tailwind.css'
import { Metadata } from 'next'
import { Be_Vietnam_Pro } from 'next/font/google'
import ThemeProvider from './theme-provider'
import Script from 'next/script'

const beVietnamPro = Be_Vietnam_Pro({
  subsets: ['latin'],
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: {
    template: '%s | The People\'s Directory',
    default: 'The People\'s Directory - Global Leaders & Visionaries',
  },
  description: 'Discover and connect with distinguished leaders, innovators, and visionaries shaping industries worldwide. Browse profiles of influential individuals across technology, business, healthcare, sustainability, and more.',
  keywords: [
    'leadership directory',
    'global leaders',
    'visionaries',
    'innovators',
    'industry leaders',
    'business executives',
    'technology leaders',
    'healthcare innovators',
    'sustainability champions',
    'influential people',
    'professional network',
    'leadership profiles',
  ],
  authors: [{ name: 'The People\'s Directory' }],
  creator: 'The People\'s Directory',
  publisher: 'The People\'s Directory',
  metadataBase: new URL('https://thepeoplesdirectory.com'), // Update with your actual domain
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'The People\'s Directory - Global Leaders & Visionaries',
    description: 'Discover and connect with distinguished leaders, innovators, and visionaries shaping industries worldwide.',
    url: 'https://thepeoplesdirectory.com', // Update with your actual domain
    siteName: 'The People\'s Directory',
    images: [
      {
        url: '/og-image.jpg', // Add your OG image
        width: 1200,
        height: 630,
        alt: 'The People\'s Directory',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The People\'s Directory - Global Leaders & Visionaries',
    description: 'Discover and connect with distinguished leaders, innovators, and visionaries shaping industries worldwide.',
    images: ['/twitter-image.jpg'], // Add your Twitter image
    creator: '@thepeoplesdirectory', // Update with your Twitter handle
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={beVietnamPro.className} suppressHydrationWarning>
      <head>
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-LL09BE56KP"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-LL09BE56KP');
          `}
        </Script>
      </head>
      <body className="bg-white text-base text-neutral-900 dark:bg-neutral-900 dark:text-neutral-200">
        <ThemeProvider>
          <div>{children}</div>
        </ThemeProvider>
      </body>
    </html>
  )
}