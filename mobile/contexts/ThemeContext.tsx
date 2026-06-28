import React, { createContext, useContext } from 'react'
import { THEME_COLORS } from '@lingo/shared'
import { useSettings } from './SettingsContext'

type ThemeColors = typeof THEME_COLORS.light

interface ThemeContextValue {
  colors: ThemeColors
  isDark: boolean
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { settings, loaded } = useSettings()

  const isDark = loaded ? settings.darkMode : false
  const colors = isDark ? (THEME_COLORS.dark as unknown as ThemeColors) : THEME_COLORS.light

  return (
    <ThemeContext.Provider value={{ colors, isDark }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }

  const c = context.colors
  const flatColors = {
    accent: c.accent.DEFAULT,
    accentSubtle: c.accent.subtle,
    bg: c.background.DEFAULT,
    surface: c.background.surface,
    border: c.border.DEFAULT,
    text: c.text.primary,
    textSecondary: c.text.secondary,
    textTertiary: c.text.tertiary,
    error: c.semantic.error,
    errorSubtle: c.semantic.errorSubtle,
    success: c.semantic.success,
  }

  return { isDark: context.isDark, colors: flatColors, rawColors: c }
}
