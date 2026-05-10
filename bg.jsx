// bg.jsx — animated background layers

const bgStyles = {
  wrap: {
    position: 'absolute', inset: 0, overflow: 'hidden',
    background: 'radial-gradient(ellipse at 50% 35%, #0e2050 0%, #060d22 45%, #03060f 100%)',
  },
  vignette: {
    position: 'absolute', inset: 0, pointerEvents: 'none',
    background: 'radial-gradient(ellipse at 50% 50%, transparent 40%, rgba(0,0,0,.6) 100%)',
  },
  scan: {
    position: 'absolute', inset: 0, pointerEvents: 'none',
    backgroundImage: 'repeating-linear-gradient(to bottom, rgba(120,180,255,.025) 0 1px, transparent 1px 3px)',
    mixBlendMode: 'overlay',
  },
};

function Particles({ count = 60, intensity = 1 }) {
  const dots = React.useMemo(() => {
    return Array.from({ length: count }).map((_, i) => {
      const seed = (i * 9301 + 49297) % 233280;
      const r = (n) => ((seed * (n+1)) % 1000) / 1000;
      return {
        x: r(1) * 100,
        size: 1 + r(2) * 3,
        dur: 14 + r(3) * 22,
        delay: -r(4) * 30,
        drift: (r(5) - 0.5) * 80,
        opacity: (0.25 + r(6) * 0.6) * intensity,
      };
    });
  }, [count, intensity]);
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      {dots.map((d, i) => (
        <span key={i} style={{
          position: 'absolute',
          left: `${d.x}%`,
          bottom: '-10px',
          width: d.size,
          height: d.size,
          borderRadius: '50%',
          background: `radial-gradient(circle, rgba(180,220,255,${d.opacity}) 0%, rgba(80,160,255,0) 70%)`,
          boxShadow: `0 0 ${d.size*3}px rgba(120,200,255,${d.opacity*0.8})`,
          animation: `float ${d.dur}s linear ${d.delay}s infinite`,
          '--drift': `${d.drift}px`,
        }} />
      ))}
      <style>{`
        @keyframes float{
          0%{transform:translate(0,0);opacity:0}
          10%{opacity:1}
          90%{opacity:1}
          100%{transform:translate(var(--drift), -110vh);opacity:0}
        }
      `}</style>
    </div>
  );
}

function Orbits() {
  return (
    <div style={{
      position: 'absolute', left: '50%', top: '50%',
      transform: 'translate(-50%,-50%)',
      width: 'min(95vmin, 1100px)', height: 'min(95vmin, 1100px)',
      pointerEvents: 'none', opacity: .5,
    }}>
      {[0,1,2].map((i) => (
        <div key={i} style={{
          position: 'absolute', inset: `${i*8}%`,
          border: '1px solid rgba(120,180,255,.12)',
          borderRadius: '50%',
          animation: `spin ${60 + i*30}s linear infinite ${i%2 ? 'reverse' : ''}`,
        }}>
          <span style={{
            position: 'absolute', top: '-3px', left: '50%',
            width: 6, height: 6, borderRadius: '50%',
            background: '#8fd3ff',
            boxShadow: '0 0 12px #4ea3ff, 0 0 24px #2575ff',
            transform: 'translateX(-50%)',
          }} />
        </div>
      ))}
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  );
}

function EdgeGlow() {
  return (
    <>
      <div style={{
        position: 'absolute', left: 0, right: 0, top: 0, height: '30vh',
        background: 'linear-gradient(to bottom, rgba(40,100,220,.18), transparent)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', left: 0, right: 0, bottom: 0, height: '30vh',
        background: 'linear-gradient(to top, rgba(20,60,160,.22), transparent)',
        pointerEvents: 'none',
      }} />
    </>
  );
}

function Background({ glow = 0.7, particles = 60, orbits = true }) {
  return (
    <div style={bgStyles.wrap}>
      <EdgeGlow />
      <Orbits />
      {particles > 0 && <Particles count={particles} intensity={glow} />}
      <div style={bgStyles.scan} />
      <div style={bgStyles.vignette} />
    </div>
  );
}

window.Background = Background;
