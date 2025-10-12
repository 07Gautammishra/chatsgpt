import express from "express";
import { protectRoute } from "../middlewares/protectRoute.js"
import { imageMessageController, textMessageController } from "../controllers/message.controller.js";
const messageRouter = express.Router()
messageRouter.post("/text", protectRoute, textMessageController)
messageRouter.post("/image", protectRoute, imageMessageController)

export default messageRouter