import { Document } from "mongoose";

export interface IEmployee {
  _id: string;
  name: string;
  email: string;
  address: string;
  contact_number: string;
  is_experienced: boolean;
  has_vehicles: boolean;
  has_police_record: boolean;
}

export interface IEmployeeModel extends Document, IEmployee {
  _id: string;
}
