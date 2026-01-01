// src/data/people.ts

export type Person = {
  id: string
  name: string
  slug: string
  avatarUrl: string
  influence: string
  city: string
  country: string
  industry: string

  // Extended fields
  bio?: string[]
  stats?: {
    experience: string
    projects: string
    collaborations: string
    awards: string
  }
  achievements?: {
    title: string
    year: string
    description: string
    type: 'award' | 'recognition' | 'milestone'
  }[]
  ventures?: {
    name: string
    role: string
    period: string
    description: string
    logo?: string
    website?: string
  }[]
  media?: {
    type: 'TEDx' | 'Podcast' | 'Interview' | 'Documentary'
    title: string
    platform: string
    date: string
    thumbnail: string
    views: string
    link: string
  }[]
  articles?: {
    type: 'Featured In' | 'Written By'
    title: string
    publication: string
    date: string
    excerpt: string
    link: string
  }[]
  testimonials?: {
    name: string
    title: string
    avatar: string
    quote: string
    rating: number
  }[]
  socials?: {
    linkedin?: string
    twitter?: string
    website?: string
    email?: string
  }
  publications?: {
    type: 'Book' | 'Thesis' | 'Research Paper' | 'Whitepaper'
    title: string
    publisher: string // or University/Journal name
    year: string
    link?: string
    isbn?: string // Optional
    description?: string // Short abstract
  }[]
  // 🆕 CUSTOM SEO OVERRIDE
  seo?: {
    title?: string
    description?: string
    keywords?: string
    ogImage?: string
    ogTitle?: string
    ogDescription?: string
    twitterImage?: string
    canonical?: string
    robots?: string
    jsonLd?: any | any[]
  }
}

// A helper type that omits 'slug' from Person for our base data
type BasePerson = Omit<Person, 'slug'>;


function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

