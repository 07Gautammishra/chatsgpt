import User from "../models/user.model.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { ENV } from "../configs/ENV.js";
import Chat from "../models/chat.model.js";

const generateToken = (id) => {
    return jwt.sign({ id }, ENV.JWT_SECRET, {
        expiresIn: '15d',
    });

}


export const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        // check if user already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ success: false, message: "User already exists" });
        }

        // hash password before saving
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // create user with hashed password
        const user = await User.create({ name, email, password: hashedPassword });

        const token = generateToken(user._id);

        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            token,
        });
    } catch (error) {
        console.error("Error in registerUser(sign up):", error.message);
        res.status(500).json({ success: false, message: error.message });
    }
};


export const loginUser = async (req, res) => {
    const { email, password } = req.body;   
    try {
        const user = await User.findOne({ email });
        if (user) {
            const isMatched = await bcrypt.compare(password, user.password);
            if (isMatched) {
                const token = generateToken(user._id);
                return res.status(200).json({ success: true, message: 'User logged in successfully', token });
            }
        } 
        return  res.status(401).json({ success: false, message: 'Invalid email or password' });

    } catch (error) {
        console.log("Error in loginUser: ", error.message);
        res.status(500).json({ success: false, message: error.message });
    }
}
export const getUser = async (req, res) => {
    try {
        const user = req.user;
        return res.status(200).json({ success: true, user });

    }catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

export const getPublishedImage= async(req, res)=>{
    try {
        const publishedImageMessage= await Chat.aggregate([
            {$unwind: "$messages"},
            {
                $match:{
                    "messages.isImage": true,
                    "messages.isPublished": true
                }
            },
            {
                $project:{
                    _id:0,
                    imageUrl: "$messages.content",
                    userName:"$userName"
                }
            }
        ])

        res.status(200).json({success: true, images: publishedImageMessage.reverse()})
    } catch (error) {
        
        res.status(500).json({ success: false, message: error.message });
    }
}