import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Moon, Volume2, Database, Settings as SettingsIcon, ChevronRight } from 'lucide-react-native'

const colors = {
  accent: '#C1440E',
  bg: '#F5F0EB',
  surface: '#EDEAE5',
  border: '#D9D3CC',
  borderSubtle: '#E9E5DF',
  text: '#1A1614',
  textSecondary: '#6B5E58',
  textTertiary: '#9E9189',
}

interface SettingRowProps {
  icon: React.ElementType
  label: string
  description: string
  value?: string
}

function SettingRow({ icon: Icon, label, description, value }: SettingRowProps) {
  return (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        paddingVertical: 14,
        borderBottomWidth: 1,
        borderBottomColor: colors.borderSubtle,
      }}
      activeOpacity={0.6}
    >
      {/* Icon container */}
      <View
        style={{
          width: 34,
          height: 34,
          borderRadius: 8,
          backgroundColor: colors.surface,
          borderWidth: 1,
          borderColor: colors.border,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Icon size={16} color={colors.textSecondary} />
      </View>

      {/* Text */}
      <View style={{ flex: 1 }}>
        <Text style={{ fontFamily: 'Sora-Medium', fontSize: 15, color: colors.text }}>
          {label}
        </Text>
        <Text style={{ fontFamily: 'Sora', fontSize: 13, color: colors.textSecondary, marginTop: 2 }}>
          {description}
        </Text>
      </View>

      {/* Value + chevron */}
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
        {value && (
          <Text style={{ fontFamily: 'Sora', fontSize: 13, color: colors.textTertiary }}>
            {value}
          </Text>
        )}
        <ChevronRight size={14} color={colors.textTertiary} />
      </View>
    </TouchableOpacity>
  )
}

export default function SettingsScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
      <ScrollView
        contentContainerStyle={{ padding: 20, paddingTop: 32 }}
        showsVerticalScrollIndicator={false}
      >
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
            Settings
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
            Preferences.
          </Text>
        </View>

        {/* Section: Appearance */}
        <Text
          style={{
            fontFamily: 'Sora',
            fontSize: 11,
            fontWeight: '600',
            letterSpacing: 1.0,
            textTransform: 'uppercase',
            color: colors.textTertiary,
            marginBottom: 6,
          }}
        >
          Appearance
        </Text>
        <SettingRow
          icon={Moon}
          label="Theme"
          description="Light, dark, or match your system."
          value="System"
        />
        <SettingRow
          icon={Volume2}
          label="Speech"
          description="Voice input and output."
          value="On"
        />

        {/* Section: Privacy */}
        <Text
          style={{
            fontFamily: 'Sora',
            fontSize: 11,
            fontWeight: '600',
            letterSpacing: 1.0,
            textTransform: 'uppercase',
            color: colors.textTertiary,
            marginTop: 28,
            marginBottom: 6,
          }}
        >
          Privacy
        </Text>
        <SettingRow
          icon={Database}
          label="Save history"
          description="Store translations locally."
          value="On"
        />
        <SettingRow
          icon={SettingsIcon}
          label="Default languages"
          description="Your most-used pair."
          value="Auto → Spanish"
        />
      </ScrollView>
    </SafeAreaView>
  )
}
