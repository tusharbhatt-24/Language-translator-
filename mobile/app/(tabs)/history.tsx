import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Trash2 } from 'lucide-react-native'
import { useHistory, type HistoryItem } from '../../contexts/HistoryContext'
import { useTheme } from '../../contexts/ThemeContext'
import { LANGUAGE_MAP } from '@lingo/shared'
import { useRouter } from 'expo-router'

export default function HistoryScreen() {
  const { colors } = useTheme()
  const { history, removeHistoryItem, clearHistory } = useHistory()
  const router = useRouter()

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }} edges={['top']}>
      <View style={{ flex: 1 }}>
        <View style={{ paddingHorizontal: 24, paddingTop: 32, paddingBottom: 24, flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between' }}>
          <View>
            <Text style={{ fontFamily: 'SpaceGrotesk-SemiBold', fontSize: 11, color: colors.textTertiary, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 }}>Log</Text>
            <Text style={{ fontFamily: 'Sora-SemiBold', fontSize: 32, color: colors.text }}>History</Text>
          </View>
          {history.length > 0 && (
            <TouchableOpacity onPress={clearHistory} style={{ padding: 8 }}>
              <Text style={{ fontFamily: 'SpaceGrotesk-SemiBold', fontSize: 14, color: colors.error }}>Clear all</Text>
            </TouchableOpacity>
          )}
        </View>

        {history.length === 0 ? (
          <View style={{ paddingHorizontal: 24, marginTop: 32 }}>
            <View style={{ backgroundColor: colors.surface, padding: 32, borderRadius: 16, borderStyle: 'dashed', borderWidth: 1, borderColor: colors.border, alignItems: 'center' }}>
              <Text style={{ fontFamily: 'Sora-SemiBold', fontSize: 18, color: colors.textSecondary, marginBottom: 8 }}>No history yet</Text>
              <Text style={{ fontFamily: 'SpaceGrotesk', fontSize: 15, color: colors.textTertiary, textAlign: 'center' }}>Translations you make will appear here automatically.</Text>
            </View>
          </View>
        ) : (
          <ScrollView contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 100 }} showsVerticalScrollIndicator={false}>
            <View style={{ gap: 16 }}>
              {history.map((item) => (
                <HistoryCard
                  key={item.id}
                  item={item}
                  colors={colors}
                  onRemove={() => removeHistoryItem(item.id)}
                  onPress={() => {
                    router.push({
                      pathname: '/(tabs)/translate',
                      params: {
                        historySourceText: item.sourceText,
                        historySourceLang: item.sourceLang,
                        historyTargetLang: item.targetLang,
                      },
                    })
                  }}
                />
              ))}
            </View>
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  )
}

function HistoryCard({ item, colors, onRemove, onPress }: { item: HistoryItem, colors: any, onRemove: () => void, onPress: () => void }) {
  const sourceName = LANGUAGE_MAP[item.sourceLang]?.name || item.sourceLang
  const targetName = LANGUAGE_MAP[item.targetLang]?.name || item.targetLang

  return (
    <View style={{ backgroundColor: colors.surface, borderRadius: 16, overflow: 'hidden', borderWidth: 1, borderColor: colors.border, flexDirection: 'row' }}>
      <TouchableOpacity onPress={onPress} style={{ flex: 1, padding: 16 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 8 }}>
          <Text style={{ fontSize: 12, fontFamily: 'SpaceGrotesk-SemiBold', color: colors.textSecondary }}>{sourceName}</Text>
          <Text style={{ fontSize: 12, color: colors.textTertiary }}>→</Text>
          <Text style={{ fontSize: 12, fontFamily: 'SpaceGrotesk-SemiBold', color: colors.accent }}>{targetName}</Text>
        </View>
        <Text style={{ fontFamily: 'SpaceGrotesk', fontSize: 16, color: colors.text, marginBottom: 4 }}>{item.sourceText}</Text>
        <Text style={{ fontFamily: 'SpaceGrotesk', fontSize: 15, color: colors.textSecondary }}>{item.translatedText}</Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        onPress={onRemove}
        style={{ width: 56, alignItems: 'center', justifyContent: 'center', borderLeftWidth: 1, borderLeftColor: colors.border }}
      >
        <Trash2 size={20} color={colors.textTertiary} />
      </TouchableOpacity>
    </View>
  )
}
