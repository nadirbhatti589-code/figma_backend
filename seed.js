import dotenv from 'dotenv';
import { connectDatabase } from './config/db.js';
import Product from './models/Product.js';
import Category from './models/Category.js';

dotenv.config();
const image = (seed) => [{ url: `https://images.unsplash.com/${seed}?auto=format&fit=crop&w=800&q=80`, publicId: null }];
const reviews = ['Samantha D.', 'Alex M.', 'Ethan R.', 'Olivia P.', 'Liam K.', 'Ava H.'].map((name, index) => ({ name, verified: true, rating: [4.5, 4, 4.5, 5, 4, 4.5][index], text: 'Excellent quality, a comfortable fit, and thoughtful design details. This has quickly become a favorite in my wardrobe.', date: `August ${14 + index}, 2023` }));
const product = (name, price, category, source, extras = {}) => ({ name, price, category, originalPrice: extras.originalPrice || null, discountPercent: extras.discountPercent || 0, rating: extras.rating || 4.5, reviewCount: extras.reviews?.length || 0, images: image(source), description: extras.description || 'A carefully crafted wardrobe staple with a comfortable fit and timeless style.', colors: extras.colors || ['#242424', '#4A4A3A', '#F2F0F1'], sizes: ['Small', 'Medium', 'Large', 'X-Large'], isFeatured: Boolean(extras.isFeatured), isNewArrival: Boolean(extras.isNewArrival), stock: 50, reviews: extras.reviews || [] });

const categories = ['T-shirts', 'Shirts', 'Jeans', 'Shorts', 'Hoodie', 'Casual', 'Formal', 'Party', 'Gym'].map((name) => ({ name, slug: name.toLowerCase().replace(/\s+/g, '-') }));
const products = [
  product('T-shirt with Tape Details', 120, 't-shirts', 'photo-1521572163474-6864f9cf17ab', { isNewArrival: true }),
  product('Skinny Fit Jeans', 240, 'jeans', 'photo-1542272604-787c3835535d', { originalPrice: 260, discountPercent: 20, rating: 3.5 }),
  product('Checkered Shirt', 180, 'shirts', 'photo-1603252109303-2751441dd157', { isNewArrival: true }),
  product('Sleeve Striped T-shirt', 130, 't-shirts', 'photo-1627225924765-552d49cf47ad', { originalPrice: 160, discountPercent: 31, isNewArrival: true }),
  product('Vertical Striped Shirt', 212, 'shirts', 'photo-1598032895397-b9472444bf93', { originalPrice: 232, discountPercent: 20, rating: 5 }),
  product('Courage Graphic T-shirt', 145, 't-shirts', 'photo-1503341504253-dff4815485f1', { rating: 4 }),
  product('Loose Fit Bermuda Shorts', 80, 'shorts', 'photo-1591195853828-11db59a44f6b', { rating: 3 }),
  product('Faded Skinny Jeans', 210, 'jeans', 'photo-1541099649105-f69ad21f3246'),
  product('One Life Graphic T-shirt', 260, 't-shirts', 'photo-1521572163474-6864f9cf17ab', { originalPrice: 300, discountPercent: 40, reviews, description: 'This graphic T-shirt is perfect for any occasion. Crafted from soft and breathable fabric, it offers superior comfort and style.' }),
  product('Classic Oxford Shirt', 165, 'shirts', 'photo-1596755389378-c31d21fd1273', { isFeatured: true }),
  product('Essential Fleece Hoodie', 190, 'hoodie', 'photo-1556821840-3a63f95609a7', { colors: ['#1F2937', '#D6D3D1', '#365314'] }),
  product('Tailored Pleat Shorts', 95, 'shorts', 'photo-1506629905607-d405da4d7ea4', { colors: ['#8B5E3C', '#1F2937', '#E5E7EB'] }),
];

try { await connectDatabase(); await Promise.all([Product.deleteMany({}), Category.deleteMany({})]); await Category.insertMany(categories); await Product.insertMany(products); console.log(`Seeded ${categories.length} categories and ${products.length} products.`); process.exit(0); } catch (error) { console.error('Seed failed', error); process.exit(1); }
