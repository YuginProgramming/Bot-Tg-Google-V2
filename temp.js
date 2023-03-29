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
        .map((value, index) => value === "резерв" ? index + 1 : null)
        .filter(value => value !== null);
        
      // Get row data for each row number
      const rowPromises = rowNumbers.map(rowNumber => {
        const range = `${sheetName}!A${rowNumber}:I${rowNumber}`;
        return getSpreadsheetData(spreadsheetId, range);
      });
      
      const rowDataArray = await Promise.all(rowPromises);
      
      // Print row data to console
      rowDataArray.forEach(rowData => {
        if (rowData.values && rowData.values.length > 0) {
          console.log(rowData.values[0].join("\t"));
        }
      });
    };
getSpreadsheetRow(spreadsheetId, "post", "J");