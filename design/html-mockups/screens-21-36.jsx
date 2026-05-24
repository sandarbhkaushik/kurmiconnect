// screens-21-36.jsx — Home, discovery, interactions

// ─── Reusable: top app bar ───
function TopBar({ theme, title, subtitle, leading, trailing }) {
  const t = theme;
  return (
    <div style={{
      padding: '14px 20px',
      background: t.surface,
      borderBottom: `1px solid ${t.borderSoft}`,
      display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0,
    }}>
      {leading}
      <div style={{ flex: 1 }}>
        <div style={{ fontFamily: '"Mukta", sans-serif', fontSize: 16, fontWeight: 500, color: t.text }}>{title}</div>
        {subtitle && <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: t.textFaint, marginTop: 2 }}>{subtitle}</div>}
      </div>
      {trailing}
    </div>
  );
}

// ─── Reusable: match card ───
function MatchCard({ theme, name, age, height, caste, city, match, hue, verified, featured, online, compact }) {
  const t = theme;
  if (compact) {
    return (
      <div style={{ background: t.surface, border: `1px solid ${t.borderSoft}`, borderRadius: 14, overflow: 'hidden' }}>
        <div style={{ position: 'relative', aspectRatio: '1/1' }}>
          <PhotoPlaceholder name={name} height="100%" radius={0} theme={t} hue={hue}/>
          {match && (
            <div style={{ position: 'absolute', top: 8, left: 8, padding: '3px 8px', background: 'rgba(255,255,255,0.95)', borderRadius: 999, fontFamily: 'Inter', fontSize: 10, fontWeight: 500, color: t.primary }}>
              {match}% match
            </div>
          )}
          <div style={{ position: 'absolute', top: 8, right: 8, width: 28, height: 28, borderRadius: '50%', background: 'rgba(255,255,255,0.95)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <HeartIcon size={14} color={t.primary}/>
          </div>
          {featured && (
            <div style={{ position: 'absolute', bottom: 8, left: 8, padding: '3px 7px', background: t.primary, borderRadius: 4, display: 'flex', alignItems: 'center', gap: 3 }}>
              <StarIcon size={9} color="#FFF" filled/>
              <span style={{ fontFamily: 'Inter', fontSize: 9, fontWeight: 500, color: '#FFF', letterSpacing: '0.05em' }}>FEATURED</span>
            </div>
          )}
        </div>
        <div style={{ padding: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 2 }}>
            <span style={{ fontFamily: '"Mukta", sans-serif', fontSize: 14, fontWeight: 500, color: t.text }}>{name}</span>
            {verified && <CheckIcon size={11} color={t.info}/>}
          </div>
          <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 10.5, color: t.textMuted, lineHeight: 1.4 }}>
            {age} · {height}<br/>
            {caste} · {city}
          </div>
        </div>
      </div>
    );
  }
  return (
    <div style={{ display: 'flex', gap: 12, padding: 12, background: t.surface, border: `1px solid ${t.borderSoft}`, borderRadius: 14 }}>
      <div style={{ width: 78, height: 78, borderRadius: 10, overflow: 'hidden', flexShrink: 0 }}>
        <PhotoPlaceholder name={name} height={78} width={78} radius={10} theme={t} hue={hue}/>
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 }}>
          <span style={{ fontFamily: '"Mukta", sans-serif', fontSize: 15, fontWeight: 500, color: t.text }}>{name}</span>
          {verified && <CheckIcon size={12} color={t.info}/>}
          {online && <div style={{ width: 7, height: 7, borderRadius: '50%', background: t.success }}/>}
        </div>
        <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: t.textMuted, marginBottom: 6 }}>
          {age} · {height} · {caste}<br/>{city}
        </div>
        <div style={{ display: 'flex', gap: 6 }}>
          {match && <Badge kind="match" theme={t}>{match}% match</Badge>}
          {featured && <Badge kind="featured" icon={<StarIcon size={9} color={t.primaryDeep} filled/>} theme={t}>Featured</Badge>}
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <HeartIcon size={18} color={t.textFaint}/>
        <ChevronIcon size={16} color={t.textFaint}/>
      </div>
    </div>
  );
}

