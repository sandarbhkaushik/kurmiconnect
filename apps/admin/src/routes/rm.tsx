import { createFileRoute } from '@tanstack/react-router';
import AdminShell from '@/components/AdminShell';
import ABtn from '@/components/ABtn';
import AdminAvatar from '@/components/AdminAvatar';
import { t } from '@/lib/theme';

export const Route = createFileRoute('/rm')({
  component: RM,
});

const clients = [
  { name: 'Sneha Singh', sub: 'Platinum · Mumbai · 27', updates: 2, urgent: true, hue: 320 },
  { name: 'Aarti Patel', sub: 'Platinum · Lucknow · 28', updates: 1, urgent: false, hue: 30 },
  { name: 'Vikram Verma', sub: 'Platinum · Bengaluru · 31', updates: 0, urgent: false, hue: 220 },
  { name: 'Pooja Verma', sub: 'Gold · Patna · 27', updates: 1, urgent: false, hue: 340 },
  { name: 'Ritu Mahato', sub: 'Platinum · Ranchi · 26', updates: 0, urgent: false, hue: 280 },
  { name: 'Dr. Ritu Sachan', sub: 'Platinum · Delhi · 29', updates: 3, urgent: true, hue: 80 },
];

const activities = [
  { title: 'Call logged · 14 min', sub: 'Discussed Vikram V. · positive · family meeting next week', when: '2h ago', icon: '📞' },
  { title: 'Note added', sub: 'Family wants Bengaluru-based, willing to relocate for IAS/IIT', when: 'Yesterday', icon: '✎' },
  { title: 'Family introduced', sub: "Sneha's parents ↔ Vikram's mama ji · meeting set 30 May", when: '3d ago', icon: '🤝' },
  { title: 'Profile suggested · Vikram Verma', sub: 'KC-24807 · IIT-D founder · Bengaluru', when: '5d ago', icon: '★' },
];

function RM() {
  return (
    <AdminShell
      active="rm"
      title="RM console · Aarti Sharma"
      subtitle="42 active Platinum clients · 8 unread updates"
      actions={<ABtn variant="primary">+ Log call</ABtn>}
    >
      <div style={{ padding: 28, display: 'grid', gridTemplateColumns: '320px 1fr', gap: 18 }}>
        <div>
          <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, color: t.textMuted, letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 10 }}>My clients (42)</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {clients.map((c, i) => (
              <div key={i} style={{ padding: 10, background: i === 0 ? t.primarySoft : t.surface, border: `1px solid ${i === 0 ? t.primary : t.borderSoft}`, borderRadius: 8, display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
                <AdminAvatar name={c.name} size={36} hue={c.hue} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontFamily: '"Mukta", sans-serif', fontSize: 12.5, color: t.text, fontWeight: 500 }}>{c.name}</div>
                  <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, color: t.textFaint }}>{c.sub}</div>
                </div>
                {c.updates > 0 && (
                  <div style={{ padding: '1px 6px', background: c.urgent ? t.error : t.primary, borderRadius: 999, fontFamily: 'Inter, sans-serif', fontSize: 9, color: '#FFF', fontWeight: 500 }}>{c.updates}</div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ padding: 18, background: t.surface, border: `1px solid ${t.borderSoft}`, borderRadius: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
              <AdminAvatar name="Sneha" size={56} hue={320} />
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: '"Mukta", sans-serif', fontSize: 16, fontWeight: 500 }}>Sneha Singh</div>
                <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: t.textMuted }}>Platinum · KC-24805 · Manager at Deloitte · Mumbai</div>
              </div>
              <ABtn variant="secondary">Open profile</ABtn>
              <ABtn variant="primary">Suggest matches</ABtn>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8, marginTop: 14 }}>
              {([['Engagement', 'High'], ['Matches sent', '14'], ['Replied', '5'], ['Days active', '32']] as [string, string][]).map(([l, v], i) => (
                <div key={i} style={{ padding: 10, background: t.bg, borderRadius: 6 }}>
                  <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 9.5, color: t.textFaint }}>{l}</div>
                  <div style={{ fontFamily: '"Mukta", sans-serif', fontSize: 14, color: t.text, fontWeight: 500 }}>{v}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ padding: 18, background: t.surface, border: `1px solid ${t.borderSoft}`, borderRadius: 10 }}>
            <div style={{ fontFamily: '"Mukta", sans-serif', fontSize: 13, fontWeight: 500, marginBottom: 10 }}>Recent activity</div>
            {activities.map((a, i) => (
              <div key={i} style={{ display: 'flex', gap: 12, padding: '10px 0', borderBottom: i < activities.length - 1 ? `1px solid ${t.borderSoft}` : 'none' }}>
                <div style={{ fontSize: 16 }}>{a.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: '"Mukta", sans-serif', fontSize: 12.5, color: t.text }}>{a.title}</div>
                  <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: t.textMuted, marginTop: 2 }}>{a.sub}</div>
                </div>
                <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, color: t.textFaint, whiteSpace: 'nowrap' }}>{a.when}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminShell>
  );
}
