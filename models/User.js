import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({ name: { type: String, required: true, trim: true }, email: { type: String, required: true, unique: true, lowercase: true, trim: true }, passwordHash: { type: String, required: true, select: false }, isAdmin: { type: Boolean, default: false } }, { timestamps: true, toJSON: { transform: (_doc, result) => { result.id = result._id.toString(); delete result._id; delete result.__v; delete result.passwordHash; return result; } } });
userSchema.virtual('password').set(function setPassword(password) { this._plainPassword = password; });
userSchema.pre('validate', async function hashPassword() { if (this._plainPassword) this.passwordHash = await bcrypt.hash(this._plainPassword, 10); });
userSchema.methods.comparePassword = function comparePassword(password) { return bcrypt.compare(password, this.passwordHash); };
export default mongoose.model('User', userSchema);
