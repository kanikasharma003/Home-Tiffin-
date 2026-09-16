import { useState, useMemo } from 'react'
import { SlidersHorizontal, X } from 'lucide-react'
import KitchenCard from './KitchenCard'
import FilterPanel from './FilterPanel'
import KitchenDetail from './KitchenDetail'
import Cart from './Cart'
import img1 from "../assets/sharmakt.jpg"
import img2 from "../assets/guptakt.jpg"
import img3 from "../assets/raikt.jpg"
import img4 from "../assets/mohankt.jpg"
import img5 from "../assets/julikt.jpg"
import img6 from "../assets/meat-with-vegetables-salad-lentil-soup-pomegranate-side-view.jpg"
import img7 from "../assets/young-beautiful-woman-is-preparing-salad-various-vegetables-kitchen.jpg"


const KITCHENS = [
  {
    id: 'sharma',
    name: 'Sharma Home Kitchen',
    image: img1,      
    rating: 4.6,
    reviews: 124,
    location: 'Sector 12, Noida',
    distance: '1.2 km',
    tags: ['North Indian', 'Home Food'],
    timings: '8:00 AM - 10:00 PM',
    about:
      'Freshly prepared home-style meals with authentic North Indian flavours. Made with love and clean ingredients, just like home.',
  },
  {
    id: 'gupta',
    name: "Gupta's Kitchen",
    image: img2,
    
    rating: 4.4,
    reviews: 98,
    location: 'Sector 18, Noida',
    distance: '2.4 km',
    tags: ['Punjabi', 'Home Food'],
    timings: '9:00 AM - 9:00 PM',
    about: 'Homely Punjabi thalis made fresh every day.',
  },
  {
    id: 'rai',
    name: 'Rai Home Kitchen',
    image: img3,
    
    rating: 4.7,
    reviews: 156,
    location: 'Sector 22, Noida',
    distance: '3.1 km',
    tags: ['South Indian', 'Healthy Food'],
    timings: '8:00 AM - 10:00 PM',
    about: 'Healthy, balanced home meals cooked with minimal oil.',
  },
  {
    id: 'mohan',
    name: "Mohan's Kitchen",
    image: img4,
   
    rating: 4.9,
    reviews: 98,
    location: 'Sector 9, Noida',
    distance: '9.4 km',
    tags: ['Punjabi', 'Home Food'],
    timings: '9:00 AM - 9:00 PM',
    about: 'Homely Punjabi thalis made fresh every day.',
  },
  {
    id: 'juli',
    name: "Juli's Kitchen",
    image: img5,
    
    rating: 4.4,
    reviews: 98,
    location: 'Sector 18, Noida',
    distance: '1.4 km',
    tags: ['Punjabi', 'Home Food'],
    timings: '9:00 AM - 9:00 PM',
    about: 'Homely Punjabi thalis made fresh every day.',
  },
  {
    id: 'Sonu Goel',
    name: "Sonu Goel's Kitchen",
    image: img6,
   
    rating: 4.9,
    reviews: 98,
    location: 'Sector 1, Noida',
    distance: '2.4 km',
    tags: ['Punjabi', 'Home Food'],
    timings: '9:00 AM - 9:00 PM',
    about: 'Homely Punjabi thalis made fresh every day.',
  },{
    id: 'Neetu Goel',
    name: "Neetu Goel's Kitchen",
    image: img7,
    
    rating: 4.9,
    reviews: 98,
    location: 'Sector 1, Noida',
    distance: '2.4 km',
    tags: ['Punjabi', 'Home Food'],
    timings: '9:00 AM - 9:00 PM',
    about: 'Homely Punjabi thalis made fresh every day.',
  },
]

const DISHES_BY_KITCHEN = {
  sharma: [
    { id: 'd1', name: 'Dal Tadka', description: 'Classic dal cooked with traditional spices and tadka.', price: 80, image: '/images/dish1.jpg', available: true },
    { id: 'd2', name: 'Paneer Butter Masala', description: 'Rich and creamy paneer in a buttery tomato gravy.', price: 120, image: '/images/dish2.jpg', available: true },
    { id: 'd3', name: 'Mixed Veg Sabzi', description: 'Seasonal vegetables cooked with homestyle spices.', price: 90, image: '/images/dish3.jpg', available: true },
  ],
  gupta: [
    { id: 'd4', name: 'Rajma Chawal', description: 'Kidney beans curry served with steamed rice.', price: 100, image: '/images/dish4.jpg', available: true },
  ],
  rai: [
    { id: 'd5', name: 'Sprout Salad Bowl', description: 'Fresh sprouts, veggies and lemon dressing.', price: 70, image: '/images/dish5.jpg', available: true },
  ],
}

