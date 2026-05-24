import { View, Text } from 'react-native';
import { defaultTheme as t } from '@/lib/theme';

const SIZES = {
  xs: { hi: 11, en: 9, gap: 0 },
  sm: { hi: 13, en: 10, gap: 1 },
  md: { hi: 15, en: 11, gap: 2 },
  lg: { hi: 19, en: 12, gap: 3 },
  xl: { hi: 24, en: 13, gap: 4 },
  xxl: { hi: 30, en: 14, gap: 5 },
} as const;

type Size = keyof typeof SIZES;
type Align = 'left' | 'center' | 'right';

interface Props {
  hi: string;
  en?: string;
  size?: Size;
  align?: Align;
  muted?: boolean;
}

const alignMap: Record<Align, 'flex-start' | 'center' | 'flex-end'> = {
  left: 'flex-start',
  center: 'center',
  right: 'flex-end',
};

export default function BiLabel({ hi, en, size = 'md', align = 'left', muted = false }: Props) {
  const s = SIZES[size];
  return (
    <View style={{ alignItems: alignMap[align] }}>
      <Text style={{ fontSize: s.hi, fontWeight: '500', color: muted ? t.textMuted : t.text, letterSpacing: 0.08 }}>
        {hi}
      </Text>
      {en ? (
        <Text style={{ fontSize: s.en, fontWeight: '400', color: t.textFaint, marginTop: s.gap, letterSpacing: 0.15 }}>
          {en}
        </Text>
      ) : null}
    </View>
  );
}
