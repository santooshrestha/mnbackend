import { Document } from "mongoose";

export interface IContact {
  _id: string;
  name: string;
  email: string;
  contact_number: string;
  message: string;
}

export interface IContactModel extends Document, IContact {
  _id: string;
}
