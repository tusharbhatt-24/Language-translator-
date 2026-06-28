import React, { createContext, useContext, useEffect, useState } from 'react'

export interface HistoryItem {
  id: string
  sourceText: string
  translatedText: string
  sourceLang: string
  targetLang: string
  timestamp: number
}

interface HistoryContextValue {
  history: HistoryItem[]
  addHistoryItem: (item: Omit<HistoryItem, 'id' | 'timestamp'>) => void
  removeHistoryItem: (id: string) => void
  clearHistory: () => void
}

const HistoryContext = createContext<HistoryContextValue | undefined>(undefined)

export function HistoryProvider({ children }: { children: React.ReactNode }) {
  const [history, setHistory] = useState<HistoryItem[]>(() => {
    try {
      const saved = localStorage.getItem('lingo_history')
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem('lingo_history', JSON.stringify(history))
  }, [history])

  const addHistoryItem = (item: Omit<HistoryItem, 'id' | 'timestamp'>) => {
    const newItem: HistoryItem = {
      ...item,
      id: Math.random().toString(36).substring(2, 9),
      timestamp: Date.now(),
    }
    setHistory((prev) => [newItem, ...prev])
  }

  const removeHistoryItem = (id: string) => {
    setHistory((prev) => prev.filter((item) => item.id !== id))
  }

  const clearHistory = () => {
    setHistory([])
  }

  return (
    <HistoryContext.Provider value={{ history, addHistoryItem, removeHistoryItem, clearHistory }}>
      {children}
    </HistoryContext.Provider>
  )
}

export function useHistory() {
  const context = useContext(HistoryContext)
  if (context === undefined) {
    throw new Error('useHistory must be used within a HistoryProvider')
  }
  return context
}
