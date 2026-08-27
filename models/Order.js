import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({ user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, items: [{ product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true }, name: String, image: String, price: Number, size: String, color: String, quantity: { type: Number, min: 1 } }], subtotal: Number, discount: { type: Number, default: 0 }, deliveryFee: { type: Number, default: 15 }, total: Number, shippingAddress: { fullName: String, address: String, city: String, postalCode: String, phone: String }, status: { type: String, enum: ['pending', 'processing', 'shipped', 'delivered'], default: 'pending' } }, { timestamps: true });
export default mongoose.model('Order', orderSchema);
