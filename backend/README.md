# D4CR Keystone Server Installation Guide

1. Konfigurera miljövariabler
   Skapa en .env-fil i /backend med nedanstående variabler och ange dina egna värden.
   Om annan port än 3000 ska användas så ändra PORT till önskad port SAMT i utils/constants.js

```
NODE_ENV=development
PORT=3000

MAX_FILE_SIZE = 10
BASE_URL = 'http://localhost:${PORT}/'
API_URL = '${BASE_URL}api/graphql'

# Session
SESSION_SECRET="myultrasecretstringmyultrasecretstring"
SESSION_MAX_AGE=2592000

# Database
DATABASE_URL="mysql://root@127.0.0.1:3306/d4cr_database"

# Media
MEDIA_URL="${BASE_URL}public/media"
IMAGE_URL="${BASE_URL}public/images"
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
