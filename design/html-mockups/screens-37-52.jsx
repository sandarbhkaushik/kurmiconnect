// screens-37-52.jsx — Subscription + Account & profile management

// ─── 37. PLANS & PRICING ───
function S37_Plans({ theme }) {
  const t = theme;
  return (
    <MobileScreen theme={t}>
      <TopBar theme={t} title="Plans" leading={<BackIcon size={20} color={t.text}/>}/>
      <div style={{ padding: '18px 20px 0' }}>
        <BiLabel hi="ज़्यादा responses पाएँ" en="Get more responses" size="xl" theme={t}/>
        <div style={{ marginTop: 6, fontFamily: 'Inter, sans-serif', fontSize: 12, color: t.textMuted }}>
          UPI · 7-day refund · No auto-renewal without consent
        </div>
      </div>

      {/* Pay per contact */}
      <div style={{ padding: '20px' }}>
        <div style={{ fontFamily: '"Mukta", sans-serif', fontSize: 11, color: t.textMuted, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 10 }}>Pay per contact</div>
        <div style={{ display: 'flex', gap: 8 }}>
          {[
            { contacts: 3, price: 99 },
            { contacts: 10, price: 249, popular: true },
            { contacts: 25, price: 499 },
          ].map((p, i) => (
            <div key={i} style={{ flex: 1, padding: 14, background: t.surface, border: `1.5px solid ${p.popular ? t.primary : t.border}`, borderRadius: 12, position: 'relative', textAlign: 'center' }}>
              {p.popular && (
                <div style={{ position: 'absolute', top: -8, left: '50%', transform: 'translateX(-50%)', padding: '2px 8px', background: t.primary, borderRadius: 999, fontFamily: 'Inter, sans-serif', fontSize: 9, color: '#FFF', fontWeight: 500 }}>POPULAR</div>
              )}
              <div style={{ fontFamily: '"Mukta", sans-serif', fontSize: 22, fontWeight: 500, color: t.text }}>{p.contacts}</div>
              <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, color: t.textMuted }}>contacts</div>
              <div style={{ marginTop: 6, fontFamily: '"Mukta", sans-serif', fontSize: 14, color: t.primary, fontWeight: 500 }}>₹{p.price}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Subscriptions */}
      <div style={{ padding: '0 20px 20px' }}>
        <div style={{ fontFamily: '"Mukta", sans-serif', fontSize: 11, color: t.textMuted, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 10 }}>Subscription plans</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {[
            { name: 'Silver', dur: '3 months', price: 599, perMonth: 199, recommended: false, features: ['25 contacts', 'Chat with matches', 'Basic filters'] },
            { name: 'Gold', dur: '6 months', price: 1499, perMonth: 250, recommended: true, features: ['Unlimited contacts', '3 profile boosts', 'Advanced filters', 'Priority verification'] },
            { name: 'Platinum', dur: '12 months', price: 3499, perMonth: 292, recommended: false, features: ['Everything in Gold', 'Personal RM matchmaker', 'Kundli reports', 'Family verification'] },
          ].map((p, i) => (
            <div key={i} style={{
              padding: 14,
              background: p.recommended ? t.surfaceWarm : t.surface,
              border: `1.5px solid ${p.recommended ? t.primary : t.border}`,
              borderRadius: 14, position: 'relative',
            }}>
              {p.recommended && (
                <div style={{ position: 'absolute', top: -8, right: 14, padding: '2px 8px', background: t.primary, borderRadius: 999, fontFamily: 'Inter, sans-serif', fontSize: 9, color: '#FFF', fontWeight: 500 }}>RECOMMENDED</div>
              )}
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontFamily: '"Mukta", sans-serif', fontSize: 18, fontWeight: 500, color: t.text }}>{p.name}</div>
                  <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: t.textMuted }}>{p.dur}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontFamily: '"Mukta", sans-serif', fontSize: 22, fontWeight: 500, color: t.primary }}>₹{p.price.toLocaleString()}</div>
                  <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, color: t.textFaint }}>≈ ₹{p.perMonth}/mo</div>
                </div>
              </div>
              <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 4 }}>
                {p.features.map((f, j) => (
                  <div key={j} style={{ display: 'flex', alignItems: 'center', gap: 6, fontFamily: '"Mukta", sans-serif', fontSize: 12, color: t.text }}>
                    <CheckIcon size={12} color={t.success}/>{f}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add-ons */}
      <div style={{ padding: '0 20px 20px' }}>
        <div style={{ fontFamily: '"Mukta", sans-serif', fontSize: 11, color: t.textMuted, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 10 }}>Add-ons</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          {[
            ['24h Boost', 99],
            ['72h Boost', 249],
            ['Kundli Report', 199],
            ['Premium Kundli', 599],
            ['Biodata PDF', 199],
            ['Video intro', 149],
          ].map(([n, p], i) => (
            <div key={i} style={{ padding: 12, background: t.surface, border: `1px solid ${t.border}`, borderRadius: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontFamily: '"Mukta", sans-serif', fontSize: 12, color: t.text }}>{n}</div>
              <div style={{ fontFamily: '"Mukta", sans-serif', fontSize: 13, color: t.primary, fontWeight: 500 }}>₹{p}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ padding: '14px 20px 24px', borderTop: `1px solid ${t.borderSoft}`, background: t.surface }}>
        <Button variant="primary" size="lg" full theme={t}>Continue with Gold · ₹1,499</Button>
      </div>
    </MobileScreen>
  );
}

// ─── 38. ADD-ONS CATALOGUE ───
function S38_AddOns({ theme }) {
  const t = theme;
  const cats = [
    { title: 'Visibility', hi: 'दर्शनीयता', items: [['24h Boost', 'Top of search for 24h', 99], ['72h Boost', 'Top of search for 3 days', 249], ['Week Boost', 'Featured for 7 days', 499]] },
    { title: 'Kundli', hi: 'कुंडली', items: [['Basic Kundli', 'Computer generated', 199], ['Astrologer Reviewed', 'Reviewed by certified', 599], ['Full natal chart', 'Detailed analysis', 999]] },
    { title: 'Biodata', hi: 'बायोडाटा', items: [['PDF Biodata', 'Print-ready', 199], ['Designer Biodata', 'Custom layout', 499]] },
  ];
  return (
    <MobileScreen theme={t}>
      <TopBar theme={t} title="Add-ons" leading={<BackIcon size={20} color={t.text}/>}/>
      <div style={{ padding: '18px 20px 0' }}>
        <BiLabel hi="अपनी profile को boost करें" en="Boost your profile" size="lg" theme={t}/>
      </div>
      <div style={{ margin: '14px 20px 0', padding: 12, background: t.primaryDeep, borderRadius: 10, color: '#FFF' }}>
        <div style={{ fontFamily: '"Mukta", sans-serif', fontSize: 12 }}>Active boost: 24h · 12h remaining</div>
        <div style={{ marginTop: 6, height: 3, background: 'rgba(255,255,255,0.2)', borderRadius: 999, overflow: 'hidden' }}>
          <div style={{ width: '50%', height: '100%', background: '#FFF' }}/>
        </div>
      </div>
      <div style={{ padding: 20 }}>
        {cats.map((c, i) => (
          <div key={i} style={{ marginBottom: 20 }}>
            <div style={{ marginBottom: 10 }}>
              <BiLabel hi={c.hi} en={c.title} size="sm" theme={t}/>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {c.items.map(([n, d, p], j) => (
                <div key={j} style={{ padding: 12, background: t.surface, border: `1px solid ${t.borderSoft}`, borderRadius: 10, display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 8, background: t.primarySoft, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <StarIcon size={16} color={t.primary} filled/>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: '"Mukta", sans-serif', fontSize: 13, color: t.text, fontWeight: 500 }}>{n}</div>
                    <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 10.5, color: t.textFaint }}>{d}</div>
                  </div>
                  <Button variant="soft" size="sm" theme={t}>₹{p}</Button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </MobileScreen>
  );
}

// ─── 39. CHECKOUT ───
function S39_Checkout({ theme }) {
  const t = theme;
  return (
    <MobileScreen theme={t}>
      <TopBar theme={t} title="Checkout" leading={<BackIcon size={20} color={t.text}/>}/>
      <div style={{ padding: 20 }}>
        <div style={{ padding: 16, background: t.surface, border: `1px solid ${t.borderSoft}`, borderRadius: 12, marginBottom: 16 }}>
          <div style={{ fontFamily: '"Mukta", sans-serif', fontSize: 11, color: t.textMuted, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 10 }}>Order summary</div>
          {[
            ['Gold · 6 months', '₹1,499'],
            ['GST (incl)', '₹0'],
            ['Coupon (NAMASTE10)', '–₹150', { color: t.success }],
          ].map(([l, v, s], i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: i < 2 ? `1px dashed ${t.borderSoft}` : 'none', fontFamily: '"Mukta", sans-serif', fontSize: 13, color: t.text, ...(s || {}) }}>
              <span>{l}</span><span>{v}</span>
            </div>
          ))}
          <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 10, fontFamily: '"Mukta", sans-serif', fontSize: 16, fontWeight: 500 }}>
            <span style={{ color: t.text }}>Total</span><span style={{ color: t.primary }}>₹1,349</span>
          </div>
        </div>

        <div style={{ fontFamily: '"Mukta", sans-serif', fontSize: 11, color: t.textMuted, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 10 }}>Payment method</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
          {[
            { label: 'UPI', sub: 'PhonePe · GPay · Paytm', sel: true },
            { label: 'Cards', sub: 'Visa · Mastercard · Rupay' },
            { label: 'Net banking', sub: 'All major banks' },
            { label: 'Cash via Paytm agent', sub: 'Find nearby store' },
          ].map((m, i) => (
            <div key={i} style={{ padding: 14, background: t.surface, border: `1.5px solid ${m.sel ? t.primary : t.border}`, borderRadius: 10, display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 18, height: 18, borderRadius: '50%', border: `1.5px solid ${m.sel ? t.primary : t.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {m.sel && <div style={{ width: 10, height: 10, borderRadius: '50%', background: t.primary }}/>}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: '"Mukta", sans-serif', fontSize: 13, color: t.text }}>{m.label}</div>
                <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 10.5, color: t.textFaint }}>{m.sub}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, color: t.textFaint, lineHeight: 1.4, textAlign: 'center' }}>
          By paying you agree to our Terms and Privacy Policy
        </div>
      </div>

      <div style={{ padding: '14px 20px 24px', borderTop: `1px solid ${t.borderSoft}`, background: t.surface, marginTop: 'auto' }}>
        <Button variant="primary" size="lg" full theme={t}>Pay ₹1,349</Button>
      </div>
    </MobileScreen>
  );
}

// ─── 40. PAYMENT SUCCESS ───
function S40_PaySuccess({ theme }) {
  const t = theme;
  return (
    <MobileScreen theme={t}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 30, textAlign: 'center' }}>
        <div style={{ width: 80, height: 80, borderRadius: '50%', background: t.successSoft, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
          <CheckIcon size={40} color={t.success}/>
        </div>
        <div style={{ marginBottom: 8 }}>
          <BiLabel hi="भुगतान सफल ✓" en="Payment successful" size="xl" align="center" theme={t}/>
        </div>
        <div style={{ fontFamily: '"Mukta", sans-serif', fontSize: 13, color: t.textMuted, lineHeight: 1.5, maxWidth: 280 }}>
          Gold membership 6 महीने के लिए activate हो गई है
        </div>

        <div style={{ marginTop: 28, width: '100%', maxWidth: 320, padding: 16, background: t.surface, border: `1px solid ${t.borderSoft}`, borderRadius: 12 }}>
          {[
            ['Transaction ID', 'TXN8K42P9M'],
            ['Plan', 'Gold · 6 months'],
            ['Amount', '₹1,349'],
            ['Expiry', '15 Sep 2026'],
          ].map(([l, v], i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '7px 0', fontFamily: '"Mukta", sans-serif', fontSize: 12 }}>
              <span style={{ color: t.textMuted }}>{l}</span><span style={{ color: t.text, fontWeight: 500 }}>{v}</span>
            </div>
          ))}
          <div style={{ marginTop: 10, paddingTop: 10, borderTop: `1px dashed ${t.borderSoft}`, fontFamily: 'Inter, sans-serif', fontSize: 11, color: t.primary, textAlign: 'center' }}>Download invoice</div>
        </div>
      </div>

      <div style={{ padding: '14px 20px 24px', background: t.surface, borderTop: `1px solid ${t.borderSoft}`, display: 'flex', flexDirection: 'column', gap: 8 }}>
        <Button variant="primary" size="lg" full theme={t}>View premium matches</Button>
        <Button variant="ghost" size="md" full theme={t}>Share with family</Button>
      </div>
    </MobileScreen>
  );
}

// ─── 41. PAYMENT FAILURE ───
function S41_PayFail({ theme }) {
  const t = theme;
  return (
    <MobileScreen theme={t}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 30, textAlign: 'center' }}>
        <div style={{ width: 80, height: 80, borderRadius: '50%', background: '#FEE2E2', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
          <XIcon size={36} color={t.error}/>
        </div>
        <div style={{ marginBottom: 8 }}>
          <BiLabel hi="भुगतान विफल" en="Payment failed" size="xl" align="center" theme={t}/>
        </div>
        <div style={{ fontFamily: '"Mukta", sans-serif', fontSize: 13, color: t.textMuted, lineHeight: 1.5, maxWidth: 280 }}>
          Transaction declined by bank
        </div>

        <div style={{ marginTop: 24, padding: '12px 16px', background: t.warnSoft, borderRadius: 10, maxWidth: 320 }}>
          <div style={{ fontFamily: '"Mukta", sans-serif', fontSize: 12, color: t.warn, lineHeight: 1.5 }}>
            पैसे कटे नहीं हैं · Money not deducted<br/>
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 10.5 }}>If deducted, will refund in 3-5 business days</span>
          </div>
        </div>
      </div>

      <div style={{ padding: '14px 20px 24px', background: t.surface, borderTop: `1px solid ${t.borderSoft}`, display: 'flex', flexDirection: 'column', gap: 8 }}>
        <Button variant="primary" size="lg" full theme={t}>Try again</Button>
        <Button variant="secondary" size="md" full theme={t}>Try different payment method</Button>
        <Button variant="ghost" size="md" full theme={t}>Contact support</Button>
      </div>
    </MobileScreen>
  );
}

// ─── 42. MY SUBSCRIPTION ───
function S42_MySubscription({ theme }) {
  const t = theme;
  return (
    <MobileScreen theme={t}>
      <TopBar theme={t} title="My subscription" leading={<BackIcon size={20} color={t.text}/>}/>
      <div style={{ padding: 20 }}>
        {/* Active card */}
        <div style={{ padding: 18, background: `linear-gradient(135deg, ${t.primaryDeep} 0%, ${t.primary} 100%)`, borderRadius: 14, color: '#FFF', marginBottom: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, opacity: 0.7, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Active</div>
              <div style={{ fontFamily: '"Mukta", sans-serif', fontSize: 24, fontWeight: 500, marginTop: 2 }}>Gold</div>
            </div>
            <StarIcon size={22} color="#FFF" filled/>
          </div>
          <div style={{ marginTop: 18, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <div>
              <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, opacity: 0.7 }}>Expires</div>
              <div style={{ fontFamily: '"Mukta", sans-serif', fontSize: 14, marginTop: 2 }}>15 Sep 2026</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, opacity: 0.7 }}>Remaining</div>
              <div style={{ fontFamily: '"Mukta", sans-serif', fontSize: 14, marginTop: 2 }}>42 days</div>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
          <Button variant="primary" size="md" full theme={t}>Renew now</Button>
          <Button variant="secondary" size="md" theme={t}>Upgrade</Button>
        </div>

        {/* Usage */}
        <div style={{ fontFamily: '"Mukta", sans-serif', fontSize: 11, color: t.textMuted, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 10 }}>Usage</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 24 }}>
          {[
            ['Contacts', '14 of unlimited'],
            ['Boosts', '1 of 3'],
            ['Verifications', '2 of unlimited'],
          ].map(([l, v], i) => (
            <div key={i} style={{ padding: '12px 14px', background: t.surface, border: `1px solid ${t.borderSoft}`, borderRadius: 10, display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontFamily: '"Mukta", sans-serif', fontSize: 13, color: t.text }}>{l}</span>
              <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: t.textMuted }}>{v}</span>
            </div>
          ))}
        </div>

        {/* Order history */}
        <div style={{ fontFamily: '"Mukta", sans-serif', fontSize: 11, color: t.textMuted, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 10 }}>Order history</div>
        <div style={{ background: t.surface, border: `1px solid ${t.borderSoft}`, borderRadius: 10 }}>
          {[
            ['Gold · 6 months', '₹1,349', '14 May 2026', 'Paid'],
            ['Profile boost 24h', '₹99', '2 May 2026', 'Paid'],
            ['Silver · 3 months', '₹599', '10 Mar 2026', 'Refunded'],
          ].map(([n, p, d, st], i) => (
            <div key={i} style={{ padding: 12, borderBottom: i < 2 ? `1px solid ${t.borderSoft}` : 'none' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ fontFamily: '"Mukta", sans-serif', fontSize: 13, color: t.text }}>{n}</div>
                <div style={{ fontFamily: '"Mukta", sans-serif', fontSize: 13, color: t.text }}>{p}</div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 3 }}>
                <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, color: t.textFaint }}>{d}</div>
                <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, color: st === 'Refunded' ? t.textFaint : t.success }}>{st} · Invoice</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </MobileScreen>
  );
}

// ─── 43. MY PROFILE ───
function S43_MyProfile({ theme }) {
  const t = theme;
  const sections = [
    ['Basic info', 'Rajesh Patel · 28 · 5\'8"', true],
    ['Physical', 'Average · Wheatish', true],
    ['Community', 'Kurmi · Patel · Kashyap', true],
    ['Location', 'Lucknow, UP', true],
    ['Native', 'Gopalganj, Bihar', true],
    ['Education', 'BTech · IET Lucknow', true],
    ['Profession', 'Software Engineer · Infosys', true],
    ['Lifestyle', 'Veg · Never drinks', true],
    ['Family', 'Joint · 2 brothers, 1 sister', true],
    ['Horoscope', 'Rohini · Vrishabha', true],
    ['About me', '241 chars · Saved', true],
    ['Photos', '3 of 6 uploaded', false],
    ['Partner preferences', '22-28 · Patel/Sachan', true],
  ];
  return (
    <MobileScreen theme={t} bottomNav={<BottomNav active="profile" theme={t}/>}>
      {/* Header card */}
      <div style={{ background: t.surface, padding: '20px 20px 18px', borderBottom: `1px solid ${t.borderSoft}` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ position: 'relative' }}>
            <Avatar name="Rajesh" size={68} hue={200} theme={t}/>
            <div style={{ position: 'absolute', inset: -4, borderRadius: '50%', border: `2.5px solid ${t.primary}`, clipPath: 'polygon(0 0, 78% 0, 78% 100%, 0 100%)' }}/>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ fontFamily: '"Mukta", sans-serif', fontSize: 18, fontWeight: 500, color: t.text }}>Rajesh Patel</span>
              <EditIcon size={13} color={t.primary}/>
            </div>
            <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: t.primary, marginTop: 2 }}>Profile 78% complete</div>
          </div>
        </div>
        <div style={{ marginTop: 16, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 0 }}>
          {[['124', 'Views'], ['23', 'Interests'], ['8', 'Shortlisted']].map(([n, l], i) => (
            <div key={i} style={{ textAlign: 'center', padding: '4px 0', borderLeft: i > 0 ? `1px solid ${t.borderSoft}` : 'none' }}>
              <div style={{ fontFamily: '"Mukta", sans-serif', fontSize: 18, fontWeight: 500, color: t.text }}>{n}</div>
              <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, color: t.textFaint, marginTop: 1 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Sections */}
      <div style={{ background: t.surface, marginTop: 8 }}>
        {sections.map(([n, v, complete], i) => (
          <div key={i} style={{ padding: '14px 20px', borderBottom: i < sections.length - 1 ? `1px solid ${t.borderSoft}` : 'none', display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 22, height: 22, borderRadius: '50%', background: complete ? t.successSoft : t.borderSoft, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {complete ? <CheckIcon size={12} color={t.success}/> : <PlusIcon size={10} color={t.textMuted}/>}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: '"Mukta", sans-serif', fontSize: 13, color: t.text }}>{n}</div>
              <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 10.5, color: t.textFaint }}>{v}</div>
            </div>
            <ChevronIcon size={14} color={t.textFaint}/>
          </div>
        ))}
      </div>

      <div style={{ padding: 20, display: 'flex', gap: 8 }}>
        <Button variant="secondary" size="md" full theme={t}>Preview public</Button>
        <Button variant="primary" size="md" full theme={t}>Verify now</Button>
      </div>
    </MobileScreen>
  );
}

// ─── 44. EDIT PROFILE SECTION ───
function S44_EditSection({ theme }) {
  const t = theme;
  return (
    <MobileScreen theme={t}>
      <TopBar theme={t} title="Edit Education" leading={<BackIcon size={20} color={t.text}/>} trailing={<div style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: t.primary, fontWeight: 500 }}>Save</div>}/>
      <div style={{ padding: '20px' }}>
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
      </div>
      <div style={{ padding: '14px 20px 24px', marginTop: 'auto', borderTop: `1px solid ${t.borderSoft}`, background: t.surface, display: 'flex', gap: 8 }}>
        <Button variant="secondary" size="lg" theme={t}>Cancel</Button>
        <Button variant="primary" size="lg" full theme={t}>Save changes</Button>
      </div>
    </MobileScreen>
  );
}

// ─── 45. PHOTO MANAGER ───
function S45_PhotoManager({ theme }) {
  const t = theme;
  const photos = [
    { name: 'Rajesh', main: true },
    { name: 'Rajesh' },
    { name: 'R' },
    null, null, null,
  ];
  return (
    <MobileScreen theme={t}>
      <TopBar theme={t} title="Photos" subtitle="3 of 6 uploaded" leading={<BackIcon size={20} color={t.text}/>}/>
      <div style={{ padding: 20 }}>
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
              <div style={{ position: 'absolute', bottom: 6, left: 6, padding: '3px 6px', background: 'rgba(0,0,0,0.55)', borderRadius: 6, fontSize: 9, fontFamily: 'Inter', color: '#FFF' }}>Drag to reorder</div>
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

        <div style={{ marginBottom: 12 }}>
          <BiLabel hi="Photo किसे दिखे?" en="Photo visibility" size="sm" theme={t} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 18 }}>
          {[['Everyone', true], ['Verified only', false], ['Premium only', false], ['Accepted matches', false], ['On request', false]].map(([label, sel], i) => (
            <div key={i} style={{ padding: '11px 14px', borderRadius: 10, background: sel ? t.primarySoft : t.surface, border: `1px solid ${sel ? t.primary : t.border}`, display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 16, height: 16, borderRadius: '50%', border: `1.5px solid ${sel ? t.primary : t.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {sel && <div style={{ width: 8, height: 8, borderRadius: '50%', background: t.primary }}/>}
              </div>
              <div style={{ fontFamily: '"Mukta", sans-serif', fontSize: 13, color: t.text }}>{label}</div>
            </div>
          ))}
        </div>

        <Card padding={14} theme={t} style={{ background: t.surfaceWarm, borderColor: 'transparent' }}>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <ShieldIcon size={18} color={t.primary} filled/>
            <div style={{ flex: 1, fontFamily: '"Mukta", sans-serif', fontSize: 12, color: t.text, lineHeight: 1.4 }}>
              Photo verify करवाएँ — blue tick पाएँ
              <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, color: t.textFaint }}>Selfie verification · 1 min</div>
            </div>
            <Button variant="soft" size="sm" theme={t}>Verify</Button>
          </div>
        </Card>
      </div>
    </MobileScreen>
  );
}

// ─── 46. PRIVACY SETTINGS ───
function S46_Privacy({ theme }) {
  const t = theme;
  const settings = [
    { hi: 'Profile search में दिखे?', en: 'Show in search', on: true },
    { hi: 'Photos किसे दिखे', en: 'Show photos to', value: 'Verified only' },
    { hi: 'Phone number', en: 'Show phone', value: 'After acceptance' },
    { hi: 'Last seen', en: 'Show last seen', on: false },
    { hi: 'Online status', en: 'Show online status', on: true },
    { hi: 'Chat allow', en: 'Allow chat from', value: 'Accepted matches only' },
    { hi: 'Hide profile', en: 'Hide from specific users', value: '3 users' },
  ];
  return (
    <MobileScreen theme={t}>
      <TopBar theme={t} title="Privacy" leading={<BackIcon size={20} color={t.text}/>}/>
      <div style={{ padding: '14px 20px' }}>
        <div style={{ background: t.surface, border: `1px solid ${t.borderSoft}`, borderRadius: 12, overflow: 'hidden' }}>
          {settings.map((s, i) => (
            <div key={i} style={{ padding: '14px 16px', borderBottom: i < settings.length - 1 ? `1px solid ${t.borderSoft}` : 'none', display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ flex: 1 }}>
                <BiLabel hi={s.hi} en={s.en} size="sm" theme={t}/>
                {s.value && <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: t.primary, marginTop: 3 }}>{s.value}</div>}
              </div>
              {s.on !== undefined ? (
                <div style={{ width: 40, height: 24, borderRadius: 999, background: s.on ? t.primary : t.borderSoft, position: 'relative' }}>
                  <div style={{ position: 'absolute', top: 2, [s.on ? 'right' : 'left']: 2, width: 20, height: 20, borderRadius: '50%', background: '#FFF' }}/>
                </div>
              ) : <ChevronIcon size={14} color={t.textFaint}/>}
            </div>
          ))}
        </div>

        <div style={{ marginTop: 20, padding: 16, background: t.surfaceWarm, borderRadius: 12, display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: t.surface, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <LockIcon size={16} color={t.primary}/>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: '"Mukta", sans-serif', fontSize: 13, color: t.text, fontWeight: 500 }}>Take a break</div>
            <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: t.textMuted, marginTop: 2 }}>Pause your profile for some days</div>
          </div>
          <div style={{ width: 40, height: 24, borderRadius: 999, background: t.borderSoft, position: 'relative' }}>
            <div style={{ position: 'absolute', top: 2, left: 2, width: 20, height: 20, borderRadius: '50%', background: '#FFF' }}/>
          </div>
        </div>

        <div style={{ marginTop: 20, textAlign: 'center', padding: 16, fontFamily: '"Mukta", sans-serif', fontSize: 13, color: t.error }}>Delete account</div>
      </div>
    </MobileScreen>
  );
}

