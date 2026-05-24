import { createFileRoute } from '@tanstack/react-router';
import AdminShell from '@/components/AdminShell';
import ABtn from '@/components/ABtn';
import AdminAvatar from '@/components/AdminAvatar';
import { t } from '@/lib/theme';

export const Route = createFileRoute('/reports/$reportId')({
  component: ReportDetail,
});

const messages = [
  { from: 'reported', text: 'Mere papa hospital me hain, urgent ₹50k chahiye. UPI bhej do please.', flag: true },
  { from: 'reporter', text: 'Excuse me sir, hum abhi mile bhi nahi hain.', flag: false },
  { from: 'reported', text: 'Aap log Kurmi log paisa nahi dete? Insaaniyat naam ki chiz hai ya nahi?', flag: true },
];

function ReportDetail() {
  return (
    <AdminShell
      active="report-detail"
      title="R-2013 · Asking for money"
      subtitle="Critical · Reported by Ritu Mahato (KC-24806) 1 hr ago"
      actions={<>
        <ABtn variant="ghost">Dismiss</ABtn>
        <ABtn variant="secondary">Warn user</ABtn>
        <ABtn variant="danger">Suspend &amp; ban</ABtn>
      </>}
    >
      <div style={{ padding: 28, display: 'grid', gridTemplateColumns: '1fr 320px', gap: 18 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ padding: 16, background: t.surface, border: `1px solid ${t.borderSoft}`, borderRadius: 10 }}>
            <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, color: t.textMuted, letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 10 }}>Reporter's note</div>
            <div style={{ fontFamily: '"Mukta", sans-serif', fontSize: 13, color: t.text, lineHeight: 1.55, padding: 12, background: t.bg, borderRadius: 8, borderLeft: `3px solid ${t.error}` }}>
              "उन्होंने chat में पैसे माँगे — कहा कि emergency है, मेरे पिता बीमार हैं और ₹50,000 तुरंत चाहिए। मैंने मना किया तो abusive language में जवाब दिया।"
            </div>
            <div style={{ marginTop: 8, fontFamily: 'Inter, sans-serif', fontSize: 11, color: t.textFaint }}>3 screenshots attached</div>
          </div>

          <div style={{ padding: 16, background: t.surface, border: `1px solid ${t.borderSoft}`, borderRadius: 10 }}>
            <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, color: t.textMuted, letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 10 }}>Chat evidence (auto-extracted)</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {messages.map((m, i) => (
                <div key={i} style={{ padding: '8px 12px', background: m.flag ? t.errorSoft : t.bg, borderRadius: 6, borderLeft: m.flag ? `3px solid ${t.error}` : 'none' }}>
                  <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 9.5, color: t.textFaint, marginBottom: 3 }}>{m.from === 'reported' ? 'Sanjay Verma' : 'Ritu Mahato'} · 12:42 PM</div>
                  <div style={{ fontFamily: '"Mukta", sans-serif', fontSize: 12, color: t.text }}>{m.text}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ padding: 16, background: t.surface, border: `1px solid ${t.borderSoft}`, borderRadius: 10 }}>
            <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, color: t.textMuted, letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 10 }}>Admin note</div>
            <div style={{ padding: 10, minHeight: 80, background: t.bg, border: `1px solid ${t.border}`, borderRadius: 6, fontFamily: '"Mukta", sans-serif', fontSize: 12, color: t.textFaint }}>
              Pattern matches our financial-scam regex. Recommend suspend + notify other users in conversation.
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ padding: 16, background: t.surface, border: `1px solid ${t.borderSoft}`, borderRadius: 10 }}>
            <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, color: t.textMuted, letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 10 }}>Reported user</div>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 12 }}>
              <AdminAvatar name="Sanjay" size={44} hue={220} />
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: '"Mukta", sans-serif', fontSize: 13, fontWeight: 500 }}>Sanjay Verma</div>
                <div className="font-mono" style={{ fontSize: 10, color: t.textFaint }}>KC-22184</div>
              </div>
            </div>
            {([['Joined', 'Jan 2026'], ['Verifications', '1 of 6'], ['Past reports', '3 · 1 resolved'], ['Plan', 'Free'], ['Last active', '2 hrs ago']] as [string, string][]).map(([l, v], i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0', fontFamily: 'Inter, sans-serif', fontSize: 11 }}>
                <span style={{ color: t.textMuted }}>{l}</span><span style={{ color: t.text }}>{v}</span>
              </div>
            ))}
          </div>

          <div style={{ padding: 14, background: t.errorSoft, borderRadius: 8 }}>
            <div style={{ fontFamily: '"Mukta", sans-serif', fontSize: 12, color: t.error, fontWeight: 500 }}>⚠ 3 prior reports</div>
            <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 10.5, color: t.error, marginTop: 4, lineHeight: 1.5 }}>
              2 dismissed · 1 resolved (financial scam, March 2026). Consider permanent ban.
            </div>
          </div>
        </div>
      </div>
    </AdminShell>
  );
}
