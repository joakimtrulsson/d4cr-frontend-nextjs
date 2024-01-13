import { config } from '@keystone-6/core';
import dotenv from 'dotenv';

import { lists } from './schema';
import { withAuth, session } from './auth/auth';

import { uploadImage, resizeImage } from './controllers/uploadController';

dotenv.config();

const { ASSET_BASE_URL, PORT, MAX_FILE_SIZE, FRONTEND_URL, DATABASE_URL } = process.env;

function withContext(commonContext, f) {
  return async (req, res) => {
    return f(req, res, await commonContext.withRequest(req, res));
  };
}

export default withAuth(
  config({
    server: {
      port: PORT,
      maxFileSize: MAX_FILE_SIZE,
      cors: { origin: ['*'], credentials: true },
      extendExpressApp: (app, commonContext) => {
        app.patch(
          '/api/imageupload',
          uploadImage,
          withContext(commonContext, resizeImage)
        );
      },
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
