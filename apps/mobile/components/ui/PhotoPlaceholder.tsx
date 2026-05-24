import { View, Text, type DimensionValue } from 'react-native';
import { defaultTheme as t } from '@/lib/theme';

interface Props {
  name?: string;
  height: DimensionValue;
  width?: DimensionValue;
  radius?: number;
  hue?: number;
  label?: string;
}

export default function PhotoPlaceholder({ name = '?', height, width = '100%', radius = 12, hue, label }: Props) {
  const ch = (name || '?').charCodeAt(0) || 65;
  const nameLen = (name || '?').length;
  const h = hue ?? ((ch * 37 + nameLen * 13) % 360);
  const bg = `hsl(${h}, 45%, 82%)`;
  const fg = `hsl(${h}, 55%, 32%)`;
  const initial = ((name || '?').match(/[A-Za-zऀ-ॿ]/) || ['?'])[0].toUpperCase();
  const numericHeight = typeof height === 'number' ? height : undefined;
  const fontSize = numericHeight ? Math.min(numericHeight * 0.34, 80) : 64;

  return (
    <View style={{
      width,
      height,
      borderRadius: radius,
      backgroundColor: bg,
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
    }}>
      <Text style={{ fontSize, fontWeight: '500', color: fg }}>
        {initial}
      </Text>
      {label ? (
        <View style={{ position: 'absolute', bottom: 8, left: 8 }}>
          <Text style={{ fontSize: 9, fontWeight: '400', color: fg, opacity: 0.7, letterSpacing: 0.7, textTransform: 'uppercase' }}>
            {label}
          </Text>
        </View>
      ) : null}
    </View>
  );
}
