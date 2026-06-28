import React, { useState } from 'react'
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  TextInput,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native'
import { X, Search, Check } from 'lucide-react-native'
import { LANGUAGES, LANGUAGE_MAP } from '@lingo/shared'


interface LanguageSelectorSheetProps {
  visible: boolean
  onClose: () => void
  value: string
  onChange: (langCode: string) => void
  allowAuto?: boolean
  title?: string
}

import { useTheme } from '../contexts/ThemeContext'

export function LanguageSelectorSheet({
  visible,
  onClose,
  value,
  onChange,
  allowAuto = false,
  title = 'Select Language',
}: LanguageSelectorSheetProps) {
  const { colors } = useTheme()
  const [search, setSearch] = useState('')

  // Create list including auto if allowed
  const list = React.useMemo(() => {
    let items = [...LANGUAGES]
    if (allowAuto) {
      items = [{ code: 'auto', name: 'Detect language', nativeName: 'Detect' }, ...items]
    }
    
    if (!search.trim()) return items
    
    const query = search.toLowerCase()
    return items.filter(
      (lang) =>
        lang.name.toLowerCase().includes(query) || lang.nativeName.toLowerCase().includes(query)
    )
  }, [search, allowAuto])

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet" onRequestClose={onClose}>
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1 }}
        >
          {/* Header */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: 16,
              borderBottomWidth: 1,
              borderBottomColor: colors.border,
            }}
          >
            <Text style={{ fontFamily: 'Sora-SemiBold', fontSize: 16, color: colors.text }}>
              {title}
            </Text>
            <TouchableOpacity onPress={onClose} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
              <X size={20} color={colors.textSecondary} />
            </TouchableOpacity>
          </View>

          {/* Search bar */}
          <View style={{ padding: 16, borderBottomWidth: 1, borderBottomColor: colors.border }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: colors.surface,
                borderRadius: 10,
                paddingHorizontal: 12,
                height: 40,
              }}
            >
              <Search size={16} color={colors.textTertiary} />
              <TextInput
                value={search}
                onChangeText={setSearch}
                placeholder="Search languages…"
                placeholderTextColor={colors.textTertiary}
                style={{
                  flex: 1,
                  marginLeft: 8,
                  fontFamily: 'Sora',
                  fontSize: 14,
                  color: colors.text,
                }}
                clearButtonMode="while-editing"
              />
            </View>
          </View>

          {/* List */}
          <FlatList
            data={list}
            keyExtractor={(item) => item.code}
            contentContainerStyle={{ paddingVertical: 8 }}
            renderItem={({ item }) => {
              const isSelected = item.code === value
              return (
                <TouchableOpacity
                  onPress={() => {
                    onChange(item.code)
                    setSearch('')
                    onClose()
                  }}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingVertical: 12,
                    paddingHorizontal: 16,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: isSelected ? 'Sora-SemiBold' : 'Sora',
                      fontSize: 15,
                      color: isSelected ? colors.accent : colors.text,
                    }}
                  >
                    {item.name}
                  </Text>
                  {isSelected && <Check size={18} color={colors.accent} />}
                </TouchableOpacity>
              )
            }}
          />
        </KeyboardAvoidingView>
      </SafeAreaView>
    </Modal>
  )
}
