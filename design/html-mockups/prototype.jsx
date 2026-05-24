// prototype.jsx — Interactive hero flow
// Tappable navigation: Home → Profile detail → Send interest → Interests tab → Chat
// + Tweaks panel for palette switching

const PROTO_SCREENS = ['home', 'detail', 'sent', 'chat', 'profile'];

function HeroPrototype({ theme }) {
  const [screen, setScreen] = React.useState('home');
  const [interestSent, setInterestSent] = React.useState(false);
  const [showInterestSheet, setShowInterestSheet] = React.useState(false);
  const [shortlisted, setShortlisted] = React.useState(new Set([2]));
  const t = theme;

  const matches = [
    { id: 0, name: 'Priya Patel', age: 26, height: '5\'4"', caste: 'Patel', city: 'Lucknow', match: 92, hue: 20, verified: true, role: 'PGT Teacher', native: 'Gopalganj, Bihar', edu: 'M.Sc Mathematics', father: 'Suresh Patel · Farmer', online: true, about: 'PGT Math teacher in Lucknow. Bachpan से classical music सुनती हूँ। हफ्ते में दो दिन गाँव के स्कूल में volunteer पढ़ाती हूँ।' },
    { id: 1, name: 'Anjali Sachan', age: 25, height: '5\'3"', caste: 'Sachan', city: 'Kanpur', match: 88, hue: 60, role: 'Software Engineer', native: 'Allahabad, UP', edu: 'BTech CSE', father: 'Ramesh Sachan · Govt service', about: 'Engineer at TCS Kanpur. Family-oriented and traditional, but also enjoy travel and new cuisines.' },
    { id: 2, name: 'Pooja Verma', age: 27, height: '5\'5"', caste: 'Verma', city: 'Patna', match: 85, hue: 320, verified: true, featured: true, role: 'Doctor (BAMS)', native: 'Gaya, Bihar', edu: 'BAMS', father: 'Late Shri R. Verma · Farmer', about: 'Ayurveda doctor running my own clinic in Patna. Believe in balanced living and respect for tradition.' },
    { id: 3, name: 'Neha Katiyar', age: 24, height: '5\'2"', caste: 'Katiyar', city: 'Allahabad', match: 84, hue: 180, role: 'Bank Officer', native: 'Kanpur, UP', edu: 'BCom · MBA', father: 'V. Katiyar · Businessman', about: 'PO at PNB Allahabad. Love cooking, reading, and family gatherings.' },
  ];
  const [activeId, setActiveId] = React.useState(0);
  const active = matches[activeId];

  const featured = [
    { name: 'Aarti Patel', tag: 'IAS 2022', hue: 30 },
    { name: 'Dr. Ritu Sachan', tag: 'AIIMS', hue: 80 },
    { name: 'Vikram Verma', tag: 'IIT-D', hue: 220 },
    { name: 'Sneha Singh', tag: 'CA · Deloitte', hue: 320 },
  ];

  const toggleShortlist = (id) => {
    setShortlisted(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const navigate = (to) => setScreen(to);

  // ─── Home ───
  const Home = () => (
    <MobileScreen theme={t} bottomNav={<HeroBottomNav active="home" theme={t} go={navigate} interests={interestSent ? 1 : 0}/>}>
      <div style={{ padding: '14px 20px 12px', background: t.surface, display: 'flex', alignItems: 'center' }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: '"Mukta", sans-serif', fontSize: 11, color: t.textFaint }}>Namaste 🙏</div>
          <div style={{ fontFamily: '"Mukta", sans-serif', fontSize: 18, fontWeight: 500, color: t.text }}>Rajesh ji</div>
        </div>
        <div style={{ width: 38, height: 38, borderRadius: 10, background: t.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: 8 }}>
          <SearchIcon size={18} color={t.text}/>
        </div>
        <div style={{ width: 38, height: 38, borderRadius: 10, background: t.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
          <BellIcon size={18} color={t.text}/>
          <div style={{ position: 'absolute', top: 8, right: 8, width: 7, height: 7, borderRadius: '50%', background: t.primary }}/>
        </div>
      </div>

      <div style={{ margin: '0 20px 12px', padding: '12px 14px', background: t.primaryDeep, borderRadius: 12, color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontFamily: '"Mukta", sans-serif', fontSize: 13, fontWeight: 500 }}>3× more replies with Gold</div>
          <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, opacity: 0.7 }}>₹1,499 · 6 months</div>
        </div>
        <div style={{ padding: '6px 10px', background: '#FFF', color: t.primaryDeep, borderRadius: 8, fontFamily: '"Mukta", sans-serif', fontSize: 11, fontWeight: 500 }}>Upgrade</div>
      </div>

      <div style={{ margin: '0 20px 16px', padding: '12px 14px', background: t.surface, border: `1px solid ${t.borderSoft}`, borderRadius: 12 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
          <div style={{ fontFamily: '"Mukta", sans-serif', fontSize: 12, color: t.text }}>Profile 70% complete</div>
          <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: t.primary }}>Complete →</div>
        </div>
        <ProgressBar value={70} theme={t} height={3}/>
      </div>

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

      <div style={{ padding: '0 20px 24px' }}>
        <div style={{ marginBottom: 12 }}>
          <BiLabel hi="आज के मैच" en="12 new for your search" size="md" theme={t}/>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {matches.map((m) => (
            <div key={m.id} onClick={() => { setActiveId(m.id); navigate('detail'); }}
              style={{ background: t.surface, border: `1px solid ${t.borderSoft}`, borderRadius: 14, overflow: 'hidden', cursor: 'pointer', transition: 'transform 120ms' }}>
              <div style={{ position: 'relative', aspectRatio: '1/1' }}>
                <PhotoPlaceholder name={m.name} height="100%" radius={0} theme={t} hue={m.hue}/>
                <div style={{ position: 'absolute', top: 8, left: 8, padding: '3px 8px', background: 'rgba(255,255,255,0.95)', borderRadius: 999, fontFamily: 'Inter', fontSize: 10, fontWeight: 500, color: t.primary }}>
                  {m.match}% match
                </div>
                <div onClick={(e) => { e.stopPropagation(); toggleShortlist(m.id); }} style={{ position: 'absolute', top: 8, right: 8, width: 28, height: 28, borderRadius: '50%', background: 'rgba(255,255,255,0.95)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <HeartIcon size={14} color={t.primary} filled={shortlisted.has(m.id)}/>
                </div>
                {m.featured && (
                  <div style={{ position: 'absolute', bottom: 8, left: 8, padding: '3px 7px', background: t.primary, borderRadius: 4, display: 'flex', alignItems: 'center', gap: 3 }}>
                    <StarIcon size={9} color="#FFF" filled/>
                    <span style={{ fontFamily: 'Inter', fontSize: 9, fontWeight: 500, color: '#FFF', letterSpacing: '0.05em' }}>FEATURED</span>
                  </div>
                )}
              </div>
              <div style={{ padding: 10 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 2 }}>
                  <span style={{ fontFamily: '"Mukta", sans-serif', fontSize: 14, fontWeight: 500, color: t.text }}>{m.name.split(' ')[0]}</span>
                  {m.verified && <CheckIcon size={11} color={t.info}/>}
                </div>
                <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 10.5, color: t.textMuted, lineHeight: 1.4 }}>
                  {m.age} · {m.height}<br/>
                  {m.caste} · {m.city}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </MobileScreen>
  );

  // ─── Profile Detail ───
  const Detail = () => (
    <MobileScreen theme={t}>
      <div style={{ position: 'relative' }}>
        <div style={{ position: 'absolute', top: 12, left: 16, right: 16, zIndex: 2, display: 'flex', justifyContent: 'space-between' }}>
          <div onClick={() => navigate('home')} style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(255,255,255,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <BackIcon size={18} color={t.text}/>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(255,255,255,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><ShareIcon size={16} color={t.text}/></div>
            <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(255,255,255,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><KebabIcon size={16} color={t.text}/></div>
          </div>
        </div>
        <PhotoPlaceholder name={active.name} height={420} radius={0} theme={t} hue={active.hue}/>
        <div style={{ position: 'absolute', bottom: 16, left: 16, padding: '6px 12px', background: '#FFF', borderRadius: 999, fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 500, color: t.primary }}>{active.match}% match</div>
      </div>
      <div style={{ padding: '16px 20px 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <h1 style={{ margin: 0, fontFamily: '"Mukta", sans-serif', fontSize: 24, fontWeight: 500, color: t.text }}>{active.name}</h1>
          {active.verified && <CheckIcon size={16} color={t.info}/>}
        </div>
        <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: t.textMuted, marginTop: 4 }}>
          {active.age} yrs · {active.height} · {active.caste} · {active.city}
        </div>
        {active.verified && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 12 }}>
            <Badge kind="verified" theme={t} icon={<CheckIcon size={9} color={t.info}/>}>Aadhaar</Badge>
            <Badge kind="verified" theme={t} icon={<CheckIcon size={9} color={t.info}/>}>Education</Badge>
            <Badge kind="verified" theme={t} icon={<CheckIcon size={9} color={t.info}/>}>Photo</Badge>
          </div>
        )}
      </div>

      <div style={{ padding: '20px' }}>
        <div style={{ fontFamily: '"Mukta", sans-serif', fontSize: 11, color: t.textMuted, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 8 }}>About</div>
        <div style={{ fontFamily: '"Mukta", sans-serif', fontSize: 13.5, color: t.text, lineHeight: 1.55 }}>
          {active.about}
        </div>
      </div>

      <div style={{ padding: '0 20px' }}>
        <Card padding={14} theme={t} accent style={{ background: t.surfaceWarm, borderColor: 'transparent' }}>
          <div style={{ fontFamily: '"Mukta", sans-serif', fontSize: 11, color: t.textMuted, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 10 }}>Family</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, fontFamily: '"Mukta", sans-serif', fontSize: 12 }}>
            <div><div style={{ color: t.textFaint, fontSize: 10 }}>Father</div><div style={{ color: t.text }}>{active.father}</div></div>
            <div><div style={{ color: t.textFaint, fontSize: 10 }}>Native</div><div style={{ color: t.text }}>{active.native}</div></div>
            <div><div style={{ color: t.textFaint, fontSize: 10 }}>Family</div><div style={{ color: t.text }}>Joint</div></div>
            <div><div style={{ color: t.textFaint, fontSize: 10 }}>Values</div><div style={{ color: t.text }}>Traditional</div></div>
          </div>
        </Card>
      </div>

      <div style={{ padding: '14px 20px' }}>
        <Card padding={14} theme={t}>
          <div style={{ fontFamily: '"Mukta", sans-serif', fontSize: 11, color: t.textMuted, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 10 }}>Education & profession</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, fontFamily: '"Mukta", sans-serif', fontSize: 12 }}>
            <div><div style={{ color: t.textFaint, fontSize: 10 }}>Profession</div><div style={{ color: t.text }}>{active.role}</div></div>
            <div><div style={{ color: t.textFaint, fontSize: 10 }}>Education</div><div style={{ color: t.text }}>{active.edu}</div></div>
            <div><div style={{ color: t.textFaint, fontSize: 10 }}>Income</div><div style={{ color: t.text }}>5-10 लाख</div></div>
            <div><div style={{ color: t.textFaint, fontSize: 10 }}>Workplace</div><div style={{ color: t.text }}>{active.city}</div></div>
          </div>
        </Card>
      </div>

      <div style={{ padding: '0 20px 14px' }}>
        <Card padding={14} theme={t}>
          <div style={{ fontFamily: '"Mukta", sans-serif', fontSize: 11, color: t.textMuted, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 10 }}>Horoscope</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, fontFamily: '"Mukta", sans-serif', fontSize: 12 }}>
            <div><div style={{ color: t.textFaint, fontSize: 10 }}>Manglik</div><div style={{ color: t.text }}>No</div></div>
            <div><div style={{ color: t.textFaint, fontSize: 10 }}>Nakshatra</div><div style={{ color: t.text }}>Rohini</div></div>
            <div><div style={{ color: t.textFaint, fontSize: 10 }}>Rashi</div><div style={{ color: t.text }}>Vrishabha</div></div>
            <div><div style={{ color: t.textFaint, fontSize: 10 }}>Gotra</div><div style={{ color: t.text }}>Kashyap</div></div>
          </div>
        </Card>
      </div>

      <div style={{ padding: '14px 20px 24px', borderTop: `1px solid ${t.borderSoft}`, background: t.surface, display: 'flex', gap: 8, alignItems: 'center' }}>
        <div onClick={() => toggleShortlist(active.id)} style={{ width: 44, height: 44, borderRadius: '50%', border: `1px solid ${t.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
          <HeartIcon size={16} color={shortlisted.has(active.id) ? t.primary : t.text} filled={shortlisted.has(active.id)}/>
        </div>
        <div style={{ width: 44, height: 44, borderRadius: '50%', border: `1px solid ${t.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><ShareIcon size={16} color={t.text}/></div>
        {interestSent ? (
          <Button variant="soft" size="lg" full theme={t}>Interest भेजा गया ✓</Button>
        ) : (
          <div onClick={() => setShowInterestSheet(true)} style={{ flex: 1 }}>
            <Button variant="primary" size="lg" full theme={t}>Interest भेजें</Button>
          </div>
        )}
      </div>

      {/* Interest sheet */}
      {showInterestSheet && (
        <div style={{ position: 'absolute', inset: 0, zIndex: 10, display: 'flex', flexDirection: 'column' }}>
          <div onClick={() => setShowInterestSheet(false)} style={{ flex: 1, background: 'rgba(28,25,23,0.5)' }}/>
          <div style={{ background: t.surface, borderRadius: '20px 20px 0 0', padding: '20px 24px 24px', animation: 'slideUp 200ms cubic-bezier(0.2,0.7,0.3,1)' }}>
            <div style={{ width: 40, height: 4, background: t.border, borderRadius: 999, margin: '0 auto 18px' }}/>
            <div style={{ marginBottom: 16 }}>
              <BiLabel hi={`${active.name.split(' ')[0]} को interest भेजें?`} en={`Send interest to ${active.name.split(' ')[0]}?`} size="lg" theme={t}/>
            </div>
            <div style={{ display: 'flex', gap: 12, padding: 12, background: t.bg, borderRadius: 12, marginBottom: 18 }}>
              <Avatar name={active.name} size={48} hue={active.hue} theme={t}/>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: '"Mukta", sans-serif', fontSize: 14, fontWeight: 500, color: t.text }}>{active.name} · {active.age}</div>
                <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: t.textMuted }}>{active.role} · {active.city}</div>
              </div>
            </div>
            <div style={{ padding: '10px 12px', background: t.warnSoft, borderRadius: 8, marginBottom: 14 }}>
              <div style={{ fontFamily: '"Mukta", sans-serif', fontSize: 12, color: t.warn, fontWeight: 500 }}>Free interests: 2 of 5 this month</div>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <div onClick={() => setShowInterestSheet(false)} style={{ flex: '0 0 auto' }}>
                <Button variant="secondary" size="lg" theme={t}>Cancel</Button>
              </div>
              <div onClick={() => { setInterestSent(true); setShowInterestSheet(false); setTimeout(() => navigate('sent'), 400); }} style={{ flex: 1 }}>
                <Button variant="primary" size="lg" full theme={t}>Interest भेजें</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </MobileScreen>
  );

  // ─── Interests Sent ───
  const Sent = () => (
    <MobileScreen theme={t} bottomNav={<HeroBottomNav active="interests" theme={t} go={navigate} interests={1}/>}>
      <div style={{ padding: '14px 20px 0', background: t.surface }}>
        <BiLabel hi="रुचि" en="Interests" size="lg" theme={t}/>
        <div style={{ display: 'flex', gap: 0, marginTop: 14, borderBottom: `1px solid ${t.borderSoft}` }}>
          {[['Sent', 1, true], ['Received', 0, false], ['Accepted', 0, false]].map(([l, c, sel], i) => (
            <div key={i} style={{ padding: '10px 16px', borderBottom: sel ? `2px solid ${t.primary}` : 'none', marginBottom: -1, display: 'flex', alignItems: 'center', gap: 6, fontFamily: '"Mukta", sans-serif', fontSize: 13, color: sel ? t.primary : t.textMuted }}>
              {l} <span style={{ fontFamily: 'Inter', fontSize: 10, padding: '1px 5px', background: sel ? t.primarySoft : t.borderSoft, borderRadius: 999, color: sel ? t.primary : t.textMuted }}>{c}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Success toast */}
      <div style={{ margin: '14px 20px 0', padding: 14, background: t.successSoft, borderRadius: 10, display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ width: 32, height: 32, borderRadius: '50%', background: t.success, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <CheckIcon size={16} color="#FFF"/>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: '"Mukta", sans-serif', fontSize: 13, color: t.success, fontWeight: 500 }}>Interest भेजा गया</div>
          <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: t.success }}>{active.name} will be notified</div>
        </div>
      </div>

      <div style={{ padding: '14px 20px 20px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div onClick={() => navigate('detail')} style={{ padding: 12, background: t.surface, border: `1px solid ${t.borderSoft}`, borderRadius: 12, display: 'flex', gap: 12, alignItems: 'center', cursor: 'pointer' }}>
          <Avatar name={active.name} size={52} hue={active.hue} theme={t}/>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontFamily: '"Mukta", sans-serif', fontSize: 14, fontWeight: 500, color: t.text }}>{active.name}</div>
            <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: t.textMuted }}>{active.age} · {active.city}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 4 }}>
              <Badge kind="warn" theme={t}>Pending</Badge>
              <span style={{ fontFamily: 'Inter', fontSize: 10, color: t.textFaint }}>just now</span>
            </div>
          </div>
        </div>

        {/* Simulated accepted reply */}
        <div style={{ padding: 12, background: t.surface, border: `1px solid ${t.borderSoft}`, borderRadius: 12, display: 'flex', gap: 12, alignItems: 'center' }}>
          <Avatar name="Anjali" size={52} hue={60} theme={t} online/>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontFamily: '"Mukta", sans-serif', fontSize: 14, fontWeight: 500, color: t.text }}>Anjali Sachan</div>
            <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: t.textMuted }}>25 · Kanpur</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 4 }}>
              <Badge kind="success" theme={t}>Accepted ✓</Badge>
              <span style={{ fontFamily: 'Inter', fontSize: 10, color: t.textFaint }}>2 days ago</span>
            </div>
          </div>
          <div onClick={() => navigate('chat')}>
            <Button variant="primary" size="sm" theme={t}>Chat →</Button>
          </div>
        </div>

        <div onClick={() => navigate('home')} style={{ marginTop: 16, padding: 14, background: t.surfaceWarm, borderRadius: 10, textAlign: 'center', cursor: 'pointer' }}>
          <div style={{ fontFamily: '"Mukta", sans-serif', fontSize: 12, color: t.primaryDeep }}>Send to more matches →</div>
        </div>
      </div>
    </MobileScreen>
  );

  // ─── Chat ───
  const ChatScreen = () => {
    const [messages, setMessages] = React.useState([
      { from: 'them', text: 'Namaste 🙏 आपकी profile पढ़ी, family-oriented लगे।', time: '2:10 PM' },
      { from: 'me', text: 'Namaste 🙏 dhanyavaad. आपकी education profile बहुत impressive है।', time: '2:12 PM' },
      { from: 'them', text: 'Family ko bhi profile dikhayi hai, sab ko pasand aayi. Aapke family se baat karwaayein?', time: '2:14 PM' },
    ]);
    const send = (text) => setMessages([...messages, { from: 'me', text, time: 'now' }]);
    return (
      <MobileScreen theme={t}>
        <div style={{ padding: '12px 16px', background: t.surface, borderBottom: `1px solid ${t.borderSoft}`, display: 'flex', alignItems: 'center', gap: 10 }}>
          <div onClick={() => navigate('sent')} style={{ cursor: 'pointer' }}>
            <BackIcon size={20} color={t.text}/>
          </div>
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

        <div style={{ flex: 1, padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 10, background: t.bg }}>
          <div style={{ alignSelf: 'center', padding: '6px 12px', background: t.successSoft, borderRadius: 999, fontFamily: '"Mukta", sans-serif', fontSize: 11, color: t.success }}>
            🎉 Match accepted on Mar 5
          </div>
          <div style={{ alignSelf: 'center', fontFamily: 'Inter, sans-serif', fontSize: 10, color: t.textFaint, marginTop: 4 }}>Today</div>

          {messages.map((m, i) => (
            <div key={i} style={{ maxWidth: '78%', alignSelf: m.from === 'me' ? 'flex-end' : 'flex-start' }}>
              <div style={{
                padding: '10px 14px',
                background: m.from === 'me' ? t.primary : t.surface,
                borderRadius: m.from === 'me' ? '14px 14px 4px 14px' : '14px 14px 14px 4px',
                fontFamily: '"Mukta", sans-serif', fontSize: 13,
                color: m.from === 'me' ? '#FFF' : t.text,
              }}>{m.text}</div>
              <div style={{ marginTop: 3, textAlign: m.from === 'me' ? 'right' : 'left', fontFamily: 'Inter, sans-serif', fontSize: 9.5, color: t.textFaint, padding: '0 4px' }}>
                {m.time}{m.from === 'me' && ' ✓✓'}
              </div>
            </div>
          ))}

          <div style={{ marginTop: 8, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {['Namaste 🙏', 'Family से बात करवाइए', 'When can we talk?'].map((q, i) => (
              <div key={i} onClick={() => send(q)} style={{ padding: '7px 12px', background: t.surface, border: `1px solid ${t.border}`, borderRadius: 999, fontFamily: '"Mukta", sans-serif', fontSize: 12, color: t.text, cursor: 'pointer' }}>{q}</div>
            ))}
          </div>
        </div>

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
  };

  // ─── Mini Profile ───
  const ProfileTab = () => (
    <MobileScreen theme={t} bottomNav={<HeroBottomNav active="profile" theme={t} go={navigate} interests={interestSent ? 1 : 0}/>}>
      <div style={{ background: t.surface, padding: '20px 20px 18px', borderBottom: `1px solid ${t.borderSoft}` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <Avatar name="Rajesh" size={68} hue={200} theme={t}/>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ fontFamily: '"Mukta", sans-serif', fontSize: 18, fontWeight: 500, color: t.text }}>Rajesh Patel</span>
              <EditIcon size={13} color={t.primary}/>
            </div>
            <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: t.primary, marginTop: 2 }}>Profile 78% complete</div>
          </div>
        </div>
        <div style={{ marginTop: 16, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 0 }}>
          {[[124, 'Views'], [interestSent ? 1 : 0, 'Sent'], [shortlisted.size, 'Shortlisted']].map(([n, l], i) => (
            <div key={i} style={{ textAlign: 'center', padding: '4px 0', borderLeft: i > 0 ? `1px solid ${t.borderSoft}` : 'none' }}>
              <div style={{ fontFamily: '"Mukta", sans-serif', fontSize: 18, fontWeight: 500, color: t.text }}>{n}</div>
              <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, color: t.textFaint, marginTop: 1 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ background: t.surface, marginTop: 8 }}>
        {[
          ['Shortlist', `${shortlisted.size} profiles saved`, true],
          ['Verification', '2 of 6 complete', true],
          ['Subscription', 'Free · upgrade for ₹599+', false],
          ['Privacy', 'Photo visible to verified only', true],
          ['Settings', 'Notifications, language, theme', true],
          ['Help & support', 'WhatsApp · email · FAQ', true],
        ].map(([n, v, has], i) => (
          <div key={i} style={{ padding: '14px 20px', borderBottom: i < 5 ? `1px solid ${t.borderSoft}` : 'none', display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 22, height: 22, borderRadius: '50%', background: has ? t.successSoft : t.warnSoft, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {has ? <CheckIcon size={12} color={t.success}/> : <span style={{ fontSize: 10, color: t.warn }}>!</span>}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: '"Mukta", sans-serif', fontSize: 13, color: t.text }}>{n}</div>
              <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 10.5, color: t.textFaint }}>{v}</div>
            </div>
            <ChevronIcon size={14} color={t.textFaint}/>
          </div>
        ))}
      </div>
    </MobileScreen>
  );

  return (
    <div style={{ position: 'relative', width: 380, height: 744 }}>
      {screen === 'home' && <Home/>}
      {screen === 'detail' && <Detail/>}
      {screen === 'sent' && <Sent/>}
      {screen === 'chat' && <ChatScreen/>}
      {screen === 'profile' && <ProfileTab/>}
    </div>
  );
}

