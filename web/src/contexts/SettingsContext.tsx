import React, { createContext, useContext, useEffect, useState } from 'react'

export interface AppSettings {
  defaultSourceLang: string
  defaultTargetLang: string
  autoSpeak: boolean
  darkMode: boolean
}

interface SettingsContextValue {
  settings: AppSettings
  updateSettings: (newSettings: Partial<AppSettings>) => void
}

const defaultSettings: AppSettings = {
  defaultSourceLang: 'auto',
  defaultTargetLang: 'es',
  autoSpeak: true,
  darkMode: false,
}

const SettingsContext = createContext<SettingsContextValue | undefined>(undefined)

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<AppSettings>(() => {
    try {
      const saved = localStorage.getItem('lingo_settings')
      return saved ? { ...defaultSettings, ...JSON.parse(saved) } : defaultSettings
    } catch {
      return defaultSettings
    }
  })

  // Sync settings to localStorage and handle dark mode class
  useEffect(() => {
    localStorage.setItem('lingo_settings', JSON.stringify(settings))

    if (settings.darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [settings])

  const updateSettings = (updates: Partial<AppSettings>) => {
    setSettings((prev) => ({ ...prev, ...updates }))
  }

  return (
    <SettingsContext.Provider value={{ settings, updateSettings }}>
      {children}
    </SettingsContext.Provider>
  )
}

export function useSettings() {
  const context = useContext(SettingsContext)
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider')
  }
  return context
}
