// This is a Vercel Serverless Function (Backend)
// It can be used to handle form submissions, database queries, etc.

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email, message } = req.body;
    // Here you would typically save to a database like Supabase or Vercel Postgres
    return res.status(200).json({ 
      success: true, 
      message: 'Backend received your message!',
      data: { name, email } 
    });
  }

  res.status(200).json({ status: 'Amparo Backend is Live' });
}
