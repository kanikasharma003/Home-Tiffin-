import { Trash2 } from 'lucide-react'


export default function Cart({
  kitchen,
  items,
  onIncrement,
  onDecrement,
  onRemove,
  onCheckout,
  deliveryFee = 30,
  taxRate = 0.09,
}) {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0)
  const taxes = Math.round(subtotal * taxRate)
  const total = subtotal + (items.length ? deliveryFee : 0) + taxes

  if (items.length === 0) {
    return (
      <div className="max-w-xl mx-auto text-center py-16">
        <p className="text-slate-500">Your cart is empty.</p>
      </div>
    )
  }

  return (
    <div className="max-w-xl mx-auto">
      {kitchen && (
        <div className="flex items-center gap-3 rounded-2xl bg-white border border-[#f0ded3] p-4 mb-4">
          <img src={kitchen.image} alt={kitchen.name} className="h-12 w-12 rounded-full object-cover" />
          <div className="min-w-0">
            <h3 className="text-[15px] font-bold text-slate-900 truncate">{kitchen.name}</h3>
            <p className="text-[12.5px] text-emerald-600 font-medium truncate">
              ● Open <span className="text-slate-400 font-normal">| {kitchen.location} · {kitchen.timings}</span>
            </p>
          </div>
        </div>
      )}

      <div className="flex flex-col gap-3">
        {items.map((item) => (
          <div key={item.id} className="flex gap-3 rounded-2xl bg-white border border-[#f0ded3] p-3">
            <img src={item.image} alt={item.name} className="h-16 w-16 rounded-xl object-cover flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <h4 className="text-[14px] font-bold text-slate-900 truncate">{item.name}</h4>
                <span className="text-[14px] font-bold text-slate-900 flex-shrink-0">₹ {item.price * item.qty}</span>
              </div>
              <p className="text-[12.5px] text-slate-500 mt-0.5">₹ {item.price}</p>

              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center gap-2 rounded-lg bg-[#fbe0d5] px-1 py-1">
                  <button
                    onClick={() => onDecrement?.(item)}
                    className="h-6 w-6 rounded-md bg-white text-[#9d1c34] font-bold cursor-pointer border-none"
                  >
                    −
                  </button>
                  <span className="text-sm font-semibold text-slate-800 w-4 text-center">{item.qty}</span>
                  <button
                    onClick={() => onIncrement?.(item)}
                    className="h-6 w-6 rounded-md bg-white text-[#9d1c34] font-bold cursor-pointer border-none"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => onRemove?.(item)}
                  className="flex items-center gap-1 text-[12.5px] text-[#9d1c34] font-semibold bg-transparent border-none cursor-pointer hover:underline"
                >
                  <Trash2 size={13} /> Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-2xl bg-white border border-[#f0ded3] p-4 mt-4">
        <div className="flex justify-between text-[14px] text-slate-600 mb-2">
          <span>Subtotal</span><span>₹ {subtotal}</span>
        </div>
        <div className="flex justify-between text-[14px] text-slate-600 mb-2">
          <span>Delivery Fee</span><span>₹ {deliveryFee}</span>
        </div>
        <div className="flex justify-between text-[14px] text-slate-600 mb-3">
          <span>Taxes & Fees</span><span>₹ {taxes}</span>
        </div>
        <div className="h-px bg-[#f0ded3] mb-3" />
        <div className="flex justify-between text-base font-bold text-slate-900 mb-4">
          <span>Total</span><span>₹ {total}</span>
        </div>

        <button
          type="button"
          onClick={onCheckout}
          className="w-full py-3.5 rounded-xl bg-[#9d1c34] text-white font-bold text-base cursor-pointer hover:bg-[#7a1528] transition-colors flex items-center justify-center gap-2"
        >
          Proceed to Checkout →
        </button>
      </div>
    </div>
  )
}