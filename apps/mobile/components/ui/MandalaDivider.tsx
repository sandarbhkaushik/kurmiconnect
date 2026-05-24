import { View } from 'react-native';
import { defaultTheme as t } from '@/lib/theme';

export default function MandalaDivider() {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, opacity: 0.5 }}>
      <View style={{ height: 1, backgroundColor: t.border, width: 120 }} />
      <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: t.primary, opacity: 0.4 }} />
      <View style={{ height: 1, backgroundColor: t.border, width: 120 }} />
    </View>
  );
}
