const http = require('http');
http.createServer((req, res) => {
  res.write('Bot is running!');
  res.end();
}).listen(process.env.PORT || 3000);
const { Telegraf, Markup } = require('telegraf');

// Siz bergan ma'lumotlar
const bot = new Telegraf('8796533734:AAED8DpMjAA3XN08ZwkpHblxkhUrUDCWxJI');
const DAD_ID = '6711080505';

// Bot ishga tushganda menyu chiqishi
bot.start((ctx) => {
  ctx.reply(`Assalomu alaykum, ${ctx.from.first_name}! \nVeterinariya xizmati botiga xush kelibsiz.`, 
    Markup.keyboard([
      ['🏥 Xizmatlar', '📅 Qabulga yozilish'],
      ['📍 Manzil', '📞 Aloqa']
    ]).resize());
});

// Xizmatlar bo'limi
bot.hears('🏥 Xizmatlar', (ctx) => {
  ctx.reply('Bizning xizmatlar:\n✅ Uy hayvonlarini emlash\n✅ Kasalliklarni aniqlash va davolash\n✅ Konsultatsiya va jarrohlik');
});

// Manzil bo'limi
bot.hears('📍 Manzil', (ctx) => {
  ctx.reply('Bizning klinika manzili: [Shu yerga aniq manzilni yozing]\nMo\'ljal: [Mo\'ljalni yozing]');
});

// Aloqa bo'limi (Oddiy va xatosiz varianti)
bot.hears('📞 Aloqa', (ctx) => {
  ctx.reply('Doktor bilan bog\'lanish uchun raqam:\n\n📞 +998932068122\n\nUstiga bossangiz, qo\'ng\'iroq qilish imkoni chiqadi.');
});


// Qabulga yozilish bo'limi
bot.hears('📅 Qabulga yozilish', (ctx) => {
  ctx.reply('Iltimos, ismingiz va hayvoningiz haqida qisqacha yozing.  Vet Vrach  siz bilan bog\'lanadi.');
});

// Mijoz yozgan xabarni dadangizga yuborish
bot.on('text', (ctx) => {
  const text = ctx.message.text;
  const ignoreList = ['🏥 Xizmatlar', '📍 Manzil', '📅 Qabulga yozilish', '📞 Aloqa'];

  if (!ignoreList.includes(text)) {
    bot.telegram.sendMessage(DAD_ID, `Yangi murojaat! ✅\nKimdan: @${ctx.from.username || 'Noma\'lum'}\nIsmi: ${ctx.from.first_name}\nXabar: ${text}`);
    ctx.reply('Xabaringiz Vet Vrach ga  yuborildi. Tez orada javob beradilar! ✅');
  }
});

bot.launch();
console.log('Veterinar bot ishga tushdi! ✅');

