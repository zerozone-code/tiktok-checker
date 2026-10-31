import mongoose, { Schema, Document, Model } from "mongoose";

export interface IUser extends Document {
  email?: string;
  phone?: string;
  password: string;
  otp?: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema<IUser> = new Schema(
  {
    email: { type: String, sparse: true, default: null },
    phone: { type: String, sparse: true, default: null },
    password: { type: String, required: true },
    otp: { type: String, default: null },
  },
  { timestamps: true },
);

const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;
