import type { Document, Types } from 'mongoose';
import mongoose, { Schema } from 'mongoose';

export interface IConversation {
  userId: string;
  roomId: string;
  adminId: string;
  subject: string;
  status: string;
  createDate: Date;
  message: {
    Date: Date;
    comment?: string;
    senderId: Types.ObjectId;
    imagesLinks?: Array<object>;
    id: Types.ObjectId;
  }[];
}

const ConversationSchema: Schema = new Schema({
  userId: { type: String, required: true },
  roomId: { type: String, required: true, unique: true },
  subject: { type: String, required: true },
  status: { type: String, required: true },
  createDate: { type: Date, required: true },
  adminId: { type: String, required: true },
  message: { type: Array, required: true },
});

// Export the model and return your IProduct interface
export default (mongoose.models
  .Conversation as mongoose.Model<IConversation>) ||
  mongoose.model<IConversation & Document>('Conversation', ConversationSchema);
