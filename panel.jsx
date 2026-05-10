// panel.jsx — full-screen layout: header / tips / contacts

const Ico = {
  telegram: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
      <path d="M21.5 4.5 18.5 19c-.2 1-.8 1.2-1.6.8l-4.4-3.3-2.1 2c-.2.2-.4.4-.9.4l.3-4.4 8-7.2c.4-.3-.1-.5-.6-.2L7.4 13l-4.3-1.4c-.9-.3-.9-.9.2-1.4l16.7-6.4c.8-.3 1.5.2 1.5 1.7Z"
            fill="#8fd3ff"/>
    </svg>
  ),
  bot: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
      <rect x="4" y="7" width="16" height="12" rx="3" stroke="#8fd3ff" strokeWidth="1.6"/>
      <circle cx="9" cy="13" r="1.4" fill="#8fd3ff"/>
      <circle cx="15" cy="13" r="1.4" fill="#8fd3ff"/>
      <path d="M12 4v3M9 17h6" stroke="#8fd3ff" strokeWidth="1.6" strokeLinecap="round"/>
    </svg>
  ),
  discord: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
      <path d="M19.5 5.5A16 16 0 0 0 15.6 4l-.3.6a13 13 0 0 0-6.6 0L8.4 4a16 16 0 0 0-3.9 1.5C2.5 9.5 2 13.4 2.3 17.2A15.7 15.7 0 0 0 7 19.5l.6-1a10 10 0 0 1-1.6-.8l.4-.3a11.4 11.4 0 0 0 11.2 0l.4.3-1.6.8.6 1a15.7 15.7 0 0 0 4.7-2.3c.4-4.4-.4-8.3-2.2-11.7ZM9 15c-1 0-1.7-.9-1.7-2 0-1.1.7-2 1.7-2s1.7.9 1.7 2c0 1.1-.7 2-1.7 2Zm6 0c-1 0-1.7-.9-1.7-2 0-1.1.7-2 1.7-2s1.7.9 1.7 2c0 1.1-.7 2-1.7 2Z"
            fill="#8fd3ff"/>
    </svg>
  ),
  globe: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="8.2" stroke="#8fd3ff" strokeWidth="1.6"/>
      <path d="M3.8 12h16.4M12 3.8c2.5 2.6 3.8 5.5 3.8 8.2s-1.3 5.6-3.8 8.2c-2.5-2.6-3.8-5.5-3.8-8.2S9.5 6.4 12 3.8Z"
            stroke="#8fd3ff" strokeWidth="1.6"/>
    </svg>
  ),
};

// ── Loading spinner ──────────────────────────────────────────────────────────
var LOADING_BASE = 'Загрузка';
var DOT_VARIANTS = ['', '.', '..', '...'];

function Loader() {
  var ref = React.useRef(null);
  var step = React.useRef(0);

  React.useEffect(function() {
    var iv = setInterval(function() {
      step.current = (step.current + 1) % DOT_VARIANTS.length;
      if (ref.current) ref.current.textContent = DOT_VARIANTS[step.current];
    }, 500);
    return function() { clearInterval(iv); };
  }, []);

  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
      fontSize: 12, letterSpacing: '.32em', textTransform: 'uppercase',
      color: 'rgba(180,210,255,.7)', fontFamily: "'JetBrains Mono', monospace",
      marginTop: 14,
    }}>
      <span style={{
        width: 13, height: 13, borderRadius: '50%',
        border: '2px solid rgba(140,200,255,.2)',
        borderTopColor: '#8fd3ff',
        animation: 'spin 1.1s linear infinite',
        flexShrink: 0,
      }} />
      <span>
        {LOADING_BASE}
        <span ref={ref} style={{ letterSpacing: 0 }}>{DOT_VARIANTS[0]}</span>
      </span>
      <style>{'@keyframes spin{to{transform:rotate(360deg)}}'}</style>
    </div>
  );
}

// ── Header ───────────────────────────────────────────────────────────────────
function Header({ serverName }) {
  return (
    <div style={{ textAlign: 'center', marginBottom: 20 }}>
      <h1 style={{
        margin: 0,
        fontSize: 'clamp(30px, 5vw, 58px)',
        fontWeight: 700, letterSpacing: '.08em',
        background: 'linear-gradient(180deg, #ffffff 0%, #c8e0ff 55%, #7eb4f0 100%)',
        WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent',
        filter: 'drop-shadow(0 2px 18px rgba(60,140,240,.3))',
      }}>{serverName}</h1>
      <Loader />
    </div>
  );
}

// ── Tips carousel ────────────────────────────────────────────────────────────
// phase='in'  → tipIn  0.6s  (плавное появление)
// phase='out' → tipOut 0.3s  (быстрое исчезание)
// animationend меняет контент и запускает 'in' — без setTimeout
function TipText({ tip, phase, onDone }) {
  var ref = React.useRef(null);

  React.useEffect(function() {
    var el = ref.current;
    if (!el) return;
    el.style.animation = 'none';
    el.offsetHeight; // reflow — сбрасываем текущую анимацию
    el.style.animation = phase === 'out'
      ? 'tipOut 0.3s ease forwards'
      : 'tipIn 0.6s ease forwards';
  }, [phase, tip]);

  return (
    <div ref={ref} onAnimationEnd={onDone}>
      <style>{'@keyframes tipIn{from{opacity:0}to{opacity:1}}@keyframes tipOut{from{opacity:1}to{opacity:0}}'}</style>
      <div style={{ fontSize: 20, fontWeight: 600, color: '#e6f0ff', marginBottom: 10 }}>{tip.title}</div>
      <div style={{ fontSize: 14, color: 'rgba(200,220,255,.72)', lineHeight: 1.65 }}>{tip.text}</div>
    </div>
  );
}

