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
        firstName,
        surname,
        companyName,
        street,
        buldingNumber,
        flatNumber,
        city,
        postCode,
        phoneNumber,
      } = req.body;
      const id = uuidv4();
      console.log(email);
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error('Nie znaleziono użytkownika');
      }
      if (user) {
        const isDefault = user.adress.length === 0;
        const addressData = {
          idItem: id,
          firstName,
          surname,
          companyName,
          street,
          buldingNumber,
          flatNumber,
          city,
          postCode,
          phoneNumber,
          isDefault,
        };
        user.adress.push(addressData);
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
        const newList = UpdateUser.adress.filter(
          (tutorial) => tutorial.idItem !== idItem
        );

        UpdateUser.adress = newList;

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
      firstName,
      surname,
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
        firstName,
        surname,
        companyName,
        street,
        buldingNumber,
        flatNumber,
        city,
        postCode,
        phoneNumber,
        idItem,
        isDefault,
      };
      if (UpdateUser) {
        const index = UpdateUser.adress.findIndex(
          (tutorial) => tutorial.idItem === idItem
        );

        UpdateUser.adress[index] = newAddress;

        await UpdateUser.save();
        return res.status(200).json(newAddress);
      }
    } catch (err) {
      console.log(err);
      return res.status(400).json({ error: 'Cannot get the User...!' });
    }
  }
};
