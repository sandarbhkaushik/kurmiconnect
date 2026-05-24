import { View, Text } from 'react-native';
import type { ReactNode } from 'react';
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
}

export default function Field({ hi, en, value, placeholder, help, error, disabled, children }: Props) {
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
          <Text style={{ fontSize: 14, fontWeight: '400', color: value ? t.text : t.textFaint, flex: 1 }}>
            {value ?? placeholder ?? ''}
          </Text>
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
