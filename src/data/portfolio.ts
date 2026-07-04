// ============================================================
// SUKHMANI — PORTFOLIO CONTENT
// Single source of truth for all site copy & media.
// ============================================================

export const profile = {
  name: 'Sukhmani',
  title: 'Associate Vice President – Marketing',
  email: 'sukhmanibaghla@outlook.com',
  phone: '+91 9910853014',
  linkedin: 'https://www.linkedin.com/in/sukhmani-baghla/',
  location: 'Gurugram, India',
  relocating: 'Relocating to Sydney, Australia · Aug 2026',
  tagline: 'Turning Stories into Businesses',
  statusBadge: 'Open to opportunities in Australia, from Aug 2026',
  specialisms: ['ORM', 'Branding', 'Social Media', 'Integrated Campaigns'],
}

export const stats = [
  { value: '9+', label: 'Years of Experience' },
  { value: '5', label: 'Global Markets' },
  { value: 'MBA', label: 'University of Wollongong' },
  { value: '3', label: 'Languages' },
]

export const bio = {
  paragraphs: [
    'Senior marketing leader with 9 years of experience spanning India and the Middle East. Led integrated campaigns that drive visibility, generate leads, and build lasting customer relationships.',
    "Currently pursuing an MBA Advanced at the University of Wollongong's Sydney Campus to deepen strategic business acumen and bring global marketing expertise to the Australian market.",
  ],
  pullQuote:
    "Marketing isn't about shouting louder — it's about saying the right thing, to the right person, at the right moment.",
}

export const education = [
  {
    degree: 'MBA Advanced',
    institution: 'University of Wollongong',
    location: 'Sydney Campus, Australia',
    period: '2025 – Present',
    note: 'Starting Aug 2026 · Student Visa (Subclass 500)',
    highlighted: true,
  },
  {
    degree: 'Master of Arts – English',
    institution: 'Panjab University',
    location: 'Chandigarh, India',
    period: '2015 – 2017',
    highlighted: false,
  },
  {
    degree: 'Bachelor of Arts (Hons) – English',
    institution: 'University of Delhi',
    location: 'India',
    period: '2012 – 2015',
    highlighted: false,
  },
]

export const experience = [
  {
    role: 'Associate Vice President – Marketing',
    company: 'Square Yards',
    location: 'Gurugram, India',
    period: 'May 2025 – Present',
    tag: 'Current',
    teams: ['ORM', 'Branding', 'Social Media'],
    points: [
      'Led three specialised teams — ORM, Branding, and Social Media — driving a unified brand voice across digital and offline channels.',
      'Directed end-to-end brand and content strategy across multiple markets, integrating digital, OOH, influencer, and event-driven campaigns into cohesive, high-impact programmes.',
      'Conceptualised and hosted a branded podcast, building thought leadership and extending audience engagement beyond traditional marketing channels.',
      'Partnered with agencies and vendors to deliver campaigns aligned with brand strategy, ensuring consistency and quality across all touchpoints.',
      'Collaborated with Sales and CRM teams to align marketing activity with lead conversion and customer acquisition outcomes.',
      'Drove data-led performance improvement through campaign reporting, dashboards, and ROI analysis.',
    ],
  },
  {
    role: 'Associate General Manager – Marketing',
    company: 'Square Yards',
    location: 'Gurugram, India',
    period: 'Feb 2020 – Apr 2025',
    tag: '5 Years',
    teams: [],
    points: [
      'Directed integrated marketing campaigns across India and the Middle East, managing multi-channel budgets and cross-functional teams to deliver against growth targets.',
      'Built brand visibility and recall in competitive markets through targeted regional initiatives and consistent brand governance.',
      'Managed agency and vendor ecosystems, ensuring cost-effective, on-brand execution of advertising and promotional activity.',
      'Delivered actionable competitive and consumer intelligence that directly shaped marketing strategy and messaging frameworks.',
      'Aligned marketing planning with Sales, CRM, and Planning stakeholders to ensure campaigns drove measurable pipeline contribution.',
    ],
  },
  {
    role: 'Process Specialist – Digital Marketing',
    company: 'Cognizant Technology Solutions',
    location: 'Gurugram, India · On-site: Google AdWords',
    period: 'Jul 2017 – Jan 2020',
    tag: '2.5 Years',
    teams: [],
    points: [
      'Delivered tailored digital marketing solutions for global clients, maintaining high standards of campaign performance and client satisfaction.',
      'Led training and quality assurance for digital content teams, lifting capability and output consistency across the group.',
      'Developed hands-on expertise across digital advertising platforms, content optimisation, and client-facing campaign strategy.',
    ],
  },
]