// Modified bottom nav for prototype navigation
function HeroBottomNav({ active, theme, go, interests = 0 }) {
  const t = theme;
  const tabs = [
    { id: 'home', label: 'Home', icon: HomeIcon },
    { id: 'search', label: 'Search', icon: SearchIcon },
    { id: 'interests', label: 'Interests', icon: HeartIcon, badge: interests || null },
    { id: 'chat', label: 'Chats', icon: ChatIcon, badge: 1 },
    { id: 'profile', label: 'Profile', icon: UserIcon },
  ];
  const map = { home: 'home', search: 'home', interests: 'sent', chat: 'chat', profile: 'profile' };
  return (
    <div style={{
      height: 70, background: t.surface,
      borderTop: `1px solid ${t.borderSoft}`,
      display: 'flex', flexShrink: 0,
      padding: '6px 0 14px',
    }}>
      {tabs.map(tab => {
        const isActive = active === tab.id;
        const Icon = tab.icon;
        return (
          <div key={tab.id} onClick={() => go(map[tab.id])} style={{
            flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2,
            color: isActive ? t.primary : t.textFaint,
            cursor: 'pointer',
          }}>
            <div style={{ position: 'relative' }}>
              <Icon size={22} color={isActive ? t.primary : t.textFaint} filled={isActive}/>
              {tab.badge && (
                <div style={{
                  position: 'absolute', top: -3, right: -8,
                  background: t.primary, color: '#FFF',
                  fontSize: 9, fontFamily: 'Inter', fontWeight: 500,
                  padding: '1px 5px', borderRadius: 999, minWidth: 14, textAlign: 'center',
                }}>{tab.badge}</div>
              )}
            </div>
            <div style={{ fontSize: 9.5, fontFamily: 'Inter', fontWeight: 500 }}>{tab.label}</div>
          </div>
        );
      })}
    </div>
  );
}

Object.assign(window, { HeroPrototype, HeroBottomNav });
