const { Telegraf, Markup } = require('telegraf');
const http = require('http');

// 1. ASOSIY SOZLAMALAR
const TOKEN = '8796533734:AAGNrtzWX_UiNDV0JvrMjh_WST-bHNqv_Uc';
const URL = 'https://veterinariya-bot.onrender.com';
const PORT = process.env.PORT || 3000;

const bot = new Telegraf(TOKEN);

// 2. WEBHOOKNI SOZLASH (Render uchun eng barqaror usul)
bot.telegram.setWebhook(`${URL}/bot${TOKEN}`);

// 3. BOT BUYRUQLARI
bot.start((ctx) => {
  ctx.reply(`Assalomu alaykum, ${ctx.from.first_name}! 🐾\nVeterinariya xizmati botiga xush kelibsiz!`, 
    Markup.keyboard([
      ['🏥 Xizmatlar', '📅 Qabulga yozilish'],
      ['📍 Manzil', '📞 Aloqa']
    ]).resize()
  );
});

bot.hears('🏥 Xizmatlar', (ctx) => {
  ctx.reply('Bizning xizmatlar:\n✅ Uy hayvonlarini davolash\n✅ Vaksina emlash\n✅ Konsultatsiya');
});

bot.hears('📍 Manzil', (ctx) => {
  ctx.reply('📍 Manzilimiz: Amudaryo tumani, Mang‘it shahri.');
});

bot.hears('📞 Aloqa', (ctx) => {
  ctx.reply('📞 Doktor bilan bog‘lanish: +998932068122\nSavollaringiz bo‘lsa, bemalol murojaat qiling!');
});

bot.hears('📅 Qabulga yozilish', (ctx) => {
  ctx.reply('📅 Qabulga yozilish uchun ismingiz va hayvoningiz turini yozib qoldiring. Tez orada siz bilan bog‘lanamiz.');
});

// 4. YAGONA SERVER (Port to‘qnashuvini oldini oladi)
const server = http.createServer((req, res) => {
  if (req.url === `/bot${TOKEN}`) {
    // Telegramdan kelgan xabarlarni qayta ishlash
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        bot.handleUpdate(JSON.parse(body), res);
      } catch (e) {
        console.error("Xato:", e);
        res.end();
      }
    });
  } else {
    // Cron-job yoki brauzer uchun "uyg'otuvchi" javob
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Bot is live and running! ✅');
  }
});

// 5. ISHGA TUSHIRISH
server.listen(PORT, () => {
  console.log(`Server ${PORT}-portda muvaffaqiyatli ishga tushdi! ✅`);
});