// ─── 21. HOME / TODAY'S MATCHES ───
function S21_Home({ theme }) {
  const t = theme;
  const matches = [
    { name: 'Priya', age: 26, height: '5\'4"', caste: 'Patel', city: 'Lucknow', match: 92, hue: 20, verified: true },
    { name: 'Anjali', age: 25, height: '5\'3"', caste: 'Sachan', city: 'Kanpur', match: 88, hue: 60 },
    { name: 'Pooja', age: 27, height: '5\'5"', caste: 'Verma', city: 'Patna', match: 85, hue: 320, verified: true, featured: true },
    { name: 'Neha', age: 24, height: '5\'2"', caste: 'Katiyar', city: 'Allahabad', match: 84, hue: 180 },
  ];
  const featured = [
    { name: 'Aarti', tag: 'IAS 2022', hue: 30 },
    { name: 'Dr. Ritu', tag: 'AIIMS', hue: 80 },
    { name: 'Vikram', tag: 'IIT-D', hue: 200 },
    { name: 'Sneha', tag: 'CA', hue: 280 },
  ];
  return (
    <MobileScreen theme={t} bottomNav={<BottomNav active="home" theme={t} badges={{ interests: 3, chats: 2 }} />}>
      {/* Top bar */}
      <div style={{ padding: '14px 20px 12px', background: t.surface, display: 'flex', alignItems: 'center' }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: '"Mukta", sans-serif', fontSize: 11, color: t.textFaint }}>Namaste 🙏</div>
          <div style={{ fontFamily: '"Mukta", sans-serif', fontSize: 18, fontWeight: 500, color: t.text }}>Rajesh ji</div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <div style={{ width: 38, height: 38, borderRadius: 10, background: t.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <SearchIcon size={18} color={t.text}/>
          </div>
          <div style={{ width: 38, height: 38, borderRadius: 10, background: t.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
            <BellIcon size={18} color={t.text}/>
            <div style={{ position: 'absolute', top: 8, right: 8, width: 7, height: 7, borderRadius: '50%', background: t.primary }}/>
          </div>
        </div>
      </div>

      {/* Upgrade strip */}
      <div style={{ margin: '0 20px 12px', padding: '12px 14px', background: t.primaryDeep, borderRadius: 12, color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontFamily: '"Mukta", sans-serif', fontSize: 13, fontWeight: 500 }}>3× more replies with Gold</div>
          <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, opacity: 0.7 }}>₹1,499 · 6 months</div>
        </div>
        <div style={{ padding: '6px 10px', background: '#FFF', color: t.primaryDeep, borderRadius: 8, fontFamily: '"Mukta", sans-serif', fontSize: 11, fontWeight: 500 }}>Upgrade</div>
      </div>

      {/* Profile completion */}
      <div style={{ margin: '0 20px 16px', padding: '12px 14px', background: t.surface, border: `1px solid ${t.borderSoft}`, borderRadius: 12 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
          <div style={{ fontFamily: '"Mukta", sans-serif', fontSize: 12, color: t.text }}>Profile 70% complete</div>
          <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: t.primary }}>Complete →</div>
        </div>
        <ProgressBar value={70} theme={t} height={3}/>
      </div>

      {/* Featured carousel */}
      <div style={{ padding: '0 20px 16px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 12 }}>
          <BiLabel hi="विशेष व्यक्तित्व" en="Featured Personalities" size="md" theme={t}/>
          <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: t.primary }}>See all</div>
        </div>
        <div style={{ display: 'flex', gap: 10, overflowX: 'auto', marginLeft: -20, paddingLeft: 20, marginRight: -20, paddingRight: 20 }}>
          {featured.map((f, i) => (
            <div key={i} style={{ width: 110, flexShrink: 0 }}>
              <div style={{ position: 'relative' }}>
                <PhotoPlaceholder name={f.name} height={130} width={110} radius={10} theme={t} hue={f.hue}/>
                <div style={{ position: 'absolute', top: 6, left: 6 }}>
                  <Badge kind="featured" icon={<StarIcon size={9} color={t.primaryDeep} filled/>} theme={t}>Featured</Badge>
                </div>
              </div>
              <div style={{ marginTop: 8, fontFamily: '"Mukta", sans-serif', fontSize: 12, fontWeight: 500, color: t.text }}>{f.name}</div>
              <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, color: t.primary }}>{f.tag}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Today's matches */}
      <div style={{ padding: '0 20px 20px' }}>
        <div style={{ marginBottom: 12 }}>
          <BiLabel hi="आज के मैच" en="12 new for your search" size="md" theme={t}/>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {matches.map((m, i) => <MatchCard key={i} {...m} compact theme={t}/>)}
        </div>
        <div style={{ marginTop: 16, textAlign: 'center' }}>
          <Button variant="secondary" size="md" theme={t}>और देखें · Load more</Button>
        </div>
      </div>
    </MobileScreen>
  );
}

// ─── 22. FEATURED PERSONALITIES LANDING ───
function S22_Featured({ theme }) {
  const t = theme;
  const cats = [
    { hi: 'सभी', en: 'All', count: 124, sel: true },
    { hi: 'सिविल सेवा', en: 'Civil Services', count: 18 },
    { hi: 'डॉक्टर', en: 'Doctors', count: 32 },
    { hi: 'इंजीनियर', en: 'Engineers', count: 28 },
    { hi: 'शिक्षा', en: 'Academia', count: 14 },
    { hi: 'व्यापार', en: 'Business', count: 22 },
    { hi: 'कृषि', en: 'Agriculture', count: 10 },
  ];
  const people = [
    { name: 'Aarti Patel', tag: 'IAS 2022', blurb: 'Joint Magistrate, Sitapur. 2022 batch UPSC, AIR 47.', age: 28, height: '5\'5"', city: 'Lucknow', caste: 'Patel', hue: 30 },
    { name: 'Dr. Ritu Sachan', tag: 'AIIMS Delhi', blurb: 'MBBS-MD Cardiology. Research interests in preventive heart care.', age: 29, height: '5\'4"', city: 'Delhi', caste: 'Sachan', hue: 80 },
    { name: 'Vikram Verma', tag: 'IIT-D · Founder', blurb: 'Founded an agri-tech that works with 1,200 Kurmi farmers in eastern UP.', age: 31, height: '5\'10"', city: 'Bengaluru', caste: 'Verma', hue: 200 },
    { name: 'Sneha Singh', tag: 'CA · Big 4', blurb: 'Manager at Deloitte. Trustee, Kurmi Education Trust.', age: 27, height: '5\'3"', city: 'Mumbai', caste: 'Singh', hue: 320 },
  ];
  return (
    <MobileScreen theme={t} bottomNav={<BottomNav active="home" theme={t}/>}>
      <TopBar theme={t} title="Featured Personalities" subtitle="सम्मानित कुर्मी समाज के सदस्य" leading={<BackIcon size={20} color={t.text}/>}/>
      {/* Trust strip */}
      <div style={{ margin: '12px 20px 0', padding: '10px 12px', background: t.surfaceWarm, borderRadius: 10, display: 'flex', alignItems: 'center', gap: 10 }}>
        <ShieldIcon size={16} color={t.primary} filled/>
        <div style={{ flex: 1, fontFamily: '"Mukta", sans-serif', fontSize: 11.5, color: t.text, lineHeight: 1.4 }}>
          Editorial team द्वारा verified
          <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, color: t.textFaint }}>Never paid placement · हमेशा निशुल्क</div>
        </div>
      </div>
      {/* Category chips */}
      <div style={{ padding: '14px 0 8px', overflowX: 'auto' }}>
        <div style={{ display: 'flex', gap: 6, padding: '0 20px' }}>
          {cats.map((c, i) => (
            <div key={i} style={{
              padding: '8px 12px', borderRadius: 999,
              background: c.sel ? t.primary : t.surface,
              border: `1px solid ${c.sel ? t.primary : t.border}`,
              fontFamily: '"Mukta", sans-serif', fontSize: 12,
              color: c.sel ? '#FFF' : t.text, whiteSpace: 'nowrap', flexShrink: 0,
              display: 'flex', alignItems: 'center', gap: 4,
            }}>
              {c.hi}
              <span style={{ fontFamily: 'Inter', fontSize: 10, opacity: 0.7 }}>{c.count}</span>
            </div>
          ))}
        </div>
      </div>
      {/* Sub-filter */}
      <div style={{ padding: '4px 20px 12px', display: 'flex', gap: 6 }}>
        {['Show all', 'Brides', 'Grooms'].map((s, i) => (
          <div key={i} style={{ padding: '6px 10px', borderRadius: 6, background: i === 0 ? t.text : 'transparent', color: i === 0 ? '#FFF' : t.textMuted, fontFamily: 'Inter, sans-serif', fontSize: 10, fontWeight: 500 }}>{s}</div>
        ))}
      </div>

      {/* Cards */}
      <div style={{ padding: '0 20px 20px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        {people.map((p, i) => (
          <div key={i} style={{ background: t.surface, border: `1px solid ${t.borderSoft}`, borderRadius: 14, overflow: 'hidden' }}>
            <div style={{ padding: 14, display: 'flex', gap: 12 }}>
              <div style={{ width: 76, height: 76, borderRadius: 10, overflow: 'hidden', flexShrink: 0 }}>
                <PhotoPlaceholder name={p.name} height={76} width={76} radius={10} theme={t} hue={p.hue}/>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <span style={{ fontFamily: '"Mukta", sans-serif', fontSize: 14, fontWeight: 500, color: t.text }}>{p.name}</span>
                  <CheckIcon size={12} color={t.info}/>
                </div>
                <div style={{ display: 'inline-flex', marginTop: 4, padding: '3px 8px', background: t.primarySoft, borderRadius: 6, fontFamily: 'Inter, sans-serif', fontSize: 10, color: t.primaryDeep, fontWeight: 500 }}>{p.tag}</div>
                <div style={{ marginTop: 6, fontFamily: 'Inter, sans-serif', fontSize: 11, color: t.textMuted }}>{p.age} · {p.height} · {p.caste} · {p.city}</div>
              </div>
            </div>
            <div style={{ padding: '0 14px 14px' }}>
              <div style={{ padding: 10, background: t.surfaceWarm, borderLeft: `3px solid ${t.primary}`, fontFamily: '"Mukta", sans-serif', fontSize: 12, color: t.text, lineHeight: 1.45, fontStyle: 'italic' }}>
                "{p.blurb}"
              </div>
            </div>
          </div>
        ))}
        <Button variant="secondary" size="md" full theme={t}>Load 81 more</Button>
      </div>
    </MobileScreen>
  );
}

