import { View, Text } from 'react-native';
import type { ReactNode } from 'react';
import { defaultTheme as t } from '@/lib/theme';

interface Props {
  title: string;
  subtitle?: string;
  leading?: ReactNode;
  trailing?: ReactNode;
}

export default function TopBar({ title, subtitle, leading, trailing }: Props) {
  return (
    <View style={{
      paddingHorizontal: 20,
      paddingVertical: 14,
      backgroundColor: t.surface,
      borderBottomWidth: 1,
      borderBottomColor: t.borderSoft,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
    }}>
      {leading}
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 16, fontWeight: '500', color: t.text }}>{title}</Text>
        {subtitle ? (
          <Text style={{ fontSize: 11, fontWeight: '400', color: t.textFaint, marginTop: 2 }}>{subtitle}</Text>
        ) : null}
      </View>
      {trailing}
    </View>
  );
}