// ─── 47. VERIFICATION CENTER ───
function S47_Verify({ theme }) {
  const t = theme;
  const items = [
    { hi: 'फ़ोन', en: 'Phone', sub: '+91 98765 43210', status: 'done' },
    { hi: 'पहचान', en: 'Aadhaar', sub: 'Identity verification', status: 'pending' },
    { hi: 'शिक्षा', en: 'Education', sub: 'Upload certificate', status: 'todo' },
    { hi: 'नौकरी', en: 'Employer', sub: 'Offer letter / ID card', status: 'todo' },
    { hi: 'आय', en: 'Income', sub: 'Tax return / salary slip', status: 'todo', premium: true },
    { hi: 'फोटो', en: 'Photo', sub: 'Selfie verification', status: 'done' },
  ];
  return (
    <MobileScreen theme={t}>
      <TopBar theme={t} title="Verification" leading={<BackIcon size={20} color={t.text}/>}/>
      <div style={{ padding: 20 }}>
        <div style={{ padding: 18, background: t.surfaceWarm, borderRadius: 14, marginBottom: 20 }}>
          <BiLabel hi="Verify करें — 5× responses" en="Get 5× more responses" size="md" theme={t}/>
          <div style={{ marginTop: 10, display: 'flex', gap: 8 }}>
            {items.map((it, i) => (
              <div key={i} style={{ flex: 1, height: 4, borderRadius: 999, background: it.status === 'done' ? t.success : it.status === 'pending' ? t.warn : t.borderSoft }}/>
            ))}
          </div>
          <div style={{ marginTop: 8, fontFamily: 'Inter, sans-serif', fontSize: 11, color: t.textMuted }}>2 of 6 complete</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {items.map((it, i) => (
            <div key={i} style={{ padding: 14, background: t.surface, border: `1px solid ${t.borderSoft}`, borderRadius: 12, display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: it.status === 'done' ? t.successSoft : it.status === 'pending' ? t.warnSoft : t.borderSoft, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {it.status === 'done' ? <CheckIcon size={16} color={t.success}/> : <ShieldIcon size={16} color={it.status === 'pending' ? t.warn : t.textMuted}/>}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <BiLabel hi={it.hi} en={it.en} size="sm" theme={t}/>
                  {it.premium && <Badge kind="premium" theme={t}>Premium</Badge>}
                </div>
                <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: t.textFaint, marginTop: 3 }}>{it.sub}</div>
              </div>
              {it.status === 'done' ? <Badge kind="success" theme={t}>Verified</Badge>
              : it.status === 'pending' ? <Badge kind="warn" theme={t}>In review</Badge>
              : <Button variant="soft" size="sm" theme={t}>Verify</Button>}
            </div>
          ))}
        </div>
      </div>
    </MobileScreen>
  );
}

