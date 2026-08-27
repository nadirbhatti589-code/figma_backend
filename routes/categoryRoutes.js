import { Router } from 'express';
import { createCategory, getCategories } from '../controllers/categoryController.js';
import { adminOnly, protect } from '../middleware/authMiddleware.js';
const router = Router(); router.route('/').get(getCategories).post(protect, adminOnly, createCategory); export default router;
