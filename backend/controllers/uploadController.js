import multer from 'multer';
import sharp from 'sharp';
import { v4 as uuidv4 } from 'uuid';

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new Error('Not an image. Please upload only images.'), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

export const uploadImage = upload.array('image', 3);

export const resizeImage = async (req, res, commonContext) => {
  try {
    const imageObjects = {};

    for (const file of req.files) {
      const fileId = Date.now();

      // Small size
      const smallFilename = `sectionid-${req.body.id}-${fileId}-s.jpeg`;
      await sharp(file.buffer)
        .resize(100, 100)
        .toFormat('jpeg')
        .jpeg({ quality: 90 })
        .toFile(`public/images/sections/${smallFilename}`);

      // Medium size
      const mediumFilename = `sectionid-${req.body.id}-${fileId}-m.jpeg`;
      await sharp(file.buffer)
        .resize(300, 300)
        .toFormat('jpeg')
        .jpeg({ quality: 90 })
        .toFile(`public/images/sections/${mediumFilename}`);

      // Large size
      const largeFilename = `sectionid-${req.body.id}-${fileId}-l.jpeg`;
      await sharp(file.buffer)
        .resize(500, 500)
        .toFormat('jpeg')
        .jpeg({ quality: 90 })
        .toFile(`public/images/sections/${largeFilename}`);

      const imageId = uuidv4();

      imageObjects[imageId] = {
        id: imageId,
        imageUrls: {
          small: `images/sections/${smallFilename}`,
          medium: `images/sections/${mediumFilename}`,
          large: `images/sections/${largeFilename}`,
        },
      };
    }

    const imageUrls = Object.values(imageObjects);

    res.json({
      success: 'true',
      imageUrls,
    });
  } catch (error) {
    res.status(400).json({
      success: 'false',
      message: 'Something went wrong with the image upload.',
    });
  }
};
