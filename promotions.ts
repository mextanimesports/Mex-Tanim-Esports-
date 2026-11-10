/**
 * MEX TANIM OFFICIAL PROMOTION — CENTRALIZED PROMOTION CONFIGURATION & DATA
 * Editable by administration or via the built-in Admin Settings Manager
 */

export interface PromotionPackage {
  id: number;
  number: string;
  name: string;
  price: number;
  videos: number;
  bioLinkDays: number;
  badge?: string;
  highlight?: boolean;
  benefits: string[];
}

export interface PromotionService {
  id: string;
  title: string;
  description: string;
  iconName: string;
  category: string;
}

export interface CalendarMonthSchedule {
  year: number;
  month: number; // 0-indexed: 10 = Nov, 11 = Dec
  monthName: string;
  availableDates: number[];
  bookedDates: number[];
  allOpen?: boolean;
  note?: string;
}

export interface AdminContact {
  role: string;
  name: string;
  phones: string[];
  timing?: string;
  facebookUrl?: string;
  notes?: string;
}

export interface SocialLink {
  platform: string;
  title: string;
  url: string;
  icon: string;
  badge?: string;
  description: string;
}

export interface FAQItem {
  id: number;
  question: string;
  answer: string;
  category: 'booking' | 'pricing' | 'reach' | 'payment' | 'delivery';
}

export const BRAND_CONFIG = {
  brandName: "MEX TANIM OFFICIAL PROMOTION",
  organization: "MEX TANIM ESPORTS ORGANISATION",
  founderAndOwner: "Mex Tanim Gaming",
  tikTokName: "Mex Tanim Official Promotion",
  primaryWhatsApp: "01671961399",
  primaryWhatsAppInternational: "8801671961399",
  slogan: "BUILDING COMMUNITIES. PROMOTING ESPORTS. SUPPORTING CHAMPIONS.",
  logoUrl: "/assets/aistudio/IMG_1208_bc57f6ee.PNG",
  heroArenaImage: "/src/assets/images/hero_esports_arena_1794291860703.jpg",
  productionStudioImage: "/src/assets/images/esports_production_studio_1794291860686.jpg",
  tagline: "YOUR ESPORTS GROWTH STARTS HERE.",
  description: "Professional Free Fire Tournament, Esports Organization, WhatsApp Group, WhatsApp Channel and Tournament App Promotion Services.",
};

export const PROMOTION_SERVICES: PromotionService[] = [
  {
    id: "ff-group",
    title: "Free Fire Tournament Group Promotion",
    description: "Targeted promotional spotlight designed for Free Fire community tournament groups, scrims, and room registrations to drive active competitive players.",
    iconName: "Trophy",
    category: "Tournament Community"
  },
  {
    id: "app-promotion",
    title: "Tournament App Promotion",
    description: "Dedicated mobile app showcase and user onboarding campaigns to skyrocket downloads, player sign-ups, and daily active tournament participants.",
    iconName: "Smartphone",
    category: "Digital Products"
  },
  {
    id: "wa-group",
    title: "WhatsApp Group Promotion",
    description: "Direct community expansion campaigns directing verified, passionate gaming members into your WhatsApp organization and tournament hub.",
    iconName: "Users",
    category: "Community Growth"
  },
  {
    id: "wa-channel",
    title: "WhatsApp Channel Promotion",
    description: "Grow your official broadcast channel follower base with high-retention esports enthusiasts for immediate tournament news & schedule updates.",
    iconName: "Radio",
    category: "Broadcast & Reach"
  },
  {
    id: "org-promotion",
    title: "Esports Organization Promotion",
    description: "Full-scale brand positioning, team identity spotlight, and clan recruitment visibility across high-authority esports channels.",
    iconName: "Shield",
    category: "Brand Authority"
  },
  {
    id: "gaming-community",
    title: "Gaming Community Promotion",
    description: "High-impact exposure across passionate South Asian gaming audiences to turn your discord, guild, or gaming network into a thriving ecosystem.",
    iconName: "Flame",
    category: "Ecosystem"
  }
];