export const skills = [
  'Brand Strategy',
  'Integrated Campaigns',
  'SEO / SEM',
  'Social Media',
  'OOH & Events',
  'Influencer Marketing',
  'Market Research',
  'Lead Generation',
  'Content Strategy',
  'Agency Management',
  'Campaign ROI',
  'MIS Reporting',
  'Podcast Production',
  'C-Suite Collaboration',
]

// --- Media grid (personal reels) ---
export const mediaReels = [
  { type: 'youtube' as const, id: 'Tr-0REgn62k', title: 'Brand Campaign Showreel' },
  { type: 'youtube' as const, id: 'iSle_QKhovo', title: 'Campaign Highlights' },
  { type: 'youtube' as const, id: 'MPi2jnUAnuA', title: 'Marketing Series' },
  { type: 'instagram' as const, url: 'https://www.instagram.com/reel/DO5a3ynEnl6/', title: 'Instagram — ORM' },
  { type: 'instagram' as const, url: 'https://www.instagram.com/reel/DQyTj4QkpB3/', title: 'Instagram — Branding' },
  { type: 'instagram' as const, url: 'https://www.instagram.com/reel/DTzmsPziCFH/', title: 'Instagram — Social' },
]

// --- Campaign index (used by nav dropdown + campaign cards) ---
// `accent` is a hex color that themes each campaign's bespoke page.
export const campaignIndex = [
  {
    slug: 'ooh-campaign',
    title: 'OOH Campaign',
    kicker: 'Billboard · DOOH',
    blurb: 'Bold, unconventional outdoor campaign that cut through a hyper-competitive housing market.',
    period: '2021–2022',
    accent: '#F5C518', // billboard amber
  },
  {
    slug: 'parking-ticket',
    title: 'Find The Right Space For You',
    kicker: 'Guerrilla · Hyperlocal',
    blurb: 'Branded mock parking tickets turned everyday frustration into a citywide conversation.',
    period: 'May 2026',
    accent: '#FF7A1A', // citation orange
  },
  {
    slug: 'mothers-day',
    title: "Mother's Day",
    kicker: 'Social-first · UGC',
    blurb: 'A heartfelt campaign about gifting a first home to your mother, powered by employee voices.',
    period: 'Social',
    accent: '#FF6F91', // warm rose
  },
  {
    slug: 'raasta-royal',
    title: 'Raasta bhi Royal',
    kicker: 'Brand Film',
    blurb: 'Making the road to owning a home feel as grand as the destination itself.',
    period: 'Film',
    accent: '#E7C873', // royal gold
  },
]

// ============================================================
// CAMPAIGN DETAIL DATA
// ============================================================

