// app/layout.tsx
import '@/styles/tailwind.css'
import { Be_Vietnam_Pro } from 'next/font/google'
import ThemeProvider from './theme-provider'
import Script from 'next/script'
import { generateSEOMetadata } from '../../lib/useSeo' // Import the SEO helper

const beVietnamPro = Be_Vietnam_Pro({
  subsets: ['latin'],
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
})

// Replace static metadata object with dynamic generator
export async function generateMetadata() {
  // 1. Fetch the base metadata (Title, Desc, OpenGraph, JSON-LD) from meta.json
  const baseMetadata = await generateSEOMetadata('/');

  // 2. Return it, optionally enhancing specific fields like robots
  return {
    ...baseMetadata,
    title: {
      template: '%s | The People\'s Directory',
      default: baseMetadata.title as string || 'The People\'s Directory',
    },
    // Keep the robust robots settings (good for Google Discover/Images)
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