import { getClient, getSheetsInstance } from "./google.js";

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

// writeSpreadsheetData(spreadsheetId, range, data);