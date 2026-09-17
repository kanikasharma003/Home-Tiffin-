import { Heart, Star, MapPin, Navigation } from 'lucide-react'


export default function KitchenCard({ kitchen, isFavorite, onToggleFavorite, onViewMenu }) {
  const { image, name, rating, reviews, location, distance, tags } = kitchen

  return (
    <div className="flex gap-3 sm:gap-4 rounded-2xl border border-[#f0ded3] bg-white p-3 sm:p-4 shadow-sm hover:shadow-md transition-all duration-200 ease-in-out hover:-translate-y-1">
 

     <img
  src={image}
  alt={name}
  className="h-24 w-24 sm:h-28 sm:w-28 rounded-xl object-cover flex-shrink-0 transition-all duration-200 hover:scale-105"
/>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-[15px] sm:text-base font-bold text-slate-900 truncate">{name}</h3>
          <button
            type="button"
            onClick={() => onToggleFavorite?.(kitchen)}
            className="flex-shrink-0 text-[#9d1c34] bg-transparent border-none cursor-pointer"
            aria-label="Toggle favorite"
          >
            <Heart size={18} fill={isFavorite ? '#9d1c34' : 'none'} />
          </button>
        </div>

        <div className="flex items-center gap-1 mt-1 text-[13px]">
          <Star size={13} className="text-emerald-600 fill-emerald-600" />
          <span className="font-semibold text-slate-800">{rating}</span>
          <span className="text-slate-400">({reviews} reviews)</span>
        </div>

        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1 text-[12.5px] text-slate-500">
          <span className="flex items-center gap-1">
            <MapPin size={12} /> {location}
          </span>
          <span className="flex items-center gap-1">
            <Navigation size={12} /> {distance}
          </span>
        </div>

        <div className="flex flex-wrap gap-1.5 mt-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-[#fbe0d5] text-[#9d1c34]"
            >
              {tag}
            </span>
          ))}
        </div>

        <button
          type="button"
          onClick={() => onViewMenu?.(kitchen)}
          className="mt-3 w-full sm:w-auto px-4 py-2 rounded-lg bg-[#9d1c34] text-white text-[13px] font-semibold cursor-pointer hover:bg-[#7a1528] transition-colors"
        >
          View Menu
        </button>
      </div>
    </div>
  )
}