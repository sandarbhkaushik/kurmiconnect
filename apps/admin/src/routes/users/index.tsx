import { createFileRoute } from '@tanstack/react-router';
import AdminShell from '@/components/AdminShell';
import APill from '@/components/APill';
import ABtn from '@/components/ABtn';
import AdminAvatar from '@/components/AdminAvatar';
import { t } from '@/lib/theme';

export const Route = createFileRoute('/users/')({
  component: Users,
});

const rows = [
  { id: 'KC-24812', name: 'Priya Patel', age: 26, gen: 'F', city: 'Lucknow', sub: 'Patel', joined: '23 May 2026', status: 'verified', plan: 'Gold', hue: 20 },
  { id: 'KC-24811', name: 'Rajesh Patel', age: 28, gen: 'M', city: 'Lucknow', sub: 'Patel', joined: '22 May 2026', status: 'pending', plan: 'Free', hue: 200 },
  { id: 'KC-24810', name: 'Anjali Sachan', age: 25, gen: 'F', city: 'Kanpur', sub: 'Sachan', joined: '22 May 2026', status: 'verified', plan: 'Silver', hue: 60 },
  { id: 'KC-24809', name: 'Manoj Kumar', age: 30, gen: 'M', city: 'Patna', sub: 'Verma', joined: '21 May 2026', status: 'flagged', plan: 'Free', hue: 100 },
  { id: 'KC-24808', name: 'Aarti Patel', age: 28, gen: 'F', city: 'Lucknow', sub: 'Patel', joined: '21 May 2026', status: 'featured', plan: 'Platinum', hue: 30 },
  { id: 'KC-24807', name: 'Vikram Verma', age: 31, gen: 'M', city: 'Bengaluru', sub: 'Verma', joined: '20 May 2026', status: 'verified', plan: 'Gold', hue: 220 },
  { id: 'KC-24806', name: 'Ritu Mahato', age: 26, gen: 'F', city: 'Ranchi', sub: 'Mahato', joined: '20 May 2026', status: 'verified', plan: 'Silver', hue: 280 },
  { id: 'KC-24805', name: 'Sneha Singh', age: 27, gen: 'F', city: 'Mumbai', sub: 'Singh', joined: '19 May 2026', status: 'featured', plan: 'Platinum', hue: 320 },
  { id: 'KC-24804', name: 'Pooja Verma', age: 27, gen: 'F', city: 'Patna', sub: 'Verma', joined: '19 May 2026', status: 'verified', plan: 'Gold', hue: 340 },
  { id: 'KC-24803', name: 'Ankit Kushwaha', age: 29, gen: 'M', city: 'Delhi', sub: 'Kushwaha', joined: '18 May 2026', status: 'pending', plan: 'Free', hue: 160 },
];

function Users() {
  return (
    <AdminShell
      active="users"
      title="All users"
      subtitle="24,812 total · 3,184 paid"
      actions={<>
        <ABtn variant="secondary">Export CSV</ABtn>
        <ABtn variant="primary">+ Add user</ABtn>
      </>}
    >
      <div style={{ padding: 28 }}>
        <div style={{ display: 'flex', gap: 8, marginBottom: 16, alignItems: 'center' }}>
          <div style={{ flex: 1, height: 36, background: t.surface, border: `1px solid ${t.border}`, borderRadius: 8, padding: '0 12px', display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'Inter, sans-serif', fontSize: 12, color: t.textFaint }}>
            🔍 Search by ID, name, phone, email
          </div>
          {['Status: All', 'Plan: All', 'State: All', 'Verified: All'].map((f, i) => (
            <div key={i} style={{ height: 36, padding: '0 12px', background: t.surface, border: `1px solid ${t.border}`, borderRadius: 8, display: 'flex', alignItems: 'center', fontFamily: 'Inter, sans-serif', fontSize: 12, color: t.text }}>{f} ▾</div>
          ))}
        </div>

        <div style={{ background: t.surface, border: `1px solid ${t.borderSoft}`, borderRadius: 10, overflow: 'hidden' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '32px 110px 1.5fr 60px 1fr 1fr 1fr 100px 80px 80px', padding: '10px 14px', background: t.bg, borderBottom: `1px solid ${t.borderSoft}`, fontFamily: 'Inter, sans-serif', fontSize: 10, color: t.textMuted, letterSpacing: '0.05em', textTransform: 'uppercase', fontWeight: 500 }}>
            <div><input type="checkbox" /></div>
            <div>ID</div><div>Name</div><div>Age</div><div>City · Sub</div><div>Joined</div><div>Status</div><div>Plan</div><div>Actions</div><div></div>
          </div>
          {rows.map((r, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '32px 110px 1.5fr 60px 1fr 1fr 1fr 100px 80px 80px', padding: '10px 14px', borderBottom: i < rows.length - 1 ? `1px solid ${t.borderSoft}` : 'none', alignItems: 'center', fontFamily: '"Mukta", sans-serif', fontSize: 12 }}>
              <div><input type="checkbox" /></div>
              <div className="font-mono" style={{ fontSize: 10.5, color: t.textMuted }}>{r.id}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <AdminAvatar name={r.name} size={26} hue={r.hue} />
                <span>{r.name}</span>
              </div>
              <div>{r.age} {r.gen}</div>
              <div>{r.city} · {r.sub}</div>
              <div style={{ color: t.textMuted, fontFamily: 'Inter, sans-serif', fontSize: 11 }}>{r.joined}</div>
              <div>
                {r.status === 'verified' && <APill kind="success">✓ Verified</APill>}
                {r.status === 'pending' && <APill kind="warn">Pending</APill>}
                {r.status === 'flagged' && <APill kind="error">⚑ Flagged</APill>}
                {r.status === 'featured' && <APill kind="primary">★ Featured</APill>}
              </div>
              <div>
                {r.plan === 'Free' ? <APill kind="default">Free</APill> :
                  r.plan === 'Silver' ? <APill kind="info">Silver</APill> :
                  r.plan === 'Gold' ? <APill kind="primary">Gold</APill> :
                  <APill kind="primary">Platinum</APill>}
              </div>
              <div style={{ color: t.primary, fontFamily: 'Inter, sans-serif', fontSize: 11 }}>View</div>
              <div style={{ color: t.textFaint, fontFamily: 'Inter, sans-serif', fontSize: 11 }}>⋯</div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontFamily: 'Inter, sans-serif', fontSize: 11, color: t.textMuted }}>
          <span>Showing 1–10 of 24,812</span>
          <div style={{ display: 'flex', gap: 4 }}>
            {['‹', '1', '2', '3', '4', '…', '2481', '›'].map((p, i) => (
              <div key={i} style={{ width: 28, height: 28, borderRadius: 6, background: p === '1' ? t.primary : t.surface, border: `1px solid ${p === '1' ? t.primary : t.border}`, color: p === '1' ? '#FFF' : t.text, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Inter, sans-serif', fontSize: 11 }}>{p}</div>
            ))}
          </div>
        </div>
      </div>
    </AdminShell>
  );
}
