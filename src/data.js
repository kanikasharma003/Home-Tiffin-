// All page content for the TiffinBox landing page.

/* =========================
   NAVIGATION
========================= */

export const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Plans", href: "#plans" },
  { label: "Menu", href: "#menu" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

/* =========================
   CITIES
========================= */

export const CITIES = [
  "Odisha",
  "Delhi",
  "Mumbai",
  "Pune",
  "Bangalore",
];

/* =========================
   STATS
========================= */

export const STATS = [
  {
    icon: "boxes",
    value: "10K+",
    label: "Meals Delivered",
  },
  {
    icon: "star",
    value: "4.8/5",
    label: "Customer Rating",
  },
  {
    icon: "leaf",
    value: "100%",
    label: "Fresh & Healthy",
  },
  {
    icon: "calendar",
    value: "7 Days",
    label: "Delivery Per Week",
  },
];

/* =========================
   FEATURES
========================= */

export const FEATURES = [
  {
    icon: "leaf",
    title: "Fresh & Healthy",
    description:
      "Locally sourced veggies and grains, cooked every morning.",
  },
  {
    icon: "home",
    title: "Homestyle Food",
    description:
      "Traditional recipes made the way your family makes them.",
  },
  {
    icon: "shield",
    title: "Hygienic Kitchen",
    description:
      "FSSAI-certified kitchens and sanitized packing.",
  },
  {
    icon: "truck",
    title: "Dabba Delivery",
    description:
      "On-time delivery to your doorstep, every single day.",
  },
];

/* =========================
   MENU TABS
========================= */

export const MENU_TABS = [
  "All",
  "Veg",
  "Jain",
  "Healthy",
  "Special",
];

/* =========================
   MENU ITEMS
========================= */

export const MENU_ITEMS = [
  {
    id: 1,
    name: "Dal Tarka Thali",
    description:
      "Dal tadka, jeera rice, 3 phulkas, salad & pickle",
    price: 99,
    type: "Veg",
    emoji: "🍲",
    image:
      "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80",
    categories: ["All", "Veg", "Healthy"],
  },

  {
    id: 2,
    name: "Paneer Tikka Masala",
    description:
      "Paneer tikka, rumali roti, jeera rice & mint chutney",
    price: 109,
    type: "Veg",
    emoji: "🧀",
    image:
      "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=800&q=80",
    categories: ["All", "Veg", "Special"],
  },

  {
    id: 3,
    name: "Vegetable Biryani",
    description:
      "Saffron veg biryani, boondi raita & papad",
    price: 99,
    type: "Veg",
    emoji: "🍚",
    image:
      "https://images.unsplash.com/photo-1563379091339-03246963d96c?auto=format&fit=crop&w=800&q=80",
    categories: ["All", "Veg"],
  },

  {
    id: 4,
    name: "Chole Bhature",
    description:
      "Amritsari chole, fluffy bhature & onion salad",
    price: 99,
    type: "Veg",
    emoji: "🫘",
    image:
      "https://images.unsplash.com/photo-1626132647523-66f5bf380027?auto=format&fit=crop&w=800&q=80",
    categories: ["All", "Veg", "Special"],
  },

  {
    id: 5,
    name: "Aloo Gobi Thali",
    description:
      "Aloo gobi, 2 rotis, dal, rice & salad",
    price: 89,
    type: "Jain",
    emoji: "🥘",
    image:
      "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=800&q=80",
    categories: ["All", "Veg", "Jain", "Healthy"],
  },

  {
    id: 6,
    name: "Egg Curry Thali",
    description:
      "Egg curry, rice, 2 parathas & salad",
    price: 119,
    type: "Non-Veg",
    emoji: "🥚",
    image:
      "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80",
    categories: ["All", "Non-Veg"],
  },

  {
    id: 7,
    name: "Butter Chicken Thali",
    description:
      "Butter chicken, naan, rice & pickle",
    price: 149,
    type: "Non-Veg",
    emoji: "🍛",
    image:
      "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=800&q=80",
    categories: ["All", "Non-Veg", "Special"],
  },

  {
    id: 8,
    name: "Soya Chunk Curry",
    description:
      "Protein-rich soya curry, rice & 3 rotis",
    price: 95,
    type: "Veg",
    emoji: "🥗",
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80",
    categories: ["All", "Veg", "Healthy"],
  },
];

/* =========================
   WEEKLY MENU
========================= */

export const WEEK_MENU = [
  {
    day: "Monday",
    main: "Dal Tadka + Aloo Sabzi",
    addons: "Roti, Salad",
  },
  {
    day: "Tuesday",
    main: "Paneer Bhurji",
    addons: "Rice, Dal",
  },
  {
    day: "Wednesday",
    main: "Mix Veg Curry",
    addons: "Rice, Raita",
  },
  {
    day: "Thursday",
    main: "Chole",
    addons: "Rice, Salad",
  },
  {
    day: "Friday",
    main: "Kadhi Pakora",
    addons: "Rice, Papad",
  },
  {
    day: "Saturday",
    main: "Veg Pulao",
    addons: "Raita, Papad",
  },
  {
    day: "Sunday",
    main: "Special Thali",
    addons: "Sweet, Salad",
  },
];

/* =========================
   SUBSCRIPTION PLANS
========================= */

export const PLANS = [
  {
    name: "Daily",
    price: 99,
    period: "per meal",
    popular: false,
    features: [
      "Fresh food daily",
      "Flexible delivery",
      "Cancel anytime",
    ],
    cta: "Order Now",
  },

  {
    name: "Weekly",
    price: 649,
    period: "for 7 days",
    popular: true,
    features: [
      "7 fresh meals",
      "Free delivery",
      "Choose your menu",
      "Customer meal selection",
    ],
    cta: "Order Now",
  },

  {
    name: "Monthly",
    price: 2499,
    period: "for 30 days",
    popular: false,
    features: [
      "30 fresh meals",
      "Priority support",
      "Free delivery",
      "Best value",
    ],
    cta: "Start Monthly",
  },
];

/* =========================
   HOW IT WORKS
========================= */

export const STEPS = [
  {
    num: "01",
    icon: "clipboard",
    title: "Choose Your Plan",
    description:
      "Select daily, weekly or monthly tiffin plans.",
  },

  {
    num: "02",
    icon: "phone",
    title: "Select Your Meals",
    description:
      "Pick from daily rotating homestyle menus.",
  },

  {
    num: "03",
    icon: "chef",
    title: "We Cook & Pack",
    description:
      "Freshly prepared and hygienically packed.",
  },

  {
    num: "04",
    icon: "scooter",
    title: "We Deliver",
    description:
      "Delivered hot to your doorstep on time.",
  },
];

/* =========================
   MEAL BOX
========================= */

export const MEAL_PARTS = [
  {
    emoji: "🍛",
    name: "Sabzi",
    image:
      "https://images.unsplash.com/photo-1601050690117-94f5f6fa8bd7?auto=format&fit=crop&w=500&q=80",
  },

  {
    emoji: "🍜",
    name: "Dal",
    image:
      "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=500&q=80",
  },

  {
    emoji: "🍚",
    name: "Rice",
    image:
      "https://images.unsplash.com/photo-1516684732162-798a0062be99?auto=format&fit=crop&w=500&q=80",
  },

  {
    emoji: "🫓",
    name: "Roti",
    image:
      "https://images.unsplash.com/photo-1610057099431-d7b0c2f5e4f3?auto=format&fit=crop&w=500&q=80",
  },

  {
    emoji: "🥗",
    name: "Salad",
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=500&q=80",
  },

  {
    emoji: "🍮",
    name: "Sweet",
    image:
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=500&q=80",
  },
];

/* =========================
   KITCHEN
========================= */

export const KITCHEN_POINTS = [
  "FSSAI certified kitchens",
  "Fresh ingredients daily",
  "No artificial preservatives",
  "Roasted, not fried",
];

/* =========================
   TESTIMONIALS
========================= */

export const TESTIMONIALS = [
  {
    text:
      "Homestyle food taste. Dal was perfect, rotis were soft, and the salad was fresh.",
    name: "Rohit B.",
    city: "Student",
    rating: 5,
  },

  {
    text:
      "Perfect for my office lunch! Fresh, healthy and very convenient.",
    name: "Priya M.",
    city: "Working Professional",
    rating: 5,
  },

  {
    text:
      "Affordable taste and always on time. Weekly plan is super convenient for my family.",
    name: "Neha S.",
    city: "Homemaker",
    rating: 5,
  },

  {
    text:
      "The variety in the menu keeps it exciting. Highly recommended for bachelors.",
    name: "Aman A.",
    city: "Working Professional",
    rating: 4,
  },
];

/* =========================
   FAQ
========================= */

export const FAQS = [
  {
    question: "How does the delivery route plan work?",
    answer:
      "Once you subscribe, we map your address to the nearest delivery route and assign a fixed delivery window. You can change your window anytime from your account.",
  },

  {
    question: "Can I choose my meals?",
    answer:
      "Yes! Weekly and monthly subscribers can pick their preferred dishes from the rotating menu up to 24 hours before delivery.",
  },

  {
    question: "What if I need to skip a day?",
    answer:
      "No worries — you can pause or skip any day from your dashboard before the cut-off time, and the amount is adjusted in your next cycle.",
  },

  {
    question: "Do you offer Jain or special meals?",
    answer:
      "Absolutely. Jain, no-onion-garlic and high-protein options are available on all plans. Just select them in your preferences.",
  },
];