import { Request, Response } from "express";
import Contact from "../models/Contact";
import nodemailer from "nodemailer";
import { config } from "../config";

const store = async (req: Request, res: Response) => {
  const { name, email, contact_number, message } = req.body;

  try {
    const contact = new Contact({
      name,
      email,
      contact_number,
      message,
    });

    await contact.save();

    return res.status(200).json({
      success: true,
      message: "Contact data has been saved.",
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

    const contacts = await Contact.find()
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit));

    const more =
      (
        await Contact.find()
          .skip(Number(page) * Number(limit))
          .limit(Number(limit))
      ).length > 0;

    return res.status(200).json({
      success: true,
      contacts: contacts,
      more,
    });
  } catch (err: any) {
    return res.status(200).json({
      error: err,
      message: err.message,
    });
  }
};

const sendMail = async (req: Request, res: Response) => {
  const { email, id, subject, description } = req.body;

  try {
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
      subject: subject,
      html: description,
    });

    await Contact.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Contact email has been sent",
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

    await Contact.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Contact email has been destroyed",
    });
  } catch (err: any) {
    return res.status(200).json({
      error: err,
      message: err.message,
    });
  }
};

const controller = { store, get, sendMail, destroy };

export default controller;
