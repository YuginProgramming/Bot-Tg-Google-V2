import bot from "./app.js";
import { googleFindMessageId } from "./crawler.js"
const channelId = '-1001783798562';

// delete button by /delete
const deleteButton = async () => {
  try {
    console.log(`Delete button clicked in channel ${channelId}`);

    // delete the message
    // функція що знаходить messageID
    const messageId = await googleFindMessageId();
    await bot.deleteMessage(channelId, messageId);

  } catch (err) {
    //console.error(err);
    // handle the error gracefully
  }
};


export{
  deleteButton
}