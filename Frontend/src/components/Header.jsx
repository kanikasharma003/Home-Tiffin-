import { useState } from 'react'
import { Icon } from './ui.jsx'
import { NAV_LINKS } from '../data.js'

/* ============================== HEADER / NAVBAR ============================== */

export function Header({ mode, onModeChange }) {
  const [open, setOpen] = useState(false)

  return (
    <header
      className="sticky inset-x-0 top-0 z-50 border-b"
      style={{ background: 'var(--color-white)', borderColor: 'var(--color-border)' }}
    >
      <div className="mx-auto max-w-7xl px-4">
        <nav className="flex items-center justify-between gap-3 py-3 sm:px-1">
          <a href="#home" className="flex items-center gap-2">
            <span
              className="grid h-9 w-9 place-items-center rounded-xl text-lg shadow-md"
              style={{ background: 'var(--primary)' }}
            >
              🍱
            </span>
            <span className="font-display text-lg font-bold tracking-tight" style={{ color: 'var(--color-heading)' }}>
              TiffinBox
            </span>
          </a>

          <div className="hidden items-center gap-6 lg:flex">
            {NAV_LINKS.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="text-sm font-medium transition-colors"
                style={{ color: 'var(--color-text)' }}
              >
                {l.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <div className="diet-toggle hidden sm:inline-flex" role="group" aria-label="Choose diet theme">
              <button
                type="button"
                className={mode === 'veg' ? 'active veg' : ''}
                onClick={() => onModeChange('veg')}
              >
                🌿 Veg
              </button>
              <button
                type="button"
                className={mode === 'nonveg' ? 'active nonveg' : ''}
                onClick={() => onModeChange('nonveg')}
              >
                🍗 Non-Veg
              </button>
            </div>
            <a href="#plans" className="btn btn-primary hidden !px-5 !py-2 text-xs md:inline-flex">
              Order Now
            </a>
            <button
              type="button"
              aria-label="Toggle menu"
              className="grid h-9 w-9 place-items-center rounded-full border lg:hidden"
              style={{ borderColor: 'var(--color-border)', color: 'var(--color-heading)' }}
              onClick={() => setOpen((o) => !o)}
            >
              <Icon name={open ? 'minus' : 'plus'} size={16} />
            </button>
          </div>
        </nav>

        {open && (
          <div
            className="mx-auto mb-3 flex flex-col gap-1 rounded-2xl border p-3 lg:hidden"
            style={{ background: 'var(--color-white)', borderColor: 'var(--color-border)' }}
          >
            {NAV_LINKS.map((l) => (
              <a
                key={l.label}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-2 text-sm font-medium"
                style={{ color: 'var(--color-text)' }}
              >
                {l.label}
              </a>
            ))}
            <div className="diet-toggle mt-1 self-start">
              <button
                type="button"
                className={mode === 'veg' ? 'active veg' : ''}
                onClick={() => onModeChange('veg')}
              >
                🌿 Veg
              </button>
              <button
                type="button"
                className={mode === 'nonveg' ? 'active nonveg' : ''}
                onClick={() => onModeChange('nonveg')}
              >
                🍗 Non-Veg
              </button>
            </div>
            <a href="#plans" className="btn btn-primary mt-2 justify-center">
              Order Now
            </a>
          </div>
        )}
      </div>
    </header>
  )
}
