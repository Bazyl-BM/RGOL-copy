/* eslint-disable import/no-anonymous-default-export */
import type { NextApiRequest, NextApiResponse } from 'next';

import dbConnect from '@/utils/dbConnect';

import User from '../../../models/UserModel';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    dbConnect();
    const {
      email,
      firstName,
      lastName,
      telefonNumber,
      JoinClub,
      AcceptSendEmail,
    } = JSON.parse(req.body);
    await User.findOneAndUpdate(
      { email },
      {
        firstName,
        lastName,
        telefonNumber,
        JoinClub,
        AcceptSendEmail,
      },
      (e: Error) => console.log(e)
    );
    return res.status(200).json('Data is updated');
  } catch (err) {
    return res.status(400).json({ error: 'Cannot get the User...!' });
  }
};
