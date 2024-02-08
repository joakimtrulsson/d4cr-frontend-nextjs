import dotenv from 'dotenv';

dotenv.config();

const { MEDIA_URL } = process.env;

export const videoStorage = {
  kind: 'local',
  type: 'file',
  generateUrl: (path) => `${MEDIA_URL}${path}`,
  serverRoute: {
    path: 'public/media',
  },
  storagePath: 'public/media',
};
