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

  const spreadsheetId = process.env.SPREADSHEET_ID;

  return { auth, client, googlesheets, spreadsheetId };
}

// função para formatar o retorno da API
function arrayToObjects(array) {
  const headers = array[0];
  const objectsArray = [];

  for (let i = 1; i < array.length; i++) {
    const object = {};
    for (let j = 0; j < headers.length; j++) {
      object[headers[j]] = array[i][j] || '';
    }
    objectsArray.push(object);
  }

  return objectsArray;
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

    const data = arrayToObjects(getRows.data.values);
    res.send(data);
  } catch (error) {
    res.status(500).send('Error retrieving rows');
  }
});

app.post('/addRow', async (req, res) => {
  try {
    const { googlesheets, auth, spreadsheetId } = await getAuthSheets();

    const { values } = req.body;

    await googlesheets.spreadsheets.values.append({
      auth,
      spreadsheetId,
      range: 'Página1',
      valueInputOption: 'USER_ENTERED',
      resource: {
        values,
      },
    });

    res.send('Dados adicionados com sucesso');
  } catch (error) {
    res.status(500).send('Error adding row');
  }
});

const PORT = process.env.PORT || 3001;

// eslint-disable-next-line prettier/prettier
app.listen(PORT, () => console.log(`Running on port ${ PORT }`));
