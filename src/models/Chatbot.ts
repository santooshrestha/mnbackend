import mongoose, { Schema } from "mongoose";
import { IChatbotModel } from "../interfaces/IChatbot";

const ChatbotSchema = new Schema({
  prompt: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  options: [
    {
      prompt: { type: String, required: true },
      option: { type: String, required: true },
    },
  ],
});

export default mongoose.model<IChatbotModel>("Chatbot", ChatbotSchema);
