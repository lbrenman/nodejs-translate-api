const express = require('express');
const { TranslateClient, TranslateTextCommand, ListLanguagesCommand } = require("@aws-sdk/client-translate");
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();
const port = 3000;

// Initialize AWS Translate client
const translateClient = new TranslateClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  }
});

// Middleware to check for API key
const apiKeyMiddleware = (req, res, next) => {
  const userApiKey = req.headers['x-api-key'];
  const validApiKey = process.env.USER_API_KEY;

  if (!userApiKey || userApiKey !== validApiKey) {
    return res.status(403).json({ error: 'Forbidden: Invalid API Key' });
  }
  next();
};

app.use(apiKeyMiddleware);

// Endpoint to get list of supported languages
app.get('/getlanguages', async (req, res) => {
  try {
    const command = new ListLanguagesCommand({});
    const data = await translateClient.send(command);
    const languages = data.Languages || [];
    res.json(languages);
  } catch (error) {
    console.error('Error fetching languages:', error);
    res.status(500).json({ error: 'Internal Server Error: Error fetching languages' });
  }
});

// Endpoint to translate text
app.get('/translate', async (req, res) => {
  const { Text, SourceLanguageCode, TargetLanguageCode } = req.query;

  if (!Text || !SourceLanguageCode || !TargetLanguageCode) {
    return res.status(400).json({ error: 'Bad Request: Missing query parameters' });
  }

  const params = { Text, SourceLanguageCode, TargetLanguageCode };

  try {
    const command = new TranslateTextCommand(params);
    const data = await translateClient.send(command);
    // res.json({ TranslatedText: data.TranslatedText });
    res.json({
        SourceLanguageCode: data.SourceLanguageCode,
        TargetLanguageCode: data.TargetLanguageCode,
        TranslatedText: data.TranslatedText
     });
  } catch (error) {
    console.error('Error translating text:', error);
    res.status(500).json({ error: 'Internal Server Error: Error translating text' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