export default function KitchenListPage() {
  const [selectedKitchenId, setSelectedKitchenId] = useState(null)
  const [showCart, setShowCart] = useState(false)
  const [filterOpen, setFilterOpen] = useState(false)
  const [activeFilters, setActiveFilters] = useState(null)
  const [favorites, setFavorites] = useState({})
  const [cart, setCart] = useState({}) 

  const selectedKitchen = KITCHENS.find((k) => k.id === selectedKitchenId)
  const dishes = selectedKitchenId ? DISHES_BY_KITCHEN[selectedKitchenId] || [] : []

  const filteredKitchens = useMemo(() => {
    if (!activeFilters) return KITCHENS
    return KITCHENS.filter((k) => {
      if (activeFilters.cuisine && !k.tags.includes(activeFilters.cuisine)) return false
      if (activeFilters.specialization && !k.tags.includes(activeFilters.specialization)) return false
      return true
    })
  }, [activeFilters])

  const cartItems = Object.values(cart)
  const cartCount = cartItems.reduce((sum, i) => sum + i.qty, 0)

  const addDish = (dish) => {
    setCart((c) => ({ ...c, [dish.id]: { ...dish, qty: (c[dish.id]?.qty || 0) + 1 } }))
  }
  const incrementDish = (dish) => addDish(dish)
  const decrementDish = (dish) => {
    setCart((c) => {
      const existing = c[dish.id]
      if (!existing) return c
      if (existing.qty <= 1) {
        const { [dish.id]: _removed, ...rest } = c
        return rest
      }
      return { ...c, [dish.id]: { ...existing, qty: existing.qty - 1 } }
    })
  }
  const removeDish = (dish) => {
    setCart((c) => {
      const { [dish.id]: _removed, ...rest } = c
      return rest
    })
  }

  const cartQuantities = Object.fromEntries(cartItems.map((i) => [i.id, i.qty]))
  const clearFilters = () => setActiveFilters(null)
  const hasActiveChips = activeFilters && (activeFilters.cuisine || activeFilters.specialization)

  
  if (showCart) {
    return (
      <div className="min-h-screen bg-[#fdf3ee] p-4 sm:p-8">
        <button
          onClick={() => setShowCart(false)}
          className="mb-4 text-sm font-semibold text-[#9d1c34] bg-transparent border-none cursor-pointer"
        >
          ← Back
        </button>
        <Cart
          kitchen={selectedKitchen}
          items={cartItems}
          onIncrement={incrementDish}
          onDecrement={decrementDish}
          onRemove={removeDish}
          onCheckout={() => alert('Checkout!')}
        />
      </div>
    )
  }

  // ---------- KITCHEN DETAIL VIEW ----------
  if (selectedKitchen) {
    return (
      <div className="min-h-screen bg-[#fdf3ee] p-4 sm:p-8">
        <div className="max-w-3xl mx-auto flex items-center justify-between mb-4">
          <button
            onClick={() => setSelectedKitchenId(null)}
            className="text-sm font-semibold text-[#9d1c34] bg-transparent border-none cursor-pointer"
          >
            ← Back
          </button>
          {cartCount > 0 && (
            <button
              onClick={() => setShowCart(true)}
              className="text-sm font-semibold text-white bg-[#9d1c34] px-4 py-2 rounded-full cursor-pointer border-none"
            >
              Cart ({cartCount})
            </button>
          )}
        </div>
        <KitchenDetail
          kitchen={selectedKitchen}
          dishes={dishes}
          cartQuantities={cartQuantities}
          onAddDish={addDish}
          onIncrementDish={incrementDish}
          onDecrementDish={decrementDish}
          isFavorite={!!favorites[selectedKitchen.id]}
          onToggleFavorite={(k) => setFavorites((f) => ({ ...f, [k.id]: !f[k.id] }))}
        />
      </div>
    )
  }

  
  return (
    <div className="min-h-screen bg-[#fdf3ee] p-4 sm:p-8">
      <div className="max-w-5xl mx-auto">

        <div className="flex items-center justify-between mb-4 gap-3 flex-wrap">
          <button
            onClick={() => setFilterOpen(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[#eddcd2] bg-white text-sm font-semibold text-slate-700 cursor-pointer"
          >
            <SlidersHorizontal size={15} /> Filter
          </button>

          {cartCount > 0 && (
            <button
              onClick={() => setShowCart(true)}
              className="text-sm font-semibold text-white bg-[#9d1c34] px-4 py-2 rounded-full cursor-pointer border-none"
            >
              Cart ({cartCount})
            </button>
          )}
        </div>

        {hasActiveChips && (
          <div className="flex flex-wrap items-center gap-2 mb-4">
            {activeFilters.cuisine && (
              <span className="flex items-center gap-1.5 text-[13px] font-medium px-3 py-1.5 rounded-full bg-[#fbe0d5] text-[#9d1c34]">
                {activeFilters.cuisine}
                <button
                  onClick={() => setActiveFilters((f) => ({ ...f, cuisine: null }))}
                  className="bg-transparent border-none cursor-pointer text-[#9d1c34]"
                >
                  <X size={13} />
                </button>
              </span>
            )}
            {activeFilters.specialization && (
              <span className="flex items-center gap-1.5 text-[13px] font-medium px-3 py-1.5 rounded-full bg-[#fbe0d5] text-[#9d1c34]">
                {activeFilters.specialization}
                <button
                  onClick={() => setActiveFilters((f) => ({ ...f, specialization: null }))}
                  className="bg-transparent border-none cursor-pointer text-[#9d1c34]"
                >
                  <X size={13} />
                </button>
              </span>
            )}
            <button onClick={clearFilters} className="text-[13px] font-semibold text-[#9d1c34] bg-transparent border-none cursor-pointer ml-auto">
              Clear All
            </button>
          </div>
        )}

        <h2 className="text-lg font-bold text-slate-900 mb-4">
          {hasActiveChips ? `Filtered Kitchens (${filteredKitchens.length})` : `All Kitchens (${filteredKitchens.length})`}
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {filteredKitchens.map((kitchen) => (
            <KitchenCard
              key={kitchen.id}
              kitchen={kitchen}
              isFavorite={!!favorites[kitchen.id]}
              onToggleFavorite={(k) => setFavorites((f) => ({ ...f, [k.id]: !f[k.id] }))}
              onViewMenu={(k) => setSelectedKitchenId(k.id)}
            />
          ))}
        </div>
      </div>

      <FilterPanel
        open={filterOpen}
        onClose={() => setFilterOpen(false)}
        initialFilters={activeFilters}
        onApply={setActiveFilters}
      />
    </div>
  )
}