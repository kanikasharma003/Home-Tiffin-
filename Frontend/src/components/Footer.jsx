/* ============================== FOOTER ============================== */

export function Footer() {
  const cols = [
    {
      title: 'Explore',
      links: ['Home', 'Menu', 'Plans', 'How It Works', 'About Us'],
    },
    {
      title: 'Contact',
      links: ['FAQs', 'Privacy Policy', 'Refund Policy', 'Terms & Conditions'],
    },
    {
      title: 'Get in Touch',
      links: ['Chowk, Nagpur 440001', '+1 222 528 7990', 'hello@tiffinbox.com'],
    },
  ]

  return (
    <footer
      className="text-white"
      style={{ background: 'var(--footer-bg)', transition: 'background-color 0.45s ease' }}
    >
      <div className="mx-auto max-w-7xl px-4 py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <div className="flex items-center gap-2">
              <span
                className="grid h-9 w-9 place-items-center rounded-xl text-lg"
                style={{ background: 'var(--primary)' }}
              >
                🍱
              </span>
              <span className="font-display text-lg font-bold">TiffinBox</span>
            </div>
            <p className="mt-4 max-w-xs text-[13px] leading-relaxed text-white/65">
              Experience the taste of authentic homestyle food with our daily
              tiffin service. Fresh, healthy and made with love.
            </p>
            <div className="mt-5 flex gap-2.5">
              {['f', 'in', '𝕏', '▶'].map((s) => (
                <a
                  key={s}
                  href="#home"
                  className="grid h-9 w-9 place-items-center rounded-full bg-white/10 text-xs font-bold transition-colors hover:bg-white/25"
                >
                  {s}
                </a>
              ))}
            </div>
          </div>

          {cols.map((col) => (
            <div key={col.title}>
              <h4 className="font-display text-sm font-bold uppercase tracking-wider text-white/90">
                {col.title}
              </h4>
              <ul className="mt-4 flex flex-col gap-2.5">
                {col.links.map((l) => (
                  <li key={l}>
                    <a href="#home" className="text-[13px] text-white/65 transition-colors hover:text-white">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h4 className="font-display text-sm font-bold uppercase tracking-wider text-white/90">
              Stay Updated
            </h4>
            <p className="mt-4 text-[13px] text-white/65">
              Get delivery updates and offers in your inbox.
            </p>
            <form className="mt-4 flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input
                className="theme-input !border-white/20 !bg-white/10 !text-white placeholder:!text-white/45"
                placeholder="Your email"
              />
              <button type="submit" className="btn btn-primary shrink-0 !px-5 !py-2.5 text-xs">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div
          className="mt-12 flex flex-col items-center justify-between gap-3 border-t pt-6 text-xs text-white/55 sm:flex-row"
          style={{ borderColor: 'rgba(255,255,255,0.12)' }}
        >
          <p>© 2026 TiffinBox. All rights reserved.</p>
          <p>Made with 🧡 Good Food, aHappier Days</p>
        </div>
      </div>
    </footer>
  )
}
