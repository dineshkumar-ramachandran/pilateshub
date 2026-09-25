/**
 * PilatesHub — Single source of truth for copy + imagery.
 *
 * IMAGE STRATEGY: Real studio photography lives in /public/studio (client shoot,
 * Sept 2026) and /public/sessions, /public/locations. Paths pass through `img()`. To swap in real studio/founder/session photography
 * later, replace the `id` values (or point `img()` at your own CDN) in ONE place.
 *
 * FACTS: Everything below marked "real" is taken from pilateshub.in. Anything
 * marked PLACEHOLDER (pricing, testimonials, Jayanagar) must be supplied by the
 * client before launch — do not present placeholders as fact.
 */

/** Local studio photos ("/studio/...") pass straight through; anything else is an Unsplash ID. */
export function img(id: string, w = 1600, q = 72): string {
  if (id.startsWith("/")) return id;
  return `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=${q}`;
}

/* ----------------------------- Business facts ----------------------------- */

export const site = {
  name: "PilatesHub",
  tagline: "The Physical Vitality",
  domain: "https://www.pilateshub.in",
  email: "info@pilateshub.in",
  phone: "+91 9019642798",
  phoneRaw: "919019642798",
  instagram: "https://www.instagram.com/pilateshub_",
  instagramHandle: "@pilateshub_",
  facebook: "https://www.facebook.com/pilates.hub.5",
  copyrightYear: 2026,
  clientsTrained: 1000,
} as const;

export const whatsappUrl = (message: string) =>
  `https://wa.me/${site.phoneRaw}?text=${encodeURIComponent(message)}`;

export const mailtoUrl = (subject: string, body = "") =>
  `mailto:${site.email}?subject=${encodeURIComponent(subject)}${
    body ? `&body=${encodeURIComponent(body)}` : ""
  }`;

/* ------------------------------- Navigation ------------------------------- */

// Single-page anchors — each maps to a section id on the homepage.
export const nav = [
  { label: "About", href: "#about" },
  { label: "Method", href: "#method" },
  { label: "Programs", href: "#sessions" },
  { label: "Progression", href: "#progression" },
  { label: "Locations", href: "#locations" },
  { label: "Equipment", href: "#equipment" },
  { label: "FAQ", href: "#faq" },
] as const;

/* --------------------------------- Hero ----------------------------------- */

export const hero = {
  // headline rendered as stacked lines for reveal animation
  lines: ["The", "Physical", "Vitality."],
  kicker: "Pilates studio · Bengaluru",
  sub: "Authentic, professionally guided Pilates — accessible to every age and level, taught across three studios in Bengaluru.",
  // Sequence of the same practitioner moving through connected Pilates poses.
  // The hero cross-fades between these on scroll to feel like she keeps moving
  // through the workout as you read. All chosen for BRIGHT frames so the copy
  // stays legible without a heavy dark overlay.
  sequence: [
    "/studio/hero-1.webp", // group on ladder barrels
    "/studio/hero-2.webp", // reformer class
    "/studio/hero-3.webp", // cadillac duet
    "/studio/hero-4.webp", // cadillac lunge
  ],
  // Legacy single image (kept for anywhere else that may still reference it).
  image: "/studio/hero-1.webp",
} as const;

/* --------------------------- Brand statement ------------------------------ */

export const brandStatement = [
  "Pilates is not a workout.",
  "It is a way of understanding movement —",
  "strength, mobility, posture, control, balance, consistency.",
] as const;

/* ------------------------------ Philosophy -------------------------------- */

export const philosophy = {
  eyebrow: "The philosophy",
  title: "A practice, not a workout.",
  body: [
    "At PilatesHub, movement is deliberate. Every session is built around alignment, breath and control — the principles Joseph Pilates called Contrology.",
    "Founded in HSR Layout by Bhagya & Manju, with over a decade of experience, the studio was created as a welcoming space for high-quality, personal Pilates training.",
  ],
  image: "/studio/philosophy.webp",
} as const;

/* ------------------------------- Poses ------------------------------------ */
// Stylized pose silhouettes served from /public/poses. Used as list bullets,
// stage numbering, and section ornaments so the design feels grounded in the
// actual movement vocabulary rather than generic dots and dashes.

export const poses = {
  hundred: "/poses/hundred.svg",
  rollup: "/poses/rollup.svg",
  swan: "/poses/swan.svg",
  teaser: "/poses/teaser.svg",
  bridge: "/poses/bridge.svg",
  plank: "/poses/plank.svg",
} as const;

