// screens-1-20.jsx — Pre-auth + Onboarding
// Mid-fi mobile screens (380×744). Each is a self-contained component
// receiving { theme } for color overrides.

// ─── 1. SPLASH ───
function S01_Splash({ theme }) {
  const t = theme;
  return (
    <MobileScreen theme={t} statusBar={false}>
      <div style={{
        flex: 1, height: '100%', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        background: `linear-gradient(180deg, ${t.bg} 0%, ${t.surfaceWarm} 100%)`,
      }}>
        {/* Logo mark */}
        <div style={{
          width: 96, height: 96, borderRadius: 24,
          background: t.primary, display: 'flex', alignItems: 'center', justifyContent: 'center',
          marginBottom: 28,
        }}>
          <svg width="52" height="52" viewBox="0 0 52 52">
            <path d="M26 12c-6 0-10 4-10 9 0 7 10 17 10 17s10-10 10-17c0-5-4-9-10-9z" fill="#FFF" opacity="0.95"/>
            <circle cx="26" cy="21" r="3.5" fill={t.primary}/>
          </svg>
        </div>
        <div style={{
          fontFamily: '"Mukta", sans-serif', fontWeight: 500, fontSize: 32,
          color: t.text, letterSpacing: '-0.01em', marginBottom: 4,
        }}>KurmiConnect</div>
        <div style={{
          fontFamily: 'Inter, sans-serif', fontSize: 11, color: t.textFaint,
          letterSpacing: '0.18em', textTransform: 'uppercase',
        }}>est. 2026</div>

        <div style={{ marginTop: 40, maxWidth: 280, textAlign: 'center' }}>
          <div style={{ fontFamily: '"Mukta", sans-serif', fontWeight: 400, fontSize: 17, color: t.text, lineHeight: 1.5, marginBottom: 8 }}>
            विश्वसनीय रिश्ते,<br/>सम्मानित परिवार
          </div>
          <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: t.textMuted, fontStyle: 'italic' }}>
            Trusted matches, respected families
          </div>
        </div>

        <div style={{ position: 'absolute', bottom: 60, display: 'flex', gap: 6 }}>
          {[0,1,2].map(i => (
            <div key={i} style={{ width: 6, height: 6, borderRadius: '50%', background: t.primary, opacity: i === 1 ? 1 : 0.3 }}/>
          ))}
        </div>
      </div>
    </MobileScreen>
  );
}

// ─── 2. LANGUAGE PICKER ───
function S02_Language({ theme }) {
  const t = theme;
  const langs = [
    { hi: 'हिन्दी', en: 'Hindi', selected: true },
    { hi: 'English', en: '', selected: false },
    { hi: 'मराठी', en: 'Marathi · Phase 2', selected: false, disabled: true },
  ];
  return (
    <MobileScreen theme={t}>
      <div style={{ padding: '24px 24px 0' }}>
        <div style={{ marginBottom: 32 }}>
          <BiLabel hi="अपनी भाषा चुनें" en="Choose your language" size="xxl" theme={t} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {langs.map((l, i) => (
            <div key={i} style={{
              height: 80, padding: '0 20px',
              background: l.disabled ? t.borderSoft : t.surface,
              border: `1.5px solid ${l.selected ? t.primary : t.border}`,
              borderRadius: 12,
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              opacity: l.disabled ? 0.5 : 1,
            }}>
              <div>
                <div style={{ fontFamily: '"Mukta", sans-serif', fontWeight: 500, fontSize: 22, color: t.text }}>{l.hi}</div>
                {l.en && <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: t.textFaint, marginTop: 2 }}>{l.en}</div>}
              </div>
              {l.selected && (
                <div style={{ width: 28, height: 28, borderRadius: '50%', background: t.primary, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <CheckIcon color="#FFF" size={16} />
                </div>
              )}
              {l.disabled && <Badge kind="outline" theme={t}>Coming soon</Badge>}
            </div>
          ))}
        </div>
      </div>
      <div style={{ padding: '24px', marginTop: 'auto' }}>
        <Button variant="primary" size="lg" full theme={t}>
          जारी रखें · Continue
        </Button>
      </div>
    </MobileScreen>
  );
}

// ─── 3. PHONE NUMBER ───
function S03_Phone({ theme }) {
  const t = theme;
  return (
    <MobileScreen theme={t}>
      <div style={{ padding: '24px' }}>
        <BackIcon color={t.textMuted} size={22} />
        <div style={{ marginTop: 28, marginBottom: 28 }}>
          <BiLabel hi="अपना मोबाइल नंबर डालें" en="Enter your mobile number" size="xl" theme={t} />
          <div style={{ marginTop: 8, fontFamily: '"Mukta", sans-serif', fontSize: 13, color: t.textMuted, lineHeight: 1.5 }}>
            OTP WhatsApp या SMS पर आएगा<br/>
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: t.textFaint }}>OTP will arrive on WhatsApp or SMS</span>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
          <div style={{
            height: 56, width: 84, padding: '0 12px',
            background: t.borderSoft, border: `1px solid ${t.border}`,
            borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: '"Mukta", sans-serif', fontSize: 16, color: t.text,
          }}>+91</div>
          <div style={{
            flex: 1, height: 56, padding: '0 16px',
            background: t.surface, border: `1.5px solid ${t.primary}`,
            borderRadius: 10, display: 'flex', alignItems: 'center',
            fontFamily: '"Mukta", sans-serif', fontSize: 20, color: t.text,
            letterSpacing: '0.05em',
          }}>98765 43210</div>
        </div>

        <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginTop: 20 }}>
          <div style={{ width: 18, height: 18, borderRadius: 4, border: `1.5px solid ${t.primary}`, background: t.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
            <CheckIcon size={12} color="#FFF" />
          </div>
          <div style={{ fontFamily: '"Mukta", sans-serif', fontSize: 13, color: t.textMuted, lineHeight: 1.5 }}>
            मैं <span style={{ color: t.primary }}>Terms</span> और <span style={{ color: t.primary }}>Privacy Policy</span> से सहमत हूँ
            <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: t.textFaint, marginTop: 2 }}>I agree to Terms and Privacy</div>
          </div>
        </div>
      </div>

      <div style={{ padding: '24px', marginTop: 'auto' }}>
        <Button variant="primary" size="lg" full theme={t}>OTP भेजें · Send OTP</Button>
        <div style={{ marginTop: 16, textAlign: 'center', fontFamily: '"Mukta", sans-serif', fontSize: 13, color: t.textMuted }}>
          पहले से account है? <span style={{ color: t.primary }}>Login</span>
        </div>
      </div>
    </MobileScreen>
  );
}

