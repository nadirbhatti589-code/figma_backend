import { Router } from 'express';
import { addReview, getReviews } from '../controllers/reviewController.js';
import { protect } from '../middleware/authMiddleware.js';
const router = Router(); router.get('/:id/reviews', getReviews); router.post('/:id/reviews', protect, addReview); export default router;
