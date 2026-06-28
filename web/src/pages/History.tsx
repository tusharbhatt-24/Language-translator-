import { useState } from 'react'
import { Trash2 } from 'lucide-react'
import { useHistory, type HistoryItem } from '../contexts/HistoryContext'
import { LANGUAGE_MAP } from '@lingo/shared'
import { useNavigate } from 'react-router-dom'

export function History() {
  const { history, removeHistoryItem, clearHistory } = useHistory()
  const navigate = useNavigate()

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 24px 64px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
        <div>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.6875rem',
            fontWeight: 600,
            letterSpacing: '0.075em',
            textTransform: 'uppercase',
            color: 'var(--color-text-tertiary)',
            marginBottom: '6px',
          }}>
            Log
          </p>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '2rem',
            letterSpacing: '-0.025em',
            color: 'var(--color-text)',
            lineHeight: 1.2,
          }}>
            Translation History
          </h1>
        </div>

        {history.length > 0 && (
          <button
            onClick={clearHistory}
            style={{
              padding: '8px 16px',
              borderRadius: 'var(--radius)',
              backgroundColor: 'transparent',
              color: 'var(--color-error)',
              border: '1px solid var(--color-error-subtle)',
              fontFamily: 'var(--font-body)',
              fontWeight: 600,
              fontSize: '0.875rem',
              cursor: 'pointer',
              transition: 'background-color var(--duration-fast)',
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'var(--color-error-subtle)' }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'transparent' }}
          >
            Clear all
          </button>
        )}
      </div>

      {history.length === 0 ? (
        <div style={{
          padding: '64px 32px',
          textAlign: 'center',
          backgroundColor: 'var(--color-surface)',
          borderRadius: 'var(--radius-lg)',
          border: '1px dashed var(--color-border)',
        }}>
          <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 500, color: 'var(--color-text-secondary)', marginBottom: '8px' }}>
            No history yet
          </p>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9375rem', color: 'var(--color-text-tertiary)' }}>
            Translations you make will appear here automatically.
          </p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {history.map((item) => (
            <HistoryCard key={item.id} item={item} onRemove={removeHistoryItem} onClick={() => {
              // Usually we'd pass state to the translate screen to load it. 
              // Using react-router state is an easy way.
              navigate('/translate', { state: { historyItem: item } })
            }} />
          ))}
        </div>
      )}
    </div>
  )
}

function HistoryCard({ item, onRemove, onClick }: { item: HistoryItem, onRemove: (id: string) => void, onClick: () => void }) {
  const [isHovered, setIsHovered] = useState(false)
  const sourceName = LANGUAGE_MAP[item.sourceLang]?.name || item.sourceLang
  const targetName = LANGUAGE_MAP[item.targetLang]?.name || item.targetLang

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'stretch',
        backgroundColor: 'var(--color-surface)',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--color-border-subtle)',
        overflow: 'hidden',
        transition: 'border-color var(--duration-fast)',
        borderColor: isHovered ? 'var(--color-border)' : 'var(--color-border-subtle)',
      }}
    >
      <div 
        onClick={onClick}
        style={{
          flex: 1,
          padding: '16px',
          cursor: 'pointer',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-text-secondary)' }}>{sourceName}</span>
          <span style={{ color: 'var(--color-text-tertiary)' }}>→</span>
          <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-accent)' }}>{targetName}</span>
        </div>
        
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', color: 'var(--color-text)', marginBottom: '4px' }}>
          {item.sourceText}
        </p>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9375rem', color: 'var(--color-text-secondary)' }}>
          {item.translatedText}
        </p>
      </div>

      <button
        onClick={() => onRemove(item.id)}
        style={{
          width: '48px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: isHovered ? 'var(--color-error-subtle)' : 'transparent',
          border: 'none',
          borderLeft: '1px solid',
          borderColor: isHovered ? 'var(--color-border-subtle)' : 'transparent',
          color: isHovered ? 'var(--color-error)' : 'transparent',
          cursor: 'pointer',
          transition: 'all var(--duration-fast)',
        }}
        aria-label="Delete history item"
      >
        <Trash2 size={16} />
      </button>
    </div>
  )
}
