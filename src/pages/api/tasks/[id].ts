import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import connectMongo from '../../../lib/mongodb';
import Task from '../../../models/Task';
import mongoose from 'mongoose';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { id },
    method,
    body,
  } = req;

  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ message: 'Không có quyền truy cập' });
  }

  if (!mongoose.Types.ObjectId.isValid(id as string)) {
    return res.status(400).json({ message: 'ID không hợp lệ' });
  }

  await connectMongo();

  const userId = session.user.id;

  const task = await Task.findOne({ _id: id, userId });

  if (!task) {
    return res.status(404).json({ message: 'Không tìm thấy công việc' });
  }

  switch (method) {
    case 'PUT':
      try {
        const updatedTask = await Task.findByIdAndUpdate(id, body, { new: true });
        return res.status(200).json(updatedTask);
      } catch (error) {
        return res.status(500).json({ message: 'Lỗi server' });
      }

    case 'DELETE':
      try {
        await Task.findByIdAndDelete(id);
        return res.status(200).json({ message: 'Công việc đã được xóa' });
      } catch (error) {
        return res.status(500).json({ message: 'Lỗi server' });
      }

    default:
      return res.status(405).json({ message: 'Method Not Allowed' });
  }
}
