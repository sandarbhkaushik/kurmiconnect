import { View, Text } from 'react-native';
import { Check, Heart, ChevronRight, Star } from 'lucide-react-native';
import PhotoPlaceholder from '@/components/ui/PhotoPlaceholder';
import Badge from '@/components/ui/Badge';
import { defaultTheme as t } from '@/lib/theme';

interface Props {
  name: string;
  age: number;
  height: string;
  caste: string;
  city: string;
  match?: number;
  hue?: number;
  verified?: boolean;
  featured?: boolean;
  online?: boolean;
  compact?: boolean;
}

export default function MatchCard({ name, age, height, caste, city, match, hue, verified, featured, online, compact = false }: Props) {
  if (compact) {
    return (
      <View style={{ backgroundColor: t.surface, borderWidth: 1, borderColor: t.borderSoft, borderRadius: 14, overflow: 'hidden' }}>
        <View style={{ position: 'relative', aspectRatio: 1 }}>
          <PhotoPlaceholder name={name} height="100%" radius={0} hue={hue} />
          {match !== undefined && (
            <View style={{ position: 'absolute', top: 8, left: 8, paddingHorizontal: 8, paddingVertical: 3, backgroundColor: 'rgba(255,255,255,0.95)', borderRadius: 999 }}>
              <Text style={{ fontSize: 10, fontWeight: '500', color: t.primary }}>{match}% match</Text>
            </View>
          )}
          <View style={{ position: 'absolute', top: 8, right: 8, width: 28, height: 28, borderRadius: 14, backgroundColor: 'rgba(255,255,255,0.95)', alignItems: 'center', justifyContent: 'center' }}>
            <Heart size={14} color={t.primary} strokeWidth={1.6} />
          </View>
          {featured && (
            <View style={{ position: 'absolute', bottom: 8, left: 8, paddingHorizontal: 7, paddingVertical: 3, backgroundColor: t.primary, borderRadius: 4, flexDirection: 'row', alignItems: 'center', gap: 3 }}>
              <Star size={9} color="#FFF" fill="#FFF" strokeWidth={1.6} />
              <Text style={{ fontSize: 9, fontWeight: '500', color: '#FFF', letterSpacing: 0.7 }}>FEATURED</Text>
            </View>
          )}
        </View>
        <View style={{ padding: 10 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4, marginBottom: 2 }}>
            <Text style={{ fontSize: 14, fontWeight: '500', color: t.text }}>{name}</Text>
            {verified && <Check size={11} color={t.info} strokeWidth={1.6} />}
          </View>
          <Text style={{ fontSize: 10.5, fontWeight: '400', color: t.textMuted, lineHeight: 15 }}>
            {age} · {height}{'\n'}{caste} · {city}
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={{ flexDirection: 'row', gap: 12, padding: 12, backgroundColor: t.surface, borderWidth: 1, borderColor: t.borderSoft, borderRadius: 14 }}>
      <View style={{ width: 78, height: 78, borderRadius: 10, overflow: 'hidden', flexShrink: 0 }}>
        <PhotoPlaceholder name={name} height={78} width={78} radius={10} hue={hue} />
      </View>
      <View style={{ flex: 1, minWidth: 0 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 2 }}>
          <Text style={{ fontSize: 15, fontWeight: '500', color: t.text }}>{name}</Text>
          {verified && <Check size={12} color={t.info} strokeWidth={1.6} />}
          {online && <View style={{ width: 7, height: 7, borderRadius: 3.5, backgroundColor: t.success }} />}
        </View>
        <Text style={{ fontSize: 11, fontWeight: '400', color: t.textMuted, marginBottom: 6, lineHeight: 15 }}>
          {age} · {height} · {caste}{'\n'}{city}
        </Text>
        <View style={{ flexDirection: 'row', gap: 6 }}>
          {match !== undefined && <Badge kind="match">{match}% match</Badge>}
          {featured && <Badge kind="featured">Featured</Badge>}
        </View>
      </View>
      <View style={{ justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <Heart size={18} color={t.textFaint} strokeWidth={1.6} />
        <ChevronRight size={16} color={t.textFaint} strokeWidth={1.6} />
      </View>
    </View>
  );
}
