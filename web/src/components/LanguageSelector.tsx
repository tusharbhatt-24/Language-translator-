import { useState, useRef, useEffect, useId } from 'react'
import { ChevronDown, Search } from 'lucide-react'
import { LANGUAGES, AUTO_DETECT, type Language } from '@lingo/shared'

interface LanguageSelectorProps {
  value: string            // language code or 'auto'
  onChange: (code: string) => void
  allowAuto?: boolean      // show "Detect language" option
  accentWhenSelected?: boolean // tint the label terracotta when a non-auto lang is chosen
  label?: string           // accessible label for the trigger button
}

export function LanguageSelector({
  value,
  onChange,
  allowAuto = false,
  accentWhenSelected = false,
  label = 'Select language',
}: LanguageSelectorProps) {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const containerRef = useRef<HTMLDivElement>(null)
  const searchRef = useRef<HTMLInputElement>(null)
  const listboxId = useId()

  const selected: Language | undefined = LANGUAGES.find((l) => l.code === value)
  const displayLabel =
    value === AUTO_DETECT ? 'Detect language' : (selected?.name ?? value)

  // Filter languages by search
  const filtered = search.trim()
    ? LANGUAGES.filter(
        (l) =>
          l.name.toLowerCase().includes(search.toLowerCase()) ||
          l.nativeName.toLowerCase().includes(search.toLowerCase()) ||
          l.code.toLowerCase().startsWith(search.toLowerCase())
      )
    : LANGUAGES

  // Close on outside click
  useEffect(() => {
    function handle(e: MouseEvent) {
      if (!containerRef.current?.contains(e.target as Node)) {
        setOpen(false)
        setSearch('')
      }
    }
    document.addEventListener('mousedown', handle)
    return () => document.removeEventListener('mousedown', handle)
  }, [])

  // Focus search on open
  useEffect(() => {
    if (open) setTimeout(() => searchRef.current?.focus(), 10)
  }, [open])

  const isAccented = accentWhenSelected && value !== AUTO_DETECT

  return (
    <div ref={containerRef} style={{ position: 'relative' }}>
      {/* Trigger */}
      <button
        aria-label={label}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listboxId}
        onClick={() => setOpen((o) => !o)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '5px',
          padding: '4px 8px 4px 6px',
          borderRadius: 'var(--radius)',
          border: '1px solid transparent',
          backgroundColor: isAccented ? 'var(--color-accent-subtle)' : 'transparent',
          cursor: 'pointer',
          color: isAccented ? 'var(--color-accent)' : 'var(--color-text-secondary)',
          fontSize: '0.8125rem',
          fontWeight: 600,
          fontFamily: 'var(--font-body)',
          transition: `background-color var(--duration-fast) var(--ease-out), border-color var(--duration-fast) var(--ease-out)`,
          whiteSpace: 'nowrap',
        }}
        onMouseEnter={(e) => {
          if (!open) {
            const el = e.currentTarget
            el.style.backgroundColor = isAccented ? 'var(--color-accent-muted)' : 'var(--color-surface)'
            el.style.borderColor = 'var(--color-border)'
          }
        }}
        onMouseLeave={(e) => {
          if (!open) {
            const el = e.currentTarget
            el.style.backgroundColor = isAccented ? 'var(--color-accent-subtle)' : 'transparent'
            el.style.borderColor = 'transparent'
          }
        }}
      >
        <span>{displayLabel}</span>
        <ChevronDown
          size={13}
          style={{
            transition: `transform var(--duration-fast) var(--ease-out)`,
            transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
          }}
        />
      </button>

      {/* Dropdown */}
      {open && (
        <div
          role="listbox"
          id={listboxId}
          aria-label="Languages"
          style={{
            position: 'absolute',
            top: 'calc(100% + 6px)',
            left: 0,
            width: '220px',
            backgroundColor: 'var(--color-bg)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-lg)',
            boxShadow: '0 8px 24px rgba(26,22,20,0.12)',
            zIndex: 50,
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* Search */}
          <div
            style={{
              padding: '8px',
              borderBottom: '1px solid var(--color-border-subtle)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <Search size={13} color="var(--color-text-tertiary)" />
            <input
              ref={searchRef}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search languages…"
              style={{
                flex: 1,
                border: 'none',
                outline: 'none',
                backgroundColor: 'transparent',
                fontFamily: 'var(--font-body)',
                fontSize: '0.8125rem',
                color: 'var(--color-text)',
                minWidth: 0,
              }}
            />
          </div>

          {/* Options list */}
          <div style={{ overflowY: 'auto', maxHeight: '240px' }}>
            {allowAuto && (
              <LanguageOption
                code={AUTO_DETECT}
                name="Detect language"
                selected={value === AUTO_DETECT}
                onSelect={() => { onChange(AUTO_DETECT); setOpen(false); setSearch('') }}
              />
            )}
            {filtered.length === 0 && (
              <p style={{
                padding: '16px 12px',
                margin: 0,
                fontSize: '0.8125rem',
                color: 'var(--color-text-tertiary)',
                textAlign: 'center',
              }}>
                No results
              </p>
            )}
            {filtered.map((lang) => (
              <LanguageOption
                key={lang.code}
                code={lang.code}
                name={lang.name}
                nativeName={lang.nativeName}
                selected={value === lang.code}
                onSelect={() => { onChange(lang.code); setOpen(false); setSearch('') }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

// ─── Option item ──────────────────────────────────────────────────────────────

interface LanguageOptionProps {
  code: string
  name: string
  nativeName?: string
  selected: boolean
  onSelect: () => void
}

function LanguageOption({ name, nativeName, selected, onSelect }: LanguageOptionProps) {
  return (
    <button
      role="option"
      aria-selected={selected}
      onClick={onSelect}
      style={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '8px 12px',
        border: 'none',
        backgroundColor: selected ? 'var(--color-accent-subtle)' : 'transparent',
        cursor: 'pointer',
        textAlign: 'left',
        fontFamily: 'var(--font-body)',
        transition: `background-color var(--duration-fast) var(--ease-out)`,
      }}
      onMouseEnter={(e) => {
        if (!selected) (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'var(--color-surface)'
      }}
      onMouseLeave={(e) => {
        if (!selected) (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'transparent'
      }}
    >
      <span style={{
        fontSize: '0.875rem',
        fontWeight: selected ? 600 : 400,
        color: selected ? 'var(--color-accent)' : 'var(--color-text)',
      }}>
        {name}
      </span>
      {nativeName && nativeName !== name && (
        <span style={{ fontSize: '0.75rem', color: 'var(--color-text-tertiary)' }}>
          {nativeName}
        </span>
      )}
    </button>
  )
}
