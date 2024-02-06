# D4CR Keystone Server Installation Guide

1. Konfigurera miljövariabler
   Skapa en .env-fil i /backend med nedanstående variabler och ange dina egna värden.

```
NODE_ENV=development
PORT=3000
MAX_FILE_SIZE = 10
ASSET_BASE_URL = 'http://localhost:3000'
BASE_URL = 'http://localhost:3000'
API_URL = 'http://localhost:3000/api/graphql'

# Session
SESSION_SECRET="myultrasecretstringmyultrasecretstring"
SESSION_MAX_AGE=2592000

# Database
DATABASE_URL="mysql://username:password@127.0.0.1:3306/db_name"

# Media
MEDIA_URL="http://localhost:3000/public/media"
IMAGE_URL="http://localhost:3000/public/images"
```

2. Skapa en mysql databas lokalt
   Följ dessa steg för att skapa en MySQL-databas lokalt:
   Installera MySQL på din dator om du inte redan har det.
   Använd MySQL-kommandotolken eller ett grafiskt verktyg som MySQL Workbench för att skapa en ny databas. Ange användarnamn, lösenord och andra nödvändiga inställningar enligt din .env-fil.

3. Start Keystone Js
   Använd följande kommando för att installera och starta din Keystone JS-server:

```
cd /backend
npm install
npm run dev

```
