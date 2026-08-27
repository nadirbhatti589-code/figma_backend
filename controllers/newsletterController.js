import Newsletter from '../models/Newsletter.js';
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export async function subscribe(req, res, next) { try { const { email } = req.body; if (!emailRegex.test(email || '')) return res.status(400).json({ message: 'A valid email is required' }); await Newsletter.updateOne({ email: email.toLowerCase() }, { $setOnInsert: { email: email.toLowerCase(), subscribedAt: new Date() } }, { upsert: true }); res.status(201).json({ message: 'Successfully subscribed' }); } catch (error) { next(error); } }
