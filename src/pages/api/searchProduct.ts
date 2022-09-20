/* eslint-disable import/no-anonymous-default-export */

import type { NextApiRequest, NextApiResponse } from 'next';

import dbConnect from '@/utils/dbConnect';

import Product from '../../models/productModel';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await dbConnect();
    const title = req.body.searchValue;
    console.log(title);
    const result = await Product.find({
      $or: [{ name: { $regex: title, $options: 'i' } }, { productKey: title }],
    });
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
  }
};