export const oohCampaign = {
  slug: 'ooh-campaign',
  name: 'OOH Campaign',
  type: 'Billboard · DOOH (Digital Out-of-Home)',
  brand: 'Square Yards',
  period: '2021–2022',
  theme:
    'Bold, unconventional outdoor campaign using double-entendre humour and high-visibility placements to cut through a hyper-competitive housing market.',
  tags: ['Brand Awareness', 'OOH & DOOH', 'Integrated Campaign'],
  images: [
    { url: 'https://lalitbhardwaj.in/img/portfolio/ooh/banner_design.jpg', caption: 'OOH Banner Design — Square Yards' },
    { url: 'https://lalitbhardwaj.in/img/portfolio/ooh/img.09.jpg', caption: 'Campaign Execution' },
    { url: 'https://lalitbhardwaj.in/img/portfolio/ooh/img.03.jpg', caption: 'Billboard Creative' },
    { url: 'https://lalitbhardwaj.in/img/portfolio/ooh/img.08.gif', caption: 'Dynamic DOOH Animation' },
    { url: 'https://lalitbhardwaj.in/img/portfolio/ooh/img.10.jpg', caption: 'High-Traffic Placement' },
    { url: 'https://lalitbhardwaj.in/img/portfolio/ooh/traffic.01.jpg', caption: 'Threesome on your bucket list? — Double Meaning Humour' },
    { url: 'https://lalitbhardwaj.in/img/portfolio/ooh/traffic.02.jpg', caption: 'Theka kitni dur hai? — Traffic & Engagement' },
    { url: 'https://lalitbhardwaj.in/img/portfolio/ooh/traffic.03.jpg', caption: 'Size Does Matter — Inappropriate Humour' },
    { url: 'https://lalitbhardwaj.in/img/portfolio/ooh/traffic.04.jpg', caption: 'Can we take your wife on a date? — Cringe Content' },
    { url: 'https://lalitbhardwaj.in/img/portfolio/ooh/social.media.jpg', caption: 'Social Media Campaign Extension' },
    { url: 'https://lalitbhardwaj.in/img/portfolio/ooh/social.media.gif', caption: 'Social Media Animation' },
  ],
}

export const parkingTicket = {
  slug: 'parking-ticket',
  officialName: 'Find The Right Space For You',
  brand: 'Square Yards',
  type: 'Guerrilla / Hyperlocal activation',
  dates: 'May 27–29, 2026',
  cities: ['Delhi-NCR', 'Mumbai', 'Bengaluru'],
  executedBy: 'Natter Digital Solutions',
  stats: [
    { value: '3,00,000+', label: 'Consumer Interactions' },
    { value: '3', label: 'Cities Activated' },
    { value: '3 Days', label: 'Activation Window' },
    { value: 'May 2026', label: 'Campaign Month' },
  ],
  description:
    'Hyperlocal brand activation placing branded mock parking tickets across high-footfall locations in three cities — turning the everyday frustration of finding parking into a citywide conversation about shrinking urban space. Paired with creator-led digital storytelling. Generated over 3,00,000 consumer interactions across on-ground and digital platforms.',
  videoId: 'q2s19vlX0UA',
  press: [
    {
      tag: 'Campaign Coverage',
      outlet: 'Impact On Net',
      url: 'https://www.impactonnet.com/more-from-impact/square-yards-new-campaign-turns-parking-frustration-into-a-conversation-on-urban-space-14840.html',
      title:
        "Square Yards' New Campaign Turns Parking Frustration into a Conversation on Urban Space",
    },
    {
      tag: 'Media & Marketing',
      outlet: 'MediaBrief',
      url: 'https://mediabrief.com/square-yards-drops-mock-parking-tickets/',
      title:
        'Square Yards Drops Mock Parking Tickets to Spark Urban Space Constraints Dialogue',
    },
    {
      tag: 'Advertising',
      outlet: 'AdGully',
      url: 'https://www.adgully.com/post/16812/square-yards-sparks-urban-space-conversation-with-parking-campaign',
      title:
        'Square Yards Sparks Urban Space Conversation with Parking Campaign',
    },
  ],
  quotes: [
    {
      name: 'Tanuj Shori',
      role: 'Founder & CEO, Square Yards',
      quote:
        'Space has become one of the most defining challenges of urban living. Whether it is housing, parking, or movement within cities, people are constantly adapting to constraints. With this campaign, we wanted to reflect that lived reality in a way that is immediate, relatable, and grounded in everyday experience.',
    },
    {
      name: 'Divya Krishnan',
      role: 'Head of Marketing, Square Yards',
      quote:
        'Space constraints are something urban consumers encounter every day, whether at home, on the road or in public spaces. We wanted to create a campaign that felt immediate, relatable and capable of starting meaningful conversations.',
    },
  ],
}

