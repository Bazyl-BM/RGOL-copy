/* eslint-disable import/no-anonymous-default-export */
import bcrypt, { compare } from 'bcrypt';
import { Error } from 'mongoose';
import type { NextApiRequest, NextApiResponse } from 'next';

import dbConnect from '@/utils/dbConnect';

import User from '../../../models/UserModel';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await dbConnect();
    const { password, email, newPassword, passwordConfirmation } = JSON.parse(
      req.body
    );

    if (newPassword !== passwordConfirmation) {
      throw new Error('Podane hasła nie są takie same');
    }
    const passwordChangeUser = await User.findOne({ email }, (e: Error) =>
      console.log(e)
    ).clone();

    if (!passwordChangeUser) {
      throw new Error('Nie znaleziono użytkownika');
    }
    const isPasswordCorrect = await compare(
      password,
      passwordChangeUser.password!
    );
    // Incorrect password
    if (!isPasswordCorrect) {
      throw new Error('Nie prawidłowe hasło');
    }
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(newPassword, salt);

    await User.findOneAndUpdate(
      { email },
      { password: hashPassword },
      (e: Error) => console.log(e)
    ).clone();
    return res.status(200).json('Data is updated');
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: 'Cannot get the User...!' });
  }
};
