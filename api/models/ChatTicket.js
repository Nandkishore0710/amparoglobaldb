import mongoose from 'mongoose';

const ChatMessageSchema = new mongoose.Schema({
  type: { type: String, required: true, enum: ['user', 'bot', 'admin'] },
  text: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

const ChatTicketSchema = new mongoose.Schema({
  sessionId: { type: String, required: true, unique: true },
  customerName: { type: String, default: 'Guest User' },
  phone: { type: String },
  company: { type: String },
  lastMessage: { type: String },
  status: { type: String, default: 'active', enum: ['active', 'replied', 'closed'] },
  messages: [ChatMessageSchema]
}, { timestamps: true });

export default mongoose.models.ChatTicket || mongoose.model('ChatTicket', ChatTicketSchema);