export const mothersDay = {
  slug: 'mothers-day',
  brand: 'Square Yards',
  type: 'Social-first · LinkedIn Employee Advocacy · UGC',
  theme: 'Gifting a first home to your mother',
  hashtags: ['#SquareYards', '#MothersDay', '#FirstHome'],
  description:
    'A heartfelt social-first campaign celebrating the idea of gifting a first home to your mother — activating employee voices across LinkedIn and driving organic brand love for Square Yards through the #FirstHome narrative. The campaign activated 6 employee voices across LinkedIn, generating organic reach through authentic, personal posts.',
  videoId: 'iSle_QKhovo',
  posts: [
    { name: 'Sonali Singh', handle: '@sonalisingh2274', url: 'https://www.linkedin.com/posts/sonalisingh2274_squareyards-mothersday-firsthome-ugcPost-7459175169996279809-O4cB' },
    { name: 'Kartik Rai', handle: '@kartik-raii', url: 'https://www.linkedin.com/posts/kartik-raii_squareyards-mothersday-firsthome-ugcPost-7459086750552989696-eueS' },
    { name: 'Unnati Mishra', handle: '@unnatimishra07', url: 'https://www.linkedin.com/posts/unnatimishra07_mothersday-squareyards-home-ugcPost-7459451845195902976-63zG' },
    { name: 'Barsha Rani', handle: '@barsharani', url: 'https://www.linkedin.com/posts/barsharani_squareyards-mothersday-firsthome-ugcPost-7459492731829002240-smQq' },
    { name: 'Gagan Yadav', handle: '@gaganyadavs', url: 'https://www.linkedin.com/posts/gaganyadavs_squareyards-mothersday-firsthome-activity-7459507858905370624-d7R0' },
    { name: 'Pratishtha Agrawal', handle: '@pratishthaagrawal', url: 'https://www.linkedin.com/posts/pratishthaagrawal_campaigns-squareyards-mothersday-ugcPost-7459231162033520640-06SC' },
  ],
}

export const raastaRoyal = {
  slug: 'raasta-royal',
  name: 'Raasta bhi Royal',
  brand: 'Square Yards',
  type: 'Brand Film · Integrated Campaign',
  theme: 'Aspiration & home ownership — "every road to home deserves to feel royal"',
  format: 'Video · Social · Digital',
  description:
    "A brand film celebrating the aspiration behind every homebuyer's journey — making the road to owning a home feel as grand as the destination itself.",
  videoId: 'MPi2jnUAnuA',
  videoStart: 3,
  filmQuote: 'Every road to home deserves to feel royal.',
  brief: [
    { label: 'Campaign Type', value: 'Brand Film / Integrated' },
    { label: 'Brand', value: 'Square Yards' },
    { label: 'Theme', value: 'Aspiration & Home Ownership' },
    { label: 'Format', value: 'Video · Social · Digital' },
  ],
  reelSlots: ['Behind the Scenes', 'Campaign Cut 2', 'Campaign Cut 3'],
  // Media coverage. Seeded with the one publicly-verifiable reference —
  // add real article URLs here as they publish.
  press: [
    {
      tag: 'LinkedIn',
      outlet: 'Square Yards',
      url: 'https://www.linkedin.com/posts/sakshi-joshi-3982a6246_rasta-bhi-royal-by-square-yards-csr-initiative-activity-7433137748926033922-JgSu',
      title: "‘Raasta bhi Royal’ — Square Yards’ brand initiative featured across social.",
    },
  ] as { tag: string; outlet: string; url: string; title: string }[],
}