export const INITIAL_PACKAGES: PromotionPackage[] = [
  {
    id: 1,
    number: "PACKAGE 01",
    name: "STARTER",
    price: 1000,
    videos: 1,
    bioLinkDays: 1,
    benefits: [
      "Best Quality Promotion"
    ]
  },
  {
    id: 2,
    number: "PACKAGE 02",
    name: "BASIC",
    price: 1500,
    videos: 2,
    bioLinkDays: 2,
    benefits: [
      "Best Quality Promotion",
      "Admin Support"
    ]
  },
  {
    id: 3,
    number: "PACKAGE 03",
    name: "ADVANCED",
    price: 2000,
    videos: 3,
    bioLinkDays: 3,
    benefits: [
      "Best Quality Promotion",
      "Mex Tanim Gaming Personal Support"
    ]
  },
  {
    id: 4,
    number: "PACKAGE 04",
    name: "PROFESSIONAL",
    price: 2500,
    videos: 4,
    bioLinkDays: 4,
    benefits: [
      "Best Quality Promotion",
      "Mex Tanim Gaming Personal Support",
      "Tournament Support"
    ]
  },
  {
    id: 5,
    number: "PACKAGE 05",
    name: "PREMIUM",
    price: 3000,
    videos: 5,
    bioLinkDays: 5,
    badge: "BEST VALUE",
    highlight: true,
    benefits: [
      "Best Quality Promotion",
      "Mex Tanim Gaming Personal Support",
      "Tournament Support",
      "Organization Idea Sharing"
    ]
  },
  {
    id: 6,
    number: "PACKAGE 06",
    name: "ELITE",
    price: 3500,
    videos: 6,
    bioLinkDays: 6,
    benefits: [
      "Best Quality Promotion",
      "Mex Tanim Gaming Personal Support",
      "Tournament Support",
      "Organization Idea Sharing",
      "Best Views Promotion"
    ]
  },
  {
    id: 7,
    number: "PACKAGE 07",
    name: "MASTER",
    price: 4000,
    videos: 7,
    bioLinkDays: 7,
    benefits: [
      "Best Quality Promotion",
      "Mex Tanim Gaming Personal Support",
      "Tournament Support",
      "Organization Idea Sharing",
      "Best Views Promotion",
      "T1 Teams Support"
    ]
  },
  {
    id: 8,
    number: "PACKAGE 08",
    name: "ULTRA",
    price: 4500,
    videos: 8,
    bioLinkDays: 8,
    benefits: [
      "Best Quality Promotion",
      "Mex Tanim Gaming Personal Support",
      "Tournament Support",
      "Organization Idea Sharing",
      "Best Views Promotion",
      "T1 Teams Support",
      "V Badge Team Support"
    ]
  },
  {
    id: 9,
    number: "PACKAGE 09",
    name: "LEGEND",
    price: 4700,
    videos: 9,
    bioLinkDays: 9,
    benefits: [
      "Best Quality Promotion",
      "Mex Tanim Gaming Personal Support",
      "Tournament Support",
      "Organization Idea Sharing",
      "Best Views Promotion",
      "T1 Teams Support",
      "V Badge Team Support",
      "Pro Badge Team Support"
    ]
  },
  {
    id: 10,
    number: "PACKAGE 10",
    name: "ULTIMATE",
    price: 5000,
    videos: 10,
    bioLinkDays: 10,
    badge: "MOST EXCLUSIVE",
    highlight: true,
    benefits: [
      "Best Quality Promotion",
      "Mex Tanim Gaming Personal Support",
      "Tournament Support",
      "Organization Idea Sharing",
      "Best Views Promotion",
      "T1 Teams Support",
      "V Badge Team Support",
      "Pro Badge Team Support",
      "SG Server Drone Support",
      "Permanent Support By Mex Tanim Esports Organisation"
    ]
  }
];