// Explicitly type the base data array with our helper type
const basePeopleData: BasePerson[] = [
  {
    id: '1',
    name: 'Murtaza Hamid',
    avatarUrl: '/images/people/murtaza-hamid1.png',
    influence: 'CEO & Founder, Visionary Services',
    city: 'Pune',
    country: 'India',
    industry: 'Digital Marketing & SEO',
    bio: [
      'Murtaza Mustafa Hamid is the Founder & CEO of Visionary Services and the driving force behind The Visionary Group an expanding ecosystem of brands built around innovation, strategy, and long-term value creation.',
      'Born in Jeddah and educated in India, he formally co-founded Visionary Services in 2018. What began as a three-man initiative has evolved into a structured group recognized for strategic thinking, execution excellence, and client-centric innovation.',
      'Murtaza is known for his "foundation-first" approach and a niche-exclusive strategy. He has helped more than 500 businesses across diverse industries establish strong digital identities, build trust, and achieve measurable growth.'
    ],
    stats: {
      experience: '12+',
      projects: '200+',
      collaborations: '500+',
      awards: '3+'
    },
    achievements: [
      {
        title: 'Asia-Pacific SEO Dominance',
        year: '2019',
        description: 'Engineered strategies that secured top-tier rankings and drove organic traffic across the Asia-Pacific region.',
        type: 'milestone'
      },
      {
        title: 'High-Profile Crisis Management',
        year: '2020',
        description: 'During the COVID-19 pandemic, successfully expanded services to manage digital reputation and branding for celebrity clients.',
        type: 'milestone'
      },
      {
        title: 'Google My Business Pioneer',
        year: '2016',
        description: 'Identified and leveraged GMB for local visibility years before it became an industry standard, generating inquiries for cautious investors.',
        type: 'recognition'
      }
    ],
    ventures: [
      {
        name: 'Visionary Services',
        role: 'Founder & CEO',
        period: '2016 - Present',
        description: 'Digital marketing and branding agency specializing in SEO, brand building, and niche-exclusive strategies.',
        website: 'https://www.visionarybizz.com/'
      },
      {
        name: 'Visionary Group Initiatives',
        role: 'Founder',
        period: '2018 - Present',
        description: 'A portfolio of brands including Visionary Sight, Zodiaura, and Kenyabizz Directory spanning digital tools and platforms.',
        website: ''
      }
    ],
    media: [],
    articles: [
      {
        type: 'Featured In',
        title: 'Cracking the SEO Code in the Digital Era',
        publication: 'Deccan Business',
        date: '2023',
        excerpt: 'Murtaza Hamid shares insights on SEO strategies at Visionary Services and the digital landscape.',
        link: 'https://deccanbusiness.com/cracking-the-seo-code-in-the-digital-era-by-murtaza-hamid-at-visionary-services/'
      },
      {
        type: 'Featured In',
        title: 'Strategic SEO Insights',
        publication: 'Republic News India',
        date: '2023',
        excerpt: 'Discussing the evolving landscape of digital marketing and the foundation-first approach.',
        link: 'https://business.republicnewsindia.com/cracking-the-seo-code-in-the-digital-era-by-murtaza-hamid-at-visionary-services/'
      }
    ],
    socials: {
      linkedin: 'https://in.linkedin.com/in/murtaza-mohammed-mustafa-1a3721119',
      website: 'https://www.visionarybizz.com/'
    }
  },
  {
    id: '2',
    name: 'Naqiyah Burhanuddin',
    avatarUrl: '/images/people/naqiyah-burhanuddin.png',
    influence: 'Director & Academic Head, Rawdat al-Quran al-Kareem',
    city: 'Mumbai',
    country: 'India',
    industry: 'Education & Community Leadership',
    bio: [
      'Naqiyah Burhanuddin is a prominent educational leader and public figure within the Dawoodi Bohra community. She currently serves as the Director and Academic Head of Rawdat al-Quran al-Kareem (RQK), where she has been instrumental in modifying school programs and coordinating curriculum since 2013.',
      'Her educational philosophy emphasizes teaching children "how to learn rather than what to learn," with a strong advocacy for the "power of play" and nature-based learning. She holds a Master’s in Education from D’Youville College, USA, and views the entire world as a classroom.',
      'Prior to RQK, she founded Cubs, Fawns & Foals in 2009, an initiative designed to promote learning through hands-on cultural activities. She is widely recognized for her "Mumbai Meri Jaan" initiative, blending modern educational pedagogies with traditional values.'
    ],
    stats: {
      experience: '16+',
      projects: '20+',
      collaborations: '15+',
      awards: '5+'
    },
    achievements: [
      {
        title: 'Educational Leadership',
        year: '2018',
        description: 'Spearheaded the expansion of Rawdat al-Quran al-Kareem, implementing a unique pedagogy that blends Quranic sciences with modern academics.',
        type: 'milestone'
      },
      {
        title: 'Mumbai Meri Jaan Festival',
        year: '2020',
        description: 'Organized a massive tourism and cultural festival to celebrate the city’s heritage, fostering civic pride among students.',
        type: 'milestone'
      },
      {
        title: 'Academic Excellence',
        year: '2019',
        description: 'Completed Master\'s in Education at D\'Youville College, gaining expertise in curriculum planning and teacher training.',
        type: 'recognition'
      }
    ],
    ventures: [
      {
        name: 'Rawdat al-Quran al-Kareem',
        role: 'Director & Academic Head',
        period: '2013 - Present',
        description: 'An educational institution where Naqiyah leads curriculum coordination and school program modifications.',
        website: 'https://rawdatalquran.com'
      },
      {
        name: 'Cubs, Fawns & Foals',
        role: 'Founder',
        period: '2009 - Present',
        description: 'An initiative designing cultural programs and educational trips for students aged 10-16.',
        website: ''
      }
    ],
    media: [], // No video/podcast content provided
    articles: [
      {
        type: 'Featured In',
        title: 'Rawdat al-Quran Organised Mumbai Meri Jaan Tourism Festival',
        publication: 'News Feature',
        date: 'March 2020',
        excerpt: 'Coverage of the massive tourism and cultural festival organized to celebrate Mumbai heritage.',
        link: '#' // Placeholder as specific link was not provided
      },
      {
        type: 'Featured In',
        title: 'Husain Burhanuddin & Naqiyah Burhanuddin',
        publication: 'Wiki Profile',
        date: 'N/A',
        excerpt: 'Profile detailing the contributions of Naqiyah Burhanuddin to the community and education.',
        link: '#'
      },
      {
        type: 'Featured In', // Mapped as 'Featured In' or 'Written By' depending on context
        title: 'Parenting with Presence: Nurturing Children Beyond Screens',
        publication: 'Article',
        date: 'July 2025',
        excerpt: 'Insights on modern parenting, advocating for nature-based learning and disconnecting from screens.',
        link: '#'
      }
    ],
    socials: {
      website: 'https://rawdatalquran.com',
      // instagram: 'https://www.instagram.com/naqiyahburhanuddin' // Commented out as 'instagram' is not in Person type
    }
  },
  {
    id: '3',
    name: 'Ahmar Bubere',
    avatarUrl: '/images/people/ahmar_bubere.jpg',
    influence: 'Executive Editor, Indo Gulf Times',
    city: 'Mumbai',
    country: 'India',
    industry: 'Media & Journalism',
    bio: [
      'Ahmar Bubere, Executive Editor of the Indo Gulf Times, is a leading Indian media professional recognized for his influential work in Diaspora Journalism and Indo-Gulf relations. Based in Mumbai, he upholds the distinguished legacy of his father, renowned journalist Dr. Abdul Sami Bubere, establishing himself as a respected second-generation figure in international media.',
      'Under his guidance, the Indo Gulf Times—a premier newspaper serving the Indian diaspora in the Gulf for over two decades—continues to grow as a trusted voice. A subject-matter specialist in India-Middle East diaspora affairs, Ahmar focuses on the socio-economic and cultural ties that shape migration and regional cooperation.',
      'Beyond journalism, Ahmar plays an active role in diplomatic outreach. He has coordinated official messages—including those from the President of India—for multiple special editions, reinforcing the newspaper’s national credibility. He stands among the most prominent voices advancing conversations on diaspora identity and cultural diplomacy.'
    ],
    stats: {
      experience: '16+',
      projects: '150+', // Mapped from "150+ Editions managed"
      collaborations: '50+', // Mapped from "Government & Corporate liaisons"
      awards: '12+'
    },
    achievements: [
      {
        title: 'Presidential Validation',
        year: '2023',
        description: 'Secured official messages from the President of India recognizing the contributions of the Dawoodi Bohra community.',
        type: 'recognition'
      },
      {
        title: 'Media Leadership Succession',
        year: '2025',
        description: 'Successfully assumed executive stewardship of Indo Gulf Times following the passing of founder Dr. Abdul Sami Bubere.',
        type: 'milestone'
      },
      {
        title: 'Global Digital Expansion',
        year: '2019',
        description: 'Spearheaded the digital transformation of Indo Gulf Times, expanding readership to over 800,000.',
        type: 'milestone'
      }
    ],
    ventures: [
      {
        name: 'Indo Gulf Times',
        role: 'Executive Editor',
        period: '2009 - Present',
        description: 'A premier newspaper serving the Indian diaspora in the Gulf for over two decades, focusing on socio-economic and cultural ties.',
        website: 'https://indogulftimes.com'
      }
    ],
    media: [
      {
        type: 'Documentary',
        title: 'Legacy of Dr. Abdul Sami Bubere',
        platform: 'Indo Gulf Times',
        date: 'July 2025',
        thumbnail: '', // Placeholder
        views: 'N/A',
        link: '#' // Placeholder link
      }
    ],
    articles: [
      {
        type: 'Written By', // Mapped as he is the Editor
        title: 'The Dedicated Benevolence of Dawoodi Bohras',
        publication: 'Indo Gulf Times',
        date: 'September 2022',
        excerpt: 'Feature article highlighting the socio-economic contributions and community service of the Dawoodi Bohras.',
        link: '#'
      },
      {
        type: 'Featured In',
        title: 'Milaad Mubarak Commemorative Edition',
        publication: 'Special Edition',
        date: 'N/A',
        excerpt: 'A special edition coordinated by Ahmar Bubere featuring high-level government recognition.',
        link: '#'
      }
    ],
    socials: {
      linkedin: 'https://in.linkedin.com/in/ahmar-bubere-25575a6a',
      website: 'https://indogulftimes.com',
    }
  },
  {
    id: '4',
    name: 'Dr. Abdul Sami Bubere',
    avatarUrl: '/images/people/sami_bubere.jpg',
    influence: 'Founder & Editor-in-Chief, Indo Gulf Times',
    city: 'Mumbai',
    country: 'India',
    industry: 'Media, Journalism & Diplomacy',
    bio: [
      'Dr. Abdul Sami Bubere (d. 2025) was a veteran journalist, scholar, and the visionary founder of the Indo Gulf Times. Known as the "Father of Diaspora Journalism" in the community, he established the publication to serve as a vital link between Non-Resident Indians (NRIs) in the Gulf and their homeland.',
      'A distinguished intellectual, he served as the President of the World Peace Council (India Chapter), advocating for global harmony and Indo-Arab diplomatic relations. He shared a close and reverent relationship with three generations of Dawoodi Bohra leadership—Syedna Taher Saifuddin, Syedna Mohammed Burhanuddin, and Syedna Mufaddal Saifuddin.',
      'His life was dedicated to "fearless and frank" reporting, particularly highlighting the socio-economic contributions of the Indian Muslim community. He left behind a rich legacy carried forward by his son, Ahmar Bubere.'
    ],
    stats: {
      experience: '50+',
      projects: '1000+', // Mapped from "1000+ Editions published"
      collaborations: '100+', // Mapped from "Diplomatic missions & Peace delegations"
      awards: 'Lifetime' // Mapped from "Numerous lifetime achievement awards"
    },
    achievements: [
      {
        title: 'Founding Indo Gulf Times',
        year: '2000', // Estimated start of 2000s based on "2000s"
        description: 'Established the first and only dedicated English-language newspaper for the Indian diaspora in the Gulf, creating a unique media category.',
        type: 'milestone'
      },
      {
        title: 'Peace Advocacy Leadership',
        year: 'N/A',
        description: 'Appointed President of the World Peace Council (India Chapter), representing India on various international platforms promoting interfaith dialogue.',
        type: 'recognition'
      },
      {
        title: 'Community Historian',
        year: '2019', // Context from editorial date
        description: 'Served as a primary chronicler of the Dawoodi Bohra community’s history, documenting the era of three Dais.',
        type: 'milestone'
      }
    ],
    ventures: [
      {
        name: 'Indo Gulf Times',
        role: 'Founder & Editor-in-Chief',
        period: 'Inception - 2025',
        description: 'A dedicated English-language newspaper connecting the Indian diaspora in the Gulf with their homeland.',
        website: 'https://indogulftimes.com'
      },
      {
        name: 'World Peace Council (India Chapter)',
        role: 'President',
        period: 'Lifetime',
        description: 'A global anti-imperialist peace organization where he led the Indian delegation in diplomatic missions.'
      }
    ],
    media: [
      {
        type: 'Documentary', // Mapped "Video Tribute" to Documentary
        title: 'Condolence Meeting for Chief Editor Dr. Abdul Sami Bubere',
        platform: 'Video Tribute',
        date: 'July 2025',
        thumbnail: '', // Placeholder
        views: 'N/A',
        link: '#' // Placeholder
      }
    ],
    articles: [
      {
        type: 'Featured In',
        title: 'Renowned Journalist Abdul Sami Bubere Passes Away',
        publication: 'Inquilab',
        date: 'June 2025',
        excerpt: 'Obituary feature honoring the life and contributions of the veteran journalist.',
        link: '#'
      },
      {
        type: 'Written By',
        title: 'Recounting Memories of Three Syednas',
        publication: 'eGujarat Times',
        date: '2019',
        excerpt: 'An editorial chronicling his interactions and historical observations of the community leadership.',
        link: '#'
      }
    ],
    socials: {
      website: 'https://indogulftimes.com'
    }
  },
  {
    id: '5',
    name: 'Zakir Quresh',
    avatarUrl: '/images/people/zakir-quresh.jpg',
    influence: 'Director & Managing Director, SMB Properties',
    city: 'Nairobi',
    country: 'Kenya',
    industry: 'Real Estate Development',
    bio: [
      'Mr. Zakir Quresh is the Director and Managing Director of SMB Properties, one of Kenya’s leading real estate development firms specializing in luxury residential towers, branded residences, and high-end hospitality projects. He has positioned the firm as a market leader in contemporary, architecturally advanced developments across East Africa.',
      'Based in Kenya, Mr. Quresh is known for introducing innovative concepts such as "vertical cities"—integrated developments offering a full lifestyle ecosystem within a single high-rise. His leadership centers on curated design, custom finishes, and delivering hotel-grade amenities within private residences.',
      'Under his stewardship, SMB Properties has become synonymous with integrity and long-term investment value. He successfully led major partnerships, including a landmark collaboration with CityBlue Hotels for Le Mirage Residences, shaping the evolution of luxury real estate in Africa.'
    ],
    stats: {
      experience: '15+', // "15+ years"
      projects: '10+', // "10+ major high-end developments"
      collaborations: '5+', // Estimated based on "Multiple hospitality and branding collaborations"
      awards: '5+' // Estimated based on "Multiple international awards"
    },
    achievements: [
      {
        title: 'Le Mirage Residences',
        year: 'N/A',
        description: 'Developed one of Nairobi\'s tallest and most iconic branded residential towers in partnership with CityBlue Hotels.',
        type: 'milestone'
      },
      {
        title: 'Global Recognition for SMB Suites',
        year: 'N/A',
        description: 'Oversaw development of SMB Suites in Mombasa, recognized with the Luxury Lifestyle Award for Best Luxury Residential Development.',
        type: 'award'
      },
      {
        title: 'Hospitality Diversification',
        year: 'N/A',
        description: 'Successfully diversified the portfolio with Kilua Residences, a beachfront luxury property catering to long-term and short-term stays.',
        type: 'milestone'
      }
    ],
    ventures: [
      {
        name: 'SMB Properties',
        role: 'Director & Managing Director',
        period: '2008 - Present', // Inferred from "Years Active: 17+" (Current year 2025 - 17)
        description: 'A leading firm focusing on luxury real estate development, branded residences, and hospitality-integrated living.',
        website: 'https://www.smb.ke'
      }
    ],
    media: [], // No specific video/audio links provided
    articles: [
      {
        type: 'Featured In',
        title: 'Future of African Real Estate',
        publication: 'Industry Media',
        date: 'N/A',
        excerpt: 'Frequently featured discussing the future of African real estate and high-net-worth developments.',
        link: '#' // Placeholder
      }
    ],
    socials: {
      website: 'https://www.smb.ke'
    }
  },
  {
    id: '6',
    name: 'Shahzada Taha Najmuddin',
    avatarUrl: '/images/people/taha-najmuddin.webp',
    influence: 'Head of Sigah al-Yemen & FMB',
    city: 'Mumbai',
    country: 'India',
    industry: 'Community Welfare & Administration',
    bio: [
      'Shahzada Taha Najmuddin is the second son of His Holiness Syedna Mufaddal Saifuddin. He serves as the President of Sigah al-Yemen, managing the affairs of community members in Yemen, and oversees the Faiz al-Mawaid al-Burhaniyah (FMB) global community kitchen initiative.',
      'Born in Mumbai in 1975, he graduated from Aljamea-tus-Saifiyah in 1996 with the degree of Al-Faqih al-Jayyid. He is dedicated to realizing the vision of raising living standards within the community, heading the Department of Welfare and Social Development and the Upliftment & Fostership Programme.',
      'Shahzada Najmuddin is a signatory of the Amman Message, a 2004 declaration calling for tolerance and unity in the Muslim world. He also serves as the Vice-President of Anjuman-e-Shiate Ali and oversees pilgrimages to Najaf and Karbala.'
    ],
    stats: {
      experience: '25+', // Since graduation in 1996
      projects: '10+', // Major departments: FMB, Yemen, Upliftment, etc.
      collaborations: 'Global',
      awards: '2+' // Titles: Thiqah al-Da'wah, al-'Aleem al-Baare'
    },
    achievements: [
      {
        title: 'Amman Message Signatory',
        year: '2004',
        description: 'Signed the Amman Message declaration calling for tolerance and unity in the Muslim world.',
        type: 'recognition'
      },
      {
        title: 'Conferment of Titles',
        year: '2016',
        description: 'Conferred the degrees of "Thiqah al-Da\'wah al-Taiybiyyah" and "al-\'Aleem al-Baare\'" by Syedna Mufaddal Saifuddin.',
        type: 'award'
      },
      {
        title: 'Leadership in Social Welfare',
        year: 'Ongoing',
        description: 'Spearheads the Upliftment & Fostership Programme, mobilizing volunteers to assist low-income families across South Asia and East Africa.',
        type: 'milestone'
      }
    ],
    ventures: [
      {
        name: 'Faiz al-Mawaid al-Burhaniyah (FMB)',
        role: 'Overseer',
        period: 'Present',
        description: 'A global community kitchen initiative providing freshly cooked daily meals to community households worldwide to ensure food security.',
        website: ''
      },
      {
        name: 'Sigah al-Yemen',
        role: 'President',
        period: 'Present',
        description: 'Department responsible for the management and welfare of community members in Yemen.'
      },
      {
        name: 'Saifee Burhani Upliftment Trust (SBUT)',
        role: 'Vice-Chairman',
        period: '2014 - Present',
        description: 'Oversees one of India\'s largest cluster redevelopment projects in Bhendi Bazaar, Mumbai.'
      }
    ],
    socials: {
      website: 'https://dawatehadiyah.org'
    }
  }, {
    id: '7',
    name: 'Shahzada Jaferussadiq Imaduddin',
    avatarUrl: '/images/people/shahzada-jafar-al-sadiq-imaduddin.webp',
    influence: 'Rector, Aljamea-tus-Saifiyah',
    city: 'Mumbai',
    country: 'India',
    industry: 'Education & Literature',
    bio: [
      'Shahzada Jaferussadiq Imaduddin is the eldest son of Syedna Mufaddal Saifuddin and serves as one of the four Rectors (Ameer al-Jamea) of Aljamea-tus-Saifiyah. An accomplished scholar and poet, he plays a pivotal role in structuring the academy\'s syllabus and presiding over postgraduate dissertation defenses.',
      'He holds a PhD in Arabic Literature from ALECSO (Arab League Educational, Cultural and Scientific Organization), Cairo (2013). His thesis titled "The Art and Science of Dialectic in the Works of Syedna al-Muʾayyad al-Shirazi" is a significant contribution to Fatimid studies.',
      'Shahzada Imaduddin is a Senior Fellow at the Royal Aal al-Bayt Institute for Islamic Thought and a signatory of the Amman Message. He heads the "Funun al-Quran al-Kareem" department and has authored extensive works on Fatimid architecture.'
    ],
    stats: {
      experience: '25+', // Graduated 1997
      projects: '5+', // Multiple books and academic departments
      collaborations: 'Intl', // ALECSO, Royal Aal al-Bayt
      awards: 'Ph.D.'
    },
    achievements: [
      {
        title: 'Doctorate from ALECSO',
        year: '2013',
        description: 'Awarded a PhD in Arabic Literature for his thesis on the dialectics of Syedna al-Mu\'ayyad al-Shirazi.',
        type: 'award'
      },
      {
        title: 'Rector of Aljamea-tus-Saifiyah',
        year: '2015',
        description: 'Appointed as one of the four rectors (Ameer al-Jamea) of the community\'s principal educational institute.',
        type: 'milestone'
      },
      {
        title: 'Fatimid Architecture Research',
        year: '2000',
        description: 'Authored illustrated dissertations on Fatimid masjids including "Al Aqmar: A Living Testimony" and "Al Juyushi: A Vision".',
        type: 'recognition'
      }
    ],
    ventures: [
      {
        name: 'Aljamea-tus-Saifiyah',
        role: 'Rector (Ameer al-Jamea)',
        period: '2015 - Present',
        description: 'Leads the academic and administrative functioning of the academy across its four global campuses.',
        website: 'https://jameasaifiyah.edu'
      },
      {
        name: 'Funun al-Quran al-Kareem',
        role: 'Head',
        period: 'Present',
        description: 'Department dedicated to the study of Quranic arts and manuscripts.'
      }
    ],
    media: [],
    articles: [],
    publications: [
      {
        type: 'Thesis',
        title: 'The Art and Science of Dialectic in the Works of Syedna al-Muʾayyad al-Shirazi',
        publisher: 'ALECSO',
        year: '2013',
        description: 'Doctoral thesis exploring the theological and literary contributions of the renowned Fatimid scholar.',
        // link: '#'
      },
      {
        type: 'Book',
        title: 'Al Aqmar: A Living Testimony to the Fatemiyeen',
        publisher: 'Oxford University Press',
        year: '2000',
        description: 'An illustrated dissertation on the architectural features and history of the Al-Aqmar Mosque in Cairo.',
        isbn: '978-0195793052'
      },
      {
        type: 'Book',
        title: 'Al Juyushi: A Vision of the Fatemiyeen',
        publisher: 'Graphico Printing',
        year: '2002',
        description: 'A detailed architectural study of the Juyushi Mosque.'
      }
    ],
    socials: {
      website: 'https://dawatehadiyah.org'
    }
  },
  {
    id: '8',
    name: 'Shahzada Husain Burhanuddin',
    avatarUrl: '/images/people/shahzada-husain-burhanuddin.webp',
    influence: 'Chairman, SBUT & Provost, Aljamea-tus-Saifiyah',
    city: 'Mumbai',
    country: 'India',
    industry: 'Urban Development & Education',
    bio: [
      'Shahzada Husain Burhanuddin is the third son of Syedna Mufaddal Saifuddin. He leads the administrative affairs of Dawat-e-Hadiyah and serves as the Chairman of the Saifee Burhani Upliftment Trust (SBUT), India\'s largest cluster redevelopment project.',
      'As the Provost of Aljamea-tus-Saifiyah, he oversees both academic and administrative aspects. He also heads Mahad al-Zahra, the institute for Quranic memorization, and is an accredited Qari (reciter) from Cairo, holding honorary membership in the Guild of Quran Reciters.',
      'He founded the Rawdat al-Quran al-Kareem school and heads the Department for Business Development. He actively represents the community at global forums, including the COP28 Global Faith Leaders Summit in 2023.'
    ],
    stats: {
      experience: '20+',
      projects: '15+', 
      collaborations: 'Govt+', 
      awards: '3+' 
    },
    achievements: [
      {
        title: 'Chairman of SBUT',
        year: 'Present',
        description: 'Leads the ambitious cluster redevelopment project in South Mumbai, transforming Bhendi Bazaar.',
        type: 'milestone'
      },
      {
        title: 'Ambassador for Peace Award',
        year: '2019',
        description: 'Received the award from the All India Council of Human Rights for protecting and promoting peace and harmony.',
        type: 'award'
      },
      {
        title: 'COP28 Representation',
        year: '2023',
        description: 'Represented Syedna Mufaddal Saifuddin at the Global Faith Leaders Summit in Abu Dhabi, signing a joint appeal on climate action.',
        type: 'recognition'
      }
    ],
    ventures: [
      {
        name: 'Saifee Burhani Upliftment Trust (SBUT)',
        role: 'Chairman',
        period: 'Present',
        description: 'India\'s largest urban renewal project aimed at redeveloping the Bhendi Bazaar area.',
        website: 'https://www.sbut.com'
      },
      {
        name: 'Mahad al-Zahra',
        role: 'Head',
        period: 'Present',
        description: 'Institute for Quranic memorization and arts, conducting viva voce examinations for Hafiz candidates.',
        website: 'https://mahadalzahra.com'
      },
      {
        name: 'Rawdat al-Quran al-Kareem',
        role: 'Founder',
        period: 'Present',
        description: 'Innovative school in Mumbai with a Quran-centric approach to primary and secondary education.'
      }
    ],
    media: [],
    articles: [
      {
        type: 'Featured In',
        title: 'Foundation Stone Laid for Institute of Pharmacy at AMU',
        publication: 'Times of India',
        date: 'February 2024',
        excerpt: 'Laid the foundation stone for the new institute at Aligarh Muslim University on behalf of Syedna Mufaddal Saifuddin.',
        link: 'https://timesofindia.indiatimes.com/city/mumbai/foundation-stone-laid-for-his-holiness-syedna-mufaddal-saifuddin-institute-of-pharmacy-at-amu/articleshow/107637358.cms'
      }
    ],
    socials: {
      website: 'https://dawatehadiyah.org'
    }
  }
]

