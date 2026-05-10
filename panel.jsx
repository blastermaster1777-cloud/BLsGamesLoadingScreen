// panel.jsx — simple centered card with server name + contacts

const cardStyles = {
  wrap: {
    position: 'absolute', top: 0, right: 0, bottom: 0, left: 0,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    pointerEvents: 'none', padding: 24,
  },
  card: {
    pointerEvents: 'auto',
    width: 'min(560px, 92vw)',
    padding: '44px 48px 40px',
    background: 'linear-gradient(180deg, rgba(14,32,72,.78) 0%, rgba(8,18,44,.82) 100%)',
    border: '1px solid rgba(140,200,255,.22)',
    borderRadius: 14,
    backdropFilter: 'blur(14px) saturate(140%)',
    WebkitBackdropFilter: 'blur(14px) saturate(140%)',
    boxShadow: `0 1px 0 rgba(255,255,255,.06) inset,
                0 0 0 1px rgba(80,160,255,.06),
                0 30px 80px rgba(0,8,30,.5),
                0 0 120px rgba(40,100,220,.15)`,
    position: 'relative',
  },
  // corner accents on the card
  corner: (v, h) => ({
    position: 'absolute', [v]: -1, [h]: -1,
    width: 18, height: 18,
    [`border${v[0].toUpperCase()+v.slice(1)}`]: '2px solid #4ea3ff',
    [`border${h[0].toUpperCase()+h.slice(1)}`]: '2px solid #4ea3ff',
    borderRadius: v === 'top' && h === 'left' ? '4px 0 0 0'
                : v === 'top' && h === 'right' ? '0 4px 0 0'
                : v === 'bottom' && h === 'left' ? '0 0 0 4px'
                : '0 0 4px 0',
  }),

  brandRow: {
    display: 'flex', alignItems: 'center', gap: 14,
    justifyContent: 'center', marginBottom: 14,
  },
  brandLabel: {
    fontSize: 11, letterSpacing: '.42em', textTransform: 'uppercase',
    color: '#8fd3ff', fontWeight: 600,
  },
  brandLine: {
    width: 36, height: 1, background: 'linear-gradient(90deg, transparent, rgba(140,200,255,.6))',
  },
  brandLineR: {
    width: 36, height: 1, background: 'linear-gradient(90deg, rgba(140,200,255,.6), transparent)',
  },

  serverName: {
    fontSize: 'clamp(36px, 5vw, 60px)',
    fontWeight: 700, letterSpacing: '.06em', textAlign: 'center',
    lineHeight: 1, margin: 0,
    background: 'linear-gradient(180deg, #ffffff 0%, #c8e0ff 60%, #7eb4f0 100%)',
    WebkitBackgroundClip: 'text', backgroundClip: 'text',
    color: 'transparent',
    filter: 'drop-shadow(0 4px 24px rgba(60,140,240,.35))',
  },
  tagline: {
    fontSize: 13, letterSpacing: '.32em', textTransform: 'uppercase',
    color: 'rgba(230,240,255,.55)', textAlign: 'center',
    marginTop: 10,
  },

  loadingRow: {
    display: 'flex', alignItems: 'center', gap: 10,
    justifyContent: 'center', margin: '26px 0 30px',
    fontSize: 12, letterSpacing: '.32em', textTransform: 'uppercase',
    color: 'rgba(180,210,255,.7)', fontFamily: "'JetBrains Mono', monospace",
  },

  divider: {
    height: 1, margin: '0 0 22px',
    background: 'linear-gradient(90deg, transparent, rgba(140,200,255,.25), transparent)',
  },

  contactsLabel: {
    fontSize: 10, letterSpacing: '.42em', textTransform: 'uppercase',
    color: 'rgba(180,210,255,.5)', textAlign: 'center',
    marginBottom: 14,
  },

  contactsGrid: {
    display: 'grid', gridTemplateColumns: '1fr', gap: 8,
  },

  link: {
    display: 'flex', alignItems: 'center', gap: 12,
    padding: '12px 14px',
    background: 'rgba(80,160,255,.04)',
    border: '1px solid rgba(140,200,255,.16)',
    borderRadius: 8,
    color: 'var(--ink)',
    textDecoration: 'none',
    transition: 'background .18s, border-color .18s, transform .18s',
    cursor: 'pointer',
  },
  linkIcon: {
    width: 32, height: 32, borderRadius: 7, flexShrink: 0,
    display: 'grid', placeItems: 'center',
    background: 'linear-gradient(135deg, rgba(80,160,255,.18), rgba(40,100,220,.08))',
    border: '1px solid rgba(140,200,255,.2)',
  },
  linkText: { display: 'flex', flexDirection: 'column', minWidth: 0, lineHeight: 1.15 },
  linkLabel: {
    fontSize: 9, letterSpacing: '.3em', textTransform: 'uppercase',
    color: 'rgba(180,210,255,.55)', fontWeight: 600,
  },
  linkHandle: {
    fontSize: 14, color: '#e6f0ff', fontWeight: 500,
    marginTop: 2, overflowWrap: 'anywhere',
  },

  footer: {
    marginTop: 22, fontSize: 10, letterSpacing: '.34em',
    textTransform: 'uppercase', textAlign: 'center',
    color: 'rgba(180,210,255,.4)', fontFamily: "'JetBrains Mono', monospace",
  },
};

