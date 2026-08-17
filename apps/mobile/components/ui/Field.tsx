import { View, Text, TextInput } from 'react-native';
import type { ReactNode } from 'react';
import type { KeyboardTypeOptions } from 'react-native';
import { defaultTheme as t } from '@/lib/theme';
import BiLabel from './BiLabel';

interface Props {
  hi?: string;
  en?: string;
  value?: string;
  placeholder?: string;
  help?: string;
  error?: string;
  disabled?: boolean;
  children?: ReactNode;
  /** Presence of onChangeText switches this from a static display field
   * (the original behavior — still used by not-yet-wired screens) into a
   * real controlled TextInput. Keeps existing call sites unchanged. */
  onChangeText?: (text: string) => void;
  keyboardType?: KeyboardTypeOptions;
}

export default function Field({
  hi, en, value, placeholder, help, error, disabled, children, onChangeText, keyboardType,
}: Props) {
  return (
    <View style={{ gap: 6 }}>
      {hi ? <BiLabel hi={hi} en={en} size="sm" /> : null}
      {children ?? (
        <View style={{
          height: 48,
          paddingHorizontal: 14,
          backgroundColor: disabled ? t.borderSoft : t.surface,
          borderWidth: 1,
          borderColor: error ? t.error : t.border,
          borderRadius: 10,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
          {onChangeText ? (
            <TextInput
              value={value ?? ''}
              onChangeText={onChangeText}
              placeholder={placeholder}
              placeholderTextColor={t.textFaint}
              editable={!disabled}
              keyboardType={keyboardType}
              style={{ fontSize: 14, fontWeight: '400', color: t.text, flex: 1, padding: 0 }}
            />
          ) : (
            <Text style={{ fontSize: 14, fontWeight: '400', color: value ? t.text : t.textFaint, flex: 1 }}>
              {value ?? placeholder ?? ''}
            </Text>
          )}
        </View>
      )}
      {help && !error ? (
        <Text style={{ fontSize: 11, fontWeight: '400', color: t.textFaint }}>{help}</Text>
      ) : null}
      {error ? (
        <Text style={{ fontSize: 11, fontWeight: '400', color: t.error }}>{error}</Text>
      ) : null}
    </View>
  );
}
