import type { Document } from 'mongoose';
import mongoose, { Schema } from 'mongoose';

export interface IProduct {
  name: string;
  price: number;
  description: string;
  extraData: string;
  ratingsAverage: number;
  images: { src: string; alt: string }[];
  category: string[];
  seller: string;
  stock: number;
  reviews: {
    userName: string;
    Date: string;
    rating: number;
    comment: string;
  }[];
  productKey: number;
}

const ProductSchema: Schema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  extraData: { type: String, required: true },
  ratingsAverage: { type: Number, required: true },
  images: { type: Array, required: true },
  category: { type: Array, required: true },
  seller: { type: String, required: true },
  stock: { type: Number, required: true },
  reviews: { type: Array, required: true },
  productKey: { type: Number, required: true, unique: true },
});

// Export the model and return your IProduct interface
export default (mongoose.models.Product as mongoose.Model<IProduct>) ||
  mongoose.model<IProduct & Document>('Product', ProductSchema);