export const REACH_DATA = {
  tier1: {
    viewsLabel: "Under 10,000 Views",
    potentialMembers: "200 – 300 Members",
    duration: "within 1 day",
    isGuaranteed: false,
  },
  tier2: {
    viewsLabel: "Around 20,000 Views or Below",
    potentialMembers: "500 – 1,000 Members",
    duration: "within 1 day",
    isGuaranteed: false,
  },
  disclaimer: "All views and member joining estimates are approximate. Actual results depend on audience interest, content engagement, timing and other factors. No guaranteed member count."
};

export const INITIAL_SCHEDULES: CalendarMonthSchedule[] = [
  {
    year: 2026,
    month: 10, // November (0-indexed)
    monthName: "November 2026",
    availableDates: [12, 19, 26],
    bookedDates: [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11,
      13, 14, 15, 16, 17, 18,
      20, 21, 22, 23, 24, 25,
      27, 28, 29, 30
    ],
    note: "High Demand Notice: Only 3 exclusive dates remaining for November."
  },
  {
    year: 2026,
    month: 11, // December (0-indexed)
    monthName: "December 2026",
    availableDates: Array.from({ length: 31 }, (_, i) => i + 1),
    bookedDates: [],
    allOpen: true,
    note: "DECEMBER PROMOTION BOOKINGS ARE NOW OPEN! Reserve your tournament dates early."
  },
  {
    year: 2027,
    month: 0, // January 2027
    monthName: "January 2027",
    availableDates: Array.from({ length: 31 }, (_, i) => i + 1),
    bookedDates: [],
    allOpen: true,
    note: "New Year 2027 Championship schedule open for pre-registration."
  }
];

export const BOOKING_STEPS = [
  {
    step: "STEP 01",
    title: "SELECT PACKAGE",
    desc: "Choose your preferred promotion package based on your tournament scale, budget, and desired reach."
  },
  {
    step: "STEP 02",
    title: "SELECT DATE",
    desc: "Choose an open promotional release slot from our live interactive booking calendar."
  },
  {
    step: "STEP 03",
    title: "COMPLETE PAYMENT",
    desc: "Full advance payment is required via bKash, Nagad, or Rocket before official schedule confirmation."
  },
  {
    step: "STEP 04",
    title: "JOIN PROMOTION GROUP",
    desc: "Once payment is verified, you are immediately welcomed into our private official promotion coordination group."
  },
  {
    step: "STEP 05",
    title: "SUBMIT INFORMATION",
    desc: "Provide Organization Logo, Tournament Details, Tournament Types, and Group Link. Extra verification handled privately."
  },
  {
    step: "STEP 06",
    title: "VIDEO PROMOTION",
    desc: "Our production team produces and publishes high-impact promotional videos within 2–3 days following asset approval."
  }
];

export const PAYMENT_CONFIG = {
  methods: ["bKash (Personal / Send Money)", "Nagad (Personal / Send Money)", "Rocket (Personal / Send Money)"],
  numbers: [
    { number: "01611657757", name: "Official Payment Account 1" },
    { number: "01671961399", name: "Official Payment Account 2 (Primary WhatsApp)" }
  ],
  policy: "Full advance payment is required to confirm a promotion booking.",
  instructions: [
    "Choose either bKash, Nagad, or Rocket on your mobile banking app.",
    "Send the exact package amount via 'Send Money' to one of our official numbers above.",
    "Copy the Transaction ID (TrxID) and take a clean screenshot of the successful payment screen.",
    "Click 'Confirm Payment on WhatsApp' to forward your TrxID, sender number, and selected package."
  ]
};