// ─── 23. FEATURED CATEGORY BROWSER ───
function S23_FeaturedCategory({ theme }) {
  const t = theme;
  return (
    <MobileScreen theme={t} bottomNav={<BottomNav active="home" theme={t}/>}>
      <TopBar theme={t} title="Civil Services" subtitle="18 verified personalities" leading={<BackIcon size={20} color={t.text}/>}/>
      <div style={{ padding: '12px 20px', display: 'flex', gap: 6, overflowX: 'auto', borderBottom: `1px solid ${t.borderSoft}`, background: t.surface }}>
        {['All genders', 'Age 25-30', 'Lucknow', 'Patna', 'Delhi'].map((c, i) => (
          <div key={i} style={{ padding: '6px 10px', borderRadius: 6, background: t.bg, border: `1px solid ${t.border}`, fontFamily: 'Inter, sans-serif', fontSize: 10, color: t.textMuted, whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: 4 }}>
            {c} <XIcon size={9} color={t.textFaint}/>
          </div>
        ))}
      </div>
      <div style={{ padding: '10px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: t.bg }}>
        <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: t.textMuted }}>18 results</div>
        <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: t.text, display: 'flex', alignItems: 'center', gap: 4 }}>Sort: Most recent <ChevronIcon size={11} color={t.text} dir="down"/></div>
      </div>
      <div style={{ padding: '12px 20px 20px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {[
          { name: 'Aarti Patel', tag: 'IAS · Joint Magistrate, Sitapur', age: 28, city: 'Lucknow', hue: 30 },
          { name: 'Manoj Kumar', tag: 'IPS · DCP, Patna', age: 30, city: 'Patna', hue: 200 },
          { name: 'Pooja Verma', tag: 'IRS 2021', age: 27, city: 'Delhi', hue: 320 },
          { name: 'Shashank S.', tag: 'PCS · DM Office', age: 29, city: 'Allahabad', hue: 100 },
          { name: 'Kavita Singh', tag: 'IAS 2020', age: 28, city: 'Kanpur', hue: 60 },
        ].map((p, i) => (
          <div key={i} style={{ display: 'flex', gap: 12, padding: 12, background: t.surface, border: `1px solid ${t.borderSoft}`, borderRadius: 12 }}>
            <div style={{ width: 56, height: 56, borderRadius: '50%', overflow: 'hidden' }}>
              <Avatar name={p.name} size={56} hue={p.hue} theme={t}/>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <span style={{ fontFamily: '"Mukta", sans-serif', fontSize: 14, fontWeight: 500, color: t.text }}>{p.name}</span>
                <CheckIcon size={12} color={t.info}/>
              </div>
              <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: t.primary, marginTop: 2 }}>{p.tag}</div>
              <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, color: t.textMuted, marginTop: 4 }}>{p.age} · {p.city}</div>
            </div>
            <ChevronIcon size={16} color={t.textFaint}/>
          </div>
        ))}
      </div>
    </MobileScreen>
  );
}

