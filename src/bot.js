import { Bot } from "grammy";
import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY || "your_groq_api_key",
});
const bot = new Bot(
  process.env.TELEGRAM_BOT_TOKEN || "your_telegram_bot_token"
);

async function getGroqResponse(query) {
  try {
    const completion = await groq.chat.completions.create({
      messages: [{ role: "user", content: query }],
      model: "mixtral-8x7b-32768",
    });
    return completion.choices[0].message.content;
  } catch (e) {
    console.error(e);
  }
}
bot.on('message:text',async (ctx)=>{
    const res = await getGroqResponse(ctx.message.text);
    console.log('Message from:',ctx.from.username);
    console.log('Message:',ctx.message.text)
    ctx.reply(res);
})

bot.start();