/* ------------------------ Benefits (PILATES · HUB) ------------------------ */
// Distilled from the studio's own acrostic on pilateshub.in.

export const benefits = [
  { n: "01", title: "Posture", copy: "Perfect your posture and stand taller with a body in balance.", image: "/studio/posture.webp" },
  { n: "02", title: "Core", copy: "Ignite deep core strength that supports every movement you make.", image: "/studio/core.webp" },
  { n: "03", title: "Strength", copy: "Build lean, sculpted muscle through controlled resistance.", image: "/studio/strength.webp" },
  { n: "04", title: "Relief", copy: "Alleviate aches and pain by moving the way the body is designed to.", image: "/studio/relief.webp" },
  { n: "05", title: "Technique", copy: "Train with the right technique under certified, attentive guidance.", image: "/studio/technique.webp" },
  { n: "06", title: "Performance", copy: "Enhance your daily life and sports performance with functional mobility.", image: "/studio/performance.webp" },
  { n: "07", title: "Confidence", copy: "Strengthen self-confidence through a body you understand and trust.", image: "/studio/confidence.webp" },
] as const;

/* -------------------------------- Sessions -------------------------------- */
// Real session types + descriptions from pilateshub.in.

export const sessions = [
  {
    slug: "group",
    title: "Group Class",
    tag: "5–6 people",
    copy: "Structured, guided Pilates in a small community of five to six. Two flexible plans include equipment access at the studio.",
    plans: [
      "3 days / week · 12 sessions per month · 45-day validity",
      "2 days / week · 8-session pack · 1-month validity",
    ],
    image: "/studio/group.webp",
    imageUrl: "/studio/session-group.webp",
  },
  {
    slug: "personal",
    title: "Personal Classes",
    tag: "1:1 · Duet · Small group",
    copy: "One-on-one, buddy or small-group Pilates built entirely around your body, your goals and your pace. Both plans include equipment access.",
    plans: [
      "3 days / week · 12 sessions per month · 45-day validity",
      "2 days / week · 8-session pack · 1-month validity",
    ],
    image: "/studio/personal.webp",
    imageUrl: "/studio/session-personal.webp",
  },
  {
    slug: "clinical",
    title: "Clinical Pilates",
    tag: "Personal · Physio-led",
    copy: "Rehabilitation-focused Pilates for recovery from injury or chronic movement issues, delivered as personal classes with careful, physio-led progression.",
    plans: ["Personal classes only · tailored to your assessment"],
    image: "/studio/clinical.webp",
    imageUrl: "/sessions/clinical.jpg",
  },
  {
    slug: "prenatal-postnatal",
    title: "Prenatal & Postnatal",
    tag: "Personal · Specialised",
    copy: "Safe, adapted Pilates through pregnancy and after — strength, posture and controlled movement, respecting each stage. Delivered as personal classes.",
    plans: ["Personal classes only · tailored to each trimester and stage"],
    image: "/studio/prenatal.webp",
    imageUrl: "/sessions/prenatal-postnatal.jpg",
  },
] as const;

/* ------------------------------ Scroll story ------------------------------ */

export const scrollStory = ["Align", "Breathe", "Strengthen", "Move", "Live"] as const;

/* ------------------------------- Locations -------------------------------- */

const APPARATUS_ALL = [
  "Reformer",
  "Stability Chair",
  "Cadillac",
  "Ladder Barrel",
  "Pilates accessories",
] as const;

// Real, in-studio photography — one set per branch, seven photos each,
// used identically across the Overview / Amenities / Book pages of that
// branch. The homepage LocationsTeaser uses `homeImage` per location.
export const GALLERY_HSR = [
  "/locations/hsr/1.jpg",
  "/locations/hsr/2.jpg",
  "/locations/hsr/3.jpg",
  "/locations/hsr/4.jpg",
  "/locations/hsr/5.jpg",
  "/locations/hsr/6.jpg",
] as const;
export const GALLERY_BELLANDUR = [
  "/locations/bellandur/1.jpg",
  "/locations/bellandur/2.jpg",
  "/locations/bellandur/3.jpg",
  "/locations/bellandur/4.jpg",
  "/locations/bellandur/5.jpg",
  "/locations/bellandur/6.jpg",
  "/locations/bellandur/7.jpg",
] as const;
export const GALLERY_KORAMANGALA = [
  "/locations/koramangala/1.jpg",
  "/locations/koramangala/2.jpg",
  "/locations/koramangala/3.jpg",
  "/locations/koramangala/4.jpg",
  "/locations/koramangala/5.jpg",
  "/locations/koramangala/6.jpg",
] as const;

