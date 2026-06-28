import { Tabs } from 'expo-router'
import { Platform } from 'react-native'
import { Languages, Clock3, Settings } from 'lucide-react-native'

// Design tokens (inlined — RN can't import CSS vars)
const colors = {
  accent: '#C1440E',
  bg: '#F5F0EB',
  surface: '#EDEAE5',
  border: '#D9D3CC',
  textSecondary: '#6B5E58',
  text: '#1A1614',
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.bg,
          borderTopColor: colors.border,
          borderTopWidth: 1,
          // Extra padding on iOS for home indicator
          paddingBottom: Platform.OS === 'ios' ? 8 : 6,
          paddingTop: 8,
          height: Platform.OS === 'ios' ? 82 : 62,
          // No shadow — design is flat, border does the work
          elevation: 0,
          shadowOpacity: 0,
        },
        tabBarActiveTintColor: colors.accent,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarLabelStyle: {
          fontFamily: 'Sora',
          fontSize: 11,
          fontWeight: '600',
          letterSpacing: 0.2,
          marginTop: 2,
        },
        tabBarIconStyle: {
          marginBottom: 0,
        },
      }}
    >
      <Tabs.Screen
        name="translate"
        options={{
          title: 'translate',
          tabBarIcon: ({ color, focused }) => (
            <Languages
              size={22}
              color={color}
              strokeWidth={focused ? 2.5 : 1.75}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: 'history',
          tabBarIcon: ({ color, focused }) => (
            <Clock3
              size={22}
              color={color}
              strokeWidth={focused ? 2.5 : 1.75}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'settings',
          tabBarIcon: ({ color, focused }) => (
            <Settings
              size={22}
              color={color}
              strokeWidth={focused ? 2.5 : 1.75}
            />
          ),
        }}
      />
    </Tabs>
  )
}
