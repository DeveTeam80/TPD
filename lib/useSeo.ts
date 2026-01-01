// lib/useSeo.ts
import { Metadata } from 'next';
import metaData from '../seo/meta.json';
import { seoConfig } from '../seo/config';
import { Person } from '@/data/people';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

interface MetaDataItem {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  ogImage?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogType?: string;
  twitterImage?: string;
  author?: string;
  robots?: string;
  // NEW: Added jsonLd support for static pages via meta.json
  jsonLd?: any;
  aiAgent?: {
    intent?: string;
    entities?: string[];
    topics?: string[];
    questionAnswer?: Array<{ question: string; answer: string }>;
    conversationalHooks?: string[];
  };
}

interface MetaDataCollection {
  [key: string]: MetaDataItem;
}

interface CustomSEOData extends Partial<MetaDataItem> {
  personName?: string;
  personTitle?: string;
  personIndustry?: string;
  personLocation?: string;
  personBio?: string;
  personImage?: string;
  jsonLd?: any | any[];
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

export function toAbsoluteUrl(url?: string): string | undefined {
  if (!url) return undefined;
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  if (url.startsWith('/')) return `${seoConfig.siteUrl}${url}`;
  return `${seoConfig.siteUrl}/${url.replace(/^\/*/, '')}`;
}

/**
 * Load custom SEO override for a specific profile
 * Priority: File > Person.seo > Generated
 */
async function loadProfileSEOCustom(slug: string): Promise<any | null> {
  try {
    const customSEO = await import(`../seo/custom/people/${slug}.json`);
    return customSEO.default || customSEO;
  } catch (error) {
    // File doesn't exist - will use person.seo or auto-generated
    return null;
  }
}

/**
 * Merge SEO data with priority: customFile > person.seo > generated
 */
function mergeSEOData(
  generated: any,
  personSEO?: Person['seo'],
  customFile?: any
): any {
  return {
    title: customFile?.title || personSEO?.title || generated.title,
    description: customFile?.description || personSEO?.description || generated.description,
    keywords: customFile?.keywords || personSEO?.keywords || generated.keywords,
    canonical: customFile?.canonical || personSEO?.canonical || generated.canonical,
    ogImage: customFile?.ogImage || personSEO?.ogImage || generated.ogImage,
    ogTitle: customFile?.ogTitle || personSEO?.ogTitle || generated.ogTitle,
    ogDescription: customFile?.ogDescription || personSEO?.ogDescription || generated.ogDescription,
    twitterImage: customFile?.twitterImage || personSEO?.twitterImage || generated.twitterImage,
    robots: customFile?.robots || personSEO?.robots || generated.robots,
    jsonLd: customFile?.customJsonLd || personSEO?.jsonLd || generated.jsonLd,
  };
}

function generateOptimizedTitle(
  personName: string,
  industry: string,
  type: 'profile' | 'industry' | 'location' = 'profile'
): string {
  const siteName = seoConfig.siteName;
  
  switch (type) {
    case 'profile':
      return `${personName} - ${industry} Leader | ${siteName}`;
    case 'industry':
      return `${industry} Leaders & Innovators | ${siteName}`;
    case 'location':
      return `Leaders in ${personName} | ${siteName}`;
    default:
      return `${personName} | ${siteName}`;
  }
}

function generateMetaDescription(
  personName: string,
  influence: string,
  location: string,
  industry?: string
): string {
  const industryText = industry ? ` ${industry}` : '';
  return `${personName} is a distinguished${industryText} leader in ${location}. ${influence.substring(0, 120)}... Connect with ${personName} on The People's Directory.`;
}

function generateAIAgentData(
  personName: string,
  industry: string,
  location: string,
  bio: string,
  type: 'profile' | 'industry' | 'location' = 'profile'
): {
  intent: string;
  entities: string[];
  topics: string[];
  questionAnswer: Array<{ question: string; answer: string }>;
  conversationalHooks: string[];
} {
  const entities = [personName, industry, location, 'leadership', 'innovation'];
  const topics = [industry.toLowerCase(), 'business leadership', 'innovation', 'visionary leaders'];
  
  let intent = '';
  let questionAnswer: Array<{ question: string; answer: string }> = [];
  let conversationalHooks: string[] = [];

  switch (type) {
    case 'profile':
      intent = `Find information about ${personName}, a ${industry} leader in ${location}`;
      questionAnswer = [
        {
          question: `Who is ${personName}?`,
          answer: `${personName} is a distinguished ${industry} leader based in ${location}. ${bio.substring(0, 200)}...`
        },
        {
          question: `What does ${personName} do?`,
          answer: `${personName} is a leader in ${industry}, known for their contributions to innovation and industry advancement.`
        },
        {
          question: `Where is ${personName} located?`,
          answer: `${personName} is based in ${location}.`
        }
      ];
      conversationalHooks = [
        `Learn about ${personName}'s leadership journey`,
        `Connect with ${industry} leader ${personName}`,
        `Discover ${personName}'s impact in ${industry}`
      ];
      break;
      
    case 'industry':
      intent = `Find ${industry} leaders and innovators worldwide`;
      questionAnswer = [
        {
          question: `Who are the top ${industry} leaders?`,
          answer: `Our directory features distinguished ${industry} leaders from around the world. Browse profiles to discover their achievements and connect with them.`
        },
        {
          question: `How do I find ${industry} leaders?`,
          answer: `Use our directory to browse ${industry} leaders by location, expertise, and achievements. All profiles include contact information and detailed backgrounds.`
        }
      ];
      conversationalHooks = [
        `Discover top ${industry} leaders worldwide`,
        `Find influential ${industry} innovators`,
        `Browse our ${industry} leadership directory`
      ];
      break;
      
    case 'location':
      intent = `Find leaders and visionaries in ${personName}`;
      questionAnswer = [
        {
          question: `Who are the leaders in ${personName}?`,
          answer: `Our directory features distinguished leaders and innovators based in ${personName}. Browse by industry to find the right connection.`
        }
      ];
      conversationalHooks = [
        `Explore leaders in ${personName}`,
        `Find innovators based in ${personName}`,
        `Discover ${personName}'s influential leaders`
      ];
      break;
  }

  return {
    intent,
    entities: [...new Set(entities)],
    topics: [...new Set(topics)],
    questionAnswer,
    conversationalHooks
  };
}

// ============================================================================
// SCHEMA BUILDERS
// ============================================================================

function buildPersonSchema(person: Person, url: string): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${url}#person`,
    name: person.name,
    url,
    image: toAbsoluteUrl(person.avatarUrl),
    description: person.influence,
    jobTitle: person.influence,
    worksFor: {
      '@type': 'Organization',
      name: person.industry
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: person.city,
      addressCountry: person.country
    },
    ...(person.socials?.email && { email: person.socials.email }),
    ...(person.socials?.linkedin && { sameAs: [person.socials.linkedin] }),
    knowsAbout: [person.industry],
    ...(person.ventures && person.ventures.length > 0 && {
      alumniOf: person.ventures.map(v => ({
        '@type': 'Organization',
        name: v.name
      }))
    })
  };
}

