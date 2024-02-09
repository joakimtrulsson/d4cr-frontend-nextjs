import { config } from '@keystone-6/core';
import express from 'express';
import dotenv from 'dotenv';

import { lists } from './schema';
import { storage } from './storage';
import { withAuth, session } from './auth/auth';

dotenv.config();

const { PORT, MAX_FILE_SIZE, DATABASE_URL } = process.env;

export default withAuth(
  config({
    server: {
      port: PORT,
      maxFileSize: MAX_FILE_SIZE,
      cors: { origin: ['*'], credentials: true },
      extendExpressApp: (app, commonContext) => {
        app.use(express.json());
        app.use('/public', express.static('public'));
      },
    },
    db: {
      provider: 'mysql',
      url: DATABASE_URL,
      idField: { kind: 'uuid' },
    },
    lists,
    session,
    storage,
    ui: { publicPages: ['public'] },
  })
);