// Every amenity we offer. `showersAt` lists the branches where the
// showers amenity is available (HSR does not have showers).
export const AMENITIES = [
  { key: "parking", label: "Parking", copy: "Convenient parking outside the studio." },
  { key: "lockers", label: "Lockers", copy: "Personal lockers for every session." },
  { key: "changing", label: "Changing rooms", copy: "Private changing rooms." },
  { key: "ac", label: "Air-conditioned", copy: "Climate-controlled training floor." },
  { key: "refreshments", label: "Water & refreshments", copy: "Filtered water and light refreshments." },
  { key: "wifi", label: "Wi-Fi", copy: "Complimentary Wi-Fi for members." },
  { key: "showers", label: "Showers", copy: "Post-session showers." },
] as const;

// Trust markers shown on every location page.
export const TRUST_BADGES = [
  { label: "Certified trainers", copy: "Every session is led by professionally trained Pilates instructors." },
  { label: "Knowledgeable team", copy: "Deep familiarity with the classical apparatus and movement principles." },
  { label: "Daily hygiene & sanitation", copy: "Equipment cleaned and sanitised between every session." },
  { label: "Beginner-friendly", copy: "Programs adapt to every level — first-timers welcome." },
] as const;

// Booking policy — shared across all locations.
export const BOOKING_POLICY = {
  headline: "By appointment only",
  copy: "Sessions run to a schedule and require a booking. Reach out via WhatsApp, call, or the enquiry form and our team will confirm your slot.",
} as const;

// Unified timings — 6 AM to 9 PM, Mon–Sat, all branches.
const UNIFIED_HOURS = [{ days: "Mon – Sat", time: "6 AM – 9 PM" }] as const;

export const locations = [
  {
    slug: "hsr-layout",
    status: "active" as const,
    name: "HSR Layout",
    city: "Bengaluru",
    address:
      "2577, 13th Cross, 27th Main Rd, next to Trishan School of Music HSR, 1st Sector, HSR Layout, Bengaluru, Karnataka 560102",
    phone: "+91 90196 42798",
    phoneRaw: "919019642798",
    email: "info@pilateshub.in",
    instagram: "https://www.instagram.com/pilateshub_",
    instagramHandle: "@pilateshub_",
    hours: UNIFIED_HOURS,
    apparatus: APPARATUS_ALL,
    amenityKeys: ["parking", "lockers", "changing", "ac", "refreshments", "wifi"] as const,
    gallery: GALLERY_HSR,
    homeImage: "/locations/hsr-home.jpg",
    mapsQuery:
      "PilatesHub, 2577, 13th Cross, 27th Main Rd, HSR Layout, Bengaluru 560102",
    geo: { lat: 12.9121, lng: 77.6446 },
    image: "/locations/hsr-home.jpg",
  },
  {
    slug: "bellandur",
    status: "active" as const,
    name: "Bellandur",
    city: "Bengaluru",
    address:
      "1st floor, Bhupal Reddy Building, Sy.no 16, Gear School Rd, opposite Axis Bank, Devarabisanahalli, Bellandur, Bengaluru, Karnataka 560103",
    phone: "+91 91872 17515",
    phoneRaw: "919187217515",
    email: "pilateshub2026@gmail.com",
    instagram: "https://www.instagram.com/pilateshub_bellandur",
    instagramHandle: "@pilateshub_bellandur",
    hours: UNIFIED_HOURS,
    apparatus: APPARATUS_ALL,
    amenityKeys: ["parking", "lockers", "changing", "ac", "refreshments", "wifi", "showers"] as const,
    gallery: GALLERY_BELLANDUR,
    homeImage: "/locations/bellandur-home.jpg",
    mapsQuery:
      "PilatesHub, Bhupal Reddy Building, Gear School Rd, Bellandur, Bengaluru 560103",
    geo: null,
    image: "/locations/bellandur-home.jpg",
  },
  {
    slug: "koramangala",
    status: "active" as const,
    name: "Koramangala",
    city: "Bengaluru",
    address:
      "Ground Floor, SR Complex, 2, Tavarekere Main Rd, DRC Post, Kaveri Layout, S.G. Palya, Bengaluru, Karnataka 560029",
    phone: "+91 99022 29199",
    phoneRaw: "919902229199",
    email: "pilateshubkormangala@gmail.com",
    instagram: "https://www.instagram.com/pilateshub_kormangala",
    instagramHandle: "@pilateshub_kormangala",
    hours: UNIFIED_HOURS,
    apparatus: APPARATUS_ALL,
    amenityKeys: ["parking", "lockers", "changing", "ac", "refreshments", "wifi", "showers"] as const,
    gallery: GALLERY_KORAMANGALA,
    homeImage: "/locations/koramangala-home.jpg",
    mapsQuery:
      "PilatesHub, SR Complex, Tavarekere Main Rd, S.G. Palya, Bengaluru 560029",
    geo: null,
    image: "/locations/koramangala-home.jpg",
  },
] as const;