// ─── 48. DOCUMENT UPLOAD ───
function S48_DocUpload({ theme }) {
  const t = theme;
  return (
    <MobileScreen theme={t}>
      <TopBar theme={t} title="Aadhaar verification" subtitle="Step 1 of 2" leading={<BackIcon size={20} color={t.text}/>}/>
      <div style={{ padding: 20 }}>
        <Card padding={14} theme={t} style={{ background: t.surfaceWarm, borderColor: 'transparent', marginBottom: 18 }}>
          <div style={{ fontFamily: '"Mukta", sans-serif', fontSize: 12, color: t.text, lineHeight: 1.5 }}>
            <div style={{ fontWeight: 500, marginBottom: 4 }}>क्या upload करना है?</div>
            • Aadhaar card photo (front side)<br/>
            • Numbers और name clearly दिखें<br/>
            • 24h में verified
          </div>
        </Card>

        <BiLabel hi="दस्तावेज़ अपलोड करें" en="Upload document" size="sm" theme={t}/>
        <div style={{ marginTop: 10, padding: 30, background: t.surface, border: `1.5px dashed ${t.border}`, borderRadius: 12, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 56, height: 56, borderRadius: '50%', background: t.primarySoft, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <CameraIcon size={24} color={t.primary}/>
          </div>
          <div>
            <div style={{ fontFamily: '"Mukta", sans-serif', fontSize: 14, color: t.text }}>Camera से photo लें</div>
            <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: t.textFaint, marginTop: 2 }}>Preferred · clearer photos</div>
          </div>
        </div>

        <div style={{ marginTop: 14, padding: 16, background: t.surface, border: `1px solid ${t.border}`, borderRadius: 10, display: 'flex', alignItems: 'center', gap: 10 }}>
          <PlusIcon size={16} color={t.textMuted}/>
          <div style={{ flex: 1, fontFamily: '"Mukta", sans-serif', fontSize: 13, color: t.text }}>Or upload from gallery</div>
        </div>

        <div style={{ marginTop: 18, padding: 12, background: t.borderSoft, borderRadius: 10, display: 'flex', alignItems: 'flex-start', gap: 8 }}>
          <LockIcon size={14} color={t.textMuted}/>
          <div style={{ flex: 1, fontFamily: 'Inter, sans-serif', fontSize: 11, color: t.textMuted, lineHeight: 1.5 }}>
            आपका Aadhaar private रहेगा। केवल verification के लिए use होगा। Never shown publicly.
          </div>
        </div>
      </div>

      <div style={{ padding: '14px 20px 24px', marginTop: 'auto', borderTop: `1px solid ${t.borderSoft}`, background: t.surface }}>
        <Button variant="primary" size="lg" full theme={t} disabled>Submit for verification</Button>
      </div>
    </MobileScreen>
  );
}

