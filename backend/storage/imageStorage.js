import dotenv from 'dotenv';

dotenv.config();

const { IMAGE_URL } = process.env;

export const imageStorage = {
  kind: 'local',
  type: 'image',
  generateUrl: (path) => `${IMAGE_URL}${path}`,
  serverRoute: {
    path: 'public/images',
  },
  storagePath: 'public/images',
};
