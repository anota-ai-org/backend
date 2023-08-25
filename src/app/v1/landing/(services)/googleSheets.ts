import { google } from "googleapis";

async function getAuthSheets() {
  const credentials = process.env.CREDENTIALS as string;
  
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: JSON.parse(credentials),
      scopes: 'https://www.googleapis.com/auth/spreadsheets',
    });
    
    const client = await auth.getClient();
  
    const googlesheets = google.sheets({
      version: 'v4',
      auth: 'client',
    });
  
    const spreadsheetId = process.env.SPREADSHEET_ID;
    
    return { auth, client, googlesheets, spreadsheetId };
  } catch (error) {
    return { error };
  }
}

type spreadsheetsData = Array<Array<string>>;
type entry = {
  name: string,
  email: string,
  message: string,
}

// função para formatar o retorno da API
function arrayToObjects(array: spreadsheetsData): Array<entry> {
  const entries: Array<entry> = [];

  array.forEach((line, index) => {
    const [name, email, message] = line;
    const newEntry = { name, email, message: message || "" };
    if (index > 0) {
      entries.push(newEntry);
    }
  });

  return entries;
}

export async function getRows() {
  try {
    const { googlesheets, auth, spreadsheetId } = await getAuthSheets();

    const rows = await googlesheets?.spreadsheets.values.get({
      auth,
      spreadsheetId,
      range: process.env.SPREADSHEET_TAB,
      valueRenderOption: 'UNFORMATTED_VALUE',
      dateTimeRenderOption: 'FORMATTED_STRING',
    });

    const data = arrayToObjects(rows?.data.values as spreadsheetsData);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function addRow(data: entry) {
  try {
    const { googlesheets, auth, spreadsheetId } = await getAuthSheets();

    const { name, email, message } = data;
    // @ts-ignore
    await googlesheets.spreadsheets.values.append({
      auth,
      spreadsheetId,
      range: process.env.SPREADSHEET_TAB,
      valueInputOption: 'USER_ENTERED',
      resource: {
        values: [[name, email, message]],
      },
    });

    return;
  } catch (error) {
    throw error;
  }
}