// ─── 49. NOTIFICATIONS ───
function S49_Notifications({ theme }) {
  const t = theme;
  const groups = [
    {
      label: 'Today',
      items: [
        { name: 'Anjali Sachan', msg: 'sent you a message', when: '2:14 PM', hue: 60, kind: 'chat' },
        { name: 'Priya Patel', msg: 'accepted your interest', when: '11:30 AM', hue: 20, kind: 'accepted' },
        { name: 'Verification', msg: 'Aadhaar approved ✓', when: '9:14 AM', kind: 'verify' },
      ]
    },
    {
      label: 'This week',
      items: [
        { name: 'Rajiv Singh', msg: 'sent you an interest', when: 'Mon', hue: 200, kind: 'interest' },
        { name: 'Ritu Mahato', msg: 'shortlisted your profile', when: 'Sun', hue: 280, kind: 'shortlist' },
        { name: 'KurmiConnect', msg: 'Your profile boost expires tomorrow', when: 'Sun', kind: 'system' },
      ]
    }
  ];
  return (
    <MobileScreen theme={t}>
      <TopBar theme={t} title="Notifications" leading={<BackIcon size={20} color={t.text}/>} trailing={<div style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: t.primary }}>Mark all read</div>}/>
      {groups.map((g, gi) => (
        <div key={gi}>
          <div style={{ padding: '12px 20px 6px', fontFamily: '"Mukta", sans-serif', fontSize: 11, color: t.textMuted, letterSpacing: '0.08em', textTransform: 'uppercase', background: t.bg }}>{g.label}</div>
          {g.items.map((it, i) => (
            <div key={i} style={{ padding: '14px 20px', background: t.surface, borderBottom: `1px solid ${t.borderSoft}`, display: 'flex', gap: 12, alignItems: 'center' }}>
              {it.hue !== undefined ? <Avatar name={it.name} size={42} hue={it.hue} theme={t}/> : (
                <div style={{ width: 42, height: 42, borderRadius: '50%', background: t.primarySoft, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {it.kind === 'verify' ? <ShieldIcon size={18} color={t.primary} filled/> : <BellIcon size={18} color={t.primary}/>}
                </div>
              )}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: '"Mukta", sans-serif', fontSize: 13, color: t.text, lineHeight: 1.4 }}>
                  <strong style={{ fontWeight: 500 }}>{it.name}</strong> <span style={{ color: t.textMuted }}>{it.msg}</span>
                </div>
                <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, color: t.textFaint, marginTop: 3 }}>{it.when}</div>
              </div>
              {it.kind === 'interest' && <Button variant="soft" size="sm" theme={t}>View</Button>}
            </div>
          ))}
        </div>
      ))}
    </MobileScreen>
  );
}