// ─── 24. FEATURED PROFILE DETAIL ───
function S24_FeaturedDetail({ theme }) {
  const t = theme;
  return (
    <MobileScreen theme={t} statusBar={true}>
      {/* Hero */}
      <div style={{ position: 'relative' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, padding: '12px 16px', zIndex: 2, display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(255,255,255,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><BackIcon size={18} color={t.text}/></div>
          <div style={{ display: 'flex', gap: 8 }}>
            <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(255,255,255,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><ShareIcon size={16} color={t.text}/></div>
            <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(255,255,255,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><KebabIcon size={16} color={t.text}/></div>
          </div>
        </div>
        <PhotoPlaceholder name="Aarti" height={380} radius={0} theme={t} hue={30}/>
      </div>
      {/* Featured strip */}
      <div style={{ padding: '12px 20px', background: t.primary, color: '#FFF', display: 'flex', alignItems: 'center', gap: 8 }}>
        <StarIcon size={14} color="#FFF" filled/>
        <div style={{ fontFamily: '"Mukta", sans-serif', fontSize: 12, fontWeight: 500 }}>Featured Personality · Civil Services</div>
      </div>
      {/* Name + credential */}
      <div style={{ padding: '16px 20px 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <h1 style={{ margin: 0, fontFamily: '"Mukta", sans-serif', fontSize: 24, fontWeight: 500, color: t.text }}>Aarti Patel</h1>
          <CheckIcon size={16} color={t.info}/>
        </div>
        <div style={{ display: 'inline-flex', marginTop: 8, padding: '5px 12px', background: t.primarySoft, borderRadius: 8, fontFamily: 'Inter, sans-serif', fontSize: 12, color: t.primaryDeep, fontWeight: 500 }}>
          IAS 2022 · Joint Magistrate, Sitapur
        </div>
        <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: t.textMuted, marginTop: 10 }}>
          28 yrs · 5'5" · Patel · Lucknow, UP
        </div>
      </div>
      {/* Editorial blurb */}
      <div style={{ margin: '14px 20px', padding: 14, background: t.surfaceWarm, borderLeft: `3px solid ${t.primary}`, borderRadius: 10 }}>
        <div style={{ fontFamily: '"Mukta", sans-serif', fontSize: 13, color: t.text, lineHeight: 1.5, fontStyle: 'italic' }}>
          "AIR 47 in 2022 UPSC. First in her village to clear civil services. Mentors rural Kurmi students from her home district."
        </div>
        <div style={{ marginTop: 6, fontFamily: 'Inter, sans-serif', fontSize: 10, color: t.textFaint, letterSpacing: '0.05em' }}>— Editorial team</div>
      </div>
      {/* Verified credentials grid */}
      <div style={{ padding: '0 20px 16px' }}>
        <div style={{ fontFamily: '"Mukta", sans-serif', fontSize: 12, color: t.textMuted, marginBottom: 8 }}>Verified credentials</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          {[
            ['UPSC Gazette', 'Govt of India'],
            ['Education', 'IIT-D B.Tech'],
            ['Aadhaar ID', 'Verified'],
            ['Photo', 'Selfie verified'],
          ].map(([label, sub], i) => (
            <div key={i} style={{ padding: 10, background: t.surface, border: `1px solid ${t.borderSoft}`, borderRadius: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 24, height: 24, borderRadius: 6, background: t.successSoft, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <CheckIcon size={14} color={t.success}/>
              </div>
              <div>
                <div style={{ fontFamily: '"Mukta", sans-serif', fontSize: 11.5, color: t.text }}>{label}</div>
                <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 9.5, color: t.textFaint }}>{sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Action bar */}
      <div style={{ padding: '14px 20px 20px', borderTop: `1px solid ${t.borderSoft}`, background: t.surface, display: 'flex', gap: 8, alignItems: 'center' }}>
        <div style={{ width: 44, height: 44, borderRadius: '50%', border: `1px solid ${t.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><ShareIcon size={16} color={t.text}/></div>
        <div style={{ width: 44, height: 44, borderRadius: '50%', border: `1px solid ${t.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><HeartIcon size={16} color={t.text}/></div>
        <Button variant="primary" size="lg" full theme={t}>Interest भेजें · Send interest</Button>
      </div>
    </MobileScreen>
  );
}

// ─── 25. SEARCH ENTRY ───
function S25_Search({ theme }) {
  const t = theme;
  return (
    <MobileScreen theme={t} bottomNav={<BottomNav active="search" theme={t}/>}>
      <div style={{ padding: '20px 20px 0' }}>
        <BiLabel hi="खोजें" en="Search" size="xl" theme={t}/>
        <div style={{ marginTop: 16, height: 48, background: t.surface, border: `1px solid ${t.border}`, borderRadius: 12, display: 'flex', alignItems: 'center', padding: '0 14px', gap: 10 }}>
          <SearchIcon size={16} color={t.textFaint}/>
          <div style={{ flex: 1, fontFamily: '"Mukta", sans-serif', fontSize: 13, color: t.textFaint }}>नाम, location, profession...</div>
        </div>
      </div>
      <div style={{ padding: '14px 20px 0', display: 'flex', gap: 6, overflowX: 'auto' }}>
        {['मेरी पसंद', 'Recently viewed', 'Featured', 'Online now', 'New today'].map((c, i) => (
          <div key={i} style={{ padding: '8px 12px', borderRadius: 999, background: i === 0 ? t.primary : t.surface, border: `1px solid ${i === 0 ? t.primary : t.border}`, fontFamily: '"Mukta", sans-serif', fontSize: 12, color: i === 0 ? '#FFF' : t.text, whiteSpace: 'nowrap', flexShrink: 0 }}>{c}</div>
        ))}
      </div>
      <div style={{ padding: '20px' }}>
        <div style={{ fontFamily: '"Mukta", sans-serif', fontSize: 12, color: t.textMuted, marginBottom: 10, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Saved searches</div>
        {[
          { title: 'Lucknow doctors', count: 47, sub: 'Female · 25-30 · Patel/Sachan' },
          { title: 'Patna IAS', count: 12, sub: 'Female · UP/Bihar' },
        ].map((s, i) => (
          <div key={i} style={{ padding: 14, background: t.surface, border: `1px solid ${t.borderSoft}`, borderRadius: 12, marginBottom: 8, display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 36, height: 36, borderRadius: 8, background: t.primarySoft, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <SearchIcon size={16} color={t.primary}/>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: '"Mukta", sans-serif', fontSize: 14, fontWeight: 500, color: t.text }}>{s.title}</div>
              <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 10.5, color: t.textFaint }}>{s.sub} · {s.count} results</div>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <EditIcon size={14} color={t.textMuted}/>
              <TrashIcon size={14} color={t.textMuted}/>
            </div>
          </div>
        ))}

        <div style={{ fontFamily: '"Mukta", sans-serif', fontSize: 12, color: t.textMuted, margin: '16px 0 10px', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Recent</div>
        {['Doctor in Lucknow', 'Patel · UP · 25-28'].map((s, i) => (
          <div key={i} style={{ padding: '10px 4px', display: 'flex', alignItems: 'center', gap: 10 }}>
            <SearchIcon size={14} color={t.textFaint}/>
            <div style={{ flex: 1, fontFamily: '"Mukta", sans-serif', fontSize: 13, color: t.text }}>{s}</div>
            <XIcon size={12} color={t.textFaint}/>
          </div>
        ))}

        <div style={{ marginTop: 20 }}>
          <Button variant="secondary" size="md" full theme={t} icon={<SettingsIcon size={14} color={t.text}/>}>Advanced filters</Button>
        </div>
      </div>
    </MobileScreen>
  );
}

// ─── 26. ADVANCED FILTERS ───
function S26_Filters({ theme }) {
  const t = theme;
  const sections = [
    { title: 'Age range', value: '22 – 28 yrs', open: true },
    { title: 'Height range', value: '5\'2" – 5\'8"' },
    { title: 'Sub-caste', value: '7 selected' },
    { title: 'Gotra', value: 'Exclude same' },
    { title: 'Location', value: 'UP, Bihar, MP' },
    { title: 'Education', value: 'Graduate +' },
    { title: 'Profession', value: '5 selected' },
    { title: 'Income', value: '5L +' },
    { title: 'Diet', value: 'Veg, Egg' },
    { title: 'Manglik', value: 'Doesn\'t matter' },
    { title: 'Family type', value: 'Joint, Nuclear' },
  ];
  return (
    <MobileScreen theme={t}>
      <TopBar theme={t} title="Filters" leading={<XIcon size={18} color={t.text}/>} trailing={<div style={{ fontFamily: 'Inter', fontSize: 12, color: t.primary }}>Reset</div>}/>
      <div style={{ padding: '12px 20px', borderBottom: `1px solid ${t.borderSoft}`, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
        {['Patel', 'UP', '22-28', 'Veg'].map((c, i) => (
          <div key={i} style={{ padding: '4px 8px 4px 10px', borderRadius: 999, background: t.primarySoft, fontFamily: 'Inter, sans-serif', fontSize: 10, color: t.primaryDeep, display: 'flex', alignItems: 'center', gap: 4 }}>{c}<XIcon size={9} color={t.primaryDeep}/></div>
        ))}
      </div>
      <div style={{ padding: '12px 20px' }}>
        {sections.map((s, i) => (
          <div key={i} style={{ borderBottom: `1px solid ${t.borderSoft}`, padding: '14px 0' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontFamily: '"Mukta", sans-serif', fontSize: 14, color: t.text, fontWeight: 500 }}>{s.title}</div>
                <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: t.textMuted, marginTop: 2 }}>{s.value}</div>
              </div>
              <ChevronIcon size={14} color={t.textMuted} dir={s.open ? 'down' : 'right'}/>
            </div>
            {s.open && (
              <div style={{ marginTop: 14 }}>
                <div style={{ position: 'relative', height: 24 }}>
                  <div style={{ position: 'absolute', top: 11, left: 0, right: 0, height: 3, background: t.borderSoft, borderRadius: 999 }}/>
                  <div style={{ position: 'absolute', top: 11, left: '20%', width: '40%', height: 3, background: t.primary, borderRadius: 999 }}/>
                  <div style={{ position: 'absolute', top: 4, left: 'calc(20% - 8px)', width: 16, height: 16, borderRadius: '50%', background: t.surface, border: `2px solid ${t.primary}` }}/>
                  <div style={{ position: 'absolute', top: 4, left: 'calc(60% - 8px)', width: 16, height: 16, borderRadius: '50%', background: t.surface, border: `2px solid ${t.primary}` }}/>
                </div>
              </div>
            )}
          </div>
        ))}
        {[
          { hi: 'Photo हो', en: 'Must have photo', on: true },
          { hi: 'Verified', en: 'Only verified profiles', on: true },
          { hi: 'Featured', en: 'Featured only', on: false },
          { hi: 'Active recently', en: 'Last 7 days', on: false },
        ].map((s, i) => (
          <div key={i} style={{ padding: '12px 0', borderBottom: `1px solid ${t.borderSoft}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <BiLabel hi={s.hi} en={s.en} size="sm" theme={t}/>
            <div style={{ width: 40, height: 24, borderRadius: 999, background: s.on ? t.primary : t.borderSoft, position: 'relative' }}>
              <div style={{ position: 'absolute', top: 2, [s.on ? 'right' : 'left']: 2, width: 20, height: 20, borderRadius: '50%', background: '#FFF' }}/>
            </div>
          </div>
        ))}
      </div>
      <div style={{ padding: '14px 20px 24px', borderTop: `1px solid ${t.borderSoft}`, background: t.surface }}>
        <Button variant="primary" size="lg" full theme={t}>Apply (1,245 results)</Button>
      </div>
    </MobileScreen>
  );
}

// ─── 27. SEARCH RESULTS ───
function S27_SearchResults({ theme }) {
  const t = theme;
  const matches = [
    { name: 'Priya Patel', age: 26, height: '5\'4"', caste: 'Patel', city: 'Lucknow', match: 92, hue: 20, verified: true, online: true },
    { name: 'Anjali Sachan', age: 25, height: '5\'3"', caste: 'Sachan', city: 'Kanpur', match: 88, hue: 60 },
    { name: 'Pooja Verma', age: 27, height: '5\'5"', caste: 'Verma', city: 'Patna', match: 85, hue: 320, verified: true, featured: true },
    { name: 'Neha Katiyar', age: 24, height: '5\'2"', caste: 'Katiyar', city: 'Allahabad', match: 84, hue: 180 },
    { name: 'Kavita Singh', age: 26, height: '5\'4"', caste: 'Singh', city: 'Delhi', match: 82, hue: 100, verified: true },
  ];
  return (
    <MobileScreen theme={t} bottomNav={<BottomNav active="search" theme={t}/>}>
      <TopBar theme={t} title="1,245 results" subtitle="Patel · UP/Bihar · 22-28" leading={<BackIcon size={20} color={t.text}/>} trailing={<SettingsIcon size={18} color={t.text}/>}/>
      <div style={{ padding: '10px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: t.bg }}>
        <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: t.textMuted, display: 'flex', alignItems: 'center', gap: 4 }}>Sort: Match % <ChevronIcon size={11} dir="down" color={t.textMuted}/></div>
        <div style={{ display: 'flex', gap: 8 }}>
          <div style={{ padding: '5px 10px', borderRadius: 6, background: t.text, color: '#FFF', fontFamily: 'Inter, sans-serif', fontSize: 10, fontWeight: 500 }}>List</div>
          <div style={{ padding: '5px 10px', borderRadius: 6, background: 'transparent', color: t.textMuted, fontFamily: 'Inter, sans-serif', fontSize: 10 }}>Grid</div>
        </div>
      </div>
      <div style={{ padding: '12px 20px 20px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {matches.map((m, i) => <MatchCard key={i} {...m} theme={t}/>)}
        <Button variant="ghost" size="md" full theme={t}>Save this search</Button>
      </div>
    </MobileScreen>
  );
}

// ─── 28. PROFILE DETAIL ───
function S28_ProfileDetail({ theme }) {
  const t = theme;
  return (
    <MobileScreen theme={t}>
      {/* Hero */}
      <div style={{ position: 'relative' }}>
        <div style={{ position: 'absolute', top: 12, left: 16, right: 16, zIndex: 2, display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(255,255,255,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><BackIcon size={18} color={t.text}/></div>
          <div style={{ display: 'flex', gap: 8 }}>
            <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(255,255,255,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><ShareIcon size={16} color={t.text}/></div>
            <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(255,255,255,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><KebabIcon size={16} color={t.text}/></div>
          </div>
        </div>
        <PhotoPlaceholder name="Priya" height={420} radius={0} theme={t} hue={20}/>
        <div style={{ position: 'absolute', top: 16, right: 60, padding: '4px 10px', background: 'rgba(0,0,0,0.5)', borderRadius: 999, color: '#FFF', fontFamily: 'Inter', fontSize: 11, fontWeight: 500 }}>1 / 4</div>
        <div style={{ position: 'absolute', bottom: 16, left: 16, padding: '6px 12px', background: '#FFF', borderRadius: 999, fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 500, color: t.primary }}>92% match</div>
      </div>
      {/* Name + badges */}
      <div style={{ padding: '16px 20px 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <h1 style={{ margin: 0, fontFamily: '"Mukta", sans-serif', fontSize: 24, fontWeight: 500, color: t.text }}>Priya Patel</h1>
          <CheckIcon size={16} color={t.info}/>
        </div>
        <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: t.textMuted, marginTop: 4 }}>
          26 yrs · 5'4" · Patel · Lucknow, UP
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 12 }}>
          <Badge kind="verified" theme={t} icon={<CheckIcon size={9} color={t.info}/>}>Aadhaar</Badge>
          <Badge kind="verified" theme={t} icon={<CheckIcon size={9} color={t.info}/>}>Education</Badge>
          <Badge kind="verified" theme={t} icon={<CheckIcon size={9} color={t.info}/>}>Employer</Badge>
          <Badge kind="verified" theme={t} icon={<CheckIcon size={9} color={t.info}/>}>Photo</Badge>
        </div>
      </div>
      {/* About */}
      <div style={{ padding: '20px' }}>
        <div style={{ fontFamily: '"Mukta", sans-serif', fontSize: 11, color: t.textMuted, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 8 }}>About</div>
        <div style={{ fontFamily: '"Mukta", sans-serif', fontSize: 13.5, color: t.text, lineHeight: 1.55 }}>
          PGT Math teacher in Lucknow. Bachpan से classical music सुनती हूँ। हफ्ते में दो दिन गाँव के स्कूल में volunteer पढ़ाती हूँ। एक समझदार और परिवार-केंद्रित जीवनसाथी की तलाश...
          <span style={{ color: t.primary, fontWeight: 500 }}> Read more</span>
        </div>
      </div>
      {/* Family card */}
      <div style={{ padding: '0 20px' }}>
        <Card padding={14} theme={t} accent style={{ background: t.surfaceWarm, borderColor: 'transparent' }}>
          <div style={{ fontFamily: '"Mukta", sans-serif', fontSize: 11, color: t.textMuted, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 10 }}>Family</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, fontFamily: '"Mukta", sans-serif', fontSize: 12 }}>
            <div><div style={{ color: t.textFaint, fontSize: 10 }}>Father</div><div style={{ color: t.text }}>Shri Suresh Patel · Farmer</div></div>
            <div><div style={{ color: t.textFaint, fontSize: 10 }}>Mother</div><div style={{ color: t.text }}>Smt. Indu Patel · Homemaker</div></div>
            <div><div style={{ color: t.textFaint, fontSize: 10 }}>Siblings</div><div style={{ color: t.text }}>1 brother (married)</div></div>
            <div><div style={{ color: t.textFaint, fontSize: 10 }}>Native</div><div style={{ color: t.text }}>Gopalganj, Bihar</div></div>
            <div><div style={{ color: t.textFaint, fontSize: 10 }}>Values</div><div style={{ color: t.text }}>Traditional</div></div>
            <div><div style={{ color: t.textFaint, fontSize: 10 }}>Gotra</div><div style={{ color: t.text }}>Kashyap</div></div>
          </div>
        </Card>
      </div>
      {/* Profession */}
      <div style={{ padding: '14px 20px' }}>
        <Card padding={14} theme={t}>
          <div style={{ fontFamily: '"Mukta", sans-serif', fontSize: 11, color: t.textMuted, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 10 }}>Education & profession</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, fontFamily: '"Mukta", sans-serif', fontSize: 12 }}>
            <div><div style={{ color: t.textFaint, fontSize: 10 }}>Education</div><div style={{ color: t.text }}>M.Sc Mathematics · LU 2021</div></div>
            <div><div style={{ color: t.textFaint, fontSize: 10 }}>Profession</div><div style={{ color: t.text }}>PGT Teacher</div></div>
            <div><div style={{ color: t.textFaint, fontSize: 10 }}>Workplace</div><div style={{ color: t.text }}>City Montessori</div></div>
            <div><div style={{ color: t.textFaint, fontSize: 10 }}>Income</div><div style={{ color: t.text }}>5 – 10 लाख</div></div>
          </div>
        </Card>
      </div>
      {/* Horoscope */}
      <div style={{ padding: '0 20px 14px' }}>
        <Card padding={14} theme={t}>
          <div style={{ fontFamily: '"Mukta", sans-serif', fontSize: 11, color: t.textMuted, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 10 }}>Horoscope</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, fontFamily: '"Mukta", sans-serif', fontSize: 12 }}>
            <div><div style={{ color: t.textFaint, fontSize: 10 }}>Manglik</div><div style={{ color: t.text }}>No</div></div>
            <div><div style={{ color: t.textFaint, fontSize: 10 }}>Nakshatra</div><div style={{ color: t.text }}>Rohini · रोहिणी</div></div>
            <div><div style={{ color: t.textFaint, fontSize: 10 }}>Rashi</div><div style={{ color: t.text }}>Vrishabha</div></div>
            <div><div style={{ color: t.textFaint, fontSize: 10 }}>Birth time</div><div style={{ color: t.text }}>06:42 AM</div></div>
          </div>
        </Card>
      </div>
      {/* Action bar */}
      <div style={{ padding: '14px 20px 24px', borderTop: `1px solid ${t.borderSoft}`, background: t.surface, display: 'flex', gap: 8, alignItems: 'center', position: 'sticky', bottom: 0 }}>
        <div style={{ width: 44, height: 44, borderRadius: '50%', border: `1px solid ${t.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><ShareIcon size={16} color={t.text}/></div>
        <div style={{ width: 44, height: 44, borderRadius: '50%', border: `1px solid ${t.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><HeartIcon size={16} color={t.text}/></div>
        <Button variant="primary" size="lg" full theme={t}>Interest भेजें</Button>
      </div>
    </MobileScreen>
  );
}

// ─── 29. PHOTO GALLERY FULLSCREEN ───
function S29_Gallery({ theme }) {
  const t = theme;
  return (
    <MobileScreen theme={t} statusBar={false}>
      <div style={{ flex: 1, height: '100%', background: '#000', display: 'flex', flexDirection: 'column', position: 'relative' }}>
        <div style={{ position: 'absolute', top: 12, left: 16, right: 16, zIndex: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><XIcon size={16} color="#FFF"/></div>
          <div style={{ padding: '6px 12px', background: 'rgba(0,0,0,0.5)', borderRadius: 999, color: '#FFF', fontFamily: 'Inter', fontSize: 11 }}>3 of 6</div>
          <div style={{ display: 'flex', gap: 8 }}>
            <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><ShareIcon size={16} color="#FFF"/></div>
            <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><KebabIcon size={16} color="#FFF"/></div>
          </div>
        </div>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <PhotoPlaceholder name="Priya" height={520} width={380} radius={0} theme={t} hue={20}/>
        </div>
        <div style={{ position: 'absolute', bottom: 30, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 4 }}>
          {[0,1,2,3,4,5].map(i => (
            <div key={i} style={{ width: 6, height: 6, borderRadius: '50%', background: i === 2 ? '#FFF' : 'rgba(255,255,255,0.4)' }}/>
          ))}
        </div>
      </div>
    </MobileScreen>
  );
}

// ─── 30. SEND INTEREST CONFIRMATION ───
function S30_SendInterest({ theme }) {
  const t = theme;
  return (
    <MobileScreen theme={t} statusBar={true}>
      <div style={{ flex: 1, height: '100%', display: 'flex', flexDirection: 'column' }}>
        <div style={{ flex: 1, background: 'rgba(28,25,23,0.4)' }}/>
        <div style={{ background: t.surface, borderRadius: '20px 20px 0 0', padding: '20px 24px 24px' }}>
          <div style={{ width: 40, height: 4, background: t.border, borderRadius: 999, margin: '0 auto 18px' }}/>
          <div style={{ marginBottom: 16 }}>
            <BiLabel hi="Priya को interest भेजें?" en="Send interest to Priya?" size="lg" theme={t}/>
          </div>
          <div style={{ display: 'flex', gap: 12, padding: 12, background: t.bg, borderRadius: 12, marginBottom: 18 }}>
            <Avatar name="Priya" size={48} hue={20} theme={t}/>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: '"Mukta", sans-serif', fontSize: 14, fontWeight: 500, color: t.text }}>Priya Patel · 26</div>
              <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: t.textMuted }}>PGT Teacher · Lucknow</div>
            </div>
          </div>
          <div style={{ padding: '10px 12px', background: t.warnSoft, borderRadius: 8, marginBottom: 14 }}>
            <div style={{ fontFamily: '"Mukta", sans-serif', fontSize: 12, color: t.warn, fontWeight: 500 }}>Free interests: 2 of 5 this month</div>
            <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 10.5, color: t.warn, marginTop: 2 }}>Upgrade to Gold for unlimited interests</div>
          </div>
          <div style={{ marginBottom: 18 }}>
            <BiLabel hi="संदेश जोड़ें (premium)" en="Add a message (premium)" size="sm" theme={t}/>
            <div style={{ marginTop: 8, padding: 12, height: 70, background: t.borderSoft, borderRadius: 10, fontFamily: '"Mukta", sans-serif', fontSize: 12, color: t.textFaint, display: 'flex', alignItems: 'center', gap: 6 }}>
              <LockIcon size={12} color={t.textFaint}/>
              Upgrade to add a message
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <Button variant="secondary" size="lg" theme={t}>Cancel</Button>
            <Button variant="primary" size="lg" full theme={t}>Interest भेजें</Button>
          </div>
        </div>
      </div>
    </MobileScreen>
  );
}

// ─── 31. INTERESTS SENT ───
function S31_InterestsSent({ theme }) {
  const t = theme;
  const items = [
    { name: 'Priya Patel', age: 26, city: 'Lucknow', status: 'pending', when: '2 days ago', hue: 20 },
    { name: 'Anjali Sachan', age: 25, city: 'Kanpur', status: 'accepted', when: '5 days ago', hue: 60 },
    { name: 'Pooja Verma', age: 27, city: 'Patna', status: 'declined', when: '1 week ago', hue: 320 },
    { name: 'Neha Katiyar', age: 24, city: 'Allahabad', status: 'pending', when: '1 week ago', hue: 180 },
  ];
  return (
    <MobileScreen theme={t} bottomNav={<BottomNav active="interests" theme={t} badges={{ interests: 3 }}/>}>
      <div style={{ padding: '14px 20px 0', background: t.surface }}>
        <BiLabel hi="रुचि" en="Interests" size="lg" theme={t}/>
        <div style={{ display: 'flex', gap: 0, marginTop: 14, borderBottom: `1px solid ${t.borderSoft}` }}>
          {[['Sent', 12, true], ['Received', 8, false], ['Accepted', 3, false]].map(([l, c, sel], i) => (
            <div key={i} style={{ padding: '10px 16px', borderBottom: sel ? `2px solid ${t.primary}` : 'none', marginBottom: -1, display: 'flex', alignItems: 'center', gap: 6, fontFamily: '"Mukta", sans-serif', fontSize: 13, color: sel ? t.primary : t.textMuted, fontWeight: sel ? 500 : 400 }}>
              {l} <span style={{ fontFamily: 'Inter', fontSize: 10, padding: '1px 5px', background: sel ? t.primarySoft : t.borderSoft, borderRadius: 999, color: sel ? t.primary : t.textMuted }}>{c}</span>
            </div>
          ))}
        </div>
      </div>
      <div style={{ padding: '12px 20px', display: 'flex', gap: 6, overflowX: 'auto', background: t.surface, borderBottom: `1px solid ${t.borderSoft}` }}>
        {['All', 'Pending', 'Accepted', 'Declined'].map((c, i) => (
          <div key={i} style={{ padding: '6px 12px', borderRadius: 999, background: i === 0 ? t.text : t.surface, border: `1px solid ${i === 0 ? t.text : t.border}`, fontFamily: 'Inter, sans-serif', fontSize: 11, color: i === 0 ? '#FFF' : t.textMuted, whiteSpace: 'nowrap' }}>{c}</div>
        ))}
      </div>
      <div style={{ padding: '14px 20px 20px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {items.map((it, i) => (
          <div key={i} style={{ padding: 12, background: t.surface, border: `1px solid ${t.borderSoft}`, borderRadius: 12, display: 'flex', gap: 12, alignItems: 'center' }}>
            <Avatar name={it.name} size={52} hue={it.hue} theme={t}/>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontFamily: '"Mukta", sans-serif', fontSize: 14, fontWeight: 500, color: t.text }}>{it.name}</div>
              <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: t.textMuted }}>{it.age} · {it.city}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 4 }}>
                {it.status === 'pending' && <Badge kind="warn" theme={t}>Pending</Badge>}
                {it.status === 'accepted' && <Badge kind="success" theme={t}>Accepted ✓</Badge>}
                {it.status === 'declined' && <Badge kind="default" theme={t}>Declined</Badge>}
                <span style={{ fontFamily: 'Inter', fontSize: 10, color: t.textFaint }}>{it.when}</span>
              </div>
            </div>
            {it.status === 'pending' && <Button variant="ghost" size="sm" theme={t}>Withdraw</Button>}
            {it.status === 'accepted' && <Button variant="primary" size="sm" theme={t}>Message</Button>}
          </div>
        ))}
      </div>
    </MobileScreen>
  );
}

// ─── 32. INTERESTS RECEIVED ───
function S32_InterestsReceived({ theme }) {
  const t = theme;
  const items = [
    { name: 'Rajiv Singh', age: 28, city: 'Delhi', when: '2 hours ago', hue: 200, msg: 'Namaste 🙏 Mujhe aapki profile bahut achchi lagi...' },
    { name: 'Manish Verma', age: 30, city: 'Patna', when: 'Yesterday', hue: 100 },
    { name: 'Ankit Patel', age: 27, city: 'Lucknow', when: '3 days ago', hue: 40 },
  ];
  return (
    <MobileScreen theme={t} bottomNav={<BottomNav active="interests" theme={t} badges={{ interests: 3 }}/>}>
      <div style={{ padding: '14px 20px 0', background: t.surface }}>
        <BiLabel hi="रुचि" en="Interests" size="lg" theme={t}/>
        <div style={{ display: 'flex', gap: 0, marginTop: 14, borderBottom: `1px solid ${t.borderSoft}` }}>
          {[['Sent', 12, false], ['Received', 8, true], ['Accepted', 3, false]].map(([l, c, sel], i) => (
            <div key={i} style={{ padding: '10px 16px', borderBottom: sel ? `2px solid ${t.primary}` : 'none', marginBottom: -1, display: 'flex', alignItems: 'center', gap: 6, fontFamily: '"Mukta", sans-serif', fontSize: 13, color: sel ? t.primary : t.textMuted, fontWeight: sel ? 500 : 400 }}>
              {l} <span style={{ fontFamily: 'Inter', fontSize: 10, padding: '1px 5px', background: sel ? t.primarySoft : t.borderSoft, borderRadius: 999, color: sel ? t.primary : t.textMuted }}>{c}</span>
            </div>
          ))}
        </div>
      </div>
      <div style={{ padding: '14px 20px 20px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        {items.map((it, i) => (
          <div key={i} style={{ padding: 14, background: t.surface, border: `1px solid ${t.borderSoft}`, borderRadius: 14 }}>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
              <Avatar name={it.name} size={52} hue={it.hue} theme={t}/>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: '"Mukta", sans-serif', fontSize: 14, fontWeight: 500, color: t.text }}>{it.name}</div>
                <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: t.textMuted }}>{it.age} · {it.city}</div>
                <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 10.5, color: t.textFaint, marginTop: 2 }}>Sent {it.when}</div>
              </div>
            </div>
            {it.msg && (
              <div style={{ marginTop: 10, padding: 10, background: t.surfaceWarm, borderRadius: 8, fontFamily: '"Mukta", sans-serif', fontSize: 12, color: t.text, fontStyle: 'italic', lineHeight: 1.4 }}>
                "{it.msg}"
              </div>
            )}
            <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
              <Button variant="secondary" size="md" full theme={t}>Decline</Button>
              <Button variant="primary" size="md" full theme={t}>Accept ✓</Button>
            </div>
          </div>
        ))}
      </div>
    </MobileScreen>
  );
}

// ─── 33. ACCEPTED MATCHES ───
function S33_Accepted({ theme }) {
  const t = theme;
  const items = [
    { name: 'Anjali Sachan', age: 25, city: 'Kanpur', when: 'Today', activity: 'Active now', hue: 60 },
    { name: 'Ritu Mahato', age: 26, city: 'Ranchi', when: 'Yesterday', activity: '2h ago', hue: 280 },
  ];
  return (
    <MobileScreen theme={t} bottomNav={<BottomNav active="interests" theme={t}/>}>
      <div style={{ padding: '14px 20px 0', background: t.surface }}>
        <BiLabel hi="रुचि" en="Interests" size="lg" theme={t}/>
        <div style={{ display: 'flex', gap: 0, marginTop: 14, borderBottom: `1px solid ${t.borderSoft}` }}>
          {[['Sent', 12, false], ['Received', 8, false], ['Accepted', 3, true]].map(([l, c, sel], i) => (
            <div key={i} style={{ padding: '10px 16px', borderBottom: sel ? `2px solid ${t.primary}` : 'none', marginBottom: -1, display: 'flex', alignItems: 'center', gap: 6, fontFamily: '"Mukta", sans-serif', fontSize: 13, color: sel ? t.primary : t.textMuted, fontWeight: sel ? 500 : 400 }}>
              {l} <span style={{ fontFamily: 'Inter', fontSize: 10, padding: '1px 5px', background: sel ? t.primarySoft : t.borderSoft, borderRadius: 999, color: sel ? t.primary : t.textMuted }}>{c}</span>
            </div>
          ))}
        </div>
      </div>
      <div style={{ padding: '14px 20px 20px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {items.map((it, i) => (
          <div key={i} style={{ padding: 14, background: t.surface, border: `1px solid ${t.borderSoft}`, borderRadius: 14, display: 'flex', gap: 12, alignItems: 'center' }}>
            <Avatar name={it.name} size={52} hue={it.hue} theme={t} online/>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: '"Mukta", sans-serif', fontSize: 14, fontWeight: 500, color: t.text }}>{it.name}</div>
              <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: t.success, marginTop: 2 }}>✓ Match accepted</div>
              <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 10.5, color: t.textFaint, marginTop: 1 }}>{it.activity}</div>
            </div>
            <Button variant="primary" size="sm" theme={t}>Chat</Button>
          </div>
        ))}
      </div>
    </MobileScreen>
  );
}

// ─── 34. SHORTLIST ───
function S34_Shortlist({ theme }) {
  const t = theme;
  const items = [
    { name: 'Priya Patel', age: 26, city: 'Lucknow', when: '2 days ago', hue: 20, match: 92 },
    { name: 'Anjali Sachan', age: 25, city: 'Kanpur', when: '5 days ago', hue: 60, match: 88 },
    { name: 'Pooja Verma', age: 27, city: 'Patna', when: '1 week ago', hue: 320, match: 85 },
    { name: 'Neha Katiyar', age: 24, city: 'Allahabad', when: '2 weeks ago', hue: 180, match: 84 },
  ];
  return (
    <MobileScreen theme={t} bottomNav={<BottomNav active="profile" theme={t}/>}>
      <TopBar theme={t} title="Shortlist" subtitle="12 profiles shortlisted" leading={<BackIcon size={20} color={t.text}/>}/>
      <div style={{ padding: '10px 20px', background: t.bg, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: t.textMuted, display: 'flex', alignItems: 'center', gap: 4 }}>Sort: Recent <ChevronIcon size={11} dir="down" color={t.textMuted}/></div>
      </div>
      <div style={{ padding: '12px 20px 20px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {items.map((it, i) => (
          <div key={i} style={{ padding: 12, background: t.surface, border: `1px solid ${t.borderSoft}`, borderRadius: 12 }}>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 12 }}>
              <PhotoPlaceholder name={it.name} height={56} width={56} radius={10} theme={t} hue={it.hue}/>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ fontFamily: '"Mukta", sans-serif', fontSize: 14, fontWeight: 500, color: t.text }}>{it.name}</span>
                  <Badge kind="match" theme={t}>{it.match}%</Badge>
                </div>
                <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: t.textMuted, marginTop: 2 }}>{it.age} · {it.city}</div>
                <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, color: t.textFaint, marginTop: 1 }}>Saved {it.when}</div>
              </div>
              <HeartIcon size={20} color={t.primary} filled/>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <Button variant="secondary" size="sm" full theme={t}>Share with family</Button>
              <Button variant="primary" size="sm" full theme={t}>Send interest</Button>
            </div>
          </div>
        ))}
      </div>
    </MobileScreen>
  );
}

// ─── 35. CHAT LIST ───
function S35_ChatList({ theme }) {
  const t = theme;
  const chats = [
    { name: 'Anjali Sachan', msg: 'Family ko bhi profile dikhayi hai...', when: '2:14 PM', unread: 3, hue: 60, online: true, verified: true },
    { name: 'Ritu Mahato', msg: 'Voh weekend free ho aap?', when: '12:08 PM', unread: 1, hue: 280, verified: true },
    { name: 'Priya Patel', msg: '✓ Match accepted', when: 'Yesterday', hue: 20, verified: true, system: true },
    { name: 'Neha Katiyar', msg: 'Aapne photos dekha?', when: 'Mon', hue: 180 },
    { name: 'Kavita Singh', msg: 'Thank you for the interest 🙏', when: '14 May', hue: 100, verified: true },
  ];
  return (
    <MobileScreen theme={t} bottomNav={<BottomNav active="chats" theme={t} badges={{ chats: 4 }}/>}>
      <div style={{ padding: '14px 20px', background: t.surface, borderBottom: `1px solid ${t.borderSoft}` }}>
        <BiLabel hi="चैट" en="Chats" size="lg" theme={t}/>
        <div style={{ marginTop: 12, height: 40, background: t.bg, borderRadius: 10, display: 'flex', alignItems: 'center', padding: '0 12px', gap: 8 }}>
          <SearchIcon size={14} color={t.textFaint}/>
          <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: t.textFaint }}>Search chats</div>
        </div>
      </div>
      <div style={{ padding: 0 }}>
        {chats.map((c, i) => (
          <div key={i} style={{ padding: '14px 20px', background: t.surface, borderBottom: `1px solid ${t.borderSoft}`, display: 'flex', gap: 12, alignItems: 'center' }}>
            <Avatar name={c.name} size={48} hue={c.hue} theme={t} online={c.online}/>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 2 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <span style={{ fontFamily: '"Mukta", sans-serif', fontSize: 14, fontWeight: 500, color: t.text }}>{c.name}</span>
                  {c.verified && <CheckIcon size={11} color={t.info}/>}
                </div>
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, color: c.unread ? t.primary : t.textFaint, fontWeight: c.unread ? 500 : 400 }}>{c.when}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ flex: 1, fontFamily: '"Mukta", sans-serif', fontSize: 12, color: c.unread ? t.text : t.textMuted, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', paddingRight: 8 }}>
                  {c.system && <span style={{ color: t.success }}>● </span>}{c.msg}
                </div>
                {c.unread && <div style={{ padding: '1px 6px', background: t.primary, borderRadius: 999, fontFamily: 'Inter', fontSize: 10, fontWeight: 500, color: '#FFF' }}>{c.unread}</div>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </MobileScreen>
  );
}

// ─── 36. CHAT CONVERSATION ───
function S36_Chat({ theme }) {
  const t = theme;
  return (
    <MobileScreen theme={t}>
      {/* Top */}
      <div style={{ padding: '12px 16px', background: t.surface, borderBottom: `1px solid ${t.borderSoft}`, display: 'flex', alignItems: 'center', gap: 10 }}>
        <BackIcon size={20} color={t.text}/>
        <Avatar name="Anjali" size={36} hue={60} theme={t} online/>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <span style={{ fontFamily: '"Mukta", sans-serif', fontSize: 14, fontWeight: 500, color: t.text }}>Anjali Sachan</span>
            <CheckIcon size={11} color={t.info}/>
          </div>
          <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, color: t.success }}>Active now</div>
        </div>
        <PhoneIcon size={18} color={t.textMuted}/>
        <KebabIcon size={18} color={t.textMuted}/>
      </div>
      {/* Messages */}
      <div style={{ flex: 1, padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 10, background: t.bg }}>
        {/* System */}
        <div style={{ alignSelf: 'center', padding: '6px 12px', background: t.successSoft, borderRadius: 999, fontFamily: '"Mukta", sans-serif', fontSize: 11, color: t.success }}>
          🎉 Match accepted on Mar 5 · please be respectful
        </div>
        <div style={{ alignSelf: 'center', fontFamily: 'Inter, sans-serif', fontSize: 10, color: t.textFaint, marginTop: 4 }}>Today</div>

        {/* Incoming */}
        <div style={{ maxWidth: '78%', alignSelf: 'flex-start' }}>
          <div style={{ padding: '10px 14px', background: t.surface, borderRadius: '14px 14px 14px 4px', fontFamily: '"Mukta", sans-serif', fontSize: 13, color: t.text }}>
            Namaste 🙏 आपकी profile पढ़ी, family-oriented लगे।
          </div>
          <div style={{ marginTop: 3, fontFamily: 'Inter, sans-serif', fontSize: 9.5, color: t.textFaint, marginLeft: 4 }}>2:10 PM</div>
        </div>

        {/* Outgoing */}
        <div style={{ maxWidth: '78%', alignSelf: 'flex-end' }}>
          <div style={{ padding: '10px 14px', background: t.primary, borderRadius: '14px 14px 4px 14px', fontFamily: '"Mukta", sans-serif', fontSize: 13, color: '#FFF' }}>
            Namaste 🙏 dhanyavaad. आपकी education profile बहुत impressive है।
          </div>
          <div style={{ marginTop: 3, textAlign: 'right', fontFamily: 'Inter, sans-serif', fontSize: 9.5, color: t.textFaint, marginRight: 4 }}>2:12 PM ✓✓</div>
        </div>

        {/* Incoming */}
        <div style={{ maxWidth: '78%', alignSelf: 'flex-start' }}>
          <div style={{ padding: '10px 14px', background: t.surface, borderRadius: '14px 14px 14px 4px', fontFamily: '"Mukta", sans-serif', fontSize: 13, color: t.text }}>
            Family ko bhi profile dikhayi hai, sab ko pasand aayi. Aapke family se baat karwaayein?
          </div>
          <div style={{ marginTop: 3, fontFamily: 'Inter, sans-serif', fontSize: 9.5, color: t.textFaint, marginLeft: 4 }}>2:14 PM</div>
        </div>

        {/* Quick replies */}
        <div style={{ marginTop: 8, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {['Namaste 🙏', 'Family से बात करवाइए', 'When can we talk?'].map((q, i) => (
            <div key={i} style={{ padding: '7px 12px', background: t.surface, border: `1px solid ${t.border}`, borderRadius: 999, fontFamily: '"Mukta", sans-serif', fontSize: 12, color: t.text }}>{q}</div>
          ))}
        </div>
      </div>

      {/* Composer */}
      <div style={{ padding: '12px 16px 20px', background: t.surface, borderTop: `1px solid ${t.borderSoft}`, display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{ width: 36, height: 36, borderRadius: '50%', background: t.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><PlusIcon size={16} color={t.textMuted}/></div>
        <div style={{ flex: 1, height: 42, background: t.bg, borderRadius: 21, padding: '0 14px', display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ flex: 1, fontFamily: '"Mukta", sans-serif', fontSize: 13, color: t.textFaint }}>Message…</div>
          <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, color: t.textFaint, padding: '2px 6px', background: t.borderSoft, borderRadius: 4 }}>हिं/En</div>
        </div>
        <div style={{ width: 36, height: 36, borderRadius: '50%', background: t.primary, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><ArrowIcon size={16} color="#FFF"/></div>
      </div>
    </MobileScreen>
  );
}

Object.assign(window, {
  TopBar, MatchCard,
  S21_Home, S22_Featured, S23_FeaturedCategory, S24_FeaturedDetail,
  S25_Search, S26_Filters, S27_SearchResults, S28_ProfileDetail, S29_Gallery,
  S30_SendInterest, S31_InterestsSent, S32_InterestsReceived, S33_Accepted,
  S34_Shortlist, S35_ChatList, S36_Chat,
});
