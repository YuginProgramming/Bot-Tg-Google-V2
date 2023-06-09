import { getClient, getSheetsInstance } from "./google.js";

export const getSpreadsheetData = async (spreadsheetId, range) => {
    const client = await getClient();
    const sheets = getSheetsInstance(client);
    const response = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range,
    });
    return response.data;
};
