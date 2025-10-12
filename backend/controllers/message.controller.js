import axios from "axios"
import openai from "../configs/openai.js"
import Chat from "../models/chat.model.js"
import imagekit from "../configs/imagekit.js"
import {toFile } from '@imagekit/nodejs'
import { ENV } from "../configs/ENV.js"


// text based Ai chat message controller


export const textMessageController = async (req, res) => {
    try {
        const userId = req.user._id
        const { chatId, prompt } = req.body

        const chat = await Chat.findOne({userId, _id: chatId})
        chat.messages.push({ role: "user", content: prompt, timestamp: Date.now(), isImage: false })
        const {choices} = await openai.chat.completions.create({
            model: "gemini-2.0-flash",
            messages: [
                {
                    role: "user",
                    content: prompt,
                },
            ],
        });
        const reply= {...choices[0].message, timestamp: Date.now(), isImage: false }
        chat.messages.push(reply)
        await chat.save()
        res.json({success: true , reply})
    } catch (error) {
        console.log("Error in textMessageController : ", error.message)
        res.status(500).json({ success: false, message: error.message })
    }
}

export const imageMessageController = async (req, res) => {
    try {
        const userId = req.user._id;
        const {prompt, chatId, isPublished}= req.body;
        
        const chat = await Chat.findOne({userId , _id: chatId})
        chat.messages.push({ role: "user", content: prompt, timestamp: Date.now(), isImage: false });

        // encode the prompt
        const encodePrompt= encodeURIComponent(prompt)
        // construct imagekit ai url

        const generatedImageUrl= `${ENV.IMAGEKIT_URL_ENDPOINT}/ik-genimg-prompt-${encodePrompt}/chatsgpt/${Date.now()}.jpg?tr=w-800,h-800`
        
        const aiImageRes = await axios.get(generatedImageUrl,{responseType: "arraybuffer"})
        const base64Image= `data:image/png;base64,${Buffer.from(aiImageRes.data, "binary").toString('base64')}`
        
        const uploadRes= await imagekit.files.upload({
            file: base64Image,
            fileName: `${Date.now()}.jpg`,
            folder: "chatsgpt",
        })
        const reply= {role: "assistant", content: uploadRes.url, timestamp: Date.now(), isImage: true, isPublished }
        chat.messages.push(reply)
        await chat.save()
        res.json({success: true , reply})
    } catch (error) {
        console.log("Error in imageMessageController : ", error.message)
        res.status(500).json({ success: false, message: error.message })
        
    }
    
}