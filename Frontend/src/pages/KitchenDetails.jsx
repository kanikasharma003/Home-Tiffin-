import { useState } from 'react'
import { Heart, Star, MapPin, ChefHat } from 'lucide-react'
import Menu from './Menu'
import img1 from "../assets/rice.jpg"
import img2 from "../assets/dal.jpg"
import img3 from "../assets/biryani.jpg"



export default function KitchenDetail({
  kitchen,
  cartQuantities,
  onAddDish,
  onIncrementDish,
  onDecrementDish,
  isFavorite,
  onToggleFavorite,
}) {
  const [imgIndex, setImgIndex] = useState(0)
  const images = kitchen.images?.length ? kitchen.images : [kitchen.image]

  
  const dishes = [
    {
      id: "rice",
      name: "Rice",
      description: "Freshly cooked steamed basmati rice",
      image: img1,
      price: 79,
      available: "No"
    },
    {
      id: "daal",
      name: "Daal",
      description: "Freshly cooked daal",
      image: img2,
      price: 70,
      available: "Yes"
    },
    {
      id: "Biryani",
      name: "Biryani",
      description: "Freshbiryani",
      image: img3,
      price: 100,
      available: "Yes"
    }

  ]

  return (
    <div className="max-w-3xl mx-auto">
     
      <div className="relative rounded-sm overflow-hidden">
        <img
          src={images[imgIndex]}
          alt={kitchen.name}
          className="w-full h-56 sm:h-72 object-cover"
        />
       
        {images.length > 1 && (
          <div className="absolute bottom-3 left-3 flex gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setImgIndex(i)}
                className={`h-1.5 rounded-full transition-all border-none cursor-pointer ${
                  i === imgIndex ? 'w-5 bg-white' : 'w-1.5 bg-gray-100'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Info card */}
      <div className="bg-white rounded-2xl -mt-6 relative z-10 mx-3 sm:mx-0 p-5 shadow-sm border border-[#f0ded3]">
        <div className="flex items-start gap-3">
          <div className="h-14 w-14 rounded-full bg-[#9d1c34] flex items-center justify-center text-white text-2xl flex-shrink-0">
            <ChefHat size={12} color='white'/>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <h2 className="text-lg font-bold text-slate-900 truncate">{kitchen.name}</h2>
              <button
                onClick={() => onToggleFavorite?.(kitchen)}
                className="text-[#9d1c34] bg-transparent border-none cursor-pointer flex-shrink-0"
              >
                <Heart size={20} fill={isFavorite ? '#9d1c34' : 'none'} />
              </button>
            </div>

            <div className="flex items-center gap-1 mt-1 text-[13px]">
              <Star size={13} className="text-emerald-600 fill-emerald-600" />
              <span className="font-semibold text-slate-800">{kitchen.rating}</span>
              <span className="text-slate-400">({kitchen.reviews} reviews)</span>
            </div>

            <p className="flex items-center gap-1 text-[13px] text-slate-500 mt-1">
              <MapPin size={13} /> {kitchen.location}
            </p>

            <p className="text-[13px] mt-1">
              <span className="text-emerald-600 font-semibold">● Open</span>
              <span className="text-slate-500"> &nbsp;Timings: {kitchen.timings}</span>
            </p>

            <div className="flex flex-wrap gap-1.5 mt-3">
              {kitchen.tags?.map((tag) => (
                <span
                  key={tag}
                  className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-[#fbe0d5] text-[#9d1c34]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {kitchen.about && (
          <div className="mt-5 rounded-xl bg-[#fdf3ee] p-4">
            <h3 className="text-sm font-bold text-slate-800 mb-1">About This Kitchen</h3>
            <p className="text-[13px] text-slate-600 leading-relaxed">{kitchen.about}</p>
          </div>
        )}
      </div>

      {/* Menu */}
      <div className="mt-6 px-3 sm:px-0">
        <h3 className="text-base font-bold text-slate-900 mb-3">Menu</h3>
        <Menu
          dishes={dishes}
          cartQuantities={cartQuantities}
          onAdd={onAddDish}
          onIncrement={onIncrementDish}
          onDecrement={onDecrementDish}
        />
      </div>
    </div>
  )
}