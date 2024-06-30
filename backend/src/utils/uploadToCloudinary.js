import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

export const uploadToCloudinary = async (localPath) => {
  cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  try {
    if (!localPath) return null;
    const uploadResult = await cloudinary.uploader.upload(localPath, {
      resource_type: 'auto',
    });

    fs.unlinkSync(localPath);
    return uploadResult;
  } catch (error) {
    fs.unlinkSync(localPath);
    return null;
  }
};