function TipCard({ tips }) {
  var idxS  = React.useState(0);    var idx   = idxS[0];  var setIdx   = idxS[1];
  var phsS  = React.useState('in'); var phase = phsS[0];  var setPhase = phsS[1];
  var boxRef = React.useRef(null);
  var prevH  = React.useRef(null);

  React.useEffect(function() {
    if (!tips || tips.length < 2) return;
    var iv = setInterval(function() { setPhase('out'); }, 15000);
    return function() { clearInterval(iv); };
  }, []);

  function handleDone() {
    if (phase === 'out') {
      setIdx(function(i) { return (i + 1) % tips.length; });
      setPhase('in');
    }
  }

  React.useLayoutEffect(function() {
    var el = boxRef.current;
    if (!el) return;
    var oldH = prevH.current;
    el.style.transition = 'none';
    el.style.height = 'auto';
    var newH = el.scrollHeight;
    if (oldH !== null) {
      el.style.height = oldH + 'px';
      el.offsetHeight;
      el.style.transition = 'height 0.45s ease';
      el.style.height = newH + 'px';
    }
    prevH.current = newH;
  }, [idx]);

  if (!tips || tips.length === 0) return null;

  return (
    <div ref={boxRef} style={{
      width: '100%', maxWidth: 580,
      padding: '30px 34px',
      overflow: 'hidden',
      background: 'linear-gradient(180deg, rgba(14,32,72,.75) 0%, rgba(8,18,44,.80) 100%)',
      border: '1px solid rgba(140,200,255,.2)',
      borderRadius: 12,
      backdropFilter: 'blur(10px)',
      WebkitBackdropFilter: 'blur(10px)',
    }}>
      <div style={{
        fontSize: 10, letterSpacing: '.38em', textTransform: 'uppercase',
        color: '#8fd3ff', fontWeight: 600, marginBottom: 12,
      }}>совет</div>
      <TipText tip={tips[idx]} phase={phase} onDone={handleDone} />
      {tips.length > 1 && (
        <div style={{ display: 'flex', gap: 5, marginTop: 22, justifyContent: 'center' }}>
          {Array.from({ length: tips.length }).map(function(_, i) {
            return (
              <span key={i} style={{
                height: 5, borderRadius: 3,
                width: i === idx ? 18 : 5,
                display: 'inline-block',
                background: i === idx ? '#4ea3ff' : 'rgba(140,200,255,.28)',
                transition: 'width 0.4s ease, background 0.4s ease',
              }} />
            );
          })}
        </div>
      )}
    </div>
  );
}

// ── Contact pill ─────────────────────────────────────────────────────────────
function ContactPill({ icon, label, handle, href }) {
  var [hover, setHover] = React.useState(false);
  return (
    <a href={href} target="_blank" rel="noreferrer"
       onMouseEnter={function() { setHover(true); }}
       onMouseLeave={function() { setHover(false); }}
       style={{
         display: 'flex', alignItems: 'center', gap: 8,
         padding: '8px 14px',
         background: hover ? 'rgba(80,160,255,.14)' : 'rgba(80,160,255,.06)',
         border: '1px solid ' + (hover ? 'rgba(140,200,255,.42)' : 'rgba(140,200,255,.18)'),
         borderRadius: 8, color: 'var(--ink)', textDecoration: 'none',
         transition: 'background .18s, border-color .18s',
         whiteSpace: 'nowrap',
       }}>
      <span style={{ display: 'flex', alignItems: 'center' }}>{Ico[icon]}</span>
      <span style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.25 }}>
        <span style={{
          fontSize: 9, letterSpacing: '.28em', textTransform: 'uppercase',
          color: 'rgba(180,210,255,.5)', fontWeight: 600,
        }}>{label}</span>
        <span style={{ fontSize: 12, color: '#e6f0ff', fontWeight: 500 }}>{handle}</span>
      </span>
    </a>
  );
}

// ── Contacts row ─────────────────────────────────────────────────────────────
function ContactsRow({ contacts }) {
  return (
    <div style={{
      display: 'flex', gap: 10, justifyContent: 'center',
      flexWrap: 'wrap', padding: '20px 0 0',
    }}>
      <ContactPill icon="telegram" label="Telegram" handle={contacts.tg}      href={contacts.tgUrl} />
      <ContactPill icon="bot"      label="Bot"      handle={contacts.bot}     href={contacts.botUrl} />
      <ContactPill icon="discord"  label="Discord"  handle={contacts.discord} href={contacts.discordUrl} />
      <ContactPill icon="globe"    label="Сайт"     handle={contacts.site}    href={contacts.siteUrl} />
    </div>
  );
}

// ── Root layout ──────────────────────────────────────────────────────────────
function Card({ serverName, contacts, tips }) {
  return (
    <div style={{
      position: 'absolute', top: 0, right: 0, bottom: 0, left: 0,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '24px 32px',
      overflow: 'hidden',
    }}>
      <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        width: '100%', maxHeight: '100%', overflow: 'hidden',
        transform: 'scale(1.2)', transformOrigin: '50% 50%',
      }}>
        <Header serverName={serverName} />
        <TipCard tips={tips} />
        <ContactsRow contacts={contacts} />
      </div>
    </div>
  );
}

Object.assign(window, { Card });
