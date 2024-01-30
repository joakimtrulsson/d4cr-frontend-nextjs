import { config } from '@keystone-6/core';
import express from 'express';
import dotenv from 'dotenv';

import { lists } from './schema';
import { storage } from './storage';
import { withAuth, session } from './auth/auth';

import { uploadImage, resizeImage } from './controllers/uploadController';
import { deleteImages } from './controllers/deleteController';

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
        app.use(express.json());
        app.use('/public', express.static('public'));
        // Auth saknas
        app.patch(
          '/api/imageupload',
          uploadImage,
          withContext(commonContext, resizeImage)
        );
        app.delete('/api/delete-images', withContext(commonContext, deleteImages));
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
    // storage: {
    //   heroImages: {
    //     kind: 'local',
    //     type: 'image',
    //     generateUrl: (path) => `${ASSET_BASE_URL}/public/images/hero-images${path}`,
    //     serverRoute: {
    //       path: 'public/images/hero-images',
    //     },
    //     storagePath: 'public/images/hero-images',
    //   },
    //   frontPageHero: {
    //     kind: 'local',
    //     type: 'file',
    //     generateUrl: (path) => `${ASSET_BASE_URL}/public/media/frontpage/${path}`,
    //     serverRoute: {
    //       path: 'public/images/hero-images',
    //     },
    //     storagePath: 'public/media/',
    //   },
    //   resourceImages: {
    //     kind: 'local',
    //     type: 'image',
    //     generateUrl: (path) => `${ASSET_BASE_URL}/public/images/resources/${path}`,
    //     serverRoute: {
    //       path: 'public/images/resources',
    //     },
    //     storagePath: 'public/images/resources',
    //   },
    //   resourceFiles: {
    //     kind: 'local',
    //     type: 'file',
    //     generateUrl: (path) => `${ASSET_BASE_URL}/public/files/resources/${path}`,
    //     serverRoute: {
    //       path: 'public/files/resources',
    //     },
    //     storagePath: 'public/files/resources',
    //   },
    // },
    ui: { publicPages: ['public'] },
  })
);
