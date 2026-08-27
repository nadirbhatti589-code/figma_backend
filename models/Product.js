import mongoose from 'mongoose';

const imageSchema = new mongoose.Schema({ url: { type: String, required: true }, publicId: { type: String, default: null } }, { _id: false });
const reviewSchema = new mongoose.Schema({ name: String, verified: { type: Boolean, default: false }, rating: { type: Number, min: 0, max: 5 }, text: String, date: String }, { _id: false });

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true }, price: { type: Number, required: true, min: 0 }, originalPrice: { type: Number, default: null }, discountPercent: { type: Number, default: 0 }, rating: { type: Number, default: 0, min: 0, max: 5 }, reviewCount: { type: Number, default: 0 }, images: [imageSchema], description: { type: String, default: '' }, colors: [String], sizes: [String], category: { type: String, required: true, index: true }, isFeatured: { type: Boolean, default: false }, isNewArrival: { type: Boolean, default: false }, stock: { type: Number, default: 0, min: 0 }, reviews: [reviewSchema],
}, { timestamps: true, toJSON: { virtuals: true, transform: (_doc, result) => { result.id = result._id.toString(); delete result._id; delete result.__v; return result; } } });

export default mongoose.model('Product', productSchema);
