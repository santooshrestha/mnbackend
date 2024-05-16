import dotenv from "dotenv";

dotenv.config();

const MONGO_URL =
  "mongodb+srv://Jenish:mCFhk4jdTk5tmV7@cleaner.hbqsb6m.mongodb.net/?retryWrites=true&w=majority&appName=cleaner";

const SERVER_PORT = process.env.SERVER_PORT
  ? Number(process.env.SERVER_PORT)
  : 8000;

const SERVER_TOKEN_EXPIRETIME = process.env.SERVER_TOKEN_EXPIRETIME || 3600;
const SERVER_TOKEN_ISADMIN = process.env.SERVER_TOKEN_ISADMIN || "isAdmin";

const SERVER_TOKEN_SECRET = process.env.SERVER_TOKEN_SECRET || "superencrypt";

const SERVER_TOKEN_ADMIN_SECRET =
  process.env.SERVER_TOKEN_ADMIN_SECRET || "adminKey";

export const config = {
  mongo: {
    url: MONGO_URL,
  },
  server: {
    port: SERVER_PORT,
  },
  token: {
    expireTime: SERVER_TOKEN_EXPIRETIME,
    isAdmin: SERVER_TOKEN_ISADMIN,

    secret: SERVER_TOKEN_SECRET,
    adminSecret: SERVER_TOKEN_ADMIN_SECRET,
  },
  sender: {
    email: "iusethisgm@gmail.com",
    password: "eqqv mpfw rewl cegl",
  },
};
