import mongoose, { Document, Model} from 'mongoose';

export interface Order {
  _id?: string,
  products: [{ 
    name: string,
    quantity: number,
    price: number 
  }];
  total: number;
}

const schema = new mongoose.Schema(
    {
      products: { type: [{ 
        name: String,
        quantity: Number,
        price: Number 
      }], required: true, _id: false },
      total: {type: Number, required: true}
    },
    {
      toJSON: {
        transform: (_, ret): void => {
          ret.id = ret._id;
          delete ret._id;
          delete ret.__v;
        },
      },
    }
  );

interface OrderModel extends Omit<Order, '_id'>, Document {}
export const Order: Model<OrderModel> = mongoose.model('Orders', schema);
