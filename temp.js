import { getSpreadsheetData, writeSpreadsheetData } from './crawler.js';

const spreadsheetId = "1ORjtAykJySO0pzbmXO7LX9DAog5GqBZ_2NYh_89SRKA";
const sheetName = "post";
const columnName = "N";



const findStatusData = async (status) => {
  const statuses = await getArrayFromColumn(spreadsheetId, sheetName, columnName);
  const rowNumber = statuses.findIndex(val => val === status);
  if (rowNumber >= 0) {
    // Add 1 to row number because arrays are 0-indexed but row numbers start at 1
    return rowNumber + 1;
  }
  return null;
};

const sendToBase = async (phone, name, status) => {
  const rowNumber = await findStatusData(status);
  if (rowNumber) {
    const range = `${sheetName}!N${rowNumber}`;
    const data = [[`${phone} ${name}`]];
    await writeSpreadsheetData(spreadsheetId, range, data);
    console.log(`Data sended ${phone} , ${name}`);
  } else {
    console.log(`Status "${status}" not found in spreadsheet`);
  }
};
