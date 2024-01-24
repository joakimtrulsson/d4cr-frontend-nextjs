import { promises as fs } from 'fs';

export const deleteImages = async (req, res, commonContext) => {
  // Auth saknas

  try {
    const imagePaths = Object.values(req.body);

    await Promise.all(
      imagePaths.map(async (imagePath) => {
        try {
          await fs.unlink(`public/${imagePath}`);
        } catch (error) {
          console.error(`Error deleting file: ${imagePath}`, error);
        }
      })
    );

    res.status(200).json({ success: true, message: 'Images were deleted.' });
  } catch (error) {
    console.error('Error deleting images:', error);
    res.status(500).json({
      success: false,
      message: 'Something went wrong when removing the images.',
    });
  }
};
