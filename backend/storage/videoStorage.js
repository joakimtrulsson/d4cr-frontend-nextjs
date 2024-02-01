import dotenv from 'dotenv';

dotenv.config();

const { ASSET_BASE_URL } = process.env;

export const videoStorage = {
  kind: 'local',
  type: 'file',
  generateUrl: (path) => `${ASSET_BASE_URL}/public/media${path}`,
  serverRoute: {
    path: 'public/media',
  },
  storagePath: 'public/media',
};
