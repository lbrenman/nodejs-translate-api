# Translate API

Translate API built in NodeJS/Express using AWS Translate

Uses API Key Authentication

Add a .env file to your NodeJS project to contain your API Key and Finnhub.io API Key

```
AWS_ACCESS_KEY_ID={{YOUR AWS CLIENT}}
AWS_SECRET_ACCESS_KEY={{YOUR AWS SECRET}}
AWS_REGION={{YOUR DESIRED AWS REGION}}
USER_API_KEY={{API KEY FOR CLIENT API CALLS}}
```

## Get Languages

```bash
curl --location '{{BASEURL}}/getlanguages' \
--header 'x-api-key: {{API KEY}}
```

with response:

```json
[
    {
        "LanguageCode": "af",
        "LanguageName": "Afrikaans"
    },
    {
        "LanguageCode": "sq",
        "LanguageName": "Albanian"
    },
    .
    .
    .
    {
        "LanguageCode": "cy",
        "LanguageName": "Welsh"
    }
]
```

## Translate Text

```bash
curl --location '{{BASEURL}}/translate?Text=Goodbye&SourceLanguageCode=auto&TargetLanguageCode=ja' \
--header 'x-api-key: {{API KEY}}
```

with response:

```json
{
    "SourceLanguageCode": "en",
    "TargetLanguageCode": "ja",
    "TranslatedText": "さようなら"
}
```
