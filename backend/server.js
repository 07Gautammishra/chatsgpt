import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './configs/db.js';
import userRouter from './routes/user.routes.js';
import ChatRouter from './routes/chat.routes.js';
import messageRouter from './routes/message.routes.js';
import { ENV } from './configs/ENV.js';
import path from "path";

const app = express();
// middleware
app.use(cors());
app.use(express.json());

 const __dirname= path.resolve();
const PORT = process.env.PORT || 8000;

app.use('/api/user', userRouter);
app.use('/api/chat', ChatRouter);
app.use('/api/message', messageRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));
 
  app.get((req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

app.listen(PORT, async() => {
    await connectDB()
    console.log(`Server is running on http://localhost:${PORT}`);
});  