export const ADMIN_TEAMS: {
  daytime: AdminContact[];
  night: AdminContact[];
  management: AdminContact[];
  hosts: AdminContact[];
} = {
  daytime: [
    {
      role: "Daytime Booking Support",
      name: "Admin Hasib 1",
      phones: ["01619067380"],
      timing: "10:00 AM – 8:00 PM",
      facebookUrl: "https://www.facebook.com/share/18nrKcbMtk/"
    },
    {
      role: "Daytime Booking Support",
      name: "Admin Hasib 2",
      phones: ["01979079265"],
      timing: "10:00 AM – 8:00 PM",
      facebookUrl: "https://www.facebook.com/share/18nrKcbMtk/"
    },
    {
      role: "Daytime Booking Support",
      name: "Admin Ontor",
      phones: ["01971432909"],
      timing: "10:00 AM – 8:00 PM"
    }
  ],
  night: [
    {
      role: "Night Booking Support",
      name: "Admin Sifat",
      phones: ["01353577538", "01405209541"],
      timing: "8:00 PM – Throughout the Night"
    },
    {
      role: "Night Booking Support",
      name: "Admin Shawon",
      phones: ["01767649373"],
      timing: "8:00 PM – Throughout the Night"
    },
    {
      role: "Slot Booking Night",
      name: "Admin Maruf",
      phones: ["01616789735"],
      timing: "8:00 PM – 1:00 AM",
      facebookUrl: "https://www.facebook.com/share/1JL2udeTg8/"
    }
  ],
  management: [
    {
      role: "Management Head",
      name: "Hasib",
      phones: ["01619067380", "01979079265"],
      facebookUrl: "https://www.facebook.com/share/18nrKcbMtk/"
    },
    {
      role: "Management & Problem Support",
      name: "Admin Forhad",
      phones: ["01611657757", "01671961399"],
      notes: "Primary WhatsApp Promotion Contact"
    }
  ],
  hosts: [
    {
      role: "Room Host (CR)",
      name: "Mushfiq",
      phones: ["01703867108"],
      notes: "3 PM V Badge | 7 PM Mini | 11 PM Big",
      facebookUrl: "https://www.facebook.com/share/1HW63ajJVM/"
    },
    {
      role: "Room Host & Point Taker",
      name: "Khaled & Raza",
      phones: ["01348276585", "01603188306", "01336328463"],
      notes: "3 PM Mini | 11 PM Mini (Khaled Host / Raza PT)",
      facebookUrl: "https://www.facebook.com/share/19cwkdFFYE/"
    },
    {
      role: "Scrim Host",
      name: "Tawfa",
      phones: ["01761214455"],
      notes: "4 PM, 5 PM, 8 PM, 9 PM, 10 PM, 11 PM, 12 AM, 1 AM",
      facebookUrl: "https://www.facebook.com/share/19rjsVhrWu/"
    },
    {
      role: "Point Maker",
      name: "Zisan",
      phones: ["01835670641"],
      notes: "4 PM, 5 PM, 8 PM, 9 PM, 10 PM, 11 PM, 12 AM, 1 AM",
      facebookUrl: "https://www.facebook.com/share/1LPJebKDMk/"
    },
    {
      role: "Qualify Room Host",
      name: "Khaled",
      phones: ["01348276585"],
      notes: "7 PM, 8 PM, 9 PM"
    }
  ]
};

