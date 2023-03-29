import bot from "./app.js";
import { getClient, getSheetsInstance } from "./google.js";
import { google } from "googleapis";
import { getSpreadsheetData } from "./filedata.js";


const getArrayFromColumn = async (spreadsheetId, sheetName, columnName) => {
    const range = `${sheetName}!${columnName}:${columnName}`;
    const data = await getSpreadsheetData(spreadsheetId, range);
    if (data.values && data.values.length > 0) {
      return data.values.map(row => row[0]);
    }
    return [];
};
const getSpreadsheetRow = async (spreadsheetId, sheetName, triggerColumn) => {
  // Get array of trigger values in column
  const triggerArray = await getArrayFromColumn(spreadsheetId, sheetName, triggerColumn);
        
  // Find row numbers where trigger value is резерв
  const rowNumbers = triggerArray
    .map((value, index) => value === "reserve" ? index + 1 : null)
    .filter(value => value !== null);    
    if (rowNumbers.length > 0) {
      console.log('sold');
      //bot.sendMessage(chatId, 'Sold!');
    }
  };

//getSpreadsheetRow(spreadsheetId, "post", "J");

export {
  getSpreadsheetRow,
}