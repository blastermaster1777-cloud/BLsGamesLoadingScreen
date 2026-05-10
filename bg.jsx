// bg.jsx — static background only (no canvas, no JS animations)

function Background() {
  return (
    <div style={{
      position: 'absolute', top: 0, right: 0, bottom: 0, left: 0,
      background: 'radial-gradient(ellipse at 50% 30%, #0e2050 0%, #060d22 50%, #03060f 100%)',
      pointerEvents: 'none',
    }}>
      <div style={{
        position: 'absolute', top: 0, right: 0, bottom: 0, left: 0,
        backgroundImage: 'repeating-linear-gradient(to bottom, rgba(120,180,255,.015) 0 1px, transparent 1px 4px)',
      }} />
    </div>
  );
}

window.Background = Background;
