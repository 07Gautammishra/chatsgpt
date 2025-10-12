
import express from "express"
import { createChat, deleteChat, getChats } from "../controllers/chat.controller.js"
import { protectRoute } from "../middlewares/protectRoute.js"
const ChatRouter= express.Router()

ChatRouter.get("/create",protectRoute, createChat)
ChatRouter.get("/get", protectRoute, getChats)
ChatRouter.delete("/delete", protectRoute, deleteChat)

export default ChatRouter;
