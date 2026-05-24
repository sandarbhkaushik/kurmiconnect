import { createFileRoute } from '@tanstack/react-router';
import AdminShell from '@/components/AdminShell';
import AdminAvatar from '@/components/AdminAvatar';
import { t } from '@/lib/theme';

export const Route = createFileRoute('/blocked')({
  component: Blocked,
});

const rows = [
  { id: 'KC-22184', name: 'Sanjay Verma', reason: 'Financial scam', by: 'Aarti S.', when: '15 May 2026', hue: 220 },
  { id: 'KC-21092', name: 'Ravi Singh', reason: 'Fake identity', by: 'Mohit T.', when: '12 May 2026', hue: 60 },
  { id: 'KC-20018', name: 'Suresh Patel', reason: 'Married, multiple flags', by: 'Aarti S.', when: '08 May 2026', hue: 20 },
  { id: 'KC-19842', name: 'Vivek K.', reason: 'Abusive language', by: 'Pooja M.', when: '01 May 2026', hue: 280 },
];

function Blocked() {
  return (
    <AdminShell
      active="blocked"
      title="Blocked users"
      subtitle="124 total · 4 added this week"
    >
      <div style={{ padding: 28 }}>
        <div style={{ background: t.surface, border: `1px solid ${t.borderSoft}`, borderRadius: 10, overflow: 'hidden' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr 1.5fr 1fr 120px 120px', padding: '10px 14px', background: t.bg, borderBottom: `1px solid ${t.borderSoft}`, fontFamily: 'Inter, sans-serif', fontSize: 10, color: t.textMuted, letterSpacing: '0.05em', textTransform: 'uppercase', fontWeight: 500 }}>
            <div>ID</div><div>User</div><div>Reason</div><div>Blocked by</div><div>When</div><div>Action</div>
          </div>
          {rows.map((r, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '120px 1fr 1.5fr 1fr 120px 120px', padding: '12px 14px', borderBottom: i < rows.length - 1 ? `1px solid ${t.borderSoft}` : 'none', alignItems: 'center', fontFamily: '"Mukta", sans-serif', fontSize: 12.5 }}>
              <div className="font-mono" style={{ fontSize: 11, color: t.textMuted }}>{r.id}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <AdminAvatar name={r.name} size={26} hue={r.hue} />
                <span>{r.name}</span>
              </div>
              <div>{r.reason}</div>
              <div style={{ color: t.textMuted, fontFamily: 'Inter, sans-serif', fontSize: 11 }}>{r.by}</div>
              <div style={{ color: t.textMuted, fontFamily: 'Inter, sans-serif', fontSize: 11 }}>{r.when}</div>
              <div style={{ color: t.primary, fontFamily: 'Inter, sans-serif', fontSize: 11, cursor: 'pointer' }}>Unblock</div>
            </div>
          ))}
        </div>
      </div>
    </AdminShell>
  );
}
