import { Request, Response } from "express";
import Chatbot from "../models/Chatbot";

const store = async (req: Request, res: Response) => {
  try {
    const { options, title, prompt, description } = req.body;

    const chatbot = new Chatbot({
      options,
      title,
      prompt,
      description,
    });

    await chatbot.save();

    return res.status(200).json({
      success: true,
      message: "Chatbot response has been saved",
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
    const { prompt } = req.query;

    const chatbot = await Chatbot.findOne({ prompt });

    return res.status(200).json({
      success: true,
      chatbot,
    });
  } catch (err: any) {
    return res.status(500).json({
      error: err,
      message: err.message,
    });
  }
};

const controller = { store, get };

export default controller;
