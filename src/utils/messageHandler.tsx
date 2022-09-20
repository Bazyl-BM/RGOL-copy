/* eslint-disable import/no-anonymous-default-export */

import mongoose from 'mongoose';

import dbConnect from '@/utils/dbConnect';

import ConversationM from '../models/conversationModel';
import User from '../models/UserModel';

const cloudinary = require('cloudinary');

export default (io, socket) => {
  const createdMessage = async (msg) => {
    cloudinary.config({
      cloud_name: 'dwxmpjnbo',
      api_key: '886948498189263',
      api_secret: 'p1QYUYgh9lKnCETMEr0gEcG-zHY',
    });
    await dbConnect();

    const user = await User.findOne({ email: msg.email });
    if (!user) {
      throw new Error('Nie znaleziono użytkownika');
    }
    const roomId = [];

    if (user && user?.myConversation?.length !== 0) {
      user.myConversation.map((id) => roomId.push(id));
    }

    const data = await ConversationM.findOne({
      _id: { $in: roomId },
      roomId: msg.roomId,
    });

    const images = [];
    const id = new mongoose.Types.ObjectId();
    if (msg.images !== '') {
      console.log(msg.images.lenght);

      images.push(msg.images);

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
      if (msg.message) {
        data.message.push(
          {
            Date: new Date(),
            senderId: user._id,
            imagesLinks,
            id,
          },
          {
            Date: new Date(),
            senderId: user._id,
            comment: msg.message,
            id,
          }
        );
        io.to(msg.id).emit('newIncomingMessage', {
          Date: new Date(),
          senderId: user._id,
          imagesLinks,
          id,
        });
      } else {
        data.message.push({
          Date: new Date(),
          senderId: user._id,
          imagesLinks,
          id,
        });
        io.to(msg.id).emit('newIncomingMessage', {
          Date: new Date(),
          senderId: user._id,
          imagesLinks,
          id,
        });
      }
    } else {
      data.message.push({
        Date: new Date(),
        senderId: user._id,
        comment: msg.message,
        id,
      });
      io.to(msg.id).emit('newIncomingMessage', {
        Date: new Date(),
        senderId: user._id,
        comment: msg.message,
        id,
      });
    }

    data.save();
  };

  socket.on('createdMessage', createdMessage);
};
