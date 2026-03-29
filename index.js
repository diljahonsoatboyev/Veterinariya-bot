const { Telegraf, Markup } = require('telegraf');
const http = require('http');

// Render uchun server
http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.write('Bot is live!');
  res.end();
}).listen(process.env.PORT || 3000, "0.0.0.0");

// BOT TOKENINI SHU YERGA QO'YING (BotFather'dan olingan)
const bot = new Telegraf('8796533734:AAGNrtzWX_UiNDV0JvrMjh_WST-bHNqv_Uc');

bot.start((ctx) => {
  ctx.reply(`Assalomu alaykum, ${ctx.from.first_name}!`, 
    Markup.keyboard([
      ['🏥 Xizmatlar', '📅 Qabulga yozilish'],
      ['📍 Manzil', '📞 Aloqa']
    ]).resize()
  );
});

bot.hears('📍 Manzil', (ctx) => {
  ctx.reply('Manzilimiz: Amudaryo tumani, Mang‘it shahri.');
});

// Botni ishga tushirish
// Eski bot.launch() ni o'chirib, o'rniga buni qo'ying:
bot.launch({
  webhook: {
    domain: 'https://veterinariya-bot.onrender.com', // O'zingizni URL manzilingiz
    port: process.env.PORT || 3000
  }
}).then(() => {
  console.log('Bot Webhook orqali ishga tushdi! ✅');
});

// Xatolikni ushlash uchun
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));