// Now export with slugs added and proper typing
export const peopleData: Person[] = basePeopleData.map(person => ({
  ...person,
  slug: generateSlug(person.name)
}))

// Export function to get all people
export async function getPeople(): Promise<Person[]> {
  // In a real app, this would fetch from an API or database
  // For now, return the static data
  return Promise.resolve(peopleData)
}

// Export function to get a person by slug
export async function getPersonBySlug(slug: string): Promise<Person | undefined> {
  return Promise.resolve(peopleData.find((person) => person.slug === slug))
}

// Export function to get people by industry
export async function getPeopleByIndustry(industry: string): Promise<Person[]> {
  return Promise.resolve(
    peopleData.filter(
      (person) => person.industry.toLowerCase() === industry.toLowerCase()
    )
  )
}

// Export function to search people
export async function searchPeople(query: string): Promise<Person[]> {
  const lowerQuery = query.toLowerCase()

  return Promise.resolve(
    peopleData.filter(
      (person) =>
        person.name.toLowerCase().includes(lowerQuery) ||
        person.influence.toLowerCase().includes(lowerQuery) ||
        person.industry.toLowerCase().includes(lowerQuery) ||
        person.city.toLowerCase().includes(lowerQuery) ||
        person.country.toLowerCase().includes(lowerQuery)
    )
  )
}