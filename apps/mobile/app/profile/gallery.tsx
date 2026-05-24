import { View, Text, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { X, Share2, MoreVertical } from 'lucide-react-native';
import { defaultTheme as t } from '@/lib/theme';
import PhotoPlaceholder from '@/components/ui/PhotoPlaceholder';

const dots = [0, 1, 2, 3, 4, 5];

export default function Gallery() {
  const router = useRouter();
  return (
    <View style={{ flex: 1, backgroundColor: '#000' }}>
      {/* Top controls */}
      <View style={{ position: 'absolute', top: 12, left: 16, right: 16, zIndex: 2, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <Pressable onPress={() => router.back()} style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: 'rgba(255,255,255,0.15)', alignItems: 'center', justifyContent: 'center' }}>
          <X size={16} color="#FFF" strokeWidth={1.6} />
        </Pressable>
        <View style={{ paddingVertical: 6, paddingHorizontal: 12, backgroundColor: 'rgba(0,0,0,0.5)', borderRadius: 999 }}>
          <Text style={{ fontFamily: 'Inter', fontSize: 11, color: '#FFF' }}>3 of 6</Text>
        </View>
        <View style={{ flexDirection: 'row', gap: 8 }}>
          <Pressable style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: 'rgba(255,255,255,0.15)', alignItems: 'center', justifyContent: 'center' }}>
            <Share2 size={16} color="#FFF" strokeWidth={1.6} />
          </Pressable>
          <Pressable style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: 'rgba(255,255,255,0.15)', alignItems: 'center', justifyContent: 'center' }}>
            <MoreVertical size={18} color="#FFF" strokeWidth={1.6} />
          </Pressable>
        </View>
      </View>

      {/* Main photo */}
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <PhotoPlaceholder name="Priya" height={520} width={380} radius={0} hue={20} />
      </View>

      {/* Dots */}
      <View style={{ position: 'absolute', bottom: 30, left: 0, right: 0, flexDirection: 'row', justifyContent: 'center', gap: 4 }}>
        {dots.map(i => (
          <View key={i} style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: i === 2 ? '#FFF' : 'rgba(255,255,255,0.4)' }} />
        ))}
      </View>
    </View>
  );
}
