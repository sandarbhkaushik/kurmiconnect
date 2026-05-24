import { Pressable, Text, View } from 'react-native';
import type { ReactNode } from 'react';
import { defaultTheme as t } from '@/lib/theme';

type Variant = 'primary' | 'secondary' | 'ghost' | 'accent' | 'soft' | 'danger' | 'outline';
type Size = 'sm' | 'md' | 'lg';

const SIZES: Record<Size, { height: number; px: number; fs: number }> = {
  sm: { height: 36, px: 12, fs: 13 },
  md: { height: 44, px: 16, fs: 14 },
  lg: { height: 52, px: 20, fs: 15 },
};

interface VariantStyle {
  bg: string;
  fg: string;
  border: string;
}

const getVariant = (v: Variant): VariantStyle => {
  switch (v) {
    case 'primary':   return { bg: t.primary, fg: '#FFF', border: 'transparent' };
    case 'secondary': return { bg: t.surface, fg: t.text, border: t.border };
    case 'ghost':     return { bg: 'transparent', fg: t.primary, border: 'transparent' };
    case 'accent':    return { bg: t.accent, fg: '#FFF', border: 'transparent' };
    case 'soft':      return { bg: t.primarySoft, fg: t.primaryDeep, border: 'transparent' };
    case 'danger':    return { bg: t.error, fg: '#FFF', border: 'transparent' };
    case 'outline':   return { bg: 'transparent', fg: t.text, border: t.border };
  }
};

interface Props {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  icon?: ReactNode;
  full?: boolean;
  disabled?: boolean;
  onPress?: () => void;
}

export default function KCButton({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  full = false,
  disabled = false,
  onPress,
}: Props) {
  const s = SIZES[size];
  const v = getVariant(variant);

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => ({
        height: s.height,
        paddingHorizontal: s.px,
        backgroundColor: disabled ? t.borderSoft : v.bg,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 6,
        borderWidth: v.border === 'transparent' ? 0 : 1,
        borderColor: v.border,
        width: full ? '100%' : undefined,
        opacity: pressed ? 0.85 : 1,
      })}
    >
      {icon}
      <Text style={{ fontSize: s.fs, fontWeight: '500', color: disabled ? t.textFaint : v.fg }}>
        {children}
      </Text>
    </Pressable>
  );
}
