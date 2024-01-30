import dotenv from 'dotenv';

dotenv.config();

const { ASSET_BASE_URL } = process.env;

export const resourceFilesStorage = {
  kind: 'local',
  type: 'file',
  generateUrl: (path) => `${ASSET_BASE_URL}/public/files/resources/${path}`,
  serverRoute: {
    path: 'public/files/resources',
  },
  storagePath: 'public/files/resources',
};
