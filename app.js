import TelegramBot from 'node-telegram-bot-api';
import dotenv from 'dotenv';
dotenv.config();
const token = process.env.TOKEN;

const bot = new TelegramBot(token, { polling: true });
export default bot;

const chatIdTest = '-1001938112685';

import { deleteButton } from './button.js';
const chatId = '-1001783798562';
// const messageId = '378';
// deleteButton(chatId, messageId);


import { anketa, anketaListiner } from './anketa.js';
anketa();
anketaListiner();

import { findStatusRaw, findStatusRawCell } from './getStatus.js'
// findStatusRaw('reserve');
// findStatusRawCell('reserve');

import { crawler, crawlerRaw } from './crawler.js'
import { sendToBaseMessageId } from './writegoog.js'


//const chatIds = ['-1001938112685', '-785368621', '-1001783798562']; // id двох тестових + третій тестовий канал + 4ий це нова група supergrop,'-100944130193',

import { getSpreadsheetData } from "./filedata.js";
const spreadsheetId = "1ORjtAykJySO0pzbmXO7LX9DAog5GqBZ_2NYh_89SRKA";
const range = "post";

// const scheduleMessages = async () => {
//     const data = await getSpreadsheetData(spreadsheetId, range);
// };
    //console.log(data);
  
// ЭТО РАБОЧИЙ КОД ОТПРАВКИ ЦИФРЫ В ТЕЛЕГРАМ И ОТПРАВКИ СТРОКИ В ГРУППУ


bot.on('message', async (message) => {
  try {
    if (message.text === 'check reserve') {
      crawlerRaw(spreadsheetId, "post", "J");
    } else {
    // Check if message contains a valid number
    const rowNumber = parseInt(message.text);
    if (isNaN(rowNumber)) {
      throw new Error('Invalid row number');
    }
     // Call getRowData function with rowNumber
     await getRowData(spreadsheetId, 'post', rowNumber);
    }
  } catch (error) {
    if (error.message === 'Invalid row number') {
      await bot.sendMessage(chatIdTest, 'Sorry, please enter a valid row number');
    } else {
      //console.error(error);
      await bot.sendMessage(chatIdTest, 'Sorry, there was an error processing your request');
    }
  }
});

const sendRowToTelegram = async (rowData) => {
  try {
    const message = rowData.map((cellValues) => {
      return cellValues.join(' | '); // replace '|' with the symbol you want to use
    }).join('\n');
    await bot.sendMessage(chatId, message);
  } catch (error) {
    console.error(error);
    await bot.sendMessage(chatId, 'Sorry, there was an error sending the message');
  }
};


const getRowData = async (spreadsheetId, sheetName, rowNumber) => {
  const range = `${sheetName}!A${rowNumber}:I${rowNumber}`;
  const data = await getSpreadsheetData(spreadsheetId, range);
  if (data.values && data.values.length > 0) {
    await sendRowToTelegram(data.values);
  }
};

bot.on('message', (msg) => {
  // Check if the message contains a number
  if (/\d+/.test(msg.text)) {
    // Define the button
    const button = {
      text: 'Тут',
      url: 'https://t.me/api_gog_bot'
    };

    // Define the keyboard markup with the button
    const keyboard = {
      inline_keyboard: [[button]]
    };

    // Wait for 5 seconds before sending the message with the button to the channel
    setTimeout(() => {
      bot.sendMessage(chatId, 'Зробити замовлення через наш чат-бот:', { reply_markup: keyboard })
      .then(sentMessage => {
        sendToBaseMessageId(sentMessage.message_id);
      })
      .catch(error => {
        console.error(`Error sending message: ${error}`);
      });
    }, 5000);
  }
});