export const SOCIAL_LINKS: SocialLink[] = [
  {
    platform: "WhatsApp Channel",
    title: "Official Organization WhatsApp Channel",
    url: "https://whatsapp.com/channel/0029Vb6F0j54Y9lssQHIcv0s",
    icon: "MessageSquare",
    badge: "Official Channel",
    description: "Get real-time updates on Free Fire tournaments, exclusive promotions, and clan news."
  },
  {
    platform: "TikTok",
    title: "Mex Tanim Official Promotion",
    url: "https://www.tiktok.com/@mextanimgaming?_r=1&_t=ZS-9AZT1zlT6FV",
    icon: "Video",
    badge: "Main Promotion Platform",
    description: "High-engagement viral esports promotional videos featuring tournament bio links."
  },
  {
    platform: "Gaming Gadgets",
    title: "Mex Tanim Gaming Gadgets",
    url: "https://mcx-tanim.firebaseapp.com/",
    icon: "ShoppingBag",
    badge: "Official Store",
    description: "Premium gaming gear, esports accessories, and verified gamer apparel."
  },
  {
    platform: "YouTube",
    title: "Mex Tanim Esports YouTube",
    url: "https://youtube.com/@mextanimesports?si=EINK6Db0qi8-J3Jk",
    icon: "Play",
    badge: "Live Streams & VODs",
    description: "Full Free Fire tournament broadcasts, highlight reels, and scrim highlights."
  },
  {
    platform: "Facebook",
    title: "Official Facebook Page",
    url: "https://www.facebook.com/share/1VmYvrEwYH/",
    icon: "Facebook",
    badge: "Community Hub",
    description: "Connect with players, tournament organizers, and community announcements."
  },
  {
    platform: "Discord",
    title: "Mex Tanim Esports Discord",
    url: "https://discord.gg/HCcsKvFh9d",
    icon: "Disc",
    badge: "Scrims & Voice",
    description: "Live competitive scrim voice channels, tier rosters, and match schedules."
  },
  {
    platform: "Telegram",
    title: "Telegram Channel",
    url: "https://t.me/mextanimesports",
    icon: "Send",
    badge: "Instant Alerts",
    description: "Instant tournament notifications, room IDs, and schedule drops."
  },
  {
    platform: "T1 / T2 Buy & Sell",
    title: "T1 / T2 Buy & Sell Group",
    url: "https://whatsapp.com/channel/0029Vb9FTjpAYlULPxrGvn0Z",
    icon: "CheckCircle",
    badge: "Verified Marketplace",
    description: "Direct verified marketplace channel for T1/T2 Free Fire team slots and gear."
  },
  {
    platform: "Bengal Storm Production",
    title: "Production Support — Bengal Storm Production",
    url: "https://whatsapp.com/channel/0029VbDFaVF7dmeSDeVlzT17",
    icon: "Tv",
    badge: "Broadcast Partner",
    description: "Official broadcast and visual production partner for elite esports events."
  }
];

export const FAQ_DATA: FAQItem[] = [
  {
    id: 1,
    question: "How can I book a promotion?",
    answer: "Booking is simple: 1) Explore our 10 packages and pick your desired tier, 2) Select an open date from the interactive calendar, 3) Complete your advance payment to our official bKash, Nagad, or Rocket numbers, and 4) Click 'Book This Package' to send your details via WhatsApp directly to our administration team for prompt confirmation.",
    category: "booking"
  },
  {
    id: 2,
    question: "How much does each package cost?",
    answer: "Our packages range from ৳1,000 to ৳5,000 BDT in fixed, transparent pricing. Package 01 (Starter) is ৳1,000 for 1 video + 1 day bio link, up to Package 10 (Ultimate) at ৳5,000 for 10 videos + 10 days bio link with SG Server Drone Support, V Badge, Pro Badge, and permanent organizational support.",
    category: "pricing"
  },
  {
    id: 3,
    question: "Is advance payment required?",
    answer: "Yes, full 100% advance payment is strictly required before any promotion slot or date is confirmed on our calendar. This guarantees your scheduled slot in our production pipeline.",
    category: "payment"
  },
  {
    id: 4,
    question: "How long will my group link stay in the TikTok bio?",
    answer: "Your tournament or organization group invite link will remain actively placed in our TikTok bio for the exact number of days specified in your package (e.g., 1 day for Package 01, 5 days for Package 05, and up to 10 days for Package 10).",
    category: "delivery"
  },
  {
    id: 5,
    question: "How many members can join?",
    answer: "Based on historical campaign observations: Campaigns under 10,000 views generally have an estimated potential of 200–300 members joining within one day. Campaigns around 20,000 views or below have an estimated potential of 500–1,000 members joining within one day.",
    category: "reach"
  },
  {
    id: 6,
    question: "Are views and member numbers guaranteed?",
    answer: "No. All views and member joining estimates are approximate. Actual results depend on audience interest, content engagement, tournament prize pool appeal, timing, and other factors. We strictly do not provide guaranteed member counts.",
    category: "reach"
  },
  {
    id: 7,
    question: "How long does video publication take?",
    answer: "Our team makes every best effort to produce and publish the promotional video within 2 to 3 days after receiving all required tournament assets. Note: Publication timing may vary slightly depending on workload, personal emergencies, and operational requirements. Customers are always notified of temporary schedule changes.",
    category: "delivery"
  },
  {
    id: 8,
    question: "What information is required?",
    answer: "Upon joining our coordination group, you will need to provide: 1) Organization Logo, 2) Tournament Details (entry fees, prize pool, dates), 3) Tournament Types (Scrim, Championship, Custom Room), and 4) Required WhatsApp Group/Channel links. Any additional verification is handled securely and privately.",
    category: "booking"
  },
  {
    id: 9,
    question: "What if my selected date is already booked?",
    answer: "Our calendar clearly shows booked dates in red. You can choose any of the available dates (such as November 12, 19, or 26) or select from December 2026 where all dates are currently open for reservation. You can also chat directly with our administration team to find an alternative opening.",
    category: "booking"
  },
  {
    id: 10,
    question: "How can I contact the administration?",
    answer: "You can reach our Daytime Booking Support (10:00 AM – 8:00 PM) at 01619067380 / 01979079265 / 01971432909, our Night Support (8:00 PM – Night) at 01353577538 / 01405209541 / 01767649373, or message our Primary WhatsApp Promotion contact directly at 01671961399.",
    category: "booking"
  }
];

