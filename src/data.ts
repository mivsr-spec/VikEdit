import { CaseStudy, ServiceItem, TeamMember, FaqItem, BlogItem } from "./types";

export const BRAND_NAME = "VikEdit";

export const LOGO_SVG = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 animate-spin-slow">
    <path d="M12 2v20M2 12h20M5 5l14 14M19 5L5 19" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
  </svg>
`;

export const MARQUEE_BRANDS = [
  "KAY Rated",
  "ShivomJewellers",
  "Charging Point Hindi",
  "Corprest Consultancy",
  "Round1MMA",
  "YaroMedia",
  "NkFitness",
  "KAY Rated",
  "ShivomJewellers",
  "Charging Point Hindi",
  "Corprest Consultancy",
  "Round1MMA",
  "YaroMedia",
  "NkFitness"
];

export const SERVICE_ITEMS: ServiceItem[] = [
  {
    id: "services-1",
    title: "Foundation",
    description: "Short-form editing and strategic clipping. Delivers a predictable, manageable monthly cadence for market entry.",
    iconType: "short"
  },
  {
    id: "services-2",
    title: "Acceleration",
    description: "Long-form production with systematic repurposing. Structured monthly oversight for cross-platform momentum.",
    iconType: "social"
  },
  {
    id: "services-3",
    title: "Content Engine",
    description: "Full-spectrum repurposing, proactive planning, and automated workflow for sustained brand presence.",
    iconType: "paid"
  }
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: "cs-1",
    category: "DOCUMENTED OUTPUT",
    title: "From single recording to fourteen ",
    italicWord: "assets",
    description: "We transformed raw footage into high-retention clips, optimizing hooks, pacing, and platform formatting for maximum reach.",
    metrics: [
      { value: "14", label: "ASSETS GENERATED", sublabel: "" },
      { value: "3X", label: "PUBLISHING FREQUENCY", sublabel: "" }
    ],
    imageUrl: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=80&w=600&auto=format&fit=crop",
    overlayText: "Coaching Firm"
  },
  {
    id: "cs-2",
    category: "DOCUMENTED OUTPUT",
    title: "Podcast to multi-platform ",
    italicWord: "pipeline",
    description: "A single long-form interview was systematically segmented into Shorts, Reels, LinkedIn clips, and promotional assets.",
    metrics: [
      { value: "8", label: "HOURS SAVED PER MONTH", sublabel: "" },
      { value: "95%", label: "ON-TIME DELIVERY RATE", sublabel: "" }
    ],
    imageUrl: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=600&auto=format&fit=crop",
    overlayText: "Industry Podcast"
  }
];

export const TESTIMONIALS = {
  quote: "VikEdit transformed our workflow. We record once, and they handle everything else. Consistency, quality, and professional delivery without operational overhead.",
  author: "Founder, B2B SaaS",
  role: "CONTENT OPERATIONS PARTNER",
  imageUrl: "https://images.unsplash.com/photo-1608248597481-496100c80836?q=80&w=600&auto=format&fit=crop",
  overlayText: "B2B SaaS"
};

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: "tm-1",
    name: "Aarav Shah",
    role: "HEAD OF CONTENT OPERATIONS",
    photoUrl: "https://images2.imgbox.com/6f/2c/qRz938yx_o.png"
  },
  {
    id: "tm-2",
    name: "Vikram S. Rawat",
    role: "FOUNDER & STRATEGIC DIRECTOR",
    photoUrl: "https://images2.imgbox.com/72/03/fGxyDfHy_o.jpg"
  },
  {
    id: "tm-3",
    name: "Neha Jain",
    role: "CLIENT SUCCESS & WORKFLOW MANAGER",
    photoUrl: "https://images2.imgbox.com/c1/b9/cH2r7MzG_o.png"
  }
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: "faq-1",
    question: "What type of creators do you serve?",
    answer: "We partner with coaches, consultants, founders, and expert-led brands who produce knowledge-driven content."
  },
  {
    id: "faq-2",
    question: "Do you deliver files or handle posting?",
    answer: "We deliver fully optimized, publication-ready assets. Upload and scheduling remain client-controlled."
  },
  {
    id: "faq-3",
    question: "What is your typical turnaround?",
    answer: "48–72 hours for standard cycles. Rush delivery available for premium tiers."
  },
  {
    id: "faq-4",
    question: "How does pricing work?",
    answer: "Structured monthly retainers aligned with output volume, platform count, and strategic planning."
  },
  {
    id: "faq-5",
    question: "Do you work with beginners?",
    answer: "We partner with established creators who already produce content but need scalable, consistent post-production."
  }
];

export const BLOG_ITEMS: BlogItem[] = [
  {
    id: "blog-1",
    category: "OPERATIONS",
    title: "The Content Multiplication Framework",
    description: "How one recording session fuels three weeks of cross-platform publishing without operational burnout.",
    imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=500&auto=format&fit=crop",
    date: "MAY 2024"
  },
  {
    id: "blog-2",
    category: "STRATEGY",
    title: "Why Retention Fails Without Workflow",
    description: "The structural gap between raw footage and consistent output, and how systematization fixes it.",
    imageUrl: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=500&auto=format&fit=crop",
    date: "APRIL 2024"
  }
];

export const HERO_CAROUSEL_IMAGES = [
  "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=500&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=500&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?q=80&w=500&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1617897903246-719242758050?q=80&w=500&auto=format&fit=crop"
];
