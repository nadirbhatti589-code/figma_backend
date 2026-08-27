import mongoose from 'mongoose';

export async function connectDatabase() {
  await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/shopco');
  console.log(`MongoDB connected: ${mongoose.connection.host}/${mongoose.connection.name}`);
}
