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

function Particles({ count = 40, intensity = 1 }) {
  const ref = React.useRef(null);

  React.useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;

    // Частицы рассыпаны по всему экрану сразу — нет эффекта "всё снизу"
    const seed = (i, n) => (((i * 9301 + 49297) % 233280) * (n + 1)) % 1000 / 1000;
    const pts = Array.from({ length: count }, (_, i) => ({
      x:     seed(i, 1) * canvas.width,
      y:     seed(i, 7) * canvas.height,
      size:  0.8 + seed(i, 2) * 2.2,
      speed: 0.3 + seed(i, 3) * 0.5,
      drift: (seed(i, 5) - 0.5) * 0.35,
      alpha: (0.3 + seed(i, 6) * 0.5) * intensity,
    }));

    let rafId;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of pts) {
        p.y -= p.speed;
        p.x += p.drift;
        if (p.y < -10) {
          p.y = canvas.height + 10;
          p.x = Math.random() * canvas.width;
        }
        // плавное появление/исчезновение у краёв
        const frac = p.y / canvas.height;
        const fade = frac < 0.08 ? frac / 0.08 : frac > 0.92 ? (1 - frac) / 0.08 : 1;
        ctx.globalAlpha = p.alpha * fade;
        ctx.fillStyle = '#a8d4ff';
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, 6.2832);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      rafId = requestAnimationFrame(draw);
    };
    draw();

    return () => cancelAnimationFrame(rafId);
  }, [count, intensity]);

  return (
    <canvas ref={ref} style={{
      position: 'absolute', top: 0, left: 0,
      width: '100%', height: '100%',
      pointerEvents: 'none',
    }} />
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
