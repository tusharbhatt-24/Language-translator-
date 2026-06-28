import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Languages, ArrowRightLeft } from 'lucide-react-native'

const colors = {
  accent: '#C1440E',
  accentSubtle: '#FDF1EC',
  bg: '#F5F0EB',
  surface: '#EDEAE5',
  border: '#D9D3CC',
  text: '#1A1614',
  textSecondary: '#6B5E58',
  textTertiary: '#9E9189',
}

export default function TranslateScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
      <ScrollView
        contentContainerStyle={{ padding: 20, paddingTop: 32 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header — left-aligned */}
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
            Translate
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
            Type to translate.
          </Text>
        </View>

        {/* Language selector row */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 12,
            gap: 8,
          }}
        >
          {/* Source language chip */}
          <TouchableOpacity
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              backgroundColor: colors.surface,
              borderRadius: 10,
              borderWidth: 1,
              borderColor: colors.border,
              padding: 12,
            }}
            activeOpacity={0.7}
          >
            <Text style={{ fontFamily: 'Sora-Medium', fontSize: 14, color: colors.textSecondary }}>
              Detect
            </Text>
            <Languages size={14} color={colors.textTertiary} />
          </TouchableOpacity>

          {/* Swap */}
          <TouchableOpacity
            style={{
              width: 36,
              height: 36,
              borderRadius: 8,
              backgroundColor: colors.bg,
              borderWidth: 1,
              borderColor: colors.border,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            activeOpacity={0.6}
          >
            <ArrowRightLeft size={15} color={colors.textSecondary} />
          </TouchableOpacity>

          {/* Target language chip */}
          <TouchableOpacity
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              backgroundColor: colors.surface,
              borderRadius: 10,
              borderWidth: 1,
              borderColor: colors.border,
              padding: 12,
            }}
            activeOpacity={0.7}
          >
            <Text style={{ fontFamily: 'Sora-Medium', fontSize: 14, color: colors.accent }}>
              Spanish
            </Text>
            <Languages size={14} color={colors.textTertiary} />
          </TouchableOpacity>
        </View>

        {/* Source input panel */}
        <View
          style={{
            backgroundColor: colors.surface,
            borderRadius: 14,
            borderWidth: 1,
            borderColor: colors.border,
            padding: 16,
            minHeight: 130,
            marginBottom: 12,
          }}
        >
          <Text
            style={{
              fontFamily: 'Sora',
              fontSize: 15,
              color: colors.textTertiary,
              lineHeight: 22,
            }}
          >
            Type or speak to translate…
          </Text>
        </View>

        {/* Output panel */}
        <View
          style={{
            backgroundColor: colors.accentSubtle,
            borderRadius: 14,
            borderWidth: 1,
            borderColor: '#E8B49A',
            padding: 16,
            minHeight: 130,
            marginBottom: 20,
          }}
        >
          <Text
            style={{
              fontFamily: 'Sora',
              fontSize: 15,
              color: colors.textTertiary,
              lineHeight: 22,
            }}
          >
            Translation will appear here.
          </Text>
        </View>

        {/* Action button — full width on mobile */}
        <TouchableOpacity
          style={{
            backgroundColor: colors.accent,
            borderRadius: 10,
            padding: 16,
            alignItems: 'center',
          }}
          activeOpacity={0.85}
        >
          <Text
            style={{
              fontFamily: 'Sora-SemiBold',
              fontSize: 15,
              color: '#FFFFFF',
              letterSpacing: 0.2,
            }}
          >
            Translate
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  )
}
