import { Document } from "mongoose";

export interface IUser {
  _id: string;
  name: string;
  email: string;
  username: string;
  password: string;
  type: "Admin";
}

export interface IUserModel extends Document, IUser {
  _id: string;
}
