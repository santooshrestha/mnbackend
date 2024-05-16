import mongoose, { Schema } from "mongoose";
import { IContactModel } from "../interfaces/IContact";

const ContactSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  contact_number: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
});

export default mongoose.model<IContactModel>("Contact", ContactSchema);
