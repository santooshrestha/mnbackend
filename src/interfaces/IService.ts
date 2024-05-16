import { Document } from "mongoose";

export interface IService {
  _id: string;
  name: string;
  email: string;
  message: string;
  contact_number: string;
  status: "pending" | "dispatched" | "cancelled" | "completed";
}

export interface IServiceModel extends Document, IService {
  _id: string;
}
