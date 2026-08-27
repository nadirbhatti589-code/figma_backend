import Order from '../models/Order.js';
import Product from '../models/Product.js';

export async function createOrder(req, res, next) {
  try {
    const { items, shippingAddress } = req.body;
    if (!Array.isArray(items) || !items.length) return res.status(400).json({ message: 'Order must contain at least one item' });
    const productIds = items.map((item) => item.product); const products = await Product.find({ _id: { $in: productIds } });
    if (products.length !== productIds.length) return res.status(400).json({ message: 'One or more products do not exist' });
    const productById = new Map(products.map((product) => [product.id, product]));
    const orderItems = items.map((item) => { const product = productById.get(String(item.product)); return { product: product._id, name: product.name, image: product.images[0]?.url || '', price: product.price, size: item.size, color: item.color, quantity: Math.max(1, Number(item.quantity) || 1) }; });
    const subtotal = orderItems.reduce((total, item) => total + item.price * item.quantity, 0); const discount = 0; const deliveryFee = 15;
    const order = await Order.create({ user: req.user._id, items: orderItems, subtotal, discount, deliveryFee, total: subtotal - discount + deliveryFee, shippingAddress });
    res.status(201).json(order);
  } catch (error) { next(error); }
}
export async function getMyOrders(req, res, next) { try { res.json(await Order.find({ user: req.user._id }).sort({ createdAt: -1 })); } catch (error) { next(error); } }
export async function getOrder(req, res, next) { try { const order = await Order.findOne({ _id: req.params.id, user: req.user._id }).populate('items.product'); if (!order) return res.status(404).json({ message: 'Order not found' }); return res.json(order); } catch (error) { next(error); } }
