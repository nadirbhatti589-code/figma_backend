import { Router } from 'express';
import { createProduct, deleteProduct, getProduct, getProducts, updateProduct } from '../controllers/productController.js';
import { adminOnly, protect } from '../middleware/authMiddleware.js';
import { upload, uploadProductImages } from '../middleware/uploadMiddleware.js';
const router = Router();
router.route('/').get(getProducts).post(protect, adminOnly, upload.array('images', 6), uploadProductImages, createProduct);
router.route('/:id').get(getProduct).put(protect, adminOnly, upload.array('images', 6), uploadProductImages, updateProduct).delete(protect, adminOnly, deleteProduct);
export default router;
