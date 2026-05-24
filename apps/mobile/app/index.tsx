import { View, Text } from 'react-native';
import { defaultTheme as t } from '@/lib/theme';

export default function Splash() {
  return (
    <View style={{ flex: 1, backgroundColor: t.bg, alignItems: 'center', justifyContent: 'center' }}>
      {/* Logo mark */}
      <View style={{
        width: 96, height: 96, borderRadius: 24,
        backgroundColor: t.primary, alignItems: 'center', justifyContent: 'center',
        marginBottom: 28,
      }}>
        {/* Heart/pin SVG simplified as a styled View */}
        <View style={{ width: 52, height: 52, alignItems: 'center', justifyContent: 'center' }}>
          <View style={{
            width: 36, height: 36, borderRadius: 18,
            backgroundColor: 'rgba(255,255,255,0.95)',
            alignItems: 'center', justifyContent: 'center',
          }}>
            <View style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: t.primary }} />
          </View>
        </View>
      </View>

      <Text style={{
        fontFamily: 'Mukta_500Medium',
        fontSize: 32,
        color: t.text,
        letterSpacing: -0.3,
        marginBottom: 4,
      }}>KurmiConnect</Text>

      <Text style={{
        fontFamily: 'Inter_400Regular',
        fontSize: 11,
        color: t.textFaint,
        letterSpacing: 3,
        textTransform: 'uppercase',
      }}>est. 2026</Text>

      <View style={{ marginTop: 40, maxWidth: 280, alignItems: 'center' }}>
        <Text style={{
          fontFamily: 'Mukta_400Regular',
          fontSize: 17,
          color: t.text,
          lineHeight: 26,
          marginBottom: 8,
          textAlign: 'center',
        }}>{'विश्वसनीय रिश्ते,\nसम्मानित परिवार'}</Text>
        <Text style={{
          fontFamily: 'Inter_400Regular',
          fontSize: 12,
          color: t.textMuted,
          fontStyle: 'italic',
          textAlign: 'center',
        }}>Trusted matches, respected families</Text>
      </View>

      {/* Dots indicator */}
      <View style={{ position: 'absolute', bottom: 60, flexDirection: 'row', gap: 6 }}>
        {[0, 1, 2].map((i) => (
          <View key={i} style={{
            width: 6, height: 6, borderRadius: 3,
            backgroundColor: t.primary,
            opacity: i === 1 ? 1 : 0.3,
          }} />
        ))}
      </View>
    </View>
  );
}
