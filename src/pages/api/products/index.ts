/* eslint-disable import/no-anonymous-default-export */
import type { NextApiRequest, NextApiResponse } from 'next';

import dbConnect from '@/utils/dbConnect';

import Product from '../../../models/productModel';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    dbConnect();
    console.log(req);
    const product = await Product.find();
    return res.status(200).json(product);
  } catch (err) {
    return res.status(400).json({ error: 'Cannot get the User...!' });
  }
};
