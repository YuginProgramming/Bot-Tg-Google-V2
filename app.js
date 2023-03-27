import TelegramBot from 'node-telegram-bot-api';
//const token = '5644097179:AAEQ0mcz6v36Y7FmCTiMm8E-_OI-Degc_dQ'; // YourProduct: t.me/Yourproduct_bot
import dotenv from 'dotenv';
dotenv.config();
const token = process.env.TOKEN;
const bot = new TelegramBot(token, { polling: true });

const chatIds = ['-1001938112685', '-785368621', '-1001783798562']; // id двох тестових + третій тестовий канал

import { getSpreadsheetData } from "./filedata.js";
const spreadsheetId = "1MXhyHvDEkDBSwiPLP-ZeZSppNKY0rPpwM5o_ZPGaRpY";
const range = "post";

const scheduleMessages = async () => {
    const data = await getSpreadsheetData(spreadsheetId, range);
    //console.log(data);
  
    // Schedule messages
    const schedule = [
      { hour: 9, minute: 24, text: data },
      { hour: 9, minute: 25, text: data },
    ];
  
    schedule.forEach(({ hour, minute, text }) => {
        const job = setInterval(() => {
          const now = new Date();
          if (now.getHours() === hour && now.getMinutes() === minute && now.getDay() !== 7) {
            chatIds.forEach((chatId) => {
              const messageText = text.values.map((row) => row.join(' ')).join('\n');
              bot.sendMessage(chatId, messageText);
            });
          }
        }, 40000); // Check every minute
    });
  };
  scheduleMessages();
//BUTTON
bot.on('message', (msg) => {
  const chatId = msg.chat.id;
    
  // Send a message with a button
  if (msg.text === '/start') {
    bot.sendMessage(chatId, 'Click the button to get a reply', {
      reply_markup: {
        inline_keyboard: [
          [{ text: 'Click me!', url: 'https://t.me/PERIZHOK_test_bot',  }]
        ]
      }
    });
  }
});