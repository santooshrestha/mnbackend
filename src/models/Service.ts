import mongoose, { Schema } from "mongoose";
import { IServiceModel } from "../interfaces/IService";

const ServiceSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  contact_number: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "dispatched", "cancelled", "completed"],
  },
});

export default mongoose.model<IServiceModel>("Service", ServiceSchema);
