import dbConnect from './dbConnect.js';
import ChatTicket from './models/ChatTicket.js';

export default async function handler(req, res) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    await dbConnect();

    // GET all chat tickets or a specific session
    if (req.method === 'GET') {
      const { sessionId } = req.query;
      if (sessionId) {
        const ticket = await ChatTicket.findOne({ sessionId });
        return res.status(200).json({ success: true, data: ticket });
      } else {
        const tickets = await ChatTicket.find({}).sort({ updatedAt: -1 });
        return res.status(200).json({ success: true, data: tickets });
      }
    }

    // POST: Send a new message or create a new ticket
    if (req.method === 'POST') {
      const { sessionId, message, customerInfo } = req.body;
      
      let ticket = await ChatTicket.findOne({ sessionId });
      
      const sessionStatus = message.type === 'user' ? 'active' : 'replied';

      if (ticket) {
        // Append to existing ticket
        ticket.messages.push(message);
        ticket.lastMessage = message.text;
        ticket.status = sessionStatus;
        await ticket.save();
        return res.status(200).json({ success: true, data: ticket });
      } else {
        // Create new ticket
        const newTicket = await ChatTicket.create({
          sessionId,
          customerName: customerInfo?.name || 'Guest User',
          phone: customerInfo?.phone || '',
          company: customerInfo?.company || '',
          lastMessage: message.text,
          status: 'active',
          messages: [message]
        });
        return res.status(201).json({ success: true, data: newTicket });
      }
    }

    // PATCH: Update ticket status
    if (req.method === 'PATCH') {
      const { id } = req.query;
      const { status } = req.body;
      
      if (id && status) {
        const ticket = await ChatTicket.findByIdAndUpdate(id, { status }, { new: true });
        return res.status(200).json({ success: true, data: ticket });
      }
      return res.status(400).json({ success: false, message: 'Invalid payload' });
    }

    // DELETE: Remove ticket
    if (req.method === 'DELETE') {
      const { id } = req.query;
      if (id) {
        await ChatTicket.findByIdAndDelete(id);
        return res.status(200).json({ success: true, message: 'Ticket deleted' });
      }
      return res.status(400).json({ success: false, message: 'ID required' });
    }

    res.status(405).json({ success: false, message: 'Method not allowed' });
  } catch (error) {
    console.error('Chat API Error:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
}
