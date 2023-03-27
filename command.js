
const chatIds = ['-1001938112685', '-857212783']; // Replace with your desired chat IDs

bot.on('message', (msg) => {
  const chatId = msg.chat.id;

  // Check if the message is posted in one of the specified group chats
  if (chatIds.includes(chatId.toString())) {
    // Check if the message length is greater than 48 characters
    if (msg.text && msg.text.length > 48) {
      // Get the name of the user who posted the message
      const userName = msg.from.first_name || msg.from.username;
      // Construct the message to send to the group chat
      const message = `New message from ${userName}:\n${msg.text}`;
      // Send the message to the chat where the message was posted
      bot.sendMessage(chatId, message);
    }
  }
});

