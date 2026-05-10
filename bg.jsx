// bg.jsx — animated background layers

const bgStyles = {
  wrap: {
    position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, overflow: 'hidden',
    background: 'radial-gradient(ellipse at 50% 35%, #0e2050 0%, #060d22 45%, #03060f 100%)',
  },
  vignette: {
    position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, pointerEvents: 'none',
    background: 'radial-gradient(ellipse at 50% 50%, transparent 40%, rgba(0,0,0,.6) 100%)',
  },
  scan: {
    position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, pointerEvents: 'none',
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
        drift: Math.round((r(5) - 0.5) * 80),
        opacity: (0.25 + r(6) * 0.6) * intensity,
      };
    });
  }, [count, intensity]);

  // Генерируем отдельный @keyframes для каждой частицы,
  // чтобы не использовать var() в анимациях (не работает в GMod)
  const keyframes = dots.map((d, i) => `
    @keyframes float_${i}{
      0%{transform:translate(0,0);opacity:0}
      10%{opacity:1}
      90%{opacity:1}
      100%{transform:translate(${d.drift}px,-110vh);opacity:0}
    }
  `).join('');

  return (
    <div style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      {dots.map((d, i) => (
        <span key={i} style={{
          position: 'absolute',
          left: d.x + '%',
          bottom: '-10px',
          width: d.size,
          height: d.size,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(180,220,255,' + d.opacity + ') 0%, rgba(80,160,255,0) 70%)',
          boxShadow: '0 0 ' + (d.size*3) + 'px rgba(120,200,255,' + (d.opacity*0.8) + ')',
          animation: 'float_' + i + ' ' + d.dur + 's linear ' + d.delay + 's infinite',
        }} />
      ))}
      <style>{keyframes}</style>
    </div>
  );
}

function Orbits() {
  const sizes = ['100%', '84%', '68%'];
  const offsets = ['0%', '8%', '16%'];
  return (
    <div style={{
      position: 'absolute', left: '50%', top: '50%',
      transform: 'translate(-50%,-50%)',
      width: '95vmin', height: '95vmin',
      pointerEvents: 'none', opacity: .5,
    }}>
      {[0,1,2].map((i) => (
        <div key={i} style={{
          position: 'absolute',
          top: offsets[i], right: offsets[i], bottom: offsets[i], left: offsets[i],
          border: '1px solid rgba(120,180,255,.12)',
          borderRadius: '50%',
          animation: 'spin ' + (60 + i*30) + 's linear infinite ' + (i%2 ? 'reverse' : ''),
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
    <div>
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
    </div>
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
