import dotenv from 'dotenv';

dotenv.config();

const { ASSET_BASE_URL } = process.env;

export const heroImagesStorage = {
  kind: 'local',
  type: 'image',
  generateUrl: (path) => `${ASSET_BASE_URL}/public/images/hero-images${path}`,
  serverRoute: {
    path: 'public/images/hero-images',
  },
  storagePath: 'public/images/hero-images',
};
