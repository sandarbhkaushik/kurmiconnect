import { createFileRoute } from '@tanstack/react-router';
import AdminShell from '@/components/AdminShell';
import APill from '@/components/APill';
import ABtn from '@/components/ABtn';
import { t } from '@/lib/theme';

export const Route = createFileRoute('/content')({
  component: Content,
});

const banners = [
  { title: 'Akshaya Tritiya 2026', sub: 'Auspicious match suggestions', state: 'live', placement: 'Home top', tone: t.primary },
  { title: 'Gold annual offer', sub: '₹1,999 → ₹1,499 limited', state: 'live', placement: 'Plans header', tone: t.warn },
  { title: 'Profile boost', sub: 'During Sawan month', state: 'draft', placement: 'Home strip', tone: t.info },
];

function Content() {
  return (
    <AdminShell
      active="content"
      title="Content & banners"
      subtitle="In-app messaging, banners, FAQ"
      actions={<ABtn variant="primary">+ New banner</ABtn>}
    >
      <div style={{ padding: 28 }}>
        <div style={{ display: 'flex', gap: 6, marginBottom: 14 }}>
          {['Home banners 3', 'Plans banners 1', 'Empty states 6', 'FAQs 24', 'Push templates 8'].map((c, i) => (
            <div key={i} style={{ padding: '6px 11px', borderRadius: 6, background: i === 0 ? t.text : t.surface, color: i === 0 ? '#FFF' : t.text, border: `1px solid ${i === 0 ? t.text : t.border}`, fontFamily: '"Mukta", sans-serif', fontSize: 11.5, cursor: 'pointer' }}>{c}</div>
          ))}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14 }}>
          {banners.map((b, i) => (
            <div key={i} style={{ background: t.surface, border: `1px solid ${t.borderSoft}`, borderRadius: 10, overflow: 'hidden' }}>
              <div style={{ height: 120, background: b.tone, padding: 14, color: '#FFF', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
                <div style={{ fontFamily: '"Mukta", sans-serif', fontSize: 14, fontWeight: 500 }}>{b.title}</div>
                <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 10.5, opacity: 0.9 }}>{b.sub}</div>
              </div>
              <div style={{ padding: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, color: t.textFaint }}>Placement</div>
                  <div style={{ fontFamily: '"Mukta", sans-serif', fontSize: 12, color: t.text }}>{b.placement}</div>
                </div>
                {b.state === 'live' ? <APill kind="success">● Live</APill> : <APill kind="default">Draft</APill>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminShell>
  );
}
