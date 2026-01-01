// seo/config.ts
export const seoConfig = {
  // Site Identity
  siteName: "The People's Directory",
  defaultTitle: "The People's Directory - Global Leaders & Visionaries",
  titleTemplate: "%s | The People's Directory",
  defaultDescription: "Discover and connect with distinguished leaders, innovators, and visionaries shaping industries worldwide. Browse profiles of influential individuals across technology, business, healthcare, sustainability, and more.",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://thepeoplesdirectory.com",
  defaultOgImage: "/og-image.jpg",
  twitterHandle: "@thepeoplesdirectory",
  defaultAuthor: "The People's Directory",
  
  // Localization
  defaultLocale: "en_US",
  supportedLocales: ["en_US", "en_GB"],
  
  // SEO Defaults
  defaultRobots: "index, follow",
  defaultOgType: "website",
  
  // Analytics
  analytics: {
    googleAnalytics: {
      measurementId: "G-LL09BE56KP",
    },
    googleTagManager: {
      containerId: process.env.NEXT_PUBLIC_GTM_CONTAINER_ID,
    },
  },
  
  // Verification
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
    bing: process.env.NEXT_PUBLIC_BING_VERIFICATION,
  },
  
  // Social Media
  social: {
    facebook: "https://facebook.com/thepeoplesdirectory",
    twitter: "https://twitter.com/thepeoplesdirectory",
    instagram: "https://instagram.com/thepeoplesdirectory",
    linkedin: "https://linkedin.com/company/thepeoplesdirectory",
  },
};

export type SEOConfig = typeof seoConfig;