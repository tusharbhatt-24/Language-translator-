import { NavLink } from 'react-router-dom'
import { Languages, Clock3, Settings } from 'lucide-react'
import { APP_NAME } from '@lingo/shared'

const navItems = [
  { to: '/translate', label: 'translate', icon: Languages },
  { to: '/history',   label: 'history',   icon: Clock3 },
  { to: '/settings',  label: 'settings',  icon: Settings },
] as const

export function TopBar() {
  return (
    <header
      style={{
        borderBottom: '1px solid var(--color-border)',
        backgroundColor: 'var(--color-bg)',
        position: 'sticky',
        top: 0,
        zIndex: 20,
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 24px',
          height: '56px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Wordmark — left-aligned, intentionally not centred */}
        <a
          href="/translate"
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: '1.25rem',
            letterSpacing: '-0.03em',
            color: 'var(--color-text)',
            textDecoration: 'none',
            userSelect: 'none',
          }}
        >
          {APP_NAME}
          {/* Accent dot — single confident mark */}
          <span style={{ color: 'var(--color-accent)', marginLeft: '2px' }}>.</span>
        </a>

        {/* Navigation — right-justified */}
        <nav aria-label="Main navigation">
          <ul
            style={{
              display: 'flex',
              gap: '4px',
              listStyle: 'none',
              margin: 0,
              padding: 0,
            }}
          >
            {navItems.map(({ to, label, icon: Icon }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  style={({ isActive }) => ({
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '6px 12px',
                    borderRadius: 'var(--radius)',
                    textDecoration: 'none',
                    fontSize: '0.875rem',
                    fontWeight: isActive ? 600 : 400,
                    color: isActive ? 'var(--color-accent)' : 'var(--color-text-secondary)',
                    backgroundColor: isActive ? 'var(--color-accent-subtle)' : 'transparent',
                    transition: `color var(--duration-fast) var(--ease-out),
                                 background-color var(--duration-fast) var(--ease-out)`,
                  })}
                >
                  {({ isActive }) => (
                    <>
                      <Icon
                        size={15}
                        strokeWidth={isActive ? 2.5 : 1.75}
                        aria-hidden="true"
                      />
                      <span>{label}</span>
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}
