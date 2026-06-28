import { View, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Clock3 } from 'lucide-react-native'

const colors = {
  accent: '#C1440E',
  bg: '#F5F0EB',
  surface: '#EDEAE5',
  border: '#D9D3CC',
  text: '#1A1614',
  textSecondary: '#6B5E58',
  textTertiary: '#9E9189',
}

export default function HistoryScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
      <View style={{ flex: 1, padding: 20, paddingTop: 32 }}>
        {/* Header */}
        <View style={{ marginBottom: 32 }}>
          <Text
            style={{
              fontFamily: 'Sora',
              fontSize: 11,
              fontWeight: '600',
              letterSpacing: 1.2,
              textTransform: 'uppercase',
              color: colors.textTertiary,
              marginBottom: 6,
            }}
          >
            History
          </Text>
          <Text
            style={{
              fontFamily: 'SpaceGrotesk-Bold',
              fontSize: 32,
              letterSpacing: -0.8,
              color: colors.text,
              lineHeight: 38,
            }}
          >
            Past translations.
          </Text>
        </View>

        {/* Empty state — left-aligned, no centred blob */}
        <View style={{ gap: 10 }}>
          <View
            style={{
              width: 40,
              height: 40,
              borderRadius: 8,
              backgroundColor: colors.surface,
              borderWidth: 1,
              borderColor: colors.border,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Clock3 size={18} color={colors.textTertiary} />
          </View>
          <Text
            style={{
              fontFamily: 'SpaceGrotesk-SemiBold',
              fontSize: 18,
              color: colors.text,
              marginTop: 2,
            }}
          >
            Nothing here yet.
          </Text>
          <Text
            style={{
              fontFamily: 'Sora',
              fontSize: 14,
              color: colors.textSecondary,
              lineHeight: 21,
              maxWidth: 280,
            }}
          >
            Your translations will appear here. Saved locally on this device.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  )
}
