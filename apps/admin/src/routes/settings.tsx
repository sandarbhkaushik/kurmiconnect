import { createFileRoute } from '@tanstack/react-router';
import AdminShell from '@/components/AdminShell';
import { t } from '@/lib/theme';

export const Route = createFileRoute('/settings')({
  component: SettingsPage,
});

type SettingItem = [string, string, boolean];

const sections: { title: string; items: SettingItem[] }[] = [
  { title: 'Features', items: [
    ['Same-gotra matching', 'Allow users to match same gotra', false],
    ['Other-caste matching', 'OBC inter-caste suggestions', true],
    ['Video intro slots', 'New 30-sec video feature', false],
    ['AI biodata drafting', 'LLM-assisted About me', false],
  ]},
  { title: 'Verification', items: [
    ['Auto-approve Aadhaar', 'If KYC API matches DOB+name', false],
    ['Photo selfie required', 'For blue tick badge', true],
    ['Re-verify yearly', 'Force re-verification after 12 months', true],
    ['Manual review threshold', 'Flag if confidence < 95%', true],
  ]},
  { title: 'Communication', items: [
    ['WhatsApp OTP', 'Send via Business API', true],
    ['Voice OTP', 'Fallback for poor connectivity', true],
    ['Push notifications', 'Match suggestions daily 9am', true],
    ['Email digests', 'Weekly summary to family', false],
  ]},
  { title: 'Commerce', items: [
    ['Auto-renew', 'Enable subscription auto-renewal', false],
    ['UPI cash via agent', 'Tier 2/3 cash payments', true],
    ['Refund grace period', '7 days from purchase', true],
    ['GST shown separately', 'Tax breakdown on invoice', false],
  ]},
  { title: 'Safety', items: [
    ['Phone number masking', 'Hide before acceptance', true],
    ['Financial scam regex', 'Auto-flag money requests', true],
    ['Photo download lock', 'Watermark + block for free users', true],
    ['Suspicious link blocker', 'Strip URLs in first 7 days', true],
  ]},
  { title: 'Editorial', items: [
    ['Featured editorial review', 'All edits go through 2 admins', true],
    ['Public credentials check', 'Require third-party source', true],
    ['Featured expiry', 'Auto-expire after 365 days', true],
    ['Paid placement allowed', 'NEVER', false],
  ]},
];

function Toggle({ on }: { on: boolean }) {
  return (
    <div style={{ width: 34, height: 20, borderRadius: 999, background: on ? t.primary : t.borderSoft, position: 'relative', flexShrink: 0 }}>
      <div style={{ position: 'absolute', top: 2, [on ? 'right' : 'left']: 2, width: 16, height: 16, borderRadius: '50%', background: '#FFF' }} />
    </div>
  );
}

function SettingsPage() {
  return (
    <AdminShell active="settings" title="App settings" subtitle="Global toggles · feature flags · webhooks">
      <div style={{ padding: 28, display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 14 }}>
        {sections.map((sec, i) => (
          <div key={i} style={{ padding: 18, background: t.surface, border: `1px solid ${t.borderSoft}`, borderRadius: 10 }}>
            <div style={{ fontFamily: '"Mukta", sans-serif', fontSize: 14, fontWeight: 500, marginBottom: 12 }}>{sec.title}</div>
            {sec.items.map(([name, sub, on], j) => (
              <div key={j} style={{ padding: '10px 0', borderTop: j > 0 ? `1px solid ${t.borderSoft}` : 'none', display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: '"Mukta", sans-serif', fontSize: 12.5 }}>{name}</div>
                  <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 10.5, color: t.textFaint, marginTop: 2 }}>{sub}</div>
                </div>
                <Toggle on={on} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </AdminShell>
  );
}
