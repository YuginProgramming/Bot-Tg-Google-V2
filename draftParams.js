// When a user clicks on a link to your bot that contains parameters, those parameters will be passed to your bot as part of the message that the user sends. Your bot can then use the Telegram Bot API to extract the parameters from the message and take appropriate action based on their values.

// To identify the user who clicked the link, your bot can use the message.from.id property, which contains the unique ID of the user who sent the message. You can also use other properties of the message.from object, such as first_name and last_name, to get more information about the user.

// Here's an example of how you can extract parameters from a message sent to your bot and identify the user who sent it:

const TelegramBot = require('node-telegram-bot-api');
const token = 'your_token_here';
const bot = new TelegramBot(token, {polling: true});

bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;
  const text = msg.text;

  if (text.startsWith('/start')) {
    // extract parameters from message text
    const params = text.split('?')[1].split('&');
    const param1 = params[0].split('=')[1];
    const param2 = params[1].split('=')[1];

    // do something with the parameters and user ID
    console.log(`User ${userId} clicked link with parameters: param1=${param1}, param2=${param2}`);
  }
});
