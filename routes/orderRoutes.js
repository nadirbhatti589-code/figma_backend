import { Router } from 'express';
import {
  createOrder,
  getMyOrders,
  getOrder,
  getAllOrders,
  updateOrderStatus,
} from '../controllers/orderController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = Router();

router.post('/', protect, createOrder);
router.get('/my-orders', protect, getMyOrders);

// Admin panel routes (not behind login yet — see note below).
router.get('/', getAllOrders);
router.put('/:id', updateOrderStatus);

router.get('/:id', protect, getOrder);

export default router;