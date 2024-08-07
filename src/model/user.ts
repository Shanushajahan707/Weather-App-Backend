import mongoose, { Schema, Document } from "mongoose";

export interface UserDocument extends Document {
  email: string;
  password: string;
  isblocked: boolean;
}

const UserSchema: Schema<UserDocument> = new Schema({
  email: { type: String },
  password: { type: String },
  isblocked: { type: Boolean },
});

export const UserModel = mongoose.model<UserDocument>("user", UserSchema);