function buildProfilePageSchema(person: Person, url: string): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    mainEntity: buildPersonSchema(person, url),
    name: `${person.name} - Profile`,
    description: person.influence,
    url,
    isPartOf: {
      '@type': 'WebSite',
      name: seoConfig.siteName,
      url: seoConfig.siteUrl
    }
  };
}

function buildBreadcrumbSchema(breadcrumbs: Array<{ name: string; url: string }>): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: crumb.url
    }))
  };
}

function buildCollectionPageSchema(industry: string, count: number): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${industry} Leaders Directory`,
    description: `Discover distinguished ${industry} leaders and innovators from around the world.`,
    about: {
      '@type': 'Thing',
      name: industry
    },
    numberOfItems: count
  };
}

// ============================================================================
// ROUTE MAPPINGS
// ============================================================================

const routeToMetaKey: Record<string, string> = {
  '/': 'home',
  '/directory': 'directory',
  '/about': 'about',
  '/contact': 'contact',
};

// ============================================================================
// MAIN SEO GENERATION
// ============================================================================

export async function generateSEOMetadata(
  pathname: string,
  customData: CustomSEOData = {}
): Promise<Metadata> {
  const metaKey = routeToMetaKey[pathname] || 'home';
  const typedMetaData = metaData as MetaDataCollection;
  const pageMeta: MetaDataItem = typedMetaData[metaKey] || typedMetaData.home;
  
  const finalMeta: MetaDataItem = { ...pageMeta, ...customData };
  
  const keywords = finalMeta.keywords ? 
    (Array.isArray(finalMeta.keywords) 
      ? finalMeta.keywords 
      : finalMeta.keywords.split(',').map(k => k.trim())
    ) : [];

  // Logic to determine the final JSON-LD object
  // Priority: 1. customData.jsonLd (dynamic override), 2. finalMeta.jsonLd (static from meta.json)
  const finalJsonLd = customData.jsonLd || finalMeta.jsonLd;

  // Logic to determine final AI Agent data
  const finalAiAgent = customData.aiAgent || finalMeta.aiAgent;

  const metadata: Metadata = {
    metadataBase: new URL(seoConfig.siteUrl),
    title: finalMeta.title,
    description: finalMeta.description,
    keywords: keywords,
    authors: [{ name: finalMeta.author || seoConfig.defaultAuthor }],
    creator: finalMeta.author || seoConfig.defaultAuthor,
    publisher: seoConfig.defaultAuthor,
    robots: finalMeta.robots || seoConfig.defaultRobots,
    
    alternates: {
      canonical: finalMeta.canonical || `${seoConfig.siteUrl}${pathname}`,
    },

    icons: {
      icon: '/favicon.ico',
      shortcut: '/favicon.ico',
      apple: '/apple-touch-icon.png',
    },

    openGraph: {
      title: finalMeta.ogTitle || finalMeta.title,
      description: finalMeta.ogDescription || finalMeta.description,
      url: finalMeta.canonical || `${seoConfig.siteUrl}${pathname}`,
      siteName: seoConfig.siteName,
      images: [
        {
          url: toAbsoluteUrl(finalMeta.ogImage) || seoConfig.defaultOgImage,
          width: 1200,
          height: 630,
          alt: finalMeta.ogTitle || finalMeta.title,
        },
      ],
      locale: seoConfig.defaultLocale,
      type: (finalMeta.ogType as any) || seoConfig.defaultOgType,
    },

    twitter: {
      card: 'summary_large_image',
      title: finalMeta.title,
      description: finalMeta.description,
      images: [toAbsoluteUrl(finalMeta.twitterImage || finalMeta.ogImage) || seoConfig.defaultOgImage],
      site: seoConfig.twitterHandle,
      creator: seoConfig.twitterHandle,
    },

    verification: {
      google: seoConfig.verification.google,
      other: {
        ...(seoConfig.verification.bing && { 'msvalidate.01': seoConfig.verification.bing }),
      },
    },

    other: {
      // MODIFIED: Checks both dynamic customData and static meta.json for JSON-LD
      ...(finalJsonLd ? {
        'script:ld+json': JSON.stringify(
          Array.isArray(finalJsonLd)
            ? finalJsonLd
            : [finalJsonLd]
        ),
      } : {}),

      ...(finalAiAgent ? {
        'ai-agent-intent': finalAiAgent.intent || '',
        'ai-agent-entities': finalAiAgent.entities?.join(',') || '',
        'ai-agent-topics': finalAiAgent.topics?.join(',') || '',
        'ai-agent-conversational-hooks': finalAiAgent.conversationalHooks?.join('|') || '',
      } : {}),
    },
  };

  return metadata;
}

// ============================================================================
// SPECIALIZED SEO FUNCTIONS
// ============================================================================

/**
 * Generate SEO for profile pages with custom override support
 * Priority: 1. Custom file 2. Person.seo 3. Auto-generated
 */
export async function generateProfilePageSEOMetadata(
  person: Person,
  pathname: string
): Promise<Metadata> {
  // ============================================================================
  // STEP 1: AUTO-GENERATE SEO FROM PERSON DATA (people.ts)
  // ============================================================================
  
  const title = generateOptimizedTitle(person.name, person.industry, 'profile');
  const description = generateMetaDescription(
    person.name, 
    person.influence, 
    `${person.city}, ${person.country}`, 
    person.industry
  );
  const canonical = `${seoConfig.siteUrl}${pathname}`;
  
  const aiAgentData = generateAIAgentData(
    person.name,
    person.industry,
    `${person.city}, ${person.country}`,
    person.bio?.[0] || person.influence,
    'profile'
  );

  const defaultJsonLd = [
    buildPersonSchema(person, canonical),
    buildProfilePageSchema(person, canonical),
    buildBreadcrumbSchema([
      { name: 'Home', url: seoConfig.siteUrl },
      { name: 'Directory', url: `${seoConfig.siteUrl}/directory` },
      { name: person.name, url: canonical }
    ])
  ];

  const autoGenerated = {
    title,
    description,
    keywords: `${person.name}, ${person.industry}, ${person.city}, ${person.country}, leadership, innovation`,
    canonical,
    ogTitle: title,
    ogDescription: description,
    ogImage: person.avatarUrl,
    twitterImage: person.avatarUrl,
    robots: 'index, follow',
    jsonLd: defaultJsonLd,
  };

  // ============================================================================
  // STEP 2: LOAD CUSTOM SEO (if exists)
  // ============================================================================
  
  const customFileSEO = await loadProfileSEOCustom(person.slug);

  // ============================================================================
  // STEP 3: MERGE WITH PRIORITY
  // ============================================================================
  
  const finalSEO = mergeSEOData(autoGenerated, person.seo, customFileSEO);
  
  // Debug log in development
  if (process.env.NODE_ENV === 'development') {
    console.log(`[SEO] ${person.slug}:`, {
      source: customFileSEO ? 'CUSTOM_FILE' : person.seo ? 'PERSON_SEO' : 'AUTO_GENERATED',
      hasCustomFile: !!customFileSEO,
      hasPersonSEO: !!person.seo,
    });
  }

  // ============================================================================
  // STEP 4: RETURN METADATA
  // ============================================================================
  
  return generateSEOMetadata(pathname, {
    title: finalSEO.title,
    description: finalSEO.description,
    keywords: finalSEO.keywords,
    canonical: finalSEO.canonical,
    ogTitle: finalSEO.ogTitle,
    ogDescription: finalSEO.ogDescription,
    ogImage: finalSEO.ogImage,
    twitterImage: finalSEO.twitterImage,
    robots: finalSEO.robots,
    jsonLd: finalSEO.jsonLd,
    aiAgent: aiAgentData
  });
}

/**
 * Generate SEO for industry filter pages
 */
export async function generateIndustryPageSEOMetadata(
  industry: string,
  count: number,
  pathname: string
): Promise<Metadata> {
  const title = generateOptimizedTitle(industry, industry, 'industry');
  const description = `Discover ${count}+ distinguished ${industry} leaders and innovators from around the world. Connect with influential ${industry} professionals shaping the industry.`;
  
  const aiAgentData = generateAIAgentData(
    industry,
    industry,
    'Global',
    description,
    'industry'
  );

  const jsonLd = [
    buildCollectionPageSchema(industry, count),
    buildBreadcrumbSchema([
      { name: 'Home', url: seoConfig.siteUrl },
      { name: 'Directory', url: `${seoConfig.siteUrl}/directory` },
      { name: industry, url: `${seoConfig.siteUrl}${pathname}` }
    ])
  ];

  return generateSEOMetadata(pathname, {
    title,
    description,
    keywords: `${industry} leaders, ${industry} innovators, ${industry} executives, ${industry} directory`,
    canonical: `${seoConfig.siteUrl}${pathname}`,
    ogTitle: title,
    ogDescription: description,
    jsonLd,
    aiAgent: aiAgentData
  });
}

export type { MetaDataItem, CustomSEOData };