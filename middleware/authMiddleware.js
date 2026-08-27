import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export async function protect(req, res, next) {
  const token = req.headers.authorization?.startsWith('Bearer ') ? req.headers.authorization.split(' ')[1] : null;
  if (!token) return res.status(401).json({ message: 'Authentication required' });
  try { const payload = jwt.verify(token, process.env.JWT_SECRET); req.user = await User.findById(payload.id); if (!req.user) throw new Error('User not found'); return next(); } catch { return res.status(401).json({ message: 'Invalid or expired token' }); }
}

export function adminOnly(req, res, next) { if (req.user?.isAdmin) return next(); return res.status(403).json({ message: 'Admin access required' }); }
