/* eslint-disable consistent-return */
/* eslint-disable import/no-anonymous-default-export */
import type { NextApiRequest, NextApiResponse } from 'next';
import { v4 as uuidv4 } from 'uuid';

import dbConnect from '@/utils/dbConnect';

import User from '../../../models/UserModel';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    try {
      await dbConnect();
      const { email, cupboardsBoxName } = req.body;
      const id = uuidv4().split('-')[0];
      const addressData = {
        idBox: id,
        cupboardsBoxName,
        isDefault: false,
      };
      const user = await User.findOne({ email });

      if (!user) {
        throw new Error('Nie znaleziono użytkownika');
      }
      user.cupboards.push(addressData);
      await user.save();
      return res.status(200).json(addressData);
    } catch (err) {
      console.log(err);
      return res.status(400).json({ error: 'Cannot get the User...!' });
    }
  }

  if (req.method === 'DELETE') {
    const { idItem, email } = req.body;
    try {
      await dbConnect();
      const UpdateUser = await User.findOne({
        email,
      });
      if (UpdateUser) {
        const newList = UpdateUser.cupboards.filter(
          (tutorial) => tutorial.idBox !== idItem
        );
        console.log(idItem);

        UpdateUser.cupboards = newList;

        await UpdateUser.save();
        return res.status(200).json(idItem);
      }
    } catch (err) {
      console.log(err);
      return res.status(400).json({ error: 'Cannot get the User...!' });
    }
  }

  if (req.method === 'PUT') {
    const { email, idItem, cupboardsBoxName } = req.body.data;
    try {
      await dbConnect();
      const UpdateUser = await User.findOne({
        email,
      });
      console.log(idItem);

      if (UpdateUser) {
        const index = UpdateUser.cupboards.findIndex(
          (tutorial) => tutorial.idBox === idItem
        );

        UpdateUser.cupboards[index].cupboardsBoxName = cupboardsBoxName;

        await UpdateUser.save();
        return res.status(200).json({ idItem, cupboardsBoxName });
      }
    } catch (err) {
      console.log(err);
      return res.status(400).json({ error: 'Cannot get the User...!' });
    }
  }
};
