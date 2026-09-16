import { useState } from 'react'
import { X, Check, ChefHat, Star, MapPin } from 'lucide-react'

const CUISINES = ['North Indian', 'South Indian', 'Punjabi', 'Chinese', 'Continental', 'Bengali']
const SPECIALIZATIONS = ['Home Food', 'Healthy Food', 'Jain Food', 'Vegan', 'Tiffin Service', 'Pure Veg']
const RATINGS = ['Any', '4+', '3+', '2+']
const DISTANCES = ['Any', 'Up to 1 km', '1 – 3 km', '3 – 5 km']

function Chip({ label, active, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center justify-center gap-1.5 rounded-full border px-4 py-2.5 text-sm font-medium transition-colors cursor-pointer ${
        active
          ? 'bg-[#9d1c34] border-[#9d1c34] text-white'
          : 'bg-white border-[#eddcd2] text-slate-700 hover:border-[#9d1c34]/40'
      }`}
    >
      {active && <Check size={13} />}
      {label}
    </button>
  )
}


export default function FilterPanel({ open, onClose, initialFilters, onApply }) {
  const [cuisine, setCuisine] = useState(initialFilters?.cuisine ?? null)
  const [specialization, setSpecialization] = useState(initialFilters?.specialization ?? null)
  const [rating, setRating] = useState(initialFilters?.rating ?? 'Any')
  const [distance, setDistance] = useState(initialFilters?.distance ?? 'Any')

  if (!open) return null

  const reset = () => {
    setCuisine(null)
    setSpecialization(null)
    setRating('Any')
    setDistance('Any')
  }

  const apply = () => {
    onApply?.({ cuisine, specialization, rating, distance })
    onClose?.()
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40"
      onClick={onClose}
    >
      <div
        className="w-full sm:max-w-lg bg-[#fdf3ee] rounded-t-3xl sm:rounded-3xl max-h-[90vh] overflow-y-auto p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* drag handle - mobile only */}
        <div className="flex justify-center sm:hidden mb-2">
          <span className="h-1.5 w-12 rounded-full bg-slate-300" />
        </div>

        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-slate-900">Filter Kitchens</h2>
          <button onClick={onClose} className="text-slate-500 hover:text-slate-800 bg-transparent border-none cursor-pointer">
            <X size={22} />
          </button>
        </div>

        <section className="mb-6">
          <h3 className="flex items-center gap-2 text-sm font-semibold text-slate-800 mb-3">
            <ChefHat size={16} className="text-[#9d1c34]" /> Cuisine Type
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {CUISINES.map((c) => (
              <Chip key={c} label={c} active={cuisine === c} onClick={() => setCuisine(cuisine === c ? null : c)} />
            ))}
          </div>
        </section>

        <section className="mb-6">
          <h3 className="flex items-center gap-2 text-sm font-semibold text-slate-800 mb-3">
            <Star size={16} className="text-[#9d1c34]" /> Specialization
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {SPECIALIZATIONS.map((s) => (
              <Chip
                key={s}
                label={s}
                active={specialization === s}
                onClick={() => setSpecialization(specialization === s ? null : s)}
              />
            ))}
          </div>
        </section>

        <section className="mb-6">
          <h3 className="flex items-center gap-2 text-sm font-semibold text-slate-800 mb-3">
            <Star size={16} className="text-[#9d1c34]" /> Rating
          </h3>
          <div className="flex flex-wrap gap-3">
            {RATINGS.map((r) => (
              <Chip key={r} label={r} active={rating === r} onClick={() => setRating(r)} />
            ))}
          </div>
        </section>

        <section className="mb-8">
          <h3 className="flex items-center gap-2 text-sm font-semibold text-slate-800 mb-3">
            <MapPin size={16} className="text-[#9d1c34]" /> Distance
          </h3>
          <div className="flex flex-wrap gap-3">
            {DISTANCES.map((d) => (
              <Chip key={d} label={d} active={distance === d} onClick={() => setDistance(d)} />
            ))}
          </div>
        </section>

        <button
          type="button"
          onClick={apply}
          className="w-full py-3.5 rounded-xl bg-[#9d1c34] text-white font-bold text-base cursor-pointer hover:bg-[#7a1528] transition-colors"
        >
          Apply Filters
        </button>

        <button
          type="button"
          onClick={reset}
          className="w-full mt-3 text-center text-sm font-semibold text-[#9d1c34] bg-transparent border-none cursor-pointer hover:underline"
        >
          Reset Filters
        </button>
      </div>
    </div>
  )
}