export function buildWhatsAppBookingUrl(data: {
  packageName?: string;
  price?: number;
  videos?: number;
  dateStr?: string;
  orgName?: string;
  phone?: string;
  notes?: string;
}): string {
  const targetPhone = BRAND_CONFIG.primaryWhatsAppInternational;
  
  const selectedPackage = data.packageName || "Not specified";
  const selectedPrice = data.price ? `৳${data.price.toLocaleString()}` : "Not specified";
  const selectedVideos = data.videos ? `${data.videos} Video${data.videos > 1 ? 's' : ''}` : "Not specified";
  const selectedDate = data.dateStr || "Flexible / Next Available";
  const orgName = data.orgName ? data.orgName.trim() : "";
  const phone = data.phone ? data.phone.trim() : "";
  const notes = data.notes ? `\nAdditional Notes: ${data.notes.trim()}` : "";

  const text = `Hello Mex Tanim Official Promotion!
I want to book a promotion.
Package: ${selectedPackage}
Price: ${selectedPrice}
Videos: ${selectedVideos}
Preferred Date: ${selectedDate}
Please provide the booking instructions.
My Organization Name: ${orgName}
My WhatsApp Number: ${phone}${notes}
Thank you.`;

  return `https://wa.me/${targetPhone}?text=${encodeURIComponent(text)}`;
}

// LocalStorage helpers for Admin Configuration updates
const STORAGE_KEY_PACKAGES = "mex_tanim_packages_v1";
const STORAGE_KEY_SCHEDULES = "mex_tanim_schedules_v1";
const STORAGE_KEY_PAYMENT = "mex_tanim_payment_v1";

export function getStoredPackages(): PromotionPackage[] {
  if (typeof window === "undefined") return INITIAL_PACKAGES;
  try {
    const raw = localStorage.getItem(STORAGE_KEY_PACKAGES);
    if (!raw) return INITIAL_PACKAGES;
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) return parsed;
  } catch (e) {
    console.error("Failed to parse packages from localStorage", e);
  }
  return INITIAL_PACKAGES;
}

export function saveStoredPackages(packages: PromotionPackage[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY_PACKAGES, JSON.stringify(packages));
  } catch (e) {
    console.error("Failed to save packages to localStorage", e);
  }
}

export function getStoredSchedules(): CalendarMonthSchedule[] {
  if (typeof window === "undefined") return INITIAL_SCHEDULES;
  try {
    const raw = localStorage.getItem(STORAGE_KEY_SCHEDULES);
    if (!raw) return INITIAL_SCHEDULES;
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) return parsed;
  } catch (e) {
    console.error("Failed to parse schedules from localStorage", e);
  }
  return INITIAL_SCHEDULES;
}

export function saveStoredSchedules(schedules: CalendarMonthSchedule[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY_SCHEDULES, JSON.stringify(schedules));
  } catch (e) {
    console.error("Failed to save schedules to localStorage", e);
  }
}

export function resetAllToDefaults(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY_PACKAGES);
  localStorage.removeItem(STORAGE_KEY_SCHEDULES);
  localStorage.removeItem(STORAGE_KEY_PAYMENT);
}
