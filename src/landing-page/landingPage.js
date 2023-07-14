const express = require('express');
const { google } = require('googleapis');
require('dotenv').config();

const app = express();
app.use(express.json());

async function getAuthSheets() {
  const auth = new google.auth.GoogleAuth({
    keyFile: 'credentials.json',
    scopes: 'https://www.googleapis.com/auth/spreadsheets',
  });

  const client = await auth.getClient();

  const googlesheets = google.sheets({
    version: 'v4',
    auth: 'client',
  });

  // const spreadsheetId = process.env.SPREADSHEET_ID;
  // não consegui descobrir pq não está reconhecendo a variável SPREADSHEET_ID no .env.
  const spreadsheetId = '1YXlwQSzwZFPZkkfQskyz_-8hI-LWrmmOjoeN0F4SctU';

  return { auth, client, googlesheets, spreadsheetId };
}

app.get('/getRows', async (_req, res) => {
  try {
    const { googlesheets, auth, spreadsheetId } = await getAuthSheets();

    const getRows = await googlesheets.spreadsheets.values.get({
      auth,
      spreadsheetId,
      range: 'Página1',
      valueRenderOption: 'UNFORMATTED_VALUE',
      dateTimeRenderOption: 'FORMATTED_STRING',
    });

    const values = getRows.data.values.map((row) => row[0]);
    const result = values.join(', ');

    res.send(result);
  } catch (error) {
    res.status(500).send('Error retrieving rows');
  }
});

app.post('/addRow', async (req, res) => {
  try {
    const { googlesheets, auth, spreadsheetId } = await getAuthSheets();

    const { value } = req.body;

    await googlesheets.spreadsheets.values.append({
      auth,
      spreadsheetId,
      range: 'Página1',
      valueInputOption: 'RAW',
      resource: {
        values: [value],
      },
    });

    res.send('E-mail adicionado com sucesso');
  } catch (error) {
    res.status(500).send('Error adding row');
  }
});

const PORT = process.env.PORT || 3001;

// eslint-disable-next-line prettier/prettier
app.listen(PORT, () => console.log(`Running on port ${ PORT }`));
