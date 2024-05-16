import { Document } from "mongoose";

export interface IChatbot {
  _id: string;
  prompt: string;
  title: string;
  description: string;
  options: Array<{ prompt: string; option: string }>;
}

export interface IChatbotModel extends Document, IChatbot {
  _id: string;
}