// ─── 50. SETTINGS ───
function S50_Settings({ theme }) {
  const t = theme;
  const groups = [
    {
      label: 'Account',
      items: [
        { hi: 'Personal info', en: 'Name, phone, email' },
        { hi: 'Privacy', en: 'Profile visibility' },
        { hi: 'Verification', en: '2 of 6 complete' },
        { hi: 'Subscription', en: 'Gold · 42 days left' },
      ],
    },
    {
      label: 'Preferences',
      items: [
        { hi: 'Language', en: 'Hindi (default)' },
        { hi: 'Notifications', en: 'Match, chat, system' },
        { hi: 'Theme', en: 'Light · System default' },
      ],
    },
    {
      label: 'Safety',
      items: [
        { hi: 'Blocked users', en: '3 blocked' },
        { hi: 'Report a profile', en: 'Help us keep KurmiConnect safe' },
        { hi: 'Safety tips', en: 'Read our community guide' },
      ],
    },
    {
      label: 'About',
      items: [
        { hi: 'Help & support', en: 'WhatsApp · Email · FAQ' },
        { hi: 'Terms & Privacy', en: '' },
        { hi: 'App version', en: '2.4.1' },
      ],
    },
  ];
  return (
    <MobileScreen theme={t} bottomNav={<BottomNav active="profile" theme={t}/>}>
      <TopBar theme={t} title="Settings" leading={<BackIcon size={20} color={t.text}/>}/>
      <div style={{ padding: '12px 20px 24px' }}>
        {groups.map((g, gi) => (
          <div key={gi} style={{ marginBottom: 18 }}>
            <div style={{ padding: '4px 4px 8px', fontFamily: '"Mukta", sans-serif', fontSize: 11, color: t.textMuted, letterSpacing: '0.08em', textTransform: 'uppercase' }}>{g.label}</div>
            <div style={{ background: t.surface, border: `1px solid ${t.borderSoft}`, borderRadius: 12, overflow: 'hidden' }}>
              {g.items.map((it, i) => (
                <div key={i} style={{ padding: '12px 14px', borderBottom: i < g.items.length - 1 ? `1px solid ${t.borderSoft}` : 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ flex: 1 }}>
                    <BiLabel hi={it.hi} en={it.en} size="sm" theme={t}/>
                  </div>
                  <ChevronIcon size={14} color={t.textFaint}/>
                </div>
              ))}
            </div>
          </div>
        ))}
        <div style={{ textAlign: 'center', padding: '16px 0', fontFamily: '"Mukta", sans-serif', fontSize: 13, color: t.error }}>Log out · Sign out</div>
      </div>
    </MobileScreen>
  );
}