/** Resolve a location's amenity records (in order). */
export function amenitiesFor(slug: string) {
  const loc = locations.find((l) => l.slug === slug);
  if (!loc) return [] as Array<(typeof AMENITIES)[number]>;
  const keys = new Set<string>(loc.amenityKeys);
  return AMENITIES.filter((a) => keys.has(a.key));
}

/* ------------------------------- Equipment -------------------------------- */
// Real apparatus list from pilateshub.in (the studio also sells equipment).

// Real product photos from pilateshub.in — cached locally under /public/equipment
// so cross-origin blocking by Wix's CDN never leaves a blank card.
export const equipment = [
  {
    slug: "reformer",
    name: "Reformer",
    short: "The cornerstone of equipment Pilates.",
    copy: "A sophisticated apparatus used across a wide variety of exercises for core strength, flexibility, mobility and balance. The Reformer comprises a footbar, carriage, shoulder and head rests, ropes, pulleys, gear bar, standing platform and adjustment cradles.",
    image: "1544367567-0f2fcb009e0b",
    imageUrl: "/equipment/reformer.png",
  },
  {
    slug: "stability-chair",
    name: "Stability Chair",
    short: "Compact resistance, remarkable range.",
    copy: "A compact, spring-loaded apparatus that challenges strength, control and balance through a focused range of seated, standing and lying exercises.",
    image: "1601422407692-ec4eeec1d9b3",
    imageUrl: "/equipment/stability-chair.png",
  },
  {
    slug: "cadillac",
    name: "Cadillac",
    short: "A full framework for supported movement.",
    copy: "Also known as the trapeze table, the Cadillac uses a raised frame with bars, springs and straps to support and challenge the body through an extensive repertoire of movement.",
    image: "1574680096145-d05b474e2155",
    imageUrl: "/equipment/cadillac.png",
  },
  {
    slug: "ladder-barrel",
    name: "Ladder Barrel",
    short: "For spinal mobility and extension.",
    copy: "A ladder paired with a curved barrel, ideal for stretching, spinal articulation, core work and improving flexibility and posture.",
    image: "1518310383802-640c2de311b2",
    imageUrl: "/equipment/ladder-barrel.png",
  },
  {
    slug: "swedish-ladder",
    name: "Swedish Ladder",
    short: "Wall-mounted strength and stretch.",
    copy: "A wall-mounted frame of horizontal bars used for stretching, decompression and strengthening, supporting both mobility and controlled resistance work.",
    image: "1591258370814-01609b341790",
    imageUrl: "/equipment/swedish-ladder.png",
  },
] as const;

/* ---------------------------------- FAQ ----------------------------------- */
// Questions are the studio's own. Q1 answer is verbatim from pilateshub.in;
// remaining answers are faithful, generic Pilates information (no invented
// business specifics). Pricing intentionally left as a PLACEHOLDER.

export const faqs = [
  {
    q: "What is Pilates?",
    a: "Pilates is a form of exercise that focuses on building core strength, flexibility, balance and body awareness. It was developed by Joseph Pilates in the early 20th century and incorporates both mat and equipment-based exercises.",
  },
  {
    q: "Who can benefit from Pilates?",
    a: "Almost anyone. Because sessions are adapted to the individual, Pilates suits complete beginners, seasoned athletes, and those returning to movement after injury or pregnancy alike.",
  },
  {
    q: "Are your instructors certified?",
    a: "Yes. PilatesHub is led by founders Bhagya & Manju, with over a decade of experience, alongside a team of certified instructors who focus on proper alignment, form and technique.",
  },
  {
    q: "What types of classes do you offer?",
    a: "We offer Private (one-on-one), Couples, small Group, and Specialized sessions, taught on classical equipment including the Reformer, Cadillac, Stability Chair, Ladder Barrel and Swedish Ladder.",
  },
  {
    q: "How do I know which class is right for me?",
    a: "Get in touch and we'll recommend a starting point based on your goals, experience and any specific needs. Many clients begin with a private session to learn the fundamentals.",
  },
  {
    q: "Do I need to bring any equipment to the class?",
    a: "No. All Pilates equipment is provided at the studio. Just bring yourself, comfortable clothing and a water bottle.",
  },
  {
    q: "What should I wear to a Pilates class?",
    a: "Wear comfortable, fitted activewear that allows free movement. Grip socks are recommended for hygiene and stability on the equipment.",
  },
  {
    q: "How much does a class/session cost?",
    a: "Pricing varies by session type and package. Please contact us on WhatsApp or by email for current rates. [Pricing to be confirmed by the studio.]",
  },
  {
    q: "Can I attend a class if I'm pregnant or have a specific medical condition?",
    a: "In many cases, yes — our Specialized sessions are designed for exactly this. Please share the details when you enquire so we can tailor the practice and advise appropriately. Consult your physician where relevant.",
  },
  {
    q: "How can I book a class or private session?",
    a: "Reach out via WhatsApp, email or the enquiry form on this site and our team will help you schedule your first session.",
  },
] as const;

