import { createFileRoute } from '@tanstack/react-router';
import AdminShell from '@/components/AdminShell';
import APill from '@/components/APill';
import ABtn from '@/components/ABtn';
import AdminAvatar from '@/components/AdminAvatar';
import { t } from '@/lib/theme';

export const Route = createFileRoute('/users/$userId')({
  component: UserDetail,
});

function UserDetail() {
  return (
    <AdminShell
      active="user-detail"
      title="Priya Patel · KC-24812"
      subtitle="Joined 23 May 2026 · Verified · Gold member"
      actions={<>
        <ABtn variant="secondary">Send message</ABtn>
        <ABtn variant="danger">Suspend</ABtn>
        <ABtn variant="primary">Edit</ABtn>
      </>}
    >
      <div style={{ padding: 28, display: 'grid', gridTemplateColumns: '300px 1fr', gap: 18 }}>
        {/* Left col */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ padding: 18, background: t.surface, border: `1px solid ${t.borderSoft}`, borderRadius: 10, textAlign: 'center' }}>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <AdminAvatar name="Priya" size={120} hue={20} />
            </div>
            <div style={{ marginTop: 12, fontFamily: '"Mukta", sans-serif', fontSize: 16, fontWeight: 500 }}>Priya Patel</div>
            <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: t.textMuted, marginTop: 2 }}>26 · 5'4" · Patel</div>
            <div style={{ marginTop: 10, display: 'flex', gap: 4, justifyContent: 'center', flexWrap: 'wrap' }}>
              <APill kind="success">✓ Aadhaar</APill>
              <APill kind="success">✓ Edu</APill>
              <APill kind="success">✓ Job</APill>
              <APill kind="success">✓ Photo</APill>
            </div>
          </div>
          <div style={{ padding: 14, background: t.surface, border: `1px solid ${t.borderSoft}`, borderRadius: 10 }}>
            <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, color: t.textMuted, letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 8 }}>Contact</div>
            <div className="font-mono" style={{ fontSize: 11, color: t.text, lineHeight: 1.8 }}>
              <div>📞 +91 98765 43210</div>
              <div>✉ priya.patel@gmail.com</div>
              <div>📍 Lucknow, UP · India</div>
            </div>
          </div>
          <div style={{ padding: 14, background: t.surface, border: `1px solid ${t.borderSoft}`, borderRadius: 10 }}>
            <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, color: t.textMuted, letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 8 }}>Activity stats</div>
            {([['Profile views', '1,124'], ['Interests sent', '14'], ['Interests received', '47'], ['Shortlisted by', '23'], ['Match rate', '32%']] as [string, string][]).map(([l, v], i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', fontFamily: '"Mukta", sans-serif', fontSize: 12 }}>
                <span style={{ color: t.textMuted }}>{l}</span><span>{v}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right col */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ display: 'flex', gap: 4, borderBottom: `1px solid ${t.borderSoft}`, paddingBottom: 0 }}>
            {['Profile', 'Verifications', 'Subscription', 'Interests', 'Reports', 'Activity log'].map((tab, i) => (
              <div key={i} style={{ padding: '8px 14px', borderBottom: i === 0 ? `2px solid ${t.primary}` : 'none', marginBottom: -1, fontFamily: '"Mukta", sans-serif', fontSize: 12, color: i === 0 ? t.primary : t.textMuted, fontWeight: i === 0 ? 500 : 400, cursor: 'pointer' }}>{tab}</div>
            ))}
          </div>
          {[
            { title: 'Basic info', rows: [['First name', 'Priya'], ['Last name', 'Patel'], ['DOB', '04 Feb 1999'], ['Gender', 'Female'], ['Marital', 'Never married']] },
            { title: 'Community', rows: [['Religion', 'Hindu (locked)'], ['Caste', 'Kurmi (locked)'], ['Sub-caste', 'Patel'], ['Gotra', 'Kashyap'], ['Mother tongue', 'Hindi']] },
            { title: 'Education & profession', rows: [['Education', 'M.Sc Mathematics'], ['University', 'Lucknow University'], ['Profession', 'PGT Teacher'], ['Workplace', 'City Montessori'], ['Income', '5-10 lakh']] },
            { title: 'Family', rows: [['Father', 'Suresh Patel · Farmer'], ['Mother', 'Indu Patel · Homemaker'], ['Siblings', '1 brother (married)'], ['Native', 'Gopalganj, Bihar'], ['Family type', 'Joint']] },
          ].map((sec, i) => (
            <div key={i} style={{ padding: 16, background: t.surface, border: `1px solid ${t.borderSoft}`, borderRadius: 10 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                <div style={{ fontFamily: '"Mukta", sans-serif', fontSize: 13, fontWeight: 500 }}>{sec.title}</div>
                <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: t.primary, cursor: 'pointer' }}>Edit</div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
                {sec.rows.map(([l, v], j) => (
                  <div key={j}>
                    <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, color: t.textFaint, letterSpacing: '0.02em' }}>{l}</div>
                    <div style={{ fontFamily: '"Mukta", sans-serif', fontSize: 12, color: t.text, marginTop: 2 }}>{v}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminShell>
  );
}