// ─── 51. HELP & SUPPORT ───
function S51_Help({ theme }) {
  const t = theme;
  const faqs = [
    'मेरी profile कब verify होगी?',
    'Refund कैसे मिलेगा?',
    'Photo कैसे बदलें?',
    'Family member को कैसे add करें?',
    'मेरा membership कब expire होगा?',
  ];
  return (
    <MobileScreen theme={t}>
      <TopBar theme={t} title="Help & support" leading={<BackIcon size={20} color={t.text}/>}/>
      <div style={{ padding: 20 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 20 }}>
          {[
            { hi: 'WhatsApp', en: '+91 98XXX XXXXX', tone: '#25D366' },
            { hi: 'Call', en: '10am – 8pm', tone: t.primary },
            { hi: 'Email', en: 'help@kurmi.in', tone: t.info },
            { hi: 'Live chat', en: 'avg reply 4 min', tone: t.accent },
          ].map((c, i) => (
            <div key={i} style={{ padding: 14, background: t.surface, border: `1px solid ${t.borderSoft}`, borderRadius: 12 }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: c.tone, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>
                <PhoneIcon size={14} color="#FFF"/>
              </div>
              <div style={{ fontFamily: '"Mukta", sans-serif', fontSize: 13, color: t.text, fontWeight: 500 }}>{c.hi}</div>
              <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 10.5, color: t.textFaint, marginTop: 2 }}>{c.en}</div>
            </div>
          ))}
        </div>

        <div style={{ fontFamily: '"Mukta", sans-serif', fontSize: 11, color: t.textMuted, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 10 }}>Top questions</div>
        <div style={{ background: t.surface, border: `1px solid ${t.borderSoft}`, borderRadius: 12, overflow: 'hidden' }}>
          {faqs.map((q, i) => (
            <div key={i} style={{ padding: '14px 16px', borderBottom: i < faqs.length - 1 ? `1px solid ${t.borderSoft}` : 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ flex: 1, fontFamily: '"Mukta", sans-serif', fontSize: 13, color: t.text }}>{q}</div>
              <ChevronIcon size={14} color={t.textFaint}/>
            </div>
          ))}
        </div>
      </div>
    </MobileScreen>
  );
}

