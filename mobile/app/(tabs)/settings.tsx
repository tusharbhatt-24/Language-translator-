import { View, Text, ScrollView, Switch, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useSettings } from '../../contexts/SettingsContext'
import { useTheme } from '../../contexts/ThemeContext'
import { LANGUAGES } from '@lingo/shared'
import { useState } from 'react'
import { LanguageSelectorSheet } from '../../components/LanguageSelectorSheet'

export default function SettingsScreen() {
  const { colors } = useTheme()
  const { settings, updateSettings } = useSettings()

  const [sourceSheetOpen, setSourceSheetOpen] = useState(false)
  const [targetSheetOpen, setTargetSheetOpen] = useState(false)

  const currentSourceName = settings.defaultSourceLang === 'auto' ? 'Detect language' : (LANGUAGES.find(l => l.code === settings.defaultSourceLang)?.name || settings.defaultSourceLang)
  const currentTargetName = LANGUAGES.find(l => l.code === settings.defaultTargetLang)?.name || settings.defaultTargetLang

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }} edges={['top']}>
      <ScrollView contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 100, paddingTop: 32 }}>
        
        <View style={{ marginBottom: 32 }}>
          <Text style={{ fontFamily: 'SpaceGrotesk-SemiBold', fontSize: 11, color: colors.textTertiary, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 }}>Preferences</Text>
          <Text style={{ fontFamily: 'Sora-SemiBold', fontSize: 32, color: colors.text }}>Settings</Text>
        </View>

        <View style={{ gap: 24 }}>
          {/* Languages Section */}
          <View style={{ backgroundColor: colors.surface, padding: 24, borderRadius: 20, borderWidth: 1, borderColor: colors.border }}>
            <Text style={{ fontFamily: 'Sora-SemiBold', fontSize: 20, color: colors.text, marginBottom: 16 }}>Languages</Text>
            
            <View style={{ gap: 16 }}>
              <View>
                <Text style={{ fontFamily: 'SpaceGrotesk-SemiBold', fontSize: 13, color: colors.textSecondary, marginBottom: 8 }}>Default Source</Text>
                <TouchableOpacity 
                  onPress={() => setSourceSheetOpen(true)}
                  style={{ backgroundColor: colors.bg, padding: 16, borderRadius: 12, borderWidth: 1, borderColor: colors.border }}
                >
                  <Text style={{ fontFamily: 'SpaceGrotesk', fontSize: 16, color: colors.text }}>{currentSourceName}</Text>
                </TouchableOpacity>
              </View>

              <View>
                <Text style={{ fontFamily: 'SpaceGrotesk-SemiBold', fontSize: 13, color: colors.textSecondary, marginBottom: 8 }}>Default Target</Text>
                <TouchableOpacity 
                  onPress={() => setTargetSheetOpen(true)}
                  style={{ backgroundColor: colors.bg, padding: 16, borderRadius: 12, borderWidth: 1, borderColor: colors.border }}
                >
                  <Text style={{ fontFamily: 'SpaceGrotesk', fontSize: 16, color: colors.text }}>{currentTargetName}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Experience Section */}
          <View style={{ backgroundColor: colors.surface, padding: 24, borderRadius: 20, borderWidth: 1, borderColor: colors.border }}>
            <Text style={{ fontFamily: 'Sora-SemiBold', fontSize: 20, color: colors.text, marginBottom: 20 }}>Experience</Text>
            
            <View style={{ gap: 24 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <View style={{ flex: 1, paddingRight: 16 }}>
                  <Text style={{ fontFamily: 'SpaceGrotesk-SemiBold', fontSize: 16, color: colors.text }}>Auto-speak translations</Text>
                  <Text style={{ fontFamily: 'SpaceGrotesk', fontSize: 14, color: colors.textTertiary, marginTop: 4 }}>Automatically read aloud when translation completes.</Text>
                </View>
                <Switch 
                  value={settings.autoSpeak} 
                  onValueChange={(val) => updateSettings({ autoSpeak: val })}
                  trackColor={{ false: colors.border, true: colors.accentSubtle }}
                  thumbColor={settings.autoSpeak ? colors.accent : colors.textTertiary}
                />
              </View>

              <View style={{ height: 1, backgroundColor: colors.border }} />

              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <View style={{ flex: 1, paddingRight: 16 }}>
                  <Text style={{ fontFamily: 'SpaceGrotesk-SemiBold', fontSize: 16, color: colors.text }}>Dark Mode</Text>
                  <Text style={{ fontFamily: 'SpaceGrotesk', fontSize: 14, color: colors.textTertiary, marginTop: 4 }}>Toggle dark appearance.</Text>
                </View>
                <Switch 
                  value={settings.darkMode} 
                  onValueChange={(val) => updateSettings({ darkMode: val })}
                  trackColor={{ false: colors.border, true: colors.accentSubtle }}
                  thumbColor={settings.darkMode ? colors.accent : colors.textTertiary}
                />
              </View>
            </View>
          </View>

          {/* About Section */}
          <View style={{ backgroundColor: colors.surface, padding: 24, borderRadius: 20, borderWidth: 1, borderColor: colors.border }}>
            <Text style={{ fontFamily: 'Sora-SemiBold', fontSize: 20, color: colors.text, marginBottom: 16 }}>About Lingo</Text>
            <Text style={{ fontFamily: 'SpaceGrotesk', fontSize: 15, color: colors.textSecondary, lineHeight: 22 }}>
              Lingo is a simple, real-time translator built to bridge languages without the noise. 
              It uses the free MyMemory and LibreTranslate APIs for text translation, and native web/mobile APIs for voice recognition and text-to-speech.
              {'\n\n'}
              Built with React, React Native, and a shared architecture to keep everything in sync.
            </Text>
          </View>
        </View>
      </ScrollView>

      <LanguageSelectorSheet
        visible={sourceSheetOpen}
        onClose={() => setSourceSheetOpen(false)}
        value={settings.defaultSourceLang}
        onChange={(val) => {
          updateSettings({ defaultSourceLang: val })
          setSourceSheetOpen(false)
        }}
        allowAuto
        title="Default Source Language"
      />

      <LanguageSelectorSheet
        visible={targetSheetOpen}
        onClose={() => setTargetSheetOpen(false)}
        value={settings.defaultTargetLang}
        onChange={(val) => {
          updateSettings({ defaultTargetLang: val })
          setTargetSheetOpen(false)
        }}
        title="Default Target Language"
      />
    </SafeAreaView>
  )
}
