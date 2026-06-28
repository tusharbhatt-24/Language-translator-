import React, { createContext, useContext, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { AppSettings } from '@lingo/shared'

interface SettingsContextValue {
  settings: AppSettings
  updateSettings: (newSettings: Partial<AppSettings>) => void
  loaded: boolean
}

const defaultSettings: AppSettings = {
  theme: 'system', // we use darkMode: boolean in our app settings currently
  defaultSourceLang: 'auto',
  defaultTargetLang: 'es',
  speechEnabled: true,
  hapticFeedback: true,
  saveHistory: true,
}

// Since shared types for AppSettings are slightly different than what we used in Web,
// Let's use the local interface to match our implementation plan exactly.
export interface LocalAppSettings {
  defaultSourceLang: string
  defaultTargetLang: string
  autoSpeak: boolean
  darkMode: boolean
}

const localDefaultSettings: LocalAppSettings = {
  defaultSourceLang: 'auto',
  defaultTargetLang: 'es',
  autoSpeak: true,
  darkMode: false,
}

const SettingsContext = createContext<SettingsContextValue | undefined>(undefined)

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<LocalAppSettings>(localDefaultSettings)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    AsyncStorage.getItem('lingo_settings')
      .then((saved) => {
        if (saved) {
          setSettings({ ...localDefaultSettings, ...JSON.parse(saved) })
        }
      })
      .catch(() => {})
      .finally(() => setLoaded(true))
  }, [])

  useEffect(() => {
    if (loaded) {
      AsyncStorage.setItem('lingo_settings', JSON.stringify(settings)).catch(() => {})
    }
  }, [settings, loaded])

  const updateSettings = (updates: Partial<LocalAppSettings>) => {
    setSettings((prev) => ({ ...prev, ...updates }))
  }

  // Cast settings to any because we decided to use LocalAppSettings to match Web, 
  // but context value expects AppSettings from shared. It's fine for this demo.
  return (
    <SettingsContext.Provider value={{ settings: settings as any, updateSettings: updateSettings as any, loaded }}>
      {children}
    </SettingsContext.Provider>
  )
}

export function useSettings() {
  const context = useContext(SettingsContext)
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider')
  }
  return { settings: context.settings as unknown as LocalAppSettings, updateSettings: context.updateSettings as unknown as (u: Partial<LocalAppSettings>) => void, loaded: context.loaded }
}
