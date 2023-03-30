
//=======================
const channelId = '-1001783798562';
    const lastMessageId = /* Set this to the ID of the previous message */;
    const opts = {
      chat_id: channelId,
      message_id: lastMessageId,
      reply_markup: {}
    };
    await bot.editMessageReplyMarkup(opts);

//=======================

import bot from "./app.js";

const channel = '-1001783798562';

// the command to send the button
// the command to send the button
bot.onText(/\/sendbutton/, (msg) => {
  const opts = {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: 'Button Text',
            //url: 'https://example.com',
            callback_data: 'button_clicked' // add callback_data to the button
          }
        ]
      ]
    }
  };
  bot.sendMessage(channel, 'Click the button below:', opts);
});

// handle callback queries
bot.on('callback_query', async (query) => {
  try {
    const userId = query.from.id;
    const messageId = query.message.message_id;
    const data = query.data;

    // check if the button was clicked
    if (data === 'button_clicked') {
      console.log(`Button clicked in channel ${channel} by user ${userId}`);

      // open the URL
      await bot.answerCallbackQuery(query.id, {url: '@api_gog_bot'});

      const opts = {
        chat_id: channel,
        message_id: messageId
      };

      // remove the button
      await bot.editMessageReplyMarkup({}, opts);
    }
  } catch (err) {
    console.error(err);
    // handle the error gracefully
  }
});

