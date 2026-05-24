import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, View, Text, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { ChevronLeft, Camera, Plus, Lock } from 'lucide-react-native';
import { defaultTheme as t } from '@/lib/theme';
import BiLabel from '@/components/ui/BiLabel';
import KCButton from '@/components/ui/KCButton';
import Card from '@/components/ui/Card';
import TopBar from '@/components/layout/TopBar';

export default function DocUpload() {
  const router = useRouter();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: t.bg }} edges={['top']}>
      <TopBar
        title="Aadhaar verification"
        subtitle="Step 1 of 2"
        leading={
          <Pressable onPress={() => router.back()}>
            <ChevronLeft size={20} color={t.text} strokeWidth={1.6} />
          </Pressable>
        }
      />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={{ padding: 20 }}>
          {/* Instructions card */}
          <Card padding={14} style={{ marginBottom: 18, backgroundColor: t.surfaceWarm }}>
            <View>
              <Text style={{ fontSize: 12, color: t.text, fontWeight: '500', marginBottom: 4 }}>क्या upload करना है?</Text>
              <Text style={{ fontSize: 12, color: t.text, lineHeight: 20 }}>
                {'• Aadhaar card photo (front side)\n• Numbers और name clearly दिखें\n• 24h में verified'}
              </Text>
            </View>
          </Card>

          <BiLabel hi="दस्तावेज़ अपलोड करें" en="Upload document" size="sm" />

          {/* Camera upload area */}
          <Pressable
            style={{
              marginTop: 10,
              padding: 30,
              backgroundColor: t.surface,
              borderWidth: 1.5,
              borderColor: t.border,
              borderStyle: 'dashed',
              borderRadius: 12,
              alignItems: 'center',
              gap: 10,
            }}
          >
            <View style={{ width: 56, height: 56, borderRadius: 28, backgroundColor: t.primarySoft, alignItems: 'center', justifyContent: 'center' }}>
              <Camera size={24} color={t.primary} strokeWidth={1.6} />
            </View>
            <View style={{ alignItems: 'center' }}>
              <Text style={{ fontSize: 14, color: t.text }}>Camera से photo लें</Text>
              <Text style={{ fontSize: 11, color: t.textFaint, marginTop: 2 }}>Preferred · clearer photos</Text>
            </View>
          </Pressable>

          {/* Gallery upload option */}
          <Pressable
            style={{
              marginTop: 14,
              padding: 16,
              backgroundColor: t.surface,
              borderWidth: 1,
              borderColor: t.border,
              borderRadius: 10,
              flexDirection: 'row',
              alignItems: 'center',
              gap: 10,
            }}
          >
            <Plus size={16} color={t.textMuted} strokeWidth={1.6} />
            <Text style={{ flex: 1, fontSize: 13, color: t.text }}>Or upload from gallery</Text>
          </Pressable>

          {/* Privacy notice */}
          <View style={{ marginTop: 18, padding: 12, backgroundColor: t.borderSoft, borderRadius: 10, flexDirection: 'row', alignItems: 'flex-start', gap: 8 }}>
            <Lock size={14} color={t.textMuted} strokeWidth={1.6} />
            <Text style={{ flex: 1, fontSize: 11, color: t.textMuted, lineHeight: 18 }}>
              आपका Aadhaar private रहेगा। केवल verification के लिए use होगा। Never shown publicly.
            </Text>
          </View>
        </View>
      </ScrollView>

      <View style={{ padding: 20, borderTopWidth: 1, borderTopColor: t.borderSoft, backgroundColor: t.surface }}>
        <KCButton variant="primary" size="lg" full disabled>
          Submit for verification
        </KCButton>
      </View>
    </SafeAreaView>
  );
}
