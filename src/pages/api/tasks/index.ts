import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import connectMongo from '../../../lib/mongodb';
import Task from '../../../models/Task';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ message: 'Không có quyền truy cập' });
  }

  await connectMongo();

  const userId = session.user.id;

  switch (req.method) {
    case 'GET':
      try {
        const tasks = await Task.find({ userId });
        return res.status(200).json(tasks);
      } catch (error) {
        return res.status(500).json({ message: 'Lỗi server' });
      }

    case 'POST':
      try {
        const { category, title, description, dueDate } = req.body;
        const task = new Task({
          userId,
          category,
          title,
          description,
          dueDate,
        });
        await task.save();
        return res.status(201).json(task);
      } catch (error) {
        return res.status(500).json({ message: 'Lỗi server' });
      }

    default:
      return res.status(405).json({ message: 'Method Not Allowed' });
  }
}
