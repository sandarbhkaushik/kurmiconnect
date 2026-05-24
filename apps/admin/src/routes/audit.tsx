import { createFileRoute } from '@tanstack/react-router';
import AdminShell from '@/components/AdminShell';
import { t } from '@/lib/theme';

export const Route = createFileRoute('/audit')({
  component: AuditPage,
});

type LogKind = 'verify' | 'refund' | 'mod' | 'editorial' | 'config' | 'commerce' | 'system';

const kindColor: Record<LogKind, string> = {
  verify: t.success, refund: t.warn, mod: t.error,
  editorial: t.primary, config: t.info, commerce: t.primary, system: t.textMuted,
};

const logs: { who: string; what: string; target: string; when: string; kind: LogKind }[] = [
  { who: 'Aarti S.', what: 'Approved verification V-4820', target: 'Anjali Sachan · Education', when: '12:08 PM', kind: 'verify' },
  { who: 'Pooja M.', what: 'Refunded ₹1,499', target: 'TXN8J94K8L · Vinod Singh', when: '11:42 AM', kind: 'refund' },
  { who: 'Mohit T.', what: 'Suspended user', target: 'Sanjay Verma · KC-22184', when: '11:18 AM', kind: 'mod' },
  { who: 'Aarti S.', what: 'Published Featured', target: 'F-014 · Aarti Patel · IAS', when: '10:30 AM', kind: 'editorial' },
  { who: 'Karan V.', what: 'Updated plan pricing', target: 'Gold: ₹1,499 → ₹1,499 (no change)', when: '09:14 AM', kind: 'config' },
  { who: 'Aarti S.', what: 'Rejected verification', target: 'V-4798 · Aadhaar · low quality', when: 'Yesterday 17:22', kind: 'verify' },
  { who: 'Pooja M.', what: 'Issued coupon NAMASTE10', target: '1 user · KC-22014', when: 'Yesterday 16:08', kind: 'commerce' },
  { who: 'System', what: 'Auto-flagged for review', target: '12 chats · financial-scam regex', when: 'Yesterday 12:14', kind: 'system' },
];

function AuditPage() {
  return (
    <AdminShell active="audit" title="Audit log" subtitle="All admin actions · last 30 days">
      <div style={{ padding: 28 }}>
        <div style={{ background: t.surface, border: `1px solid ${t.borderSoft}`, borderRadius: 10, overflow: 'hidden' }}>
          {logs.map((l, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '8px 140px 1.4fr 2fr 120px', padding: '14px 16px', borderBottom: i < logs.length - 1 ? `1px solid ${t.borderSoft}` : 'none', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: kindColor[l.kind] }} />
              <div style={{ fontFamily: '"Mukta", sans-serif', fontSize: 12.5, fontWeight: 500 }}>{l.who}</div>
              <div style={{ fontFamily: '"Mukta", sans-serif', fontSize: 12.5, color: t.text }}>{l.what}</div>
              <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 11.5, color: t.textMuted }}>{l.target}</div>
              <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: t.textFaint, textAlign: 'right' }}>{l.when}</div>
            </div>
          ))}
        </div>
      </div>
    </AdminShell>
  );
}
