import { config } from '@keystone-6/core';
import dotenv from 'dotenv';

import { lists } from './schema';
import { withAuth, session } from './auth/auth';

dotenv.config();

const { ASSET_BASE_URL, PORT, MAX_FILE_SIZE, FRONTEND_URL, DATABASE_URL } = process.env;

export default withAuth(
  config({
    server: {
      port: PORT,
      maxFileSize: MAX_FILE_SIZE,
      cors: { origin: [FRONTEND_URL], credentials: true },
    },
    db: {
      provider: 'mysql',
      url: DATABASE_URL,
      idField: { kind: 'uuid' },
    },
    lists,
    session,
  })
);
