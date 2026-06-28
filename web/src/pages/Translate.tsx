import { Languages, ArrowRightLeft } from 'lucide-react'

export function Translate() {
  return (
    <div
      style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '48px 24px',
      }}
    >
      {/* Page header — left-aligned */}
      <div style={{ marginBottom: '40px' }}>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.75rem',
            fontWeight: 600,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'var(--color-text-tertiary)',
            marginBottom: '8px',
          }}
        >
          Translate
        </p>
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '2.25rem',
            fontWeight: 700,
            letterSpacing: '-0.03em',
            color: 'var(--color-text)',
            margin: 0,
          }}
        >
          Type to translate.
        </h1>
      </div>

      {/* Translation canvas placeholder */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr auto 1fr',
          gap: '16px',
          alignItems: 'start',
        }}
      >
        {/* Source panel */}
        <div
          style={{
            backgroundColor: 'var(--color-surface)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--color-border)',
            padding: '20px',
            minHeight: '220px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <span
              style={{
                fontSize: '0.8125rem',
                fontWeight: 600,
                color: 'var(--color-text-secondary)',
              }}
            >
              Detect language
            </span>
            <Languages size={14} color="var(--color-text-tertiary)" />
          </div>
          <p
            style={{
              color: 'var(--color-text-tertiary)',
              fontSize: '0.9375rem',
              margin: 0,
            }}
          >
            Translation input will go here.
          </p>
        </div>

        {/* Swap button */}
        <button
          aria-label="Swap languages"
          style={{
            width: '40px',
            height: '40px',
            borderRadius: 'var(--radius)',
            border: '1px solid var(--color-border)',
            backgroundColor: 'var(--color-bg)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            marginTop: '44px',
            transition: `background-color var(--duration-fast) var(--ease-out),
                         border-color var(--duration-fast) var(--ease-out)`,
            flexShrink: 0,
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'var(--color-surface)'
            ;(e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--color-border-strong)'
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'var(--color-bg)'
            ;(e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--color-border)'
          }}
        >
          <ArrowRightLeft size={16} color="var(--color-text-secondary)" />
        </button>

        {/* Target panel */}
        <div
          style={{
            backgroundColor: 'var(--color-surface)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--color-border)',
            padding: '20px',
            minHeight: '220px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <span
              style={{
                fontSize: '0.8125rem',
                fontWeight: 600,
                color: 'var(--color-accent)',
              }}
            >
              Spanish
            </span>
            <Languages size={14} color="var(--color-text-tertiary)" />
          </div>
          <p
            style={{
              color: 'var(--color-text-tertiary)',
              fontSize: '0.9375rem',
              margin: 0,
            }}
          >
            Translation output will appear here.
          </p>
        </div>
      </div>

      {/* Placeholder action row */}
      <div
        style={{
          marginTop: '16px',
          display: 'flex',
          gap: '8px',
          justifyContent: 'flex-end',
        }}
      >
        <button
          style={{
            padding: '10px 20px',
            borderRadius: 'var(--radius)',
            border: 'none',
            backgroundColor: 'var(--color-accent)',
            color: '#fff',
            fontFamily: 'var(--font-body)',
            fontSize: '0.875rem',
            fontWeight: 600,
            cursor: 'pointer',
            transition: `background-color var(--duration-fast) var(--ease-out)`,
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'var(--color-accent-hover)'
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'var(--color-accent)'
          }}
        >
          Translate
        </button>
      </div>
    </div>
  )
}
