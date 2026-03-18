import mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  company: { type: String },
  service: { type: String, required: true },
  message: { type: String },
  read: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.models.Message || mongoose.model('Message', MessageSchema);
