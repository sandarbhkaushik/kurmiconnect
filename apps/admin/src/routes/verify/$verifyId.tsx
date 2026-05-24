import { createFileRoute } from '@tanstack/react-router';
import AdminShell from '@/components/AdminShell';
import ABtn from '@/components/ABtn';
import { t } from '@/lib/theme';

export const Route = createFileRoute('/verify/$verifyId')({
  component: VerifyDoc,
});

function VerifyDoc() {
  return (
    <AdminShell
      active="verify-doc"
      title="V-4821 · Aadhaar review"
      subtitle="Rajesh Patel · KC-24811 · Submitted 2 mins ago"
      actions={<>
        <ABtn variant="ghost">Skip</ABtn>
        <ABtn variant="danger">Reject</ABtn>
        <ABtn variant="success" size="md">✓ Approve</ABtn>
      </>}
    >
      <div style={{ padding: 28, display: 'grid', gridTemplateColumns: '1fr 340px', gap: 18 }}>
        {/* Doc preview */}
        <div style={{ background: t.surface, border: `1px solid ${t.borderSoft}`, borderRadius: 10, padding: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 480 }}>
          <div style={{ width: 480, height: 280, background: t.borderSoft, border: `1px solid ${t.border}`, borderRadius: 8, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', color: t.textFaint, fontFamily: 'ui-monospace, monospace', fontSize: 11 }}>
            AADHAAR CARD · PHOTO
            <div style={{ position: 'absolute', top: 10, left: 10, padding: '3px 8px', background: t.surface, borderRadius: 4, fontFamily: 'Inter, sans-serif', fontSize: 10, color: t.text, border: `1px solid ${t.border}` }}>Page 1 of 1</div>
            <div style={{ position: 'absolute', bottom: 10, right: 10, display: 'flex', gap: 4 }}>
              {['−', '+', '↻'].map((ch, i) => (
                <div key={i} style={{ width: 24, height: 24, borderRadius: 4, background: t.surface, border: `1px solid ${t.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: t.text, cursor: 'pointer' }}>{ch}</div>
              ))}
            </div>
          </div>
        </div>

        {/* Verification panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ padding: 16, background: t.surface, border: `1px solid ${t.borderSoft}`, borderRadius: 10 }}>
            <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, color: t.textMuted, letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 8 }}>Submitted by user</div>
            <div style={{ fontFamily: '"Mukta", sans-serif', fontSize: 14, fontWeight: 500 }}>Rajesh Patel</div>
            <div className="font-mono" style={{ fontSize: 11, color: t.textMuted, marginTop: 4 }}>DOB: 14-Aug-1995</div>
            <div className="font-mono" style={{ fontSize: 11, color: t.textMuted }}>Aadhaar: XXXX XXXX 4287</div>
          </div>

          <div style={{ padding: 16, background: t.surface, border: `1px solid ${t.borderSoft}`, borderRadius: 10 }}>
            <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, color: t.textMuted, letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 10 }}>Checks</div>
            {([
              ['Card is clearly visible', true],
              ['Name matches profile', true],
              ['DOB matches profile', true],
              ['Photo not obscured', true],
              ['No signs of editing', null],
            ] as [string, boolean | null][]).map(([l, v], i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 0', fontFamily: '"Mukta", sans-serif', fontSize: 12 }}>
                <div style={{ width: 16, height: 16, borderRadius: 4, background: v === true ? t.success : v === false ? t.error : t.borderSoft, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFF', fontSize: 10 }}>{v === true ? '✓' : v === false ? '✗' : '?'}</div>
                <span style={{ flex: 1 }}>{l}</span>
              </div>
            ))}
          </div>

          <div style={{ padding: 16, background: t.surface, border: `1px solid ${t.borderSoft}`, borderRadius: 10 }}>
            <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, color: t.textMuted, letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 8 }}>Note (internal)</div>
            <div style={{ padding: 10, background: t.bg, borderRadius: 6, minHeight: 60, fontFamily: '"Mukta", sans-serif', fontSize: 12, color: t.textFaint }}>Notes visible to admin team only…</div>
          </div>

          <div style={{ padding: 14, background: t.warnSoft, borderRadius: 8, fontFamily: '"Mukta", sans-serif', fontSize: 11.5, color: t.warn, lineHeight: 1.5 }}>
            ⚠ Reminder: Aadhaar numbers must be partially masked in our database. Only verify DOB and name match.
          </div>
        </div>
      </div>
    </AdminShell>
  );
}
