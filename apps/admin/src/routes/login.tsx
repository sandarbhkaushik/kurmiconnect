import { createFileRoute } from '@tanstack/react-router';
import { t } from '@/lib/theme';

export const Route = createFileRoute('/login')({
  component: LoginPage,
});

const otpDigits = ['9', '2', '4', '7', '1', '3'];

function LoginPage() {
  return (
    <div style={{ width: '100vw', height: '100vh', background: t.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: '"Mukta", Inter, system-ui, sans-serif', color: t.text }}>
      <div style={{ display: 'flex', width: 880, height: 540, background: t.surface, borderRadius: 16, overflow: 'hidden', boxShadow: '0 12px 40px rgba(0,0,0,0.06)' }}>

        {/* Left panel */}
        <div style={{ flex: 1, background: t.primaryDeep, padding: 40, color: '#FFF', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: 9, background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: '"Mukta", sans-serif', fontSize: 18, fontWeight: 500 }}>K</div>
            <div>
              <div style={{ fontFamily: '"Mukta", sans-serif', fontSize: 16, fontWeight: 500 }}>KurmiConnect</div>
              <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, opacity: 0.7, letterSpacing: '0.08em' }}>ADMIN</div>
            </div>
          </div>
          <div>
            <div style={{ fontFamily: '"Mukta", sans-serif', fontSize: 22, fontWeight: 500, lineHeight: 1.4, marginBottom: 8 }}>
              विश्वसनीय रिश्ते,<br />सम्मानित परिवार
            </div>
            <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, opacity: 0.8, fontStyle: 'italic' }}>
              "We build with the dignity our community deserves."
            </div>
          </div>
          <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, opacity: 0.55, letterSpacing: '0.05em' }}>
            Admin v2.4.1 · Build a3f24c · 23 May 2026
          </div>
        </div>

        {/* Right panel */}
        <div style={{ flex: 1, padding: 48, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ marginBottom: 24 }}>
            <div style={{ fontFamily: '"Mukta", sans-serif', fontSize: 22, fontWeight: 500 }}>Sign in</div>
            <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: t.textMuted, marginTop: 4 }}>Use your @kurmi.in admin account</div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 18 }}>
            <div>
              <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: t.textMuted, marginBottom: 4 }}>Email</div>
              <div style={{ height: 42, padding: '0 12px', background: t.bg, border: `1px solid ${t.border}`, borderRadius: 8, display: 'flex', alignItems: 'center', fontFamily: 'ui-monospace, monospace', fontSize: 13 }}>aarti@kurmi.in</div>
            </div>
            <div>
              <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: t.textMuted, marginBottom: 4 }}>Password</div>
              <div style={{ height: 42, padding: '0 12px', background: t.surface, border: `1.5px solid ${t.primary}`, borderRadius: 8, display: 'flex', alignItems: 'center', fontFamily: 'ui-monospace, monospace', fontSize: 13, letterSpacing: '0.2em' }}>••••••••••</div>
            </div>
            <div>
              <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: t.textMuted, marginBottom: 4 }}>2FA · code from Authenticator</div>
              <div style={{ display: 'flex', gap: 6 }}>
                {otpDigits.map((d, i) => (
                  <div key={i} style={{ flex: 1, height: 42, background: t.bg, border: `1px solid ${t.border}`, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'ui-monospace, monospace', fontSize: 16, fontWeight: 500 }}>{d}</div>
                ))}
              </div>
            </div>
          </div>

          <div style={{ marginBottom: 14, display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 16, height: 16, borderRadius: 4, background: t.primary, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: '#FFF', fontSize: 10 }}>✓</span>
            </div>
            <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 11.5, color: t.textMuted }}>Trust this device for 7 days</div>
          </div>

          <div style={{ height: 48, background: t.primary, color: '#FFF', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: '"Mukta", sans-serif', fontSize: 14, fontWeight: 500, cursor: 'pointer' }}>
            Sign in
          </div>
          <div style={{ textAlign: 'center', marginTop: 14, fontFamily: 'Inter, sans-serif', fontSize: 11, color: t.primary }}>
            Forgot password? · Contact engineering
          </div>
        </div>
      </div>
    </div>
  );
}
