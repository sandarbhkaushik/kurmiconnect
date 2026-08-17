import { useState, useMemo } from 'react';
import { View, Text, Pressable, Modal, TextInput, FlatList, SafeAreaView } from 'react-native';
import { ChevronDown, X, Check } from 'lucide-react-native';
import { defaultTheme as t } from '@/lib/theme';
import Field from './Field';

export interface PickerOption {
  id: string;
  label: string;
}

interface Props {
  hi?: string;
  en?: string;
  value?: string; // currently selected label, for display
  placeholder?: string;
  help?: string;
  error?: string;
  options: PickerOption[];
  onSelect: (option: PickerOption) => void;
  modalTitleHi: string;
  modalTitleEn: string;
}

/** A searchable single-select picker, styled to match Field's box exactly.
 * Built from RN's own Modal/FlatList/TextInput — no new dependency (per
 * Session 9's "no new dependency" preference). First use: community.tsx's
 * sub-caste/gotra pickers; reusable wherever else onboarding needs a
 * lookup-backed dropdown (e.g. location.tsx's state/district later). */
export default function PickerField({
  hi, en, value, placeholder, help, error, options, onSelect, modalTitleHi, modalTitleEn,
}: Props) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    if (!query.trim()) return options;
    const q = query.trim().toLowerCase();
    return options.filter(o => o.label.toLowerCase().includes(q));
  }, [options, query]);

  return (
    <>
      <Field hi={hi} en={en} help={help} error={error}>
        <Pressable
          onPress={() => setOpen(true)}
          style={{
            height: 48, paddingHorizontal: 14,
            backgroundColor: t.surface, borderWidth: 1,
            borderColor: error ? t.error : t.border, borderRadius: 10,
            flexDirection: 'row', alignItems: 'center',
          }}
        >
          <Text style={{ fontSize: 14, color: value ? t.text : t.textFaint, flex: 1 }}>
            {value ?? placeholder ?? ''}
          </Text>
          <ChevronDown size={16} color={t.textMuted} strokeWidth={1.6} />
        </Pressable>
      </Field>

      <Modal visible={open} animationType="slide" onRequestClose={() => setOpen(false)}>
        <SafeAreaView style={{ flex: 1, backgroundColor: t.bg }}>
          <View style={{
            flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
            paddingHorizontal: 20, paddingTop: 12, paddingBottom: 12,
            borderBottomWidth: 1, borderBottomColor: t.borderSoft,
          }}>
            <Text style={{ fontSize: 15, fontWeight: '600', color: t.text }}>
              {modalTitleHi} · {modalTitleEn}
            </Text>
            <Pressable onPress={() => setOpen(false)}>
              <X size={20} color={t.textMuted} strokeWidth={1.6} />
            </Pressable>
          </View>

          <View style={{ padding: 16 }}>
            <TextInput
              value={query}
              onChangeText={setQuery}
              placeholder="खोजें · Search"
              placeholderTextColor={t.textFaint}
              autoFocus
              style={{
                height: 44, paddingHorizontal: 14, backgroundColor: t.surface,
                borderWidth: 1, borderColor: t.border, borderRadius: 10, fontSize: 14, color: t.text,
              }}
            />
          </View>

          <FlatList
            data={filtered}
            keyExtractor={item => item.id}
            contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 24 }}
            keyboardShouldPersistTaps="handled"
            ListEmptyComponent={
              <Text style={{ textAlign: 'center', color: t.textFaint, marginTop: 24 }}>
                कोई परिणाम नहीं · No results
              </Text>
            }
            renderItem={({ item }) => (
              <Pressable
                onPress={() => { onSelect(item); setOpen(false); setQuery(''); }}
                style={{
                  height: 52, flexDirection: 'row', alignItems: 'center',
                  justifyContent: 'space-between', borderBottomWidth: 1, borderBottomColor: t.borderSoft,
                }}
              >
                <Text style={{ fontSize: 14, color: t.text }}>{item.label}</Text>
                {item.label === value ? <Check size={16} color={t.primary} strokeWidth={1.6} /> : null}
              </Pressable>
            )}
          />
        </SafeAreaView>
      </Modal>
    </>
  );
}
