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