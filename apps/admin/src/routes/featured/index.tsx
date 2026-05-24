import { createFileRoute } from '@tanstack/react-router';
import AdminShell from '@/components/AdminShell';
import APill from '@/components/APill';
import ABtn from '@/components/ABtn';
import AdminAvatar from '@/components/AdminAvatar';
import { t } from '@/lib/theme';

export const Route = createFileRoute('/featured/')({
  component: Featured,
});

const rows = [
  { id: 'F-014', name: 'Aarti Patel', cred: 'IAS 2022', cat: 'Civil Services', state: 'live', views: 2814, hue: 30 },
  { id: 'F-013', name: 'Dr. Ritu Sachan', cred: 'AIIMS Cardiology', cat: 'Doctors', state: 'live', views: 1942, hue: 80 },
  { id: 'F-012', name: 'Vikram Verma', cred: 'IIT-D · Agri-tech founder', cat: 'Business', state: 'live', views: 1814, hue: 220 },
  { id: 'F-011', name: 'Sneha Singh', cred: 'CA · Deloitte Manager', cat: 'Business', state: 'live', views: 1240, hue: 320 },
  { id: 'F-010', name: 'Manoj Mahato', cred: 'IPS · DCP Patna', cat: 'Civil Services', state: 'draft', views: 0, hue: 200 },
  { id: 'F-009', name: 'Pooja Kushwaha', cred: 'NEET AIR 124', cat: 'Doctors', state: 'review', views: 0, hue: 280 },
  { id: 'F-008', name: 'Ashok Patel', cred: 'FPO Director · 14k farmers', cat: 'Agriculture', state: 'live', views: 982, hue: 60 },
  { id: 'F-007', name: 'Prof. Renu', cred: 'JNU · Sanskrit', cat: 'Academia', state: 'expired', views: 4012, hue: 340 },
];

function Featured() {
  return (
    <AdminShell
      active="featured"
      title="Featured personalities"
      subtitle="124 live · 9 nominations pending · curated by editorial team"
      actions={<>
        <ABtn variant="secondary">Nominations (9)</ABtn>
        <ABtn variant="primary">+ Add personality</ABtn>
      </>}
    >
      <div style={{ padding: 28 }}>
        <div style={{ marginBottom: 14, padding: 14, background: t.primarySoft, borderRadius: 10, display: 'flex', gap: 10, alignItems: 'center' }}>
          <div style={{ fontSize: 18 }}>★</div>
          <div style={{ flex: 1, fontFamily: '"Mukta", sans-serif', fontSize: 12.5, color: t.primaryDeep, lineHeight: 1.5 }}>
            Featured Personalities have <strong>10× engagement</strong>. Curate carefully — never accept paid placement. All credentials must be independently verifiable.
          </div>
        </div>

        <div style={{ background: t.surface, border: `1px solid ${t.borderSoft}`, borderRadius: 10, overflow: 'hidden' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '90px 1.5fr 1.5fr 1fr 80px 90px 80px', padding: '10px 14px', background: t.bg, borderBottom: `1px solid ${t.borderSoft}`, fontFamily: 'Inter, sans-serif', fontSize: 10, color: t.textMuted, letterSpacing: '0.05em', textTransform: 'uppercase', fontWeight: 500 }}>
            <div>ID</div><div>Name</div><div>Credential</div><div>Category</div><div>State</div><div>Views</div><div>Action</div>
          </div>
          {rows.map((r, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '90px 1.5fr 1.5fr 1fr 80px 90px 80px', padding: '12px 14px', borderBottom: i < rows.length - 1 ? `1px solid ${t.borderSoft}` : 'none', alignItems: 'center', fontFamily: '"Mukta", sans-serif', fontSize: 12.5 }}>
              <div className="font-mono" style={{ fontSize: 11, color: t.textMuted }}>{r.id}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <AdminAvatar name={r.name} size={28} hue={r.hue} />
                <span>{r.name}</span>
              </div>
              <div style={{ color: t.textMuted }}>{r.cred}</div>
              <div><APill kind="primary">{r.cat}</APill></div>
              <div>
                {r.state === 'live' && <APill kind="success">● Live</APill>}
                {r.state === 'draft' && <APill kind="default">Draft</APill>}
                {r.state === 'review' && <APill kind="warn">In review</APill>}
                {r.state === 'expired' && <APill kind="default">Expired</APill>}
              </div>
              <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: t.text }}>{r.views.toLocaleString()}</div>
              <div style={{ color: t.primary, fontFamily: 'Inter, sans-serif', fontSize: 11, cursor: 'pointer' }}>Edit</div>
            </div>
          ))}
        </div>
      </div>
    </AdminShell>
  );
}