// ── icons ───────────────────────────────────────────────────────────────────
const Ico = {
  telegram: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M21.5 4.5 18.5 19c-.2 1-.8 1.2-1.6.8l-4.4-3.3-2.1 2c-.2.2-.4.4-.9.4l.3-4.4 8-7.2c.4-.3-.1-.5-.6-.2L7.4 13l-4.3-1.4c-.9-.3-.9-.9.2-1.4l16.7-6.4c.8-.3 1.5.2 1.5 1.7Z"
            fill="#8fd3ff"/>
    </svg>
  ),
  bot: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <rect x="4" y="7" width="16" height="12" rx="3" stroke="#8fd3ff" strokeWidth="1.6"/>
      <circle cx="9" cy="13" r="1.4" fill="#8fd3ff"/>
      <circle cx="15" cy="13" r="1.4" fill="#8fd3ff"/>
      <path d="M12 4v3M9 17h6" stroke="#8fd3ff" strokeWidth="1.6" strokeLinecap="round"/>
    </svg>
  ),
  discord: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M19.5 5.5A16 16 0 0 0 15.6 4l-.3.6a13 13 0 0 0-6.6 0L8.4 4a16 16 0 0 0-3.9 1.5C2.5 9.5 2 13.4 2.3 17.2A15.7 15.7 0 0 0 7 19.5l.6-1a10 10 0 0 1-1.6-.8l.4-.3a11.4 11.4 0 0 0 11.2 0l.4.3-1.6.8.6 1a15.7 15.7 0 0 0 4.7-2.3c.4-4.4-.4-8.3-2.2-11.7ZM9 15c-1 0-1.7-.9-1.7-2 0-1.1.7-2 1.7-2s1.7.9 1.7 2c0 1.1-.7 2-1.7 2Zm6 0c-1 0-1.7-.9-1.7-2 0-1.1.7-2 1.7-2s1.7.9 1.7 2c0 1.1-.7 2-1.7 2Z"
            fill="#8fd3ff"/>
    </svg>
  ),
  globe: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="8.2" stroke="#8fd3ff" strokeWidth="1.6"/>
      <path d="M3.8 12h16.4M12 3.8c2.5 2.6 3.8 5.5 3.8 8.2s-1.3 5.6-3.8 8.2c-2.5-2.6-3.8-5.5-3.8-8.2S9.5 6.4 12 3.8Z"
            stroke="#8fd3ff" strokeWidth="1.6"/>
    </svg>
  ),
};

