# D4CR Keystone Server

1. Skapa en .env fil

```
NODE_ENV=development
PORT=3000
MAX_FILE_SIZE = 10
ASSET_BASE_URL = 'http://localhost:3000'

SESSION_SECRET="myultrasecretstringmyultrasecretstring"
SESSION_MAX_AGE=2592000

DATABASE_URL="mysql://username:password@127.0.0.1:3306/db_name"
```

Run

```
npm run dev

```
