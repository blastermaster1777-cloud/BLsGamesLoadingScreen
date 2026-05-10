const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "serverName": "BLs Games",
  "tg": "@BLsGoreBoxRp",
  "tgUrl": "https://t.me/BLsGoreBoxRp",
  "bot": "@BLsRP_Account_bot",
  "botUrl": "https://t.me/BLsRP_Account_bot",
  "discord": "discord.gg/???",
  "discordUrl": "https://discord.gg/???",
  "site": "blsrp.netlify.app",
  "siteUrl": "https://blsrp.netlify.app",
  "musicUrl": "https://blastermaster1777-cloud.github.io/BLsGamesLoadingScreen/Passing Through.mp3",
  "tips": [
  { "title": "Добро пожаловать!", "text": "BLs Games — сервер с разными видами режимов. Приятной игры!" },
  { "title": "Телеграм-канал", "text": "Следи за новостями, обновлениями и открытиями в телеграм канале @BLsGoreBoxRp ." },
  { "title": "Телеграм-бот", "text": "Жалобы, тикеты, звания и другие возможности ты можешь получить в нашем телеграм боте @BLsRP_Account_bot ." },
  { "title": "Правила сервера", "text": "Соблюдай правила и уважай других игроков — благодаря этому сервер будет комфортнее и лучше." },
  { "title": "Хочешь узнать больше?", "text": "Можешь посетить наш сайт blsrp.netlify.app ." },
  { "title": "Нам нужна помощь!", "text": "Если есть желание и возможность, можешь приобрести VIP. Благодаря этому мы сможем оплачивать сервера." },
  { "title": "Есть предложения?", "text": "Поделиться ими можно у нас в телеграм форуме и дискорд сервере!" },
  { "title": "Без паники!", "text": "У тебя есть какие-либо проблемы или вопросы? Ты всегда можешь обратиться к администратору на сервере вне зависимости от наличия профиля в боте." },
  { "title": "Интересный факт", "text": "Мы правда-правда не держим администраторов в рабстве." }
  ]
}/*EDITMODE-END*/;

function App() {
  var t = TWEAK_DEFAULTS;

  React.useEffect(function() {
    if (!t.musicUrl) return;
    var audio = new Audio(t.musicUrl);
    audio.loop = true;
    audio.volume = 0.1;
    audio.play().catch(function() {});
    return function() { audio.pause(); };
  }, []);

  var contacts = {
    tg: t.tg, tgUrl: t.tgUrl,
    bot: t.bot, botUrl: t.botUrl,
    discord: t.discord, discordUrl: t.discordUrl,
    site: t.site, siteUrl: t.siteUrl,
  };

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}>
      <Background />
      <Card serverName={t.serverName.toUpperCase()} contacts={contacts} tips={t.tips} />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
