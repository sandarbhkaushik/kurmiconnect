import { createFileRoute } from '@tanstack/react-router';
import AdminShell from '@/components/AdminShell';
import ABtn from '@/components/ABtn';
import { t } from '@/lib/theme';

export const Route = createFileRoute('/bulk')({
  component: BulkPage,
});

const ops = [
  { title: 'Import users', sub: 'CSV with phone, name, basic fields', icon: '⇣', cta: 'Choose file', last: 'Last imported 14 May · 412 rows' },
  { title: 'Export users', sub: 'Filtered or full database', icon: '⇡', cta: 'Configure export', last: 'Last export 22 May · 24,812 rows' },
  { title: 'Bulk verify', sub: 'Approve in batch via CSV (admin-only)', icon: '✓', cta: 'Upload approval list', last: '12 batches this month' },
  { title: 'Bulk message', sub: 'WhatsApp / SMS / push to segment', icon: '✉', cta: 'Compose message', last: 'Last sent to 8.2k Gold members' },
  { title: 'Profile cleanup', sub: 'Inactive 180+ days · 1,284 candidates', icon: '⌫', cta: 'Review candidates', last: 'Run weekly · last 16 May' },
  { title: 'Featured invitations', sub: 'CSV of nominations to invite', icon: '★', cta: 'Upload nominations', last: '14 invitations sent this month' },
];

function BulkPage() {
  return (
    <AdminShell active="bulk" title="Bulk operations" subtitle="Import, export, batch actions">
      <div style={{ padding: 28, display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 14 }}>
        {ops.map((op, i) => (
          <div key={i} style={{ padding: 18, background: t.surface, border: `1px solid ${t.borderSoft}`, borderRadius: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
              <div style={{ width: 40, height: 40, borderRadius: 8, background: t.primarySoft, color: t.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>{op.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: '"Mukta", sans-serif', fontSize: 14, fontWeight: 500 }}>{op.title}</div>
                <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: t.textMuted, marginTop: 2 }}>{op.sub}</div>
              </div>
            </div>
            <div style={{ padding: '8px 0', borderTop: `1px solid ${t.borderSoft}`, fontFamily: 'Inter, sans-serif', fontSize: 11, color: t.textFaint }}>{op.last}</div>
            <div style={{ marginTop: 8 }}>
              <ABtn variant="primary" size="sm">{op.cta}</ABtn>
            </div>
          </div>
        ))}
      </div>
    </AdminShell>
  );
}