// ─── 52. DELETE ACCOUNT ───
function S52_Delete({ theme }) {
  const t = theme;
  return (
    <MobileScreen theme={t}>
      <TopBar theme={t} title="Delete account" leading={<BackIcon size={20} color={t.text}/>}/>
      <div style={{ padding: 24 }}>
        <div style={{ width: 64, height: 64, borderRadius: '50%', background: '#FEE2E2', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
          <TrashIcon size={28} color={t.error}/>
        </div>
        <div style={{ marginBottom: 12 }}>
          <BiLabel hi="क्या आप sure हैं?" en="Are you sure?" size="xl" theme={t}/>
        </div>
        <div style={{ fontFamily: '"Mukta", sans-serif', fontSize: 13, color: t.textMuted, lineHeight: 1.6, marginBottom: 20 }}>
          Account delete होने पर:
          <div style={{ marginTop: 10, paddingLeft: 0 }}>
            • आपकी profile हमेशा के लिए हट जाएगी<br/>
            • Sent और received interests delete हो जाएँगे<br/>
            • Chats और matches archive में नहीं रहेंगे<br/>
            • Active subscription का refund नहीं मिलेगा<br/>
          </div>
        </div>

        <div style={{ padding: 14, background: t.warnSoft, borderRadius: 10, marginBottom: 20 }}>
          <div style={{ fontFamily: '"Mukta", sans-serif', fontSize: 12, color: t.warn, fontWeight: 500 }}>क्या pause करना चाहेंगे?</div>
          <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: t.warn, marginTop: 3, marginBottom: 8 }}>Take a break instead — हम आपकी profile को hide कर देंगे</div>
          <Button variant="soft" size="sm" theme={t}>Pause for 30 days</Button>
        </div>

        <BiLabel hi="कारण बताएँ" en="Reason (optional)" size="sm" theme={t}/>
        <div style={{ marginTop: 8, padding: 14, height: 80, background: t.surface, border: `1px solid ${t.border}`, borderRadius: 10, fontFamily: '"Mukta", sans-serif', fontSize: 12, color: t.textFaint }}>
          आपके feedback से हमें सुधार करने में मदद मिलेगी...
        </div>
      </div>

      <div style={{ padding: '14px 20px 24px', marginTop: 'auto', borderTop: `1px solid ${t.borderSoft}`, background: t.surface, display: 'flex', gap: 8 }}>
        <Button variant="secondary" size="lg" full theme={t}>Cancel</Button>
        <Button variant="danger" size="lg" full theme={t}>Delete forever</Button>
      </div>
    </MobileScreen>
  );
}

Object.assign(window, {
  S37_Plans, S38_AddOns, S39_Checkout, S40_PaySuccess, S41_PayFail, S42_MySubscription,
  S43_MyProfile, S44_EditSection, S45_PhotoManager, S46_Privacy, S47_Verify, S48_DocUpload,
  S49_Notifications, S50_Settings, S51_Help, S52_Delete,
});
