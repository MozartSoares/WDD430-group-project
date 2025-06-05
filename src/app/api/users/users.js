import dbConnect from '../../lib/mongodb';
import User from '../../models/User';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'POST') {
    try {
      const user = await User.create(req.body);
      res.status(201).json({ success: true, data: user });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  } else if (req.method === 'GET') {
    try {
      const users = await User.find();
      res.status(200).json({ success: true, data: users });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  } else {
    res.status(405).json({ success: false, message: 'Not Allowed' });
  }
}
