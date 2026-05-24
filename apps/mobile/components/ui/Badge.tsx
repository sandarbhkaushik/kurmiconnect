import { View, Text } from 'react-native';
import type { ReactNode } from 'react';
import { defaultTheme as t } from '@/lib/theme';

type Kind = 'default' | 'verified' | 'success' | 'warn' | 'featured' | 'outline' | 'match' | 'premium';

interface BadgeStyle {
  bg: string;
  fg: string;
  border: string;
}

const getStyle = (kind: Kind): BadgeStyle => {
  switch (kind) {
    case 'verified':  return { bg: '#E8F0FE', fg: '#1E40AF', border: 'transparent' };
    case 'success':   return { bg: t.successSoft, fg: t.success, border: 'transparent' };
    case 'warn':      return { bg: t.warnSoft, fg: t.warn, border: 'transparent' };
    case 'featured':  return { bg: t.primarySoft, fg: t.primaryDeep, border: 'transparent' };
    case 'outline':   return { bg: 'transparent', fg: t.textMuted, border: t.border };
    case 'match':     return { bg: t.surface, fg: t.primary, border: t.primary };
    case 'premium':   return { bg: t.accent, fg: '#FFF', border: 'transparent' };
    default:          return { bg: t.chipBg, fg: t.textMuted, border: 'transparent' };
  }
};

interface Props {
  children: ReactNode;
  kind?: Kind;
  icon?: ReactNode;
}

export default function Badge({ children, kind = 'default', icon }: Props) {
  const s = getStyle(kind);
  return (
    <View style={{
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
      paddingHorizontal: 8,
      paddingVertical: 3,
      borderRadius: 999,
      backgroundColor: s.bg,
      borderWidth: s.border === 'transparent' ? 0 : 1,
      borderColor: s.border,
      alignSelf: 'flex-start',
    }}>
      {icon}
      <Text style={{ fontSize: 10, fontWeight: '500', color: s.fg, letterSpacing: 0.3 }}>
        {children}
      </Text>
    </View>
  );
}
