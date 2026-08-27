import Category from '../models/Category.js';
export async function getCategories(_req, res, next) { try { res.json(await Category.find().sort({ name: 1 })); } catch (error) { next(error); } }
export async function createCategory(req, res, next) { try { const category = await Category.create(req.body); res.status(201).json(category); } catch (error) { next(error); } }
