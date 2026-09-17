
export default function Menu({ dishes, cartQuantities = {}, onAdd, onIncrement, onDecrement }) {
  return (
    <div className="flex flex-col gap-3 sm:gap-4 ">
      {dishes.map((dish) => {
        const qty = cartQuantities[dish.id] || 0
        return (
          <div
            key={dish.id}
            className="flex gap-3 rounded-2xl border border-[#f0ded3] bg-white p-3 hover:shadow-md transition-all duration-200 ease-in-out hover:-translate-y-1"
          >
            <img
              src={dish.image}
              alt={dish.name}
              className="h-20 w-20 rounded-xl object-cover flex-shrink-0 transition-all duration-200 hover:scale-105"
            />
            <div className="flex-1 min-w-0">
              <h4 className="text-[14.5px] font-bold text-slate-900">{dish.name}</h4>
              {dish.description && (
                <p className="text-[12.5px] text-slate-500 mt-0.5 line-clamp-2">{dish.description}</p>
              )}

              <div className="flex items-center justify-between mt-2 flex-wrap gap-2">
                <div>
                  <span className="text-[14px] font-bold text-slate-900">₹ {dish.price}</span>
                  {dish.available !== false && (
                    <span className="ml-2 inline-flex items-center gap-1 text-[11px] font-medium text-emerald-600">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Available
                    </span>
                  )}
                </div>

                {qty === 0 ? (
                  <button
                    type="button"
                    onClick={() => onAdd?.(dish)}
                    className="px-4 py-1.5 rounded-lg bg-[#9d1c34] text-white text-[13px] font-semibold cursor-pointer hover:bg-[#7a1528] transition-colors"
                  >
                    Add
                  </button>
                ) : (
                  <div className="flex items-center gap-2 rounded-lg bg-[#fbe0d5] px-1 py-1">
                    <button
                      onClick={() => onDecrement?.(dish)}
                      className="h-6 w-6 rounded-md bg-white text-[#9d1c34] font-bold cursor-pointer border-none"
                    >
                      −
                    </button>
                    <span className="text-sm font-semibold text-slate-800 w-4 text-center">{qty}</span>
                    <button
                      onClick={() => onIncrement?.(dish)}
                      className="h-6 w-6 rounded-md bg-white text-[#9d1c34] font-bold cursor-pointer border-none"
                    >
                      +
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}