// ─── 4. OTP VERIFICATION ───
function S04_OTP({ theme }) {
  const t = theme;
  const otpDigits = ['9', '8', '4', '2', '', ''];
  return (
    <MobileScreen theme={t}>
      <div style={{ padding: '24px' }}>
        <BackIcon color={t.textMuted} size={22} />
        <div style={{ marginTop: 28, marginBottom: 28 }}>
          <BiLabel hi="OTP डालें" en="Enter OTP" size="xl" theme={t} />
          <div style={{ marginTop: 10, display: 'flex', alignItems: 'center', gap: 6, fontFamily: '"Mukta", sans-serif', fontSize: 13, color: t.textMuted }}>
            +91 98765 43210 पर भेजा गया
            <EditIcon size={13} color={t.primary} />
          </div>
        </div>

        <div style={{ display: 'flex', gap: 8, justifyContent: 'space-between', marginBottom: 24 }}>
          {otpDigits.map((d, i) => (
            <div key={i} style={{
              flex: 1, height: 56, maxWidth: 50,
              background: t.surface,
              border: `1.5px solid ${i === 4 ? t.primary : (d ? t.text : t.border)}`,
              borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: '"Mukta", sans-serif', fontWeight: 500, fontSize: 24, color: t.text,
            }}>{d}</div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontFamily: '"Mukta", sans-serif', fontSize: 13, color: t.textFaint }}>
            0:18 में दोबारा भेजें · Resend in 0:18
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <Button variant="secondary" size="md" full theme={t}>OTP दोबारा भेजें · Resend OTP (SMS)</Button>
          <Button variant="secondary" size="md" full theme={t}>WhatsApp पर भेजें</Button>
          <Button variant="ghost" size="md" full theme={t}>Voice call OTP</Button>
        </div>
      </div>

      <div style={{ padding: '24px', marginTop: 'auto' }}>
        <Button variant="primary" size="lg" full theme={t}>Verify और आगे बढ़ें</Button>
      </div>
    </MobileScreen>
  );
}

// ─── ONBOARDING WRAPPER — progress + back + content + next ───
function OnboardStep({ theme, step, total, hi, en, subtitle, children, ctaHi = 'आगे', ctaEn = 'Next' }) {
  const t = theme;
  return (
    <MobileScreen theme={t}>
      <div style={{ padding: '16px 24px 0', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
          <BackIcon color={t.textMuted} size={20}/>
          <ProgressBar value={step} max={total} theme={t} height={3} />
          <div style={{ fontSize: 11, fontFamily: 'Inter, sans-serif', color: t.textFaint, whiteSpace: 'nowrap' }}>
            {step}/{total}
          </div>
        </div>
        <div style={{ marginBottom: 4 }}>
          <BiLabel hi={hi} en={en} size="lg" theme={t} />
        </div>
        {subtitle && <div style={{ fontFamily: '"Mukta", sans-serif', fontSize: 12, color: t.textMuted, marginBottom: 16 }}>{subtitle}</div>}
      </div>
      <div style={{ flex: 1, overflow: 'auto', padding: '8px 24px 24px' }}>
        {children}
      </div>
      <div style={{ padding: '16px 24px 24px', borderTop: `1px solid ${t.borderSoft}`, background: t.surface }}>
        <Button variant="primary" size="lg" full theme={t}>{ctaHi} · {ctaEn}</Button>
      </div>
    </MobileScreen>
  );
}

// ─── 5. PROFILE FOR WHOM ───
function S05_ProfileFor({ theme }) {
  const t = theme;
  const options = [
    { hi: 'अपने लिए', en: 'Myself', selected: true },
    { hi: 'बेटे के लिए', en: 'My son' },
    { hi: 'बेटी के लिए', en: 'My daughter' },
    { hi: 'भाई के लिए', en: 'My brother' },
    { hi: 'बहन के लिए', en: 'My sister' },
    { hi: 'रिश्तेदार', en: 'Relative' },
  ];
  return (
    <OnboardStep theme={t} step={1} total={14} hi="यह profile किसके लिए है?" en="Whose profile is this?" subtitle="हम accordingly आपको दिखाएँगे · We'll personalize accordingly">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {options.map((o, i) => (
          <div key={i} style={{
            height: 64, padding: '0 18px',
            background: t.surface,
            border: `1.5px solid ${o.selected ? t.primary : t.border}`,
            borderRadius: 12, display: 'flex', alignItems: 'center', gap: 14,
          }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: o.selected ? t.primarySoft : t.borderSoft, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <UserIcon size={18} color={o.selected ? t.primary : t.textMuted} />
            </div>
            <div style={{ flex: 1 }}>
              <BiLabel hi={o.hi} en={o.en} size="sm" theme={t} />
            </div>
            {o.selected && <CheckIcon color={t.primary} size={18} />}
          </div>
        ))}
      </div>
    </OnboardStep>
  );
}

// ─── 6. BASIC INFO ───
function S06_Basic({ theme }) {
  const t = theme;
  return (
    <OnboardStep theme={t} step={2} total={14} hi="मूलभूत जानकारी" en="Basic info">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <Field hi="पहला नाम" en="First name *" value="Rajesh" theme={t} />
        <Field hi="मध्य नाम" en="Middle name" placeholder="Optional" theme={t} />
        <Field hi="अंतिम नाम" en="Last name *" value="Patel" help="Auto-suggest from Kurmi surnames" theme={t} />
        <div>
          <BiLabel hi="लिंग" en="Gender" size="sm" theme={t} />
          <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
            {[['पुरुष', 'Male', true], ['स्त्री', 'Female', false]].map(([hi, en, sel], i) => (
              <div key={i} style={{
                flex: 1, height: 48, borderRadius: 10,
                background: sel ? t.primarySoft : t.surface,
                border: `1.5px solid ${sel ? t.primary : t.border}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: '"Mukta", sans-serif', fontSize: 14, color: sel ? t.primaryDeep : t.text,
              }}>{hi} · {en}</div>
            ))}
          </div>
        </div>
        <Field hi="जन्म तिथि" en="Date of birth" value="14 अगस्त 1995" theme={t} />
        <div>
          <BiLabel hi="वैवाहिक स्थिति" en="Marital status" size="sm" theme={t} />
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 8 }}>
            {[['कभी विवाहित नहीं', 'Never married', true], ['तलाकशुदा', 'Divorced'], ['विधवा/विधुर', 'Widowed'], ['तलाक प्रक्रिया में', 'Awaiting divorce']].map(([hi, en, sel], i) => (
              <div key={i} style={{
                padding: '8px 12px', borderRadius: 999,
                background: sel ? t.primarySoft : t.surface,
                border: `1px solid ${sel ? t.primary : t.border}`,
                fontFamily: '"Mukta", sans-serif', fontSize: 12,
                color: sel ? t.primaryDeep : t.text,
              }}>{hi}</div>
            ))}
          </div>
        </div>
      </div>
    </OnboardStep>
  );
}

// ─── 7. PHYSICAL ───
function S07_Physical({ theme }) {
  const t = theme;
  return (
    <OnboardStep theme={t} step={3} total={14} hi="शारीरिक जानकारी" en="Physical attributes">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 10 }}>
            <BiLabel hi="कद" en="Height" size="sm" theme={t} />
            <div style={{ fontFamily: '"Mukta", sans-serif', fontSize: 16, color: t.primary, fontWeight: 500 }}>5'8" · 173 cm</div>
          </div>
          <div style={{ position: 'relative', height: 24 }}>
            <div style={{ position: 'absolute', top: 11, left: 0, right: 0, height: 3, background: t.borderSoft, borderRadius: 999 }}/>
            <div style={{ position: 'absolute', top: 11, left: 0, width: '52%', height: 3, background: t.primary, borderRadius: 999 }}/>
            <div style={{ position: 'absolute', top: 4, left: 'calc(52% - 8px)', width: 16, height: 16, borderRadius: '50%', background: t.surface, border: `2px solid ${t.primary}` }}/>
          </div>
        </div>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 10 }}>
            <BiLabel hi="वजन (optional)" en="Weight" size="sm" theme={t} />
            <div style={{ fontFamily: '"Mukta", sans-serif', fontSize: 16, color: t.primary, fontWeight: 500 }}>72 kg</div>
          </div>
          <div style={{ position: 'relative', height: 24 }}>
            <div style={{ position: 'absolute', top: 11, left: 0, right: 0, height: 3, background: t.borderSoft, borderRadius: 999 }}/>
            <div style={{ position: 'absolute', top: 11, left: 0, width: '32%', height: 3, background: t.primary, borderRadius: 999 }}/>
            <div style={{ position: 'absolute', top: 4, left: 'calc(32% - 8px)', width: 16, height: 16, borderRadius: '50%', background: t.surface, border: `2px solid ${t.primary}` }}/>
          </div>
        </div>
        <div>
          <BiLabel hi="शारीरिक बनावट" en="Body type" size="sm" theme={t} />
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 8 }}>
            {[['पतला', 'Slim'], ['औसत', 'Average', true], ['मोटा', 'Heavy'], ['Athletic', '']].map(([hi, en, sel], i) => (
              <div key={i} style={{ padding: '8px 14px', borderRadius: 999, background: sel ? t.primarySoft : t.surface, border: `1px solid ${sel ? t.primary : t.border}`, fontFamily: '"Mukta", sans-serif', fontSize: 13, color: sel ? t.primaryDeep : t.text }}>{hi}{en && <span style={{ color: t.textFaint, fontSize: 11, marginLeft: 4 }}>· {en}</span>}</div>
            ))}
          </div>
        </div>
        <div>
          <BiLabel hi="रंग" en="Complexion" size="sm" theme={t} />
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 8 }}>
            {[['गोरा', 'Fair'], ['गेहुआ', 'Wheatish', true], ['सांवला', 'Dark']].map(([hi, en, sel], i) => (
              <div key={i} style={{ padding: '8px 14px', borderRadius: 999, background: sel ? t.primarySoft : t.surface, border: `1px solid ${sel ? t.primary : t.border}`, fontFamily: '"Mukta", sans-serif', fontSize: 13, color: sel ? t.primaryDeep : t.text }}>{hi} · {en}</div>
            ))}
          </div>
        </div>
        <div>
          <BiLabel hi="कोई शारीरिक चुनौती?" en="Any physical challenge?" size="sm" theme={t} />
          <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
            {[['नहीं', 'None', true], ['हाँ', 'Yes']].map(([hi, en, sel], i) => (
              <div key={i} style={{ flex: 1, height: 44, borderRadius: 10, background: sel ? t.primarySoft : t.surface, border: `1.5px solid ${sel ? t.primary : t.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: '"Mukta", sans-serif', fontSize: 13, color: sel ? t.primaryDeep : t.text }}>{hi} · {en}</div>
            ))}
          </div>
        </div>
      </div>
    </OnboardStep>
  );
}

// ─── 8. COMMUNITY & CASTE ───
function S08_Community({ theme }) {
  const t = theme;
  return (
    <OnboardStep theme={t} step={4} total={14} hi="समुदाय और जाति" en="Community & caste">
      <Card padding={14} theme={t} style={{ marginBottom: 18, background: t.surfaceWarm, borderColor: 'transparent' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <LockIcon size={14} color={t.primary} />
          <div style={{ fontFamily: '"Mukta", sans-serif', fontSize: 12, color: t.text, lineHeight: 1.4 }}>
            <strong style={{ fontWeight: 500 }}>धर्म: Hindu</strong> · <strong style={{ fontWeight: 500 }}>जाति: Kurmi</strong>
            <div style={{ fontSize: 10, color: t.textFaint }}>Pre-set for this community app</div>
          </div>
        </div>
      </Card>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <Field hi="उप-जाति" en="Sub-caste" value="Patel" theme={t} />
        <Field hi="गोत्र" en="Gotra" value="Kashyap" help="गोत्र शादी में महत्वपूर्ण है · Important for compatibility" theme={t} />
        <div>
          <BiLabel hi="क्या same-gotra match स्वीकार है?" en="Same-gotra match acceptable?" size="sm" theme={t} />
          <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
            {[['हाँ', 'Yes'], ['नहीं', 'No', true]].map(([hi, en, sel], i) => (
              <div key={i} style={{ flex: 1, height: 44, borderRadius: 10, background: sel ? t.primarySoft : t.surface, border: `1.5px solid ${sel ? t.primary : t.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: '"Mukta", sans-serif', fontSize: 13, color: sel ? t.primaryDeep : t.text }}>{hi} · {en}</div>
            ))}
          </div>
        </div>
        <Field hi="मातृभाषा" en="Mother tongue" value="Hindi" theme={t} />
      </div>
    </OnboardStep>
  );
}

// ─── 9. CURRENT LOCATION ───
function S09_Location({ theme }) {
  const t = theme;
  return (
    <OnboardStep theme={t} step={5} total={14} hi="वर्तमान निवास" en="Current location">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <Field hi="देश" en="Country" value="India" theme={t} />
        <Field hi="राज्य" en="State" value="Uttar Pradesh" theme={t} />
        <Field hi="जिला" en="District" value="Lucknow" theme={t} />
        <Field hi="शहर" en="City" value="Lucknow" theme={t} />
        <Field hi="कब से यहाँ रह रहे हैं?" en="Residing since" value="2018" theme={t} />
        <div>
          <BiLabel hi="क्या ये आपका मूल निवास है?" en="Is this your native place?" size="sm" theme={t} />
          <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
            {[['हाँ', 'Yes'], ['नहीं', 'No', true]].map(([hi, en, sel], i) => (
              <div key={i} style={{ flex: 1, height: 44, borderRadius: 10, background: sel ? t.primarySoft : t.surface, border: `1.5px solid ${sel ? t.primary : t.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: '"Mukta", sans-serif', fontSize: 13, color: sel ? t.primaryDeep : t.text }}>{hi} · {en}</div>
            ))}
          </div>
        </div>
      </div>
    </OnboardStep>
  );
}

// ─── 10. NATIVE PLACE ───
function S10_Native({ theme }) {
  const t = theme;
  return (
    <OnboardStep theme={t} step={6} total={14} hi="मूल निवास" en="Native place">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <Field hi="मूल राज्य" en="Native state" value="Bihar" theme={t} />
        <Field hi="मूल जिला" en="Native district" value="Gopalganj" theme={t} />
        <Field hi="मूल गाँव/शहर" en="Native village or town" value="Hathua" theme={t} />
        <div>
          <BiLabel hi="क्या आपका परिवार अभी भी वहाँ है?" en="Does your family still live there?" size="sm" theme={t} />
          <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
            {[['हाँ', 'Yes', true], ['नहीं', 'No']].map(([hi, en, sel], i) => (
              <div key={i} style={{ flex: 1, height: 44, borderRadius: 10, background: sel ? t.primarySoft : t.surface, border: `1.5px solid ${sel ? t.primary : t.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: '"Mukta", sans-serif', fontSize: 13, color: sel ? t.primaryDeep : t.text }}>{hi} · {en}</div>
            ))}
          </div>
        </div>
        <div>
          <BiLabel hi="क्या आपके खेत/जमीन वहाँ है?" en="Do you own land/farm there?" size="sm" theme={t} />
          <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
            {[['हाँ', 'Yes', true], ['नहीं', 'No'], ['Skip', '']].map(([hi, en, sel], i) => (
              <div key={i} style={{ flex: 1, height: 44, borderRadius: 10, background: sel ? t.primarySoft : t.surface, border: `1.5px solid ${sel ? t.primary : t.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: '"Mukta", sans-serif', fontSize: 13, color: sel ? t.primaryDeep : t.text }}>{hi}{en && ` · ${en}`}</div>
            ))}
          </div>
        </div>
      </div>
    </OnboardStep>
  );
}

// ─── 11. EDUCATION ───
function S11_Education({ theme }) {
  const t = theme;
  return (
    <OnboardStep theme={t} step={7} total={14} hi="शिक्षा" en="Education">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <Field hi="उच्चतम शिक्षा" en="Highest qualification" value="BTech / BE" theme={t} />
        <Field hi="विशेषज्ञता" en="Specialisation" value="Computer Science" theme={t} />
        <Field hi="कॉलेज / यूनिवर्सिटी" en="College/University" value="IET Lucknow" theme={t} />
        <Field hi="पास होने का वर्ष" en="Year of passing" value="2017" theme={t} />
        <div>
          <BiLabel hi="क्या आगे की पढ़ाई कर रहे हैं?" en="Currently studying further?" size="sm" theme={t} />
          <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
            {[['हाँ', 'Yes'], ['नहीं', 'No', true]].map(([hi, en, sel], i) => (
              <div key={i} style={{ flex: 1, height: 44, borderRadius: 10, background: sel ? t.primarySoft : t.surface, border: `1.5px solid ${sel ? t.primary : t.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: '"Mukta", sans-serif', fontSize: 13, color: sel ? t.primaryDeep : t.text }}>{hi} · {en}</div>
            ))}
          </div>
        </div>
      </div>
    </OnboardStep>
  );
}

// ─── 12. PROFESSION ───
function S12_Profession({ theme }) {
  const t = theme;
  const cats = [
    { hi: 'सरकारी नौकरी', en: 'Government' },
    { hi: 'निजी नौकरी', en: 'Private', sel: true },
    { hi: 'व्यापार', en: 'Business' },
    { hi: 'खेती', en: 'Agriculture' },
    { hi: 'Professional', en: 'Doctor/Lawyer' },
    { hi: 'छात्र', en: 'Student' },
  ];
  return (
    <OnboardStep theme={t} step={8} total={14} hi="पेशा" en="Profession">
      <div style={{ marginBottom: 18 }}>
        <BiLabel hi="पेशा श्रेणी" en="Profession category" size="sm" theme={t} />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginTop: 8 }}>
          {cats.map((c, i) => (
            <div key={i} style={{
              padding: '12px 14px', borderRadius: 10,
              background: c.sel ? t.primarySoft : t.surface,
              border: `1.5px solid ${c.sel ? t.primary : t.border}`,
            }}>
              <div style={{ fontFamily: '"Mukta", sans-serif', fontSize: 13, color: c.sel ? t.primaryDeep : t.text, fontWeight: 500 }}>{c.hi}</div>
              <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, color: t.textFaint }}>{c.en}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <Field hi="विशिष्ट पद" en="Specific role" value="Software Engineer" theme={t} />
        <Field hi="पद" en="Designation" value="Senior Engineer" theme={t} />
        <Field hi="कंपनी" en="Company" value="Infosys" theme={t} />
        <Field hi="कार्य स्थान" en="Work location" value="Bengaluru, KA" theme={t} />
        <Field hi="वार्षिक आय" en="Annual income" value="10-20 लाख / 10-20L" theme={t} />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 16px', background: t.surfaceWarm, borderRadius: 10 }}>
          <div>
            <div style={{ fontFamily: '"Mukta", sans-serif', fontSize: 13, color: t.text }}>Income verify करवाएँगे?</div>
            <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, color: t.textFaint }}>Get a verified badge</div>
          </div>
          <div style={{ width: 40, height: 24, borderRadius: 999, background: t.primary, position: 'relative' }}>
            <div style={{ position: 'absolute', top: 2, right: 2, width: 20, height: 20, borderRadius: '50%', background: '#FFF' }}/>
          </div>
        </div>
      </div>
    </OnboardStep>
  );
}

// ─── 13. LIFESTYLE ───
function S13_Lifestyle({ theme }) {
  const t = theme;
  const ChipRow = ({ hi, en, opts }) => (
    <div>
      <BiLabel hi={hi} en={en} size="sm" theme={t} />
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 8 }}>
        {opts.map(([h, e, sel], i) => (
          <div key={i} style={{ padding: '7px 12px', borderRadius: 999, background: sel ? t.primarySoft : t.surface, border: `1px solid ${sel ? t.primary : t.border}`, fontFamily: '"Mukta", sans-serif', fontSize: 12, color: sel ? t.primaryDeep : t.text }}>
            {h}{e && <span style={{ color: t.textFaint, fontSize: 10, marginLeft: 4 }}>· {e}</span>}
          </div>
        ))}
      </div>
    </div>
  );
  return (
    <OnboardStep theme={t} step={9} total={14} hi="जीवनशैली" en="Lifestyle">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
        <ChipRow hi="खान-पान" en="Diet" opts={[['शाकाहारी', 'Veg', true], ['अंडा-शाकाहारी', 'Egg'], ['मांसाहारी', 'Non-veg'], ['जैन', 'Jain']]} />
        <ChipRow hi="शराब" en="Drinking" opts={[['कभी नहीं', 'Never', true], ['कभी-कभी', 'Occasionally'], ['सामाजिक', 'Socially']]} />
        <ChipRow hi="धूम्रपान" en="Smoking" opts={[['कभी नहीं', 'Never', true], ['कभी-कभी', 'Occasionally']]} />
        <ChipRow hi="शौक (max 6)" en="Hobbies" opts={[['क्रिकेट', '', true], ['पढ़ना', '', true], ['संगीत', ''], ['घूमना', '', true], ['फिल्म', ''], ['फिटनेस', ''], ['कुकिंग', ''], ['फोटोग्राफी', '']]} />
        <ChipRow hi="भाषाएँ" en="Languages" opts={[['Hindi', '', true], ['English', '', true], ['Bhojpuri', '', true], ['Marathi', ''], ['Gujarati', '']]} />
      </div>
    </OnboardStep>
  );
}

// ─── 14. FAMILY ───
function S14_Family({ theme }) {
  const t = theme;
  return (
    <OnboardStep theme={t} step={10} total={14} hi="परिवार की जानकारी" en="Family details">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <Field hi="पिताजी का नाम" en="Father's name" value="Shri Ramesh Patel" theme={t} />
        <Field hi="पिताजी का पेशा" en="Father's occupation" value="किसान · Farmer" theme={t} />
        <Field hi="माताजी का नाम" en="Mother's name" value="Smt. Sushila Patel" theme={t} />
        <Field hi="माताजी का पेशा" en="Mother's occupation" value="गृहिणी · Homemaker" theme={t} />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <Field hi="भाई" en="Brothers" value="2" theme={t} />
          <Field hi="भाई शादीशुदा" en="Married" value="1" theme={t} />
          <Field hi="बहन" en="Sisters" value="1" theme={t} />
          <Field hi="बहन शादीशुदा" en="Married" value="0" theme={t} />
        </div>
        <div>
          <BiLabel hi="परिवार का प्रकार" en="Family type" size="sm" theme={t} />
          <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
            {[['संयुक्त', 'Joint', true], ['एकल', 'Nuclear']].map(([hi, en, sel], i) => (
              <div key={i} style={{ flex: 1, height: 44, borderRadius: 10, background: sel ? t.primarySoft : t.surface, border: `1.5px solid ${sel ? t.primary : t.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: '"Mukta", sans-serif', fontSize: 13, color: sel ? t.primaryDeep : t.text }}>{hi} · {en}</div>
            ))}
          </div>
        </div>
        <div>
          <BiLabel hi="परिवार की values" en="Family values" size="sm" theme={t} />
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 8 }}>
            {[['रूढ़िवादी', 'Orthodox'], ['परंपरागत', 'Traditional', true], ['मध्यम', 'Moderate'], ['उदार', 'Liberal']].map(([hi, en, sel], i) => (
              <div key={i} style={{ padding: '8px 12px', borderRadius: 999, background: sel ? t.primarySoft : t.surface, border: `1px solid ${sel ? t.primary : t.border}`, fontFamily: '"Mukta", sans-serif', fontSize: 12, color: sel ? t.primaryDeep : t.text }}>{hi} · {en}</div>
            ))}
          </div>
        </div>
      </div>
    </OnboardStep>
  );
}

// ─── 15. HOROSCOPE ───
function S15_Horoscope({ theme }) {
  const t = theme;
  return (
    <OnboardStep theme={t} step={11} total={14} hi="कुंडली" en="Horoscope details" subtitle="ये match suggestion के लिए use होगी · Used for compatibility matching">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div>
          <BiLabel hi="क्या कुंडली match में विश्वास करते हैं?" en="Believe in Kundli matching?" size="sm" theme={t} />
          <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
            {[['हाँ', 'Yes', true], ['नहीं', 'No']].map(([hi, en, sel], i) => (
              <div key={i} style={{ flex: 1, height: 44, borderRadius: 10, background: sel ? t.primarySoft : t.surface, border: `1.5px solid ${sel ? t.primary : t.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: '"Mukta", sans-serif', fontSize: 13, color: sel ? t.primaryDeep : t.text }}>{hi} · {en}</div>
            ))}
          </div>
        </div>
        <Field hi="जन्म समय" en="Time of birth" value="06:42 AM" theme={t} />
        <Field hi="जन्म स्थान" en="Place of birth" value="Gopalganj, Bihar" theme={t} />
        <Field hi="मांगलिक स्थिति" en="Manglik status" value="नहीं · No" theme={t} />
        <Field hi="नक्षत्र" en="Nakshatra" value="Rohini · रोहिणी" theme={t} />
        <Field hi="राशि" en="Rashi" value="Vrishabha · वृषभ" theme={t} />
        <Card padding={12} theme={t} style={{ background: t.surfaceWarm, borderColor: 'transparent' }}>
          <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
            <StarIcon size={16} color={t.primary} filled />
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: '"Mukta", sans-serif', fontSize: 12, color: t.text, lineHeight: 1.4 }}>
                हम आपकी Kundli generate कर सकते हैं · ₹199
              </div>
              <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, color: t.textFaint, marginTop: 2 }}>Auto-generate Kundli report</div>
            </div>
            <Button variant="soft" size="sm" theme={t}>Order</Button>
          </div>
        </Card>
      </div>
    </OnboardStep>
  );
}

// ─── 16. ABOUT ME ───
function S16_About({ theme }) {
  const t = theme;
  return (
    <OnboardStep theme={t} step={12} total={14} hi="अपने बारे में" en="About me" subtitle="4-5 लाइन में लिखें · Write 4-5 lines">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div>
          <div style={{
            padding: 16, minHeight: 160,
            background: t.surface,
            border: `1.5px solid ${t.primary}`,
            borderRadius: 12,
            fontFamily: '"Mukta", sans-serif', fontSize: 14, color: t.text,
            lineHeight: 1.6,
          }}>
            मैं Lucknow में एक software engineer हूँ। परिवार से बहुत जुड़ा हूँ और हर साल त्योहारों पर घर जाता हूँ। मेरे शौक में cricket, यात्रा, और किताबें शामिल हैं। एक समझदार और परिवार-केंद्रित जीवनसाथी की तलाश है।
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6, fontSize: 11, fontFamily: 'Inter, sans-serif', color: t.textFaint }}>
            <span>हिंदी / English keyboard</span>
            <span>241 / 500</span>
          </div>
        </div>
        <Card padding={14} theme={t} style={{ background: t.surfaceWarm, borderColor: 'transparent' }}>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <StarIcon size={18} color={t.primary} filled />
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: '"Mukta", sans-serif', fontSize: 13, color: t.text }}>मेरे लिए draft करें</div>
              <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, color: t.textFaint }}>AI suggestion · Coming soon</div>
            </div>
          </div>
        </Card>
        <div>
          <BiLabel hi="अपेक्षा" en="Partner expectation summary (optional)" size="sm" theme={t} />
          <div style={{ marginTop: 8, padding: 14, minHeight: 80, background: t.surface, border: `1px solid ${t.border}`, borderRadius: 10, fontFamily: '"Mukta", sans-serif', fontSize: 13, color: t.textFaint }}>
            जैसे: "मुझे एक समझदार partner चाहिए जो परिवार के साथ रह सके..."
          </div>
        </div>
      </div>
    </OnboardStep>
  );
}

// ─── 17. PHOTOS ───
function S17_Photos({ theme }) {
  const t = theme;
  const photos = [
    { name: 'Rajesh', main: true },
    { name: 'Rajesh' },
    { name: 'R' },
    null, null, null,
  ];
  return (
    <OnboardStep theme={t} step={13} total={14} hi="फोटो जोड़ें" en="Add photos" subtitle="अच्छी photo response 5x बढ़ाती है · Good photos increase responses 5x">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 16 }}>
        {photos.map((p, i) => p ? (
          <div key={i} style={{ position: 'relative', aspectRatio: '3/4', borderRadius: 12, overflow: 'hidden' }}>
            <PhotoPlaceholder name={p.name} height="100%" radius={12} theme={t} hue={i * 50 + 20} />
            {p.main && (
              <div style={{ position: 'absolute', top: 6, left: 6, padding: '3px 8px', background: t.primary, borderRadius: 999, fontSize: 9, fontFamily: 'Inter', color: '#FFF', display: 'flex', alignItems: 'center', gap: 3 }}>
                <StarIcon size={9} color="#FFF" filled /> MAIN
              </div>
            )}
            <div style={{ position: 'absolute', top: 6, right: 6, width: 22, height: 22, borderRadius: '50%', background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <XIcon size={12} color="#FFF" />
            </div>
          </div>
        ) : (
          <div key={i} style={{
            aspectRatio: '3/4', borderRadius: 12,
            border: `1.5px dashed ${t.border}`,
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 6,
            background: t.surface,
          }}>
            <CameraIcon size={20} color={t.textMuted} />
            <div style={{ fontFamily: '"Mukta", sans-serif', fontSize: 12, color: t.textMuted }}>Add photo</div>
          </div>
        ))}
      </div>
      <Card padding={14} theme={t} style={{ background: t.surfaceWarm, borderColor: 'transparent', marginBottom: 14 }}>
        <div style={{ fontFamily: '"Mukta", sans-serif', fontSize: 12, color: t.text, fontWeight: 500, marginBottom: 8 }}>Photo guidelines</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4, fontFamily: '"Mukta", sans-serif', fontSize: 11, color: t.textMuted }}>
          <div>✓ Clear face, recent, solo photo</div>
          <div style={{ color: t.error }}>✗ Group photos, sunglasses, heavy filters</div>
        </div>
      </Card>
      <div>
        <BiLabel hi="Photo किसे दिखे?" en="Photo visibility" size="sm" theme={t} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 8 }}>
          {[['सबको दिखे', 'Visible to all', true], ['सिर्फ premium को', 'Premium only'], ['Request करने पर', 'On request']].map(([hi, en, sel], i) => (
            <div key={i} style={{ padding: '12px 14px', borderRadius: 10, background: sel ? t.primarySoft : t.surface, border: `1.5px solid ${sel ? t.primary : t.border}`, display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 18, height: 18, borderRadius: '50%', border: `1.5px solid ${sel ? t.primary : t.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {sel && <div style={{ width: 10, height: 10, borderRadius: '50%', background: t.primary }}/>}
              </div>
              <div>
                <div style={{ fontFamily: '"Mukta", sans-serif', fontSize: 13, color: t.text }}>{hi}</div>
                <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, color: t.textFaint }}>{en}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </OnboardStep>
  );
}

// ─── 18. PARTNER PREFS (BASIC) ───
function S18_PrefsBasic({ theme }) {
  const t = theme;
  return (
    <OnboardStep theme={t} step={14} total={14} hi="जीवनसाथी पसंद" en="Partner preferences · Basic" ctaHi="आगे" ctaEn="Community preferences">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 10 }}>
            <BiLabel hi="उम्र" en="Age range" size="sm" theme={t} />
            <div style={{ fontFamily: '"Mukta", sans-serif', fontSize: 14, color: t.primary }}>22 – 28 वर्ष</div>
          </div>
          <div style={{ position: 'relative', height: 24 }}>
            <div style={{ position: 'absolute', top: 11, left: 0, right: 0, height: 3, background: t.borderSoft, borderRadius: 999 }}/>
            <div style={{ position: 'absolute', top: 11, left: '20%', width: '40%', height: 3, background: t.primary, borderRadius: 999 }}/>
            <div style={{ position: 'absolute', top: 4, left: 'calc(20% - 8px)', width: 16, height: 16, borderRadius: '50%', background: t.surface, border: `2px solid ${t.primary}` }}/>
            <div style={{ position: 'absolute', top: 4, left: 'calc(60% - 8px)', width: 16, height: 16, borderRadius: '50%', background: t.surface, border: `2px solid ${t.primary}` }}/>
          </div>
        </div>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 10 }}>
            <BiLabel hi="कद" en="Height range" size="sm" theme={t} />
            <div style={{ fontFamily: '"Mukta", sans-serif', fontSize: 14, color: t.primary }}>5'2" – 5'8"</div>
          </div>
          <div style={{ position: 'relative', height: 24 }}>
            <div style={{ position: 'absolute', top: 11, left: 0, right: 0, height: 3, background: t.borderSoft, borderRadius: 999 }}/>
            <div style={{ position: 'absolute', top: 11, left: '25%', width: '40%', height: 3, background: t.primary, borderRadius: 999 }}/>
            <div style={{ position: 'absolute', top: 4, left: 'calc(25% - 8px)', width: 16, height: 16, borderRadius: '50%', background: t.surface, border: `2px solid ${t.primary}` }}/>
            <div style={{ position: 'absolute', top: 4, left: 'calc(65% - 8px)', width: 16, height: 16, borderRadius: '50%', background: t.surface, border: `2px solid ${t.primary}` }}/>
          </div>
        </div>
        <div>
          <BiLabel hi="वैवाहिक स्थिति" en="Marital status" size="sm" theme={t} />
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 8 }}>
            {[['कभी विवाहित नहीं', 'Never married', true], ['तलाकशुदा', 'Divorced']].map(([hi, en, sel], i) => (
              <div key={i} style={{ padding: '8px 12px', borderRadius: 999, background: sel ? t.primarySoft : t.surface, border: `1px solid ${sel ? t.primary : t.border}`, fontFamily: '"Mukta", sans-serif', fontSize: 12, color: sel ? t.primaryDeep : t.text }}>{hi}</div>
            ))}
          </div>
        </div>
        <div>
          <BiLabel hi="मांगलिक" en="Manglik acceptable?" size="sm" theme={t} />
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 8 }}>
            {[['नहीं only', 'No only'], ['कोई बात नहीं', 'Doesn\'t matter', true], ['अंशिक OK', 'Anshik ok']].map(([hi, en, sel], i) => (
              <div key={i} style={{ padding: '8px 12px', borderRadius: 999, background: sel ? t.primarySoft : t.surface, border: `1px solid ${sel ? t.primary : t.border}`, fontFamily: '"Mukta", sans-serif', fontSize: 12, color: sel ? t.primaryDeep : t.text }}>{hi}</div>
            ))}
          </div>
        </div>
        <div>
          <BiLabel hi="खान-पान" en="Diet preferred" size="sm" theme={t} />
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 8 }}>
            {[['शाकाहारी', 'Veg', true], ['अंडा', 'Egg', true], ['मांसाहारी', 'Non-veg']].map(([hi, en, sel], i) => (
              <div key={i} style={{ padding: '8px 12px', borderRadius: 999, background: sel ? t.primarySoft : t.surface, border: `1px solid ${sel ? t.primary : t.border}`, fontFamily: '"Mukta", sans-serif', fontSize: 12, color: sel ? t.primaryDeep : t.text }}>{hi}</div>
            ))}
          </div>
        </div>
      </div>
    </OnboardStep>
  );
}

// ─── 19. PARTNER PREFS (COMMUNITY) ───
function S19_PrefsCommunity({ theme }) {
  const t = theme;
  const subcastes = ['Patel', 'Sachan', 'Katiyar', 'Verma', 'Singh', 'Kushwaha', 'Maurya', 'Awadhia', 'Chandrakar', 'Mahato'];
  return (
    <OnboardStep theme={t} step={14} total={14} hi="जीवनसाथी पसंद" en="Community preferences" ctaHi="आगे" ctaEn="Education preferences">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div>
          <BiLabel hi="स्वीकार्य उप-जातियाँ" en="Sub-castes acceptable" size="sm" theme={t} />
          <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, color: t.textFaint, marginTop: 4, marginBottom: 8 }}>Default: all Kurmi sub-castes</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {subcastes.map((s, i) => (
              <div key={i} style={{ padding: '6px 10px', borderRadius: 999, background: i < 7 ? t.primarySoft : t.surface, border: `1px solid ${i < 7 ? t.primary : t.border}`, fontFamily: 'Inter, sans-serif', fontSize: 11, color: i < 7 ? t.primaryDeep : t.text, display: 'flex', alignItems: 'center', gap: 4 }}>
                {s} {i < 7 && <CheckIcon size={11} color={t.primary}/>}
              </div>
            ))}
          </div>
        </div>
        <div>
          <BiLabel hi="क्या same-gotra चलेगा?" en="Same gotra acceptable?" size="sm" theme={t} />
          <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
            {[['नहीं', 'No', true], ['हाँ', 'Yes']].map(([hi, en, sel], i) => (
              <div key={i} style={{ flex: 1, height: 44, borderRadius: 10, background: sel ? t.primarySoft : t.surface, border: `1.5px solid ${sel ? t.primary : t.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: '"Mukta", sans-serif', fontSize: 13, color: sel ? t.primaryDeep : t.text }}>{hi} · {en}</div>
            ))}
          </div>
        </div>
        <div>
          <BiLabel hi="अन्य जातियों से OK?" en="Other castes acceptable?" size="sm" theme={t} />
          <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
            {[['नहीं', 'No'], ['हाँ', 'Yes', true]].map(([hi, en, sel], i) => (
              <div key={i} style={{ flex: 1, height: 44, borderRadius: 10, background: sel ? t.primarySoft : t.surface, border: `1.5px solid ${sel ? t.primary : t.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: '"Mukta", sans-serif', fontSize: 13, color: sel ? t.primaryDeep : t.text }}>{hi} · {en}</div>
            ))}
          </div>
        </div>
        <Field hi="राज्य" en="States preferred" value="UP, Bihar, MP, Delhi" theme={t} />
        <Field hi="भाषाएँ" en="Languages acceptable" value="Hindi, Bhojpuri, English" theme={t} />
      </div>
    </OnboardStep>
  );
}

// ─── 20. PARTNER PREFS (EDUCATION & CAREER) ───
function S20_PrefsCareer({ theme }) {
  const t = theme;
  return (
    <OnboardStep theme={t} step={14} total={14} hi="शिक्षा और career" en="Education & career preferences" ctaHi="Review" ctaEn="Submit profile">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <Field hi="न्यूनतम शिक्षा" en="Minimum education" value="Graduate" theme={t} />
        <div>
          <BiLabel hi="स्वीकार्य पेशे" en="Acceptable professions" size="sm" theme={t} />
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 8 }}>
            {[['सरकारी', 'Govt', true], ['निजी', 'Private', true], ['Doctor/Lawyer', '', true], ['Business', '', true], ['Teacher', '']].map(([hi, en, sel], i) => (
              <div key={i} style={{ padding: '8px 12px', borderRadius: 999, background: sel ? t.primarySoft : t.surface, border: `1px solid ${sel ? t.primary : t.border}`, fontFamily: '"Mukta", sans-serif', fontSize: 12, color: sel ? t.primaryDeep : t.text }}>{hi}{en && ` · ${en}`}</div>
            ))}
          </div>
        </div>
        <Field hi="न्यूनतम वार्षिक आय" en="Minimum income" value="5 लाख · 5L" theme={t} />
        <div>
          <BiLabel hi="Working professional चाहिए?" en="Want working professional?" size="sm" theme={t} />
          <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
            {[['हाँ', 'Yes', true], ['कोई बात नहीं', 'Doesn\'t matter']].map(([hi, en, sel], i) => (
              <div key={i} style={{ flex: 1, height: 44, borderRadius: 10, background: sel ? t.primarySoft : t.surface, border: `1.5px solid ${sel ? t.primary : t.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: '"Mukta", sans-serif', fontSize: 13, color: sel ? t.primaryDeep : t.text }}>{hi}{en && ` · ${en}`}</div>
            ))}
          </div>
        </div>
        <Card padding={14} theme={t} style={{ background: t.surfaceWarm, borderColor: 'transparent' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <ShieldIcon size={18} color={t.primary} filled />
            <div style={{ flex: 1, fontFamily: '"Mukta", sans-serif', fontSize: 12, color: t.text, lineHeight: 1.4 }}>
              Profile submit होने पर 24h में verify किया जाएगा
              <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, color: t.textFaint }}>Verified within 24 hours</div>
            </div>
          </div>
        </Card>
      </div>
    </OnboardStep>
  );
}

Object.assign(window, {
  S01_Splash, S02_Language, S03_Phone, S04_OTP,
  S05_ProfileFor, S06_Basic, S07_Physical, S08_Community, S09_Location, S10_Native,
  S11_Education, S12_Profession, S13_Lifestyle, S14_Family, S15_Horoscope,
  S16_About, S17_Photos, S18_PrefsBasic, S19_PrefsCommunity, S20_PrefsCareer,
  OnboardStep,
});
