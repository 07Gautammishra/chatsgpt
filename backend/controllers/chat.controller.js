import Chat from "../models/chat.model.js";


export const createChat = async (req, res) => {
    try {
        const userId = req.user._id;
        const chatData = {
            userId,
            messages: [],
            name: "New Chat",
            userName: req.user.name,
        };
         await Chat.create(chatData);
        res.status(201).json({ success: true, message: "New chat created" });
    } catch (error) {
        console.error("Error in createChat: ", error.message);
        res.status(500).json({ success: false, message: error.message });
    }
}

// function to fetch all chats for a user
export const getChats = async (req, res) => {
    try {
        const userId = req.user._id;
        const chats= await Chat.find({ userId }).sort({ updatedAt: -1 });
        res.status(201).json({ success: true, chats});
    } catch (error) {
        console.error("Error in createChat: ", error.message);
        res.status(500).json({ success: false, message: error.message });
    }
}
// delete chat by id
export const deleteChat = async (req, res) => {
    try {
        const { chatId } = req.body;
        const userId = req.user._id;
        await Chat.deleteOne({ _id: chatId, userId });
        res.status(200).json({ success: true, message: "Chat deleted successfully" });
    } catch (error) {
        console.error("Error in deleteChat: ", error.message);
        res.status(500).json({ success: false, message: error.message });
    }  
}