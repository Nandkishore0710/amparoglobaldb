import dbConnect from './dbConnect.js';
import Message from './models/Message.js';

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

    if (req.method === 'POST') {
      const { name, email, phone, company, service, message } = req.body;
      const newMessage = await Message.create({ name, email, phone, company, service, message });
      
      return res.status(201).json({ 
        success: true, 
        message: 'Message saved successfully!',
        data: newMessage 
      });
    }

    if (req.method === 'GET') {
      const messages = await Message.find({}).sort({ createdAt: -1 });
      return res.status(200).json({ success: true, data: messages });
    }
    
    if (req.method === 'PATCH') {
      const { id } = req.query;
      const { read } = req.body;
      
      if (id) {
         const updatedMessage = await Message.findByIdAndUpdate(id, { read }, { new: true });
         return res.status(200).json({ success: true, data: updatedMessage });
      }
    }
    
    if (req.method === 'DELETE') {
       const { id } = req.query;
       if (id) {
         await Message.findByIdAndDelete(id);
         return res.status(200).json({ success: true, message: 'Message deleted' });
       }
    }

    res.status(405).json({ success: false, message: 'Method not allowed' });
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
}
