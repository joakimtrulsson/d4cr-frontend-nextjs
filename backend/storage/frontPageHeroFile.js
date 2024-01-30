import dotenv from 'dotenv';

dotenv.config();

const { ASSET_BASE_URL } = process.env;

export const frontPageHeroStorage = {
  kind: 'local',
  type: 'file',
  generateUrl: (path) => `${ASSET_BASE_URL}/public/media/frontpage/${path}`,
  serverRoute: {
    path: 'public/images/hero-images',
  },
  storagePath: 'public/media/',
};