// Ambient background videos (abstract) used for premium hero / section texture.
export const ambientVideos = {
  hero: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_074625_a81f018a-956b-43fb-9aee-4d1508e30e6a.mp4',
  featured:
    'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260402_054547_9875cfc5-155a-4229-8ec8-b7ba7125cbf8.mp4',
  philosophy:
    'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260307_083826_e938b29f-a43a-41ec-a153-3d4730578ab8.mp4',
  service1:
    'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4',
  service2:
    'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260324_151826_c7218672-6e92-402c-9e45-f1e0f454bdc4.mp4',
}

// ============================================================
// HOMEPAGE NARRATIVE SECTIONS
// (Featured Video · Strategy × Story · What I Do)
// ============================================================

export const featured = {
  video: ambientVideos.featured,
  label: 'My Approach',
  body: "Every brand has a story worth telling. I start with the audience, find the human truth, and turn it into integrated campaigns that build visibility, generate leads, and earn relationships that last.",
  cta: 'Explore the work',
}

export const philosophy = {
  video: ambientVideos.philosophy,
  headingA: 'Strategy',
  headingB: 'Story',
  blocks: [
    {
      label: 'Where it begins',
      body: 'Every meaningful breakthrough begins at the intersection of disciplined strategy and remarkable creative vision. I operate at that crossroads — turning bold thinking into campaigns that move people and reshape how brands are seen.',
    },
    {
      label: 'What it becomes',
      body: 'The best work emerges when curiosity meets conviction. My process is built to uncover hidden opportunities and translate them into brand experiences that resonate long after the first impression.',
    },
  ],
}

export const services = [
  {
    video: ambientVideos.service1,
    tag: 'Strategy',
    title: 'Brand & Content Strategy',
    desc: 'A unified brand voice across digital and offline — from positioning and messaging frameworks to thought leadership, branded podcasts, and always-on content.',
  },
  {
    video: ambientVideos.service2,
    tag: 'Craft',
    title: 'Integrated Campaigns',
    desc: 'End-to-end campaigns spanning digital, OOH, influencer, and events — conceived, executed, and measured against real pipeline and growth targets.',
  },
]

// Selected-work highlights for the homepage masonry (real campaign visuals).
export const selectedWork = [
  { url: 'https://lalitbhardwaj.in/img/portfolio/ooh/banner_design.jpg', caption: 'OOH · Square Yards Billboard', slug: 'ooh-campaign' },
  { url: 'https://lalitbhardwaj.in/img/portfolio/ooh/traffic.01.jpg', caption: 'OOH · Double-Meaning Humour', slug: 'ooh-campaign' },
  { url: 'https://lalitbhardwaj.in/img/portfolio/ooh/img.03.jpg', caption: 'OOH · Billboard Creative', slug: 'ooh-campaign' },
  { url: 'https://lalitbhardwaj.in/img/portfolio/ooh/traffic.03.jpg', caption: 'OOH · Size Does Matter', slug: 'ooh-campaign' },
  { url: 'https://lalitbhardwaj.in/img/portfolio/ooh/img.10.jpg', caption: 'OOH · High-Traffic Placement', slug: 'ooh-campaign' },
  { url: 'https://lalitbhardwaj.in/img/portfolio/ooh/social.media.jpg', caption: 'Social · Campaign Extension', slug: 'ooh-campaign' },
  { url: 'https://lalitbhardwaj.in/img/portfolio/ooh/img.09.jpg', caption: 'OOH · Campaign Execution', slug: 'ooh-campaign' },
  { url: 'https://lalitbhardwaj.in/img/portfolio/ooh/traffic.04.jpg', caption: 'OOH · Cheeky Copy', slug: 'ooh-campaign' },
]

