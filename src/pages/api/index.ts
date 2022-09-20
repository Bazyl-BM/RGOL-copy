/* eslint-disable import/no-anonymous-default-export */
import dotenv from 'dotenv';
import type { NextApiRequest, NextApiResponse } from 'next';

import dbConnect from '@/utils/dbConnect';

const cloudinary = require('cloudinary');

dotenv.config();
export default async (req: NextApiRequest, res: NextApiResponse) => {
  dbConnect();
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  res.status(200).json({ name: 'John Doe' });
};