// ── pulsing loader (replaces progress bar) ──────────────────────────────────
function Loader() {
  return (
    <div style={cardStyles.loadingRow}>
      <span style={{
        width: 14, height: 14, borderRadius: '50%',
        border: '2px solid rgba(140,200,255,.2)',
        borderTopColor: '#8fd3ff',
        animation: 'spin 1.1s linear infinite',
      }} />
      <span>Loading server</span>
      <span style={{ display: 'inline-block', width: '1.2em', textAlign: 'left' }}>
        <span style={{ animation: 'd1 1.4s steps(1) infinite' }}>.</span>
        <span style={{ animation: 'd2 1.4s steps(1) infinite' }}>.</span>
        <span style={{ animation: 'd3 1.4s steps(1) infinite' }}>.</span>
      </span>
      <style>{`
        @keyframes spin{to{transform:rotate(360deg)}}
        @keyframes d1{0%,75%{opacity:0}25%,100%{opacity:1}}
        @keyframes d2{0%,50%{opacity:0}50%,100%{opacity:1}}
        @keyframes d3{0%,75%{opacity:0}75%,100%{opacity:1}}
      `}</style>
    </div>
  );
}

// ── brand mark (small hex) ──────────────────────────────────────────────────
function BrandMark({ size = 36 }) {
  return (
    <svg viewBox="0 0 44 44" width={size} height={size}>
      <defs>
        <linearGradient id="bm-g2" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#8fd3ff" />
          <stop offset="100%" stopColor="#2575ff" />
        </linearGradient>
      </defs>
      <path d="M22 3 L39 13 L39 31 L22 41 L5 31 L5 13 Z"
            fill="none" stroke="url(#bm-g2)" strokeWidth="1.5" />
      <path d="M22 11 L31 16.5 L31 27.5 L22 33 L13 27.5 L13 16.5 Z"
            fill="rgba(80,160,255,.18)" stroke="rgba(140,200,255,.6)" strokeWidth="1" />
      <circle cx="22" cy="22" r="3" fill="#8fd3ff">
        <animate attributeName="r" values="3;4.5;3" dur="2s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}

// ── one contact link ────────────────────────────────────────────────────────
function ContactLink({ icon, label, handle, href }) {
  const [hover, setHover] = React.useState(false);
  return (
    <a href={href} target="_blank" rel="noreferrer"
       style={{
         ...cardStyles.link,
         background: hover ? 'rgba(80,160,255,.12)' : 'rgba(80,160,255,.04)',
         borderColor: hover ? 'rgba(140,200,255,.45)' : 'rgba(140,200,255,.16)',
         transform: hover ? 'translateY(-1px)' : 'none',
       }}
       onMouseEnter={() => setHover(true)}
       onMouseLeave={() => setHover(false)}>
      <span style={cardStyles.linkIcon}>{Ico[icon]}</span>
      <span style={cardStyles.linkText}>
        <span style={cardStyles.linkLabel}>{label}</span>
        <span style={cardStyles.linkHandle}>{handle}</span>
      </span>
    </a>
  );
}

// ── main card ───────────────────────────────────────────────────────────────
function Card({ serverName, tagline, contacts, version }) {
  return (
    <div style={cardStyles.wrap}>
      <div style={cardStyles.card}>
        <span style={cardStyles.corner('top', 'left')} />
        <span style={cardStyles.corner('top', 'right')} />
        <span style={cardStyles.corner('bottom', 'left')} />
        <span style={cardStyles.corner('bottom', 'right')} />

        <div style={cardStyles.brandRow}>
          <span style={cardStyles.brandLine} />
          <BrandMark />
          <span style={cardStyles.brandLineR} />
        </div>
        <h1 style={cardStyles.serverName}>{serverName}</h1>
        {tagline && <div style={cardStyles.tagline}>{tagline}</div>}

        <Loader />

        <div style={cardStyles.divider} />
        <div style={cardStyles.contactsLabel}>· Connect with us ·</div>
        <div style={cardStyles.contactsGrid}>
          <ContactLink icon="telegram" label="Telegram" handle={contacts.tg} href={contacts.tgUrl} />
          <ContactLink icon="bot" label="TG Bot" handle={contacts.bot} href={contacts.botUrl} />
          <ContactLink icon="discord" label="Discord" handle={contacts.discord} href={contacts.discordUrl} />
          <ContactLink icon="globe" label="Website" handle={contacts.site} href={contacts.siteUrl} />
        </div>

        <div style={cardStyles.footer}>{version}</div>
      </div>
    </div>
  );
}

Object.assign(window, { Card });
