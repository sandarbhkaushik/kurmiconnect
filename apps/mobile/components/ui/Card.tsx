import { View, type ViewStyle } from 'react-native';
import type { ReactNode } from 'react';
import { defaultTheme as t } from '@/lib/theme';

interface Props {
  children: ReactNode;
  padding?: number;
  accent?: boolean;
  style?: ViewStyle;
}

export default function Card({ children, padding = 16, accent = false, style }: Props) {
  return (
    <View style={[{
      backgroundColor: t.surface,
      borderWidth: accent ? 0 : 1,
      borderColor: t.border,
      borderRadius: 14,
      padding,
      borderLeftWidth: accent ? 3 : 1,
      borderLeftColor: accent ? t.primary : t.border,
    }, style]}>
      {children}
    </View>
  );
}
