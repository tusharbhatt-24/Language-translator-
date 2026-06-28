import { useSettings } from '../contexts/SettingsContext'
import { LANGUAGES } from '@lingo/shared'

export function Settings() {
  const { settings, updateSettings } = useSettings()

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 24px 64px' }}>
      <div style={{ marginBottom: '32px' }}>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.6875rem',
          fontWeight: 600,
          letterSpacing: '0.075em',
          textTransform: 'uppercase',
          color: 'var(--color-text-tertiary)',
          marginBottom: '6px',
        }}>
          Preferences
        </p>
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: '2rem',
          letterSpacing: '-0.025em',
          color: 'var(--color-text)',
          lineHeight: 1.2,
        }}>
          Settings
        </h1>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {/* Defaults Section */}
        <section style={{ backgroundColor: 'var(--color-surface)', padding: '24px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border-subtle)' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', marginBottom: '16px' }}>Languages</h2>
          
          <div style={{ display: 'grid', gap: '16px', gridTemplateColumns: '1fr 1fr' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-text-secondary)' }}>Default Source</label>
              <select
                value={settings.defaultSourceLang}
                onChange={(e) => updateSettings({ defaultSourceLang: e.target.value })}
                style={{
                  padding: '12px',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--color-border)',
                  backgroundColor: 'var(--color-bg)',
                  color: 'var(--color-text)',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.9375rem',
                }}
              >
                <option value="auto">Detect language</option>
                {LANGUAGES.map((l) => <option key={l.code} value={l.code}>{l.name}</option>)}
              </select>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-text-secondary)' }}>Default Target</label>
              <select
                value={settings.defaultTargetLang}
                onChange={(e) => updateSettings({ defaultTargetLang: e.target.value })}
                style={{
                  padding: '12px',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--color-border)',
                  backgroundColor: 'var(--color-bg)',
                  color: 'var(--color-text)',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.9375rem',
                }}
              >
                {LANGUAGES.map((l) => <option key={l.code} value={l.code}>{l.name}</option>)}
              </select>
            </div>
          </div>
        </section>

        {/* Toggles Section */}
        <section style={{ backgroundColor: 'var(--color-surface)', padding: '24px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border-subtle)' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', marginBottom: '16px' }}>Experience</h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
              <div>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', fontWeight: 600, color: 'var(--color-text)' }}>Auto-speak translations</p>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: 'var(--color-text-tertiary)', marginTop: '4px' }}>Automatically read aloud when translation completes.</p>
              </div>
              <input
                type="checkbox"
                checked={settings.autoSpeak}
                onChange={(e) => updateSettings({ autoSpeak: e.target.checked })}
                style={{ width: '24px', height: '24px', accentColor: 'var(--color-accent)' }}
              />
            </label>

            <div style={{ height: '1px', backgroundColor: 'var(--color-border-subtle)' }} />

            <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
              <div>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', fontWeight: 600, color: 'var(--color-text)' }}>Dark Mode</p>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: 'var(--color-text-tertiary)', marginTop: '4px' }}>Toggle dark appearance.</p>
              </div>
              <input
                type="checkbox"
                checked={settings.darkMode}
                onChange={(e) => updateSettings({ darkMode: e.target.checked })}
                style={{ width: '24px', height: '24px', accentColor: 'var(--color-accent)' }}
              />
            </label>
          </div>
        </section>

        {/* About Section */}
        <section style={{ backgroundColor: 'var(--color-surface)', padding: '24px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border-subtle)' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', marginBottom: '16px' }}>About Lingo</h2>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9375rem', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
            Lingo is a simple, real-time translator built to bridge languages without the noise. 
            It uses the free MyMemory and LibreTranslate APIs for text translation, and native web/mobile APIs for voice recognition and text-to-speech.
            <br /><br />
            Built with React, React Native, and a shared architecture to keep everything in sync.
          </p>
        </section>
      </div>
    </div>
  )
}
