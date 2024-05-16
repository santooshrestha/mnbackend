import { Request, Response } from "express";
import Employee from "../models/Employee";
import mongoose from "mongoose";
import nodemailer from "nodemailer";
import { config } from "../config";

const store = async (req: Request, res: Response) => {
  const {
    name,
    email,
    contact_number,
    address,
    is_experienced,
    has_vehicles,
    has_police_record,
  } = req.body;

  try {
    const employee = new Employee({
      _id: new mongoose.Types.ObjectId(),
      name,
      email,
      contact_number,
      address,
      is_experienced,
      has_vehicles,
      has_police_record,
    });

    await employee.save();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      secure: false,
      auth: {
        user: config.sender.email,
        pass: config.sender.password,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    await transporter.sendMail({
      to: email,
      subject: "Employed!",
      html: "Now you are an employee to mm Cleaners, make sure to check your email for daily updates. Also contact us in order get your data updated in our server",
    });

    return res.status(200).json({
      success: true,
      message: "Employee data saved",
    });
  } catch (err: any) {
    return res.status(500).json({
      error: err,
      message: err.message,
    });
  }
};

const get = async (req: Request, res: Response) => {
  try {
    const { page, limit } = req.query;

    const employees = await Employee.find()
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit));

    const more =
      (
        await Employee.find()
          .skip(Number(page) * Number(limit))
          .limit(Number(limit))
      ).length > 0;

    return res.status(200).json({
      success: true,
      employees: employees,
      more,
    });
  } catch (err: any) {
    return res.status(200).json({
      error: err,
      message: err.message,
    });
  }
};

const find = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const employee = await Employee.findOne({ _id: id });

    return res.status(200).json({
      success: true,
      employee,
    });
  } catch (err: any) {
    return res.status(200).json({
      error: err,
      message: err.message,
    });
  }
};

const update = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const employee = await Employee.findById(id);

    const {
      name,
      contact_number,
      address,
      is_experienced,
      has_vehicles,
      has_police_record,
    } = req.body;

    await Employee.findByIdAndUpdate(id, {
      name,
      contact_number,
      address,
      is_experienced,
      has_vehicles,
      has_police_record,
    });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      secure: false,
      auth: {
        user: config.sender.email,
        pass: config.sender.password,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    transporter.sendMail({
      to: employee?.email,
      subject: "Updated!",
      html: "Your data has been updated as per requested",
    });

    return res.status(200).json({
      success: true,
      message: "Employee data updated",
    });
  } catch (err: any) {
    return res.status(200).json({
      error: err,
      message: err.message,
    });
  }
};

const destroy = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await Employee.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Employee data deleted",
    });
  } catch (err: any) {
    return res.status(200).json({
      error: err,
      message: err.message,
    });
  }
};

const controller = { store, get, find, destroy, update };

export default controller;
