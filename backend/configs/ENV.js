// config/env.js
import dotenv from "dotenv";

dotenv.config(); // Load .env file into process.env

export const ENV = {
  PORT: process.env.PORT || 5000,
  MONGO_URL: process.env.MONGO_URL,
  JWT_SECRET: process.env.JWT_SECRET,

  IMAGEKIT_URL_ENDPOINT: process.env.IMAGEKIT_URL_ENDPOINT,
  IMAGEKIT_PUBLIC_KEY: process.env.IMAGEKIT_PUBLIC_KEY,
  IMAGEKIT_PRIVATE_KEY: process.env.IMAGEKIT_PRIVATE_KEY,

  GEMINI_API_KEY: process.env.GEMINI_API_KEY,
};


