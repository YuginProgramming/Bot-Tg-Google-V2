import { getClient, getSheetsInstance } from "./google.js";
import { findStatusRaw } from "./getStatus.js";

const spreadsheetId = "1ORjtAykJySO0pzbmXO7LX9DAog5GqBZ_2NYh_89SRKA";

// const spreadsheetId = "1ORjtAykJySO0pzbmXO7LX9DAog5GqBZ_2NYh_89SRKA";
// const range = 'post!F5';
// const data = [['Viktor']];

export const writeSpreadsheetData = async (spreadsheetId, range, data) => {
  const client = await getClient();
  const sheets = getSheetsInstance(client);

  const request = {
    spreadsheetId,
    range,
    valueInputOption: "USER_ENTERED",
    resource: {
      values: data,
    },
  };

  const response = await sheets.spreadsheets.values.update(request);
  return response.data;
};

const sendToBase = async (phone, name, status) => {
  const rowNumber = await findStatusRaw('reserve');
  const sheetName = 'post';
  if (rowNumber) {
    const range = `${sheetName}!O${rowNumber}`;
    const data = [[`${phone} ${name}`]];
    await writeSpreadsheetData(spreadsheetId, range, data);
    //console.log(`Using range ${range} for cell with reserve status`);
    //console.log(`Data sended ${phone} , ${name}`);
  } else {
    console.log(`Status "${status}" not found in spreadsheet`);
  }
};

const sendToBaseStatusDone = async (phone, name, status) => {
  const rowNumber = await findStatusRaw('reserve');
  const sheetName = 'post';
  if (rowNumber) {
    const range = `${sheetName}!N${rowNumber}`;
    //const data = [[`${phone} ${name}`]];
    const data = [['done']];
    await writeSpreadsheetData(spreadsheetId, range, data);
    //console.log(`Using range ${range} for cell with reserve status`);
  } else {
    console.log(`Status "${status}" not found in spreadsheet`);
  }
};

const sendToBaseStatusReserve = async (phone, name, status) => {
  const rowNumber = await findStatusRaw('new');
  const sheetName = 'post';
  if (rowNumber) {
    const range = `${sheetName}!N${rowNumber}`;
    //const data = [[`${phone} ${name}`]];
    const data = [['reserve']];
    await writeSpreadsheetData(spreadsheetId, range, data);
    //console.log(`Using range ${range} for cell with reserve status`);
  } else {
    console.log(`Status "${status}" not found in spreadsheet`);
  }
};

export {
  sendToBase,
  sendToBaseStatusDone,
  sendToBaseStatusReserve
}

// writeSpreadsheetData(spreadsheetId, range, data);