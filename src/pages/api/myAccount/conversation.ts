/* eslint-disable import/no-anonymous-default-export */
import console from 'console';
import type { NextApiRequest, NextApiResponse } from 'next';

import dbConnect from '@/utils/dbConnect';

import ConversationM from '../../../models/conversationModel';
import User from '../../../models/UserModel';

const DatauriParser = require('datauri/parser');
const cloudinary = require('cloudinary');

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    cloudinary.config({
      cloud_name: 'dwxmpjnbo',
      api_key: '886948498189263',
      api_secret: 'p1QYUYgh9lKnCETMEr0gEcG-zHY',
    });
    await dbConnect();

    const user = await User.findOne({ email: req.query.email });
    if (!user) {
      throw new Error('Nie znaleziono użytkownika');
    }
    const roomId = [];

    if (user && user?.myConversation?.length !== 0) {
      user.myConversation.map((id) => roomId.push(id));
    }
    // const { query } = context;
    // console.log(context);
    console.log(req.body.message);
    const data = await ConversationM.findOne({
      _id: { $in: roomId },
      roomId: req.query.roomId,
    });
    if (req.method === 'GET') {
      return res.status(200).json(data);
    }
    if (req.method === 'POST') {
      const images = [];
      console.log(req.body.images);
      if (req.body.images !== '') {
        console.log(req.body.images.lenght);

        images.push(req.body.images);

        const imagesLinks = [];

        for (let i = 0; i < images.length; i++) {
          // eslint-disable-next-line no-await-in-loop
          const result = await cloudinary.v2.uploader.upload(images[i], {
            folder: 'conversation',
          });

          imagesLinks.push({
            public_id: result.public_id,
            url: result.secure_url,
          });
        }
        if (req.body.message) {
          data.message.push(
            {
              Date: new Date(),
              senderId: user._id,
              imagesLinks,
            },
            {
              Date: new Date(),
              senderId: user._id,
              comment: req.body.message,
            }
          );
        } else {
          data.message.push({
            Date: new Date(),
            senderId: user._id,
            imagesLinks,
          });
        }
      } else {
        console.log('aaa');
        data.message.push({
          Date: new Date(),
          senderId: user._id,
          comment: req.body.message,
        });
      }

      data.save();
      return res.status(200).json(req.body);
    }
    return res.status(200);
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: 'Cannot get the User...!' });
  }
};
