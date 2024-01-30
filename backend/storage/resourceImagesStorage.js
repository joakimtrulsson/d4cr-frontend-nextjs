import dotenv from 'dotenv';

dotenv.config();

const { ASSET_BASE_URL } = process.env;

export const resourceImagesStorage = {
  kind: 'local',
  type: 'image',
  generateUrl: (path) => `${ASSET_BASE_URL}/public/images/resources/${path}`,
  serverRoute: {
    path: 'public/images/resources',
  },
  storagePath: 'public/images/resources',
};
