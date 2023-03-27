import TelegramBot from 'node-telegram-bot-api';
import dotenv from 'dotenv';
dotenv.config();
const token = process.env.TOKEN;
const bot = new TelegramBot(token, { polling: true });
export default bot;

import { anketa, anketaListiner } from './anketa.js';
anketa();
anketaListiner();

const chatIds = ['-1001938112685', '-785368621', '-1001783798562']; // id двох тестових + третій тестовий канал + 4ий це нова група supergrop,'-100944130193',

import { getSpreadsheetData } from "./filedata.js";
const spreadsheetId = "1ORjtAykJySO0pzbmXO7LX9DAog5GqBZ_2NYh_89SRKA";
const range = "post";

const scheduleMessages = async () => {
    const data = await getSpreadsheetData(spreadsheetId, range);
    //console.log(data);
  
    // Schedule messages
    const schedule = [
      { hour: 16, minute: 30, text: data },
      { hour: 16, minute: 31, text: data },
      
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