/* ------------------------------ Testimonials ------------------------------ */
// The live site references "A Word from Our Trainees" but publishes no quotes.
// We do NOT fabricate testimonials. Supply real, attributed quotes here to
// activate the section; until then the video wall stands in for text.

export const testimonials: { quote: string; author: string; detail?: string }[] = [];

// Trainee video wall — 8 real testimonial clips shot at the studio. Each file
// lives at /public/trainees/ and plays inline (muted, autoplay-on-hover).
export const traineeVideos = [
  "/trainees/t1.webm",
  "/trainees/t2.webm",
  "/trainees/t3.webm",
  "/trainees/t4.webm",
  "/trainees/t5.webm",
  "/trainees/t6.webm",
  "/trainees/t7.webm",
  "/trainees/t8.webm",
] as const;

/* -------------------------------- Founders -------------------------------- */

export const founders = {
  eyebrow: "Our story",
  names: "Bhagya & Manju",
  fullNames: "Bhagya Lakshmi & Manjunath",
  body: [
    "PilatesHub began with a clear vision — to make authentic, effective and professionally guided Pilates accessible to people of every age and fitness level.",
    "It started with a single studio in HSR Layout, Bengaluru, and has since expanded across the city to Bellandur and Koramangala. The practice now extends further through Pilates equipment sales and teacher training.",
    "More than a thousand clients have trained with us since we opened — a community built one careful session at a time.",
  ],
  image: "/studio/founders.jpg",
} as const;

/* ----------------------------- Movement progression ----------------------- */

export const progression = {
  eyebrow: "The journey",
  title: "A progression, not a program.",
  intro:
    "Pilates at PilatesHub develops through four connected stages. Each is grounded in breath, alignment and control — the same principles carried into steadily more demanding movement.",
  stages: [
    {
      n: "01",
      name: "Beginner",
      copy: "The first meeting with the mat and the equipment — breath, posture and the six Pilates principles introduced with care.",
      pose: "/poses/hundred.svg",
    },
    {
      n: "02",
      name: "Foundation",
      copy: "Fundamental exercises and equipment familiarity settle in. Alignment becomes second nature and movement becomes deliberate.",
      pose: "/poses/rollup.svg",
    },
    {
      n: "03",
      name: "Intermediate",
      copy: "Strength, control and mobility deepen. Sessions widen the repertoire and connect the apparatus into flowing sequences.",
      pose: "/poses/bridge.svg",
    },
    {
      n: "04",
      name: "Advanced",
      copy: "The full Pilates vocabulary — greater range, greater load and finer control. Movement is powerful, precise and quietly efficient.",
      pose: "/poses/teaser.svg",
    },
  ],
} as const;

/* ------------------------------ Instagram --------------------------------- */
// Editorial community strip. Replace IDs with real studio imagery / IG posts.

export const community = {
  hashtag: "#PilatesHubChallenge",
  blurb: "Share your 30-day practice and join the community.",
  images: [
    "/studio/hero-1.webp",
    "/studio/hero-2.webp",
    "/studio/hero-3.webp",
    "/studio/hero-4.webp",
    "/studio/relief.webp",
    "/studio/technique.webp",
    "/studio/performance.webp",
    "/studio/confidence.webp",
  ],
} as const;

/* ------------------------------- Final CTA -------------------------------- */

export const finalCta = {
  lines: ["Move better.", "Feel stronger.", "Live with vitality."],
  sub: "Begin your Pilates journey at HSR Layout, Bellandur or Koramangala.",
  image: "/studio/final.webp",
} as const;
