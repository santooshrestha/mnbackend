import { Request, Response } from "express";
import Service from "../models/Service";
import nodemailer from "nodemailer";
import { config } from "../config";

const store = async (req: Request, res: Response) => {
  const { name, email, message, contact_number } = req.body;

  try {
    const service = new Service({
      name,
      email,
      message,
      contact_number,
      status: "pending",
    });

    await service.save();

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
      subject: "Quote received",
      html: "We have received your quote, please look forward to our mails regarding updates.",
    });

    return res.status(200).json({
      success: true,
      message: "Service request has been sent",
    });
  } catch (err: any) {
    return res.status(200).json({
      error: err,
      message: err.message,
    });
  }
};

const dispatch = async (req: Request, res: Response) => {
  const { id } = req.body;

  try {
    const service = await Service.findOne({ _id: id });

    await Service.findByIdAndUpdate(id, { status: "dispatched" });

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
      to: service?.email,
      subject: "Service dispatched",
      html: "We have dispatched our staff for the service you have requested. He will contact you soon",
    });

    return res.status(200).json({
      success: true,
      message: "Service request has been updated to dispatched",
    });
  } catch (err: any) {
    return res.status(200).json({
      error: err,
      message: err.message,
    });
  }
};

const cancel = async (req: Request, res: Response) => {
  const { id } = req.body;

  try {
    const service = await Service.findOne({ _id: id });

    await Service.findByIdAndUpdate(id, { status: "cancelled" });

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
      to: service?.email,
      subject: "Service cancelled",
      html: "We are sorry to inform you that your requested service has been cancelled. Please quote another request.",
    });

    return res.status(200).json({
      success: true,
      message: "Service request has been updated to cancelled",
    });
  } catch (err: any) {
    return res.status(200).json({
      error: err,
      message: err.message,
    });
  }
};

const complete = async (req: Request, res: Response) => {
  const { id } = req.body;

  try {
    const service = await Service.findOne({ _id: id });

    await Service.findByIdAndUpdate(id, { status: "completed" });

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
      to: service?.email,
      subject: "Service completed",
      html: "Your task has been marked as completed. Please consult with the associated personnel for payment transactions",
    });

    return res.status(200).json({
      success: true,
      message: "Service request has been updated to completed",
    });
  } catch (err: any) {
    return res.status(200).json({
      error: err,
      message: err.message,
    });
  }
};

const get = async (req: Request, res: Response) => {
  try {
    const { page, limit } = req.query;

    const services = await Service.find()
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit));

    const more =
      (
        await Service.find()
          .skip(Number(page) * Number(limit))
          .limit(Number(limit))
      ).length > 0;

    return res.status(200).json({
      success: true,
      services: services,
      more,
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

    await Service.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Service has been deleted",
    });
  } catch (err: any) {
    return res.status(200).json({
      error: err,
      message: err.message,
    });
  }
};

const controller = { store, dispatch, cancel, complete, get, destroy };

export default controller;
