import { createFileRoute } from '@tanstack/react-router';
import AdminShell from '@/components/AdminShell';
import ABtn from '@/components/ABtn';
import AdminAvatar from '@/components/AdminAvatar';
import { t } from '@/lib/theme';

export const Route = createFileRoute('/featured/$featuredId')({
  component: FeaturedEdit,
});

function FeaturedEdit() {
  return (
    <AdminShell
      active="featured-edit"
      title="Edit F-010 · Manoj Mahato"
      subtitle="Draft · last saved 8 mins ago"
      actions={<>
        <ABtn variant="ghost">Preview as user</ABtn>
        <ABtn variant="secondary">Save draft</ABtn>
        <ABtn variant="primary">Publish</ABtn>
      </>}
    >
      <div style={{ padding: 28, display: 'grid', gridTemplateColumns: '1fr 320px', gap: 18 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ padding: 18, background: t.surface, border: `1px solid ${t.borderSoft}`, borderRadius: 10 }}>
            <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, color: t.textMuted, letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 14 }}>Credential</div>
            <div style={{ marginBottom: 14 }}>
              <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, color: t.textFaint, marginBottom: 4 }}>Headline credential (shown as pill)</div>
              <div style={{ padding: 10, background: t.bg, border: `1px solid ${t.border}`, borderRadius: 6, fontFamily: '"Mukta", sans-serif', fontSize: 13 }}>IPS · DCP, Patna</div>
            </div>
            <div style={{ marginBottom: 14 }}>
              <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, color: t.textFaint, marginBottom: 4 }}>Category</div>
              <div style={{ padding: 10, background: t.bg, border: `1px solid ${t.border}`, borderRadius: 6, fontFamily: '"Mukta", sans-serif', fontSize: 13, cursor: 'pointer' }}>Civil Services ▾</div>
            </div>
            <div>
              <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, color: t.textFaint, marginBottom: 4 }}>Sub-tags (max 3)</div>
              <div style={{ display: 'flex', gap: 6 }}>
                {['Bihar cadre', 'UPSC 2018', 'AIR 87'].map((tag, i) => (
                  <div key={i} style={{ padding: '4px 8px', background: t.primarySoft, borderRadius: 4, fontFamily: 'Inter, sans-serif', fontSize: 11, color: t.primaryDeep, cursor: 'pointer' }}>{tag} ×</div>
                ))}
              </div>
            </div>
          </div>

          <div style={{ padding: 18, background: t.surface, border: `1px solid ${t.borderSoft}`, borderRadius: 10 }}>
            <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, color: t.textMuted, letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 14 }}>Editorial blurb</div>
            <div style={{ padding: 12, background: t.bg, border: `1px solid ${t.border}`, borderRadius: 6, minHeight: 120, fontFamily: '"Mukta", sans-serif', fontSize: 13, color: t.text, lineHeight: 1.5, fontStyle: 'italic' }}>
              "2018 UPSC, AIR 87. First in his village. Runs a quiet mentorship program for Kurmi students preparing for civil services. Reachable by family-led introduction only."
            </div>
            <div style={{ marginTop: 6, fontFamily: 'Inter, sans-serif', fontSize: 10, color: t.textFaint, display: 'flex', justifyContent: 'space-between' }}>
              <span>2-3 sentences, no marketing language</span><span>184/240</span>
            </div>
          </div>

          <div style={{ padding: 18, background: t.surface, border: `1px solid ${t.borderSoft}`, borderRadius: 10 }}>
            <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, color: t.textMuted, letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 14 }}>Verified credentials</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              {[
                ['UPSC Gazette 2018', 'PDF · Verified by editorial'],
                ['LBSNAA Mussoorie', 'Certificate · Verified'],
                ['Aadhaar', 'KYC complete'],
                ['Photo', 'Selfie + ID match'],
              ].map(([l, sub], i) => (
                <div key={i} style={{ padding: 10, background: t.bg, border: `1px solid ${t.border}`, borderRadius: 6, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ width: 22, height: 22, borderRadius: 5, background: t.successSoft, display: 'flex', alignItems: 'center', justifyContent: 'center', color: t.success, fontSize: 12 }}>✓</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: '"Mukta", sans-serif', fontSize: 12, color: t.text }}>{l}</div>
                    <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 9.5, color: t.textFaint }}>{sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Preview */}
        <div>
          <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, color: t.textMuted, letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 10 }}>Live preview</div>
          <div style={{ background: t.surface, border: `1px solid ${t.borderSoft}`, borderRadius: 12, overflow: 'hidden' }}>
            <div style={{ padding: 14, display: 'flex', gap: 12 }}>
              <AdminAvatar name="Manoj" size={70} hue={200} />
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <span style={{ fontFamily: '"Mukta", sans-serif', fontSize: 14, fontWeight: 500 }}>Manoj Mahato</span>
                  <span style={{ color: t.info, fontSize: 11 }}>✓</span>
                </div>
                <div style={{ display: 'inline-flex', marginTop: 4, padding: '3px 8px', background: t.primarySoft, borderRadius: 4, fontFamily: 'Inter, sans-serif', fontSize: 10, color: t.primaryDeep }}>IPS · DCP, Patna</div>
                <div style={{ marginTop: 6, fontFamily: 'Inter, sans-serif', fontSize: 10.5, color: t.textMuted }}>30 · 5'10" · Mahato · Patna</div>
              </div>
            </div>
            <div style={{ padding: '0 14px 14px' }}>
              <div style={{ padding: 10, background: t.bg, borderLeft: `3px solid ${t.primary}`, fontFamily: '"Mukta", sans-serif', fontSize: 11, color: t.text, lineHeight: 1.5, fontStyle: 'italic' }}>
                "2018 UPSC, AIR 87. First in his village. Runs a quiet mentorship program for Kurmi students preparing for civil services. Reachable by family-led introduction only."
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminShell>
  );
}
