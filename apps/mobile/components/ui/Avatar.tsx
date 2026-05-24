import { View, Text } from 'react-native';
import { defaultTheme as t } from '@/lib/theme';

interface Props {
  name?: string;
  size?: number;
  hue?: number;
  ring?: boolean;
  online?: boolean;
}

function hueToColor(h: number, lightness: number, saturation: number) {
  return `hsl(${h}, ${saturation}%, ${lightness}%)`;
}

export default function Avatar({ name = '?', size = 44, hue, ring = false, online = false }: Props) {
  const ch = name.charCodeAt(0) || 65;
  const h = hue ?? ((ch * 37 + name.length * 13) % 360);
  const bg = hueToColor(h, 82, 48);
  const fg = hueToColor(h, 30, 58);
  const initial = (name.match(/[A-Za-zऀ-ॿ]/) || [''])[0].toUpperCase();
  const onlineDotSize = Math.max(8, size * 0.22);

  return (
    <View style={{ position: 'relative', width: size, height: size, flexShrink: 0 }}>
      <View style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: bg,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: ring ? 2 : 0,
        borderColor: ring ? t.primary : 'transparent',
      }}>
        <Text style={{ fontSize: size * 0.38, fontWeight: '500', color: fg }}>
          {initial}
        </Text>
      </View>
      {online && (
        <View style={{
          position: 'absolute',
          right: 0,
          bottom: 0,
          width: onlineDotSize,
          height: onlineDotSize,
          borderRadius: onlineDotSize / 2,
          backgroundColor: t.success,
          borderWidth: 2,
          borderColor: t.surface,
        }} />
      )}
    </View>
  );
}
