import Product from '../models/Product.js';
import cloudinary from '../config/cloudinary.js';

const parseList = (value) => value ? String(value).split(',').map((item) => item.trim()).filter(Boolean) : [];

export async function getProducts(req, res, next) {
  try {
    const { category, minPrice, maxPrice, colors, sizes, sort = 'popular', page = 1, limit = 12, search, onSale } = req.query;
    const filter = {};
    if (category) filter.category = category;
    if (minPrice || maxPrice) filter.price = { ...(minPrice && { $gte: Number(minPrice) }), ...(maxPrice && { $lte: Number(maxPrice) }) };
    if (parseList(colors).length) filter.colors = { $in: parseList(colors) };
    if (parseList(sizes).length) filter.sizes = { $in: parseList(sizes) };
    if (onSale === 'true') filter.discountPercent = { $gt: 0 };
    if (search) filter.name = { $regex: search, $options: 'i' };
    const order = { popular: { rating: -1, reviewCount: -1 }, newest: { createdAt: -1 }, 'price-asc': { price: 1 }, 'price-desc': { price: -1 } }[sort] || { createdAt: -1 };
    const pageNumber = Math.max(Number(page), 1); const pageSize = Math.min(Math.max(Number(limit), 1), 100);
    const [products, total] = await Promise.all([Product.find(filter).sort(order).skip((pageNumber - 1) * pageSize).limit(pageSize), Product.countDocuments(filter)]);
    res.json({ products, total, page: pageNumber, pages: Math.ceil(total / pageSize) });
  } catch (error) { next(error); }
}

export async function getProduct(req, res, next) { try { const product = await Product.findById(req.params.id); if (!product) return res.status(404).json({ message: 'Product not found' }); return res.json(product); } catch (error) { next(error); } }
export async function createProduct(req, res, next) { try { const body = { ...req.body, images: req.uploadedImages || [], colors: parseList(req.body.colors), sizes: parseList(req.body.sizes) }; const product = await Product.create(body); res.status(201).json(product); } catch (error) { next(error); } }
export async function updateProduct(req, res, next) { try { const product = await Product.findById(req.params.id); if (!product) return res.status(404).json({ message: 'Product not found' }); const updates = { ...req.body }; if (req.body.colors) updates.colors = parseList(req.body.colors); if (req.body.sizes) updates.sizes = parseList(req.body.sizes); if (req.uploadedImages?.length) updates.images = [...product.images, ...req.uploadedImages]; const updated = await Product.findByIdAndUpdate(req.params.id, updates, { new: true, runValidators: true }); res.json(updated); } catch (error) { next(error); } }
export async function deleteProduct(req, res, next) { try { const product = await Product.findById(req.params.id); if (!product) return res.status(404).json({ message: 'Product not found' }); await Promise.all(product.images.filter((image) => image.publicId).map((image) => cloudinary.uploader.destroy(image.publicId))); await product.deleteOne(); res.json({ message: 'Product deleted' }); } catch (error) { next(error); } }
