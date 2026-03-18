import dbConnect from './dbConnect';
import Content from './models/Content';

export default async function handler(req, res) {
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
}
