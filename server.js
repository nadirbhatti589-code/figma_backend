import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDatabase } from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';
import newsletterRoutes from './routes/newsletterRoutes.js';
import { errorHandler, notFound } from './middleware/errorMiddleware.js';

dotenv.config();
const app = express();
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());
app.get('/api/health', (_req, res) => res.json({ status: 'ok' }));
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/products', reviewRoutes);
app.use('/api/newsletter', newsletterRoutes);
app.use(notFound);
app.use(errorHandler);

connectDatabase().then(() => app.listen(process.env.PORT || 5000, () => console.log(`SHOP.CO API listening on port ${process.env.PORT || 5000}`))).catch((error) => { console.error('Failed to connect to MongoDB', error); process.exit(1); });
