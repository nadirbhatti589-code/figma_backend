import multer from 'multer';
import cloudinary from '../config/cloudinary.js';

export const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 5 * 1024 * 1024 } });

export async function uploadProductImages(req, _res, next) {
  if (!req.files?.length) return next();
  try {
    req.uploadedImages = await Promise.all(req.files.map((file) => new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream({ folder: 'shopco/products', resource_type: 'image' }, (error, result) => error ? reject(error) : resolve({ url: result.secure_url, publicId: result.public_id }));
      stream.end(file.buffer);
    })));
    next();
  } catch (error) { next(error); }
}
