import dbConnect from './dbConnect.js';
import Content from './models/Content.js';

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

    const { method } = req;

    switch (method) {
    case 'GET':
      try {
        const content = await Content.findOne({ key: 'amparo_main_config' });
        if (!content) {
          return res.status(200).json({ success: true, data: null });
        }
        res.status(200).json({ success: true, data: content.data });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    case 'POST':
      try {
        const content = await Content.findOneAndUpdate(
          { key: 'amparo_main_config' },
          { data: req.body },
          { new: true, upsert: true }
        );
        res.status(200).json({ success: true, data: content.data });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
  } catch (error) {
    console.error('Content API Error:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
}
