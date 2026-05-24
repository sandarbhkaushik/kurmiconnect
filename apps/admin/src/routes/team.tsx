import { createFileRoute } from '@tanstack/react-router';
import AdminShell from '@/components/AdminShell';
import AdminAvatar from '@/components/AdminAvatar';
import ABtn from '@/components/ABtn';
import APill from '@/components/APill';
import { t } from '@/lib/theme';

export const Route = createFileRoute('/team')({
  component: TeamPage,
});

const team = [
  { name: 'Aarti Sharma', role: 'Editorial admin', email: 'aarti@kurmi.in', perms: 'Featured · Reports · Verify', state: 'active', hue: 30 },
  { name: 'Mohit Tiwari', role: 'Verification lead', email: 'mohit@kurmi.in', perms: 'Verify · Reports · Users', state: 'active', hue: 200 },
  { name: 'Pooja Mishra', role: 'Support · Refunds', email: 'pooja@kurmi.in', perms: 'Refunds · Support · Users (read)', state: 'active', hue: 340 },
  { name: 'Sanjay Kumar', role: 'RM · Platinum', email: 'sanjay@kurmi.in', perms: 'RM console · Users (read)', state: 'active', hue: 100 },
  { name: 'Renu Patel', role: 'Editorial', email: 'renu@kurmi.in', perms: 'Featured · Content', state: 'invited', hue: 60 },
  { name: 'Karan Verma', role: 'Engineering', email: 'karan@kurmi.in', perms: 'All access · audit', state: 'active', hue: 220 },
];

function TeamPage() {
  return (
    <AdminShell active="team" title="Team & roles" subtitle="6 admins · 4 active roles" actions={<ABtn variant="primary">+ Invite admin</ABtn>}>
      <div style={{ padding: 28 }}>
        <div style={{ background: t.surface, border: `1px solid ${t.borderSoft}`, borderRadius: 10, overflow: 'hidden' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1.2fr 1.4fr 2fr 100px 80px', padding: '10px 14px', background: t.bg, borderBottom: `1px solid ${t.borderSoft}`, fontFamily: 'Inter, sans-serif', fontSize: 10, color: t.textMuted, letterSpacing: '0.05em', textTransform: 'uppercase' as const, fontWeight: 500 }}>
            <div>Name</div><div>Role</div><div>Email</div><div>Permissions</div><div>State</div><div>Action</div>
          </div>
          {team.map((m, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '1.4fr 1.2fr 1.4fr 2fr 100px 80px', padding: '12px 14px', borderBottom: i < team.length - 1 ? `1px solid ${t.borderSoft}` : 'none', alignItems: 'center', fontFamily: '"Mukta", sans-serif', fontSize: 12.5 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <AdminAvatar name={m.name} size={32} hue={m.hue} />
                <span style={{ fontWeight: 500 }}>{m.name}</span>
              </div>
              <div>{m.role}</div>
              <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: 11, color: t.textMuted }}>{m.email}</div>
              <div style={{ color: t.textMuted, fontFamily: 'Inter, sans-serif', fontSize: 11 }}>{m.perms}</div>
              <div>{m.state === 'active' ? <APill kind="success">● Active</APill> : <APill kind="warn">Invited</APill>}</div>
              <div style={{ color: t.primary, fontFamily: 'Inter, sans-serif', fontSize: 11, cursor: 'pointer' }}>Edit</div>
            </div>
          ))}
        </div>
      </div>
    </AdminShell>
  );
}
