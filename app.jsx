const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "serverName": "BLs Games",
  "tagline": "Миниигры, рп, и многое другое!",
  "version": "v.2.4.7 · build 1840",
  "tg": "@BLsGoreBoxRp",
  "tgUrl": "https://t.me/BLsGoreBoxRp",
  "bot": "@BLsRP_Account_bot",
  "botUrl": "https://t.me/BLsRP_Account_bot",
  "discord": "discord.gg/???",
  "discordUrl": "https://discord.gg/???",
  "site": "blsrp.netlify.app",
  "siteUrl": "https://blsrp.netlify.app",
  "glow": 60,
  "particles": 120,
  "orbits": true,
  "musicUrl": "https://blastermaster1777-cloud.github.io/BLsGamesLoadingScreen/Passing Through.mp3"
}/*EDITMODE-END*/;

function App() {
  const t = TWEAK_DEFAULTS;

  React.useEffect(() => {
    if (!t.musicUrl) return;
    const audio = new Audio(t.musicUrl);
    audio.loop = true;
    audio.volume = 0.5;
    audio.play().catch(() => {});
    return () => audio.pause();
  }, []);

  const contacts = {
    tg: t.tg, tgUrl: t.tgUrl,
    bot: t.bot, botUrl: t.botUrl,
    discord: t.discord, discordUrl: t.discordUrl,
    site: t.site, siteUrl: t.siteUrl,
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <Background glow={t.glow / 100} particles={t.particles} orbits={t.orbits} />
      <Card serverName={t.serverName.toUpperCase()}
            tagline={t.tagline}
            contacts={contacts}
            version={t.version} />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
