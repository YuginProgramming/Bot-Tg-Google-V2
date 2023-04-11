import bot from "./app.js";
import { googleFindMessageId } from "./crawler.js"
const channelId = '-1001783798562';

// Працює хай живе
const deleteButton = async () => {
  try {
    //console.log(`Delete button clicked in channel ${channelId}`);
    // функція що знаходить messageID
    const messageId = 523;//await googleFindMessageId();
    await bot.deleteMessage(channelId, messageId);

  } catch (err) {
    console.error(err);
    // handle the error 
  }
};

// Працює хай живе
const changeMessage = async (messageId) => {
  try {
    // Додати інформацію про колонку, номер рядка передається в анкеті в аргумент
    //const messageId = 527;
    const newText = "Ділянка з цього повідомлення була продана";
    await bot.editMessageText(newText, {chat_id: channelId, message_id: messageId});

  } catch (err) {
    console.error(err);
    // handle the error 
  }
};

export{
  deleteButton,
  changeMessage
}