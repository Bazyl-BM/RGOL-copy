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
      const {
        email,
        companyName,
        NIP,
        street,
        buldingNumber,
        flatNumber,
        city,
        postCode,
        phoneNumber,
      } = req.body;
      const id = uuidv4();

      const user = await User.findOne({ email });
      console.log(user);
      if (!user) {
        throw new Error('Nie znaleziono użytkownika');
      }
      if (user) {
        const isDefault = user.invoke.length === 0;
        const addressData = {
          idItem: id,
          companyName,
          NIP,
          email,
          isDefault,
          street,
          buldingNumber,
          flatNumber,
          city,
          postCode,
          phoneNumber,
        };
        user.invoke.push(addressData);
        await user.save();
        return res.status(200).json(addressData);
      }
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
        const newList = UpdateUser.invoke.filter(
          (tutorial) => tutorial.idItem !== idItem
        );
        console.log(idItem);

        UpdateUser.invoke = newList;

        await UpdateUser.save();
        return res.status(200).json(idItem);
      }
    } catch (err) {
      console.log(err);
      return res.status(400).json({ error: 'Cannot get the User...!' });
    }
  }
  if (req.method === 'PUT') {
    const {
      email,
      NIP,
      companyName,
      street,
      buldingNumber,
      flatNumber,
      city,
      postCode,
      phoneNumber,
      idItem,
      isDefault,
    } = req.body.data;
    try {
      await dbConnect();
      const UpdateUser = await User.findOne({
        email,
      });

      const newAddress = {
        NIP,
        companyName,
        street,
        buldingNumber,
        flatNumber,
        city,
        email,
        postCode,
        phoneNumber,
        idItem,
        isDefault,
      };
      if (UpdateUser) {
        const index = UpdateUser.invoke.findIndex(
          (tutorial) => tutorial.idItem === idItem
        );

        UpdateUser.invoke[index] = newAddress;

        await UpdateUser.save();
        return res.status(200).json(newAddress);
      }
    } catch (err) {
      console.log(err);
      return res.status(400).json({ error: 'Cannot get the User...!' });
    }
  }
};
