/* eslint-disable import/no-anonymous-default-export */
import type { NextApiRequest, NextApiResponse } from 'next';

import dbConnect from '@/utils/dbConnect';

import conversation from '../../../models/conversationModel';
import User from '../../../models/UserModel';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await dbConnect();
    const { email, subject, text } = JSON.parse(req.body);
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('Nie znaleziono użytkownika');
    }
    if (user) {
      const date = await conversation.create({
        roomId: Math.random().toString().slice(2, 8),
        userId: user._id,
        createDate: new Date(),
        status: 'Nowy',
        subject,
        adminId: 'asssssssss',
        message: {
          Date: new Date(),
          senderId: user._id,
          comment: text,
        },
      });
      user.myConversation.push(date._id);
      user.save();
    }
    return res.status(200).json('Data is updated');
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: 'Cannot get the User...!' });
  }
};
