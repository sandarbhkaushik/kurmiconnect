import { View } from 'react-native';
import { defaultTheme as t } from '@/lib/theme';

interface Props {
  value?: number;
  max?: number;
  height?: number;
}

export default function ProgressBar({ value = 0, max = 100, height = 4 }: Props) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));
  return (
    <View style={{ width: '100%', height, backgroundColor: t.borderSoft, borderRadius: 999, overflow: 'hidden' }}>
      <View style={{ width: `${pct}%`, height: '100%', backgroundColor: t.primary, borderRadius: 999 }} />
    </View>
  );
}
