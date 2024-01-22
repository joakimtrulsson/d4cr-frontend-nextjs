// import multer from 'multer';
// // const sharp = require('sharp');
// import sharp from 'sharp';

// // Sparar bilden i memory buffer. Då är bilden tillgänglig i req.file.buffer
// const multerStorage = multer.memoryStorage();

// const multerFilter = (req, file, cb) => {
//   // Kollar om det är en bild. Skickar true eller false till cb ovanför. Null = no error
//   if (file.mimetype.startsWith('image')) {
//     cb(null, true);
//   } else {
//     cb(new Error('Not an image. Please upload only images.'), false);
//   }
// };

// const upload = multer({
//   storage: multerStorage,
//   fileFilter: multerFilter,
// });

// export const uploadImage = upload.single('image');

// export const resizeImage = async (req, res, commonContext) => {
//   try {
//     req.file.filename = `sectionid-${req.body.id}-${Date.now()}.jpeg`;
//     await sharp(req.file.buffer)
//       .resize(500, 500)
//       .toFormat('jpeg')
//       .jpeg({ quality: 90 })
//       .toFile(`public/images/sections/${req.file.filename}`);
//     // .toFile(`../public_html/public/img/users/${req.file.filename}`);

//     res.json({
//       success: 'true',
//       imageUrl: `images/sections/${req.file.filename}`,
//     });
//   } catch {
//     res.status(400).json({
//       success: 'false',
//       message: 'Something went wrong with the image upload.',
//     });
//   }
// };

import multer from 'multer';
import sharp from 'sharp';

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new Error('Not an image. Please upload only images.'), false);
  }
};

const maxImageCount = 3; // Set your desired maximum image count

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

export const uploadImage = upload.array('image', 3);

export const resizeImage = async (req, res, commonContext) => {
  try {
    const imageUrls = [];

    for (const file of req.files) {
      const filename = `sectionid-${req.body.id}-${Date.now()}.jpeg`;
      await sharp(file.buffer)
        .resize(500, 500)
        .toFormat('jpeg')
        .jpeg({ quality: 90 })
        .toFile(`public/images/sections/${filename}`);

      imageUrls.push(`images/sections/${filename}`);
    }

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
