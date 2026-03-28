const { Telegraf, Markup } = require('telegraf');
const http = require('http');

// 1. Render uchun uyg'otuvchi server (FAQAT BITTA BO'LSIN)
http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.write('Bot is live!');
  res.end();
}).listen(process.env.PORT || 3000, "0.0.0.0");

// 2. Botni sozlash
const bot = new Telegraf('8796533734:AAED8DpMjaA3XNO8ZvkpHblxhHUrUDCWxJI');
const DAD_ID = '6711080505';

// 3. Bot buyruqlari
bot.start((ctx) => {
  ctx.reply(`Assalomu alaykum, ${ctx.from.first_name}!`, 
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
  ctx.reply('Manzilimiz: Amudaryo tumani, Mang‘it shahri.');
});

bot.hears('📞 Aloqa', (ctx) => {
  ctx.reply('Doktor bilan bog‘lanish uchun raqam: +998932068122');
});

bot.hears('📅 Qabulga yozilish', (ctx) => {
  ctx.reply('Iltimos, ismingiz va hayvoningiz haqida ma’lumot qoldiring, doktor siz bilan bog‘lanadi.');
});

// 4. Botni ishga tushirish
bot.launch();
console.log('Veterinar bot ishga tushdi! ✅');
