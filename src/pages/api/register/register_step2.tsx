/* eslint-disable import/no-anonymous-default-export */
import bcrypt from 'bcrypt';
import type { NextApiRequest, NextApiResponse } from 'next';

import dbConnect from '@/utils/dbConnect';

import User from '../../../models/UserModel';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    dbConnect();

    const {
      firstName,
      lastName,
      telefonNumber,
      password,
      AcceptSendEmail,
      JoinClub,
      email,
    } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    User.findOneAndUpdate(
      {
        email,
      },
      {
        firstName,
        lastName,
        telefonNumber,
        password: hashPassword,
        AcceptSendEmail,
        JoinClub,
      },
      {
        useFindAndModify: false,
      },
      (err) => {
        if (err) {
          console.log(err);
        }
      }
    );

    return res.status(200).json('zgoda');
  } catch (err) {
    return res.status(400).json({ error: 'Cannot get the User...!' });
  }
};
