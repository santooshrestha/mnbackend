import mongoose, { Schema } from "mongoose";
import { IEmployeeModel } from "../interfaces/IEmployee";

const EmployeeSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  contact_number: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    type: String,
    required: true,
  },
  is_experienced: {
    type: Boolean,
    required: true,
  },
  has_vehicles: {
    type: Boolean,
    required: true,
  },
  has_police_record: {
    type: Boolean,
    required: true,
  },
});

export default mongoose.model<IEmployeeModel>("Employee", EmployeeSchema);
