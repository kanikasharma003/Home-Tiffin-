// All page content for the TiffinBox landing page.

export const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'Plans', href: '#plans' },
  { label: 'Menu', href: '#menu' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

export const STATS = [
  { icon: 'boxes', value: '10K+', label: 'Meals Delivered' },
  { icon: 'star', value: '4.8/5', label: 'Customer Rating' },
  { icon: 'leaf', value: '100%', label: 'Fresh & Healthy' },
  { icon: 'calendar', value: '7 Days', label: 'Delivery Per Week' },
]

export const FEATURES = [
  {
    icon: 'leaf',
    title: 'Fresh & Healthy',
    desc: 'Locally sourced veggies and grains, cooked every morning.',
  },
  {
    icon: 'home',
    title: 'Homestyle Style',
    titleAccent: 'Homestyle',
    desc: 'Traditional recipes made the way your family makes them.',
  },
  {
    icon: 'shield',
    title: 'Hygiene Free',
    desc: 'FSSAI-certified kitchens and sanitized packing.',
  },
  {
    icon: 'truck',
    title: 'Dabba Delivery',
    desc: 'On-time delivery to your doorstep, every single day.',
  },
]

export const MENU_TABS = ['All', 'Veg', 'Jain', 'Healthy', 'Special']

export const MENU_ITEMS = [
  {
    name: 'Dal Tarka Thali',
    desc: 'Dal tadka, jeera rice, 3 phulkas, salad & pickle',
    price: 99,
    tag: 'Veg',
    emoji: '🍲',
    bg: 'linear-gradient(135deg,#FFF3D6,#FFE3A6)',
    categories: ['All', 'Veg', 'Healthy'],
  },
  {
    name: 'Paneer Tikka Masala',
    desc: 'Paneer tikka, rumali roti, jeera rice & mint chutney',
    price: 109,
    tag: 'Veg',
    emoji: '🧀',
    bg: 'linear-gradient(135deg,#FFE8EC,#FFC9B2)',
    categories: ['All', 'Veg', 'Special'],
  },
  {
    name: 'Vegetable Biryani',
    desc: 'Saffron veg biryani, boondi raita & papad',
    price: 99,
    tag: 'Veg',
    emoji: '🍚',
    bg: 'linear-gradient(135deg,#E9F8DA,#C9EDAA)',
    categories: ['All', 'Veg'],
  },
  {
    name: 'Chole Bhature',
    desc: 'Amritsari chole, fluffy bhature & onion salad',
    price: 99,
    tag: 'Veg',
    emoji: '🫘',
    bg: 'linear-gradient(135deg,#FFF0E2,#FFD9AE)',
    categories: ['All', 'Veg', 'Special'],
  },
  {
    name: 'Aloo Gobi Thali',
    desc: 'Aloo gobi, 2 rotis, dal, rice & salad',
    price: 89,
    tag: 'Jain',
    emoji: '🥘',
    bg: 'linear-gradient(135deg,#FFF6D8,#F3E1AC)',
    categories: ['All', 'Veg', 'Jain', 'Healthy'],
  },
  {
    name: 'Egg Curry Thali',
    desc: 'Egg curry, rice, 2 parathas & salad',
    price: 119,
    tag: 'Non-Veg',
    emoji: '🥚',
    bg: 'linear-gradient(135deg,#FFE7D1,#F8C89B)',
    categories: ['All'],
  },
  {
    name: 'Butter Chicken Thali',
    desc: 'Butter chicken, naan, rice & pickle',
    price: 149,
    tag: 'Non-Veg',
    emoji: '🍛',
    bg: 'linear-gradient(135deg,#FFDCC8,#F0A875)',
    categories: ['All', 'Special'],
  },
  {
    name: 'Soya Chunk Curry',
    desc: 'Protein-rich soya curry, rice & 3 rotis',
    price: 95,
    tag: 'Veg',
    emoji: '🥗',
    bg: 'linear-gradient(135deg,#E4F7D2,#BFE39B)',
    categories: ['All', 'Veg', 'Healthy'],
  },
]

export const WEEK_MENU = [
  { day: 'Monday', main: 'Dal Tadka + Aloo Sabzi', side: 'Roti, Salad' },
  { day: 'Tuesday', main: 'Paneer Bhurji', side: 'Rice, Dal' },
  { day: 'Wednesday', main: 'Mix Veg Curry', side: 'Rice, Raita' },
  { day: 'Thursday', main: 'Chole', side: 'Rice, Salad' },
  { day: 'Friday', main: 'Kadhi Pakora', side: 'Rice, Papad' },
  { day: 'Saturday', main: 'Veg Pulao', side: 'Raita, Papad' },
  { day: 'Sunday', main: 'Special Thali', side: 'Sweet, Salad' },
]

export const PLANS = [
  {
    name: 'Daily',
    price: 99,
    per: 'per meal',
    highlight: false,
    features: ['Fresh food daily', 'Flexible delivery', 'Cancel anytime'],
    cta: 'Order Now',
  },
  {
    name: 'Weekly',
    price: 649,
    per: 'for 7 days',
    highlight: true,
    features: ['7 fresh meals', 'Free delivery', 'Choose your menu', 'Customer meal selection'],
    cta: 'Order Now',
  },
  {
    name: 'Monthly',
    price: 2499,
    per: 'for 30 days',
    highlight: false,
    features: ['30 fresh meals', 'Priority support', 'Free delivery', 'Best value'],
    cta: 'Start Monthly',
  },
]

export const STEPS = [
  { num: '01', icon: 'clipboard', title: 'Choose Your Plan', desc: 'Select daily, weekly or monthly tiffin plans.' },
  { num: '02', icon: 'phone', title: 'Select Your Meals', desc: 'Pick from daily rotating homestyle menus.' },
  { num: '03', icon: 'chef', title: 'We Cook & Pack', desc: 'Freshly prepared and hygienically packed.' },
  { num: '04', icon: 'scooter', title: 'We Deliver', desc: 'Delivered hot to your doorstep on time.' },
]

export const MEAL_PARTS = [
  { emoji: '🍛', label: 'Sabzi', tint: '#FFE7C2' },
  { emoji: '🍜', label: 'Dal', tint: '#FFD3D3' },
  { emoji: '🍚', label: 'Rice', tint: '#E4E9FF' },
  { emoji: '🫓', label: 'Roti', tint: '#FFEAC2' },
  { emoji: '🥗', label: 'Salad', tint: '#DFF6DE' },
  { emoji: '🍮', label: 'Sweet', tint: '#FCE0F1' },
]

export const KITCHEN_POINTS = [
  'FSSAI certified kitchens',
  'Fresh ingredients daily',
  'No artificial preservatives',
  'Roasted, not fried',
]

export const TESTIMONIALS = [
  {
    text: 'Homestyle food taste. Dal was perfect, rotis were soft, and the salad was fresh.',
    name: 'Rohit B.',
    role: 'Student',
    stars: 5,
  },
  {
    text: 'Perfect for my office lunch! Fresh, healthy and very convenient. Peas packing content food.',
    name: 'Priya M.',
    role: 'Working Professional',
    stars: 5,
  },
  {
    text: 'Affordable taste and always on time. Weekly plan is super convenient for my family.',
    name: 'Neha S.',
    role: 'Homemaker',
    stars: 5,
  },
  {
    text: 'The variety in the menu keeps it exciting. Highly recommended for bachelors.',
    name: 'Aman A.',
    role: 'Recommended',
    stars: 4,
  },
]

export const FAQS = [
  {
    q: 'How does the delivery route plan work?',
    a: 'Once you subscribe, we map your address to the nearest delivery route and assign a fixed delivery window. You can change your window anytime from your account.',
  },
  {
    q: 'Can I choose my meals?',
    a: 'Yes! Weekly and monthly subscribers can pick their preferred dishes from the rotating menu up to 24 hours before delivery.',
  },
  {
    q: 'What if I need to skip a day?',
    a: 'No worries — you can pause or skip any day from your dashboard before the cut-off time, and the amount is adjusted in your next cycle.',
  },
  {
    q: 'Do you offer Jain or special meals?',
    a: 'Absolutely. Jain, no-onion-garlic and high-protein options are available on all plans. Just select them in your preferences.',
  },
]
