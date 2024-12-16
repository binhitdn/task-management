import { NextApiRequest, NextApiResponse } from 'next';
import connectMongo from '../../../lib/mongodb';
import User from '../../../models/User';
import bcrypt from 'bcryptjs';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Vui lòng cung cấp đầy đủ thông tin' });
  }

  await connectMongo();

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return res.status(400).json({ message: 'Email đã được sử dụng' });
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const user = new User({
    name,
    email,
    password: hashedPassword,
  });

  await user.save();

  return res.status(201).json({ message: 'Đăng ký thành công!' });
}
