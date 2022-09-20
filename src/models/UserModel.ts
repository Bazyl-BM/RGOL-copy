import type { Document } from 'mongoose';
import mongoose, { Schema } from 'mongoose';

export interface IUser {
  email: string;
  firstName?: string;
  lastName?: string;
  telefonNumber?: string;
  password?: string;
  passwordConfirmation?: string;
  AcceptSendEmail?: boolean;
  JoinClub?: boolean;
  myConversation: [];
  adress: {
    idItem: string;
    firstName: string;
    surname: string;
    companyName: string;
    street: string;
    buldingNumber: string;
    flatNumber: string;
    city: string;
    postCode: string;
    phoneNumber: string;
    isDefault: boolean;
  }[];
  invoke: {
    idItem: string;
    NIP: string;
    companyName: string;
    street: string;
    buldingNumber: string;
    flatNumber: string;
    city: string;
    email: string;
    postCode: string;
    phoneNumber: string;
    isDefault: boolean;
  }[];
  cupboards: {
    idBox: string;
    cupboardsBoxName?: string;
    isInital?: boolean;
    isDefault: boolean;
  }[];
}

const UserSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  firstName: { type: String, required: false },
  lastName: { type: String, required: false },
  telefonNumber: { type: String, required: false },
  password: { type: String, required: false },
  AcceptSendEmail: { type: Boolean, required: false },
  JoinClub: { type: Boolean, required: false },
  myConversation: { type: Array, required: false },
  adress: [
    {
      idItem: { type: String, unique: true },
      firstName: String,
      surname: String,
      companyName: String,
      street: String,
      buldingNumber: String,
      flatNumber: String,
      city: String,
      postCode: String,
      phoneNumber: String,
      isDefault: Boolean,
    },
  ],
  invoke: [
    {
      idItem: { type: String, unique: true },
      NIP: String,
      companyName: String,
      street: String,
      buldingNumber: String,
      flatNumber: String,
      city: String,
      email: String,
      postCode: String,
      phoneNumber: String,
      isDefault: Boolean,
    },
  ],
  cupboards: [
    {
      idBox: { type: String, unique: true },
      cupboardsBoxName: String,
      isInital: Boolean,
      isDefault: Boolean,
    },
  ],
});

// Export the model and return your IProduct interface
export default (mongoose.models.User as mongoose.Model<IUser>) ||
  mongoose.model<IUser & Document>('User', UserSchema);
