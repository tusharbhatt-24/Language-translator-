import { Settings as SettingsIcon, Moon, Volume2, Database, ChevronRight } from 'lucide-react'

interface SettingRowProps {
  icon: React.ElementType
  label: string
  description: string
  value?: string
}

function SettingRow({ icon: Icon, label, description, value }: SettingRowProps) {
  return (
    <button
      style={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        gap: '14px',
        padding: '14px 0',
        borderBottom: '1px solid var(--color-border-subtle)',
        backgroundColor: 'transparent',
        border: 'none',
        borderBottom: '1px solid var(--color-border-subtle)',
        cursor: 'pointer',
        textAlign: 'left',
        transition: `opacity var(--duration-fast) var(--ease-out)`,
      }}
      onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = '0.7' }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = '1' }}
    >
      <div
        style={{
          width: '34px',
          height: '34px',
          borderRadius: 'var(--radius)',
          backgroundColor: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <Icon size={16} color="var(--color-text-secondary)" />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <p
          style={{
            margin: 0,
            fontSize: '0.9375rem',
            fontWeight: 500,
            color: 'var(--color-text)',
          }}
        >
          {label}
        </p>
        <p
          style={{
            margin: '2px 0 0',
            fontSize: '0.8125rem',
            color: 'var(--color-text-secondary)',
          }}
        >
          {description}
        </p>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
        {value && (
          <span
            style={{
              fontSize: '0.8125rem',
              color: 'var(--color-text-tertiary)',
            }}
          >
            {value}
          </span>
        )}
        <ChevronRight size={14} color="var(--color-text-tertiary)" />
      </div>
    </button>
  )
}

export function Settings() {
  return (
    <div
      style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '48px 24px',
      }}
    >
      {/* Page header */}
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
          Settings
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
          Preferences.
        </h1>
      </div>

      {/* Settings list — left-aligned, not card-wrapped */}
      <div style={{ maxWidth: '520px' }}>
        <p
          style={{
            fontSize: '0.75rem',
            fontWeight: 600,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            color: 'var(--color-text-tertiary)',
            marginBottom: '8px',
            marginTop: 0,
          }}
        >
          Appearance
        </p>
        <SettingRow
          icon={Moon}
          label="Theme"
          description="Light, dark, or match your system."
          value="System"
        />
        <SettingRow
          icon={Volume2}
          label="Speech"
          description="Enable voice input and output."
          value="On"
        />

        <p
          style={{
            fontSize: '0.75rem',
            fontWeight: 600,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            color: 'var(--color-text-tertiary)',
            marginBottom: '8px',
            marginTop: '28px',
          }}
        >
          Privacy
        </p>
        <SettingRow
          icon={Database}
          label="Save history"
          description="Store translations locally on this device."
          value="On"
        />
        <SettingRow
          icon={SettingsIcon}
          label="Default languages"
          description="Set your most-used language pair."
          value="Auto → Spanish"
        />
      </div>
    </div>
  )
}
