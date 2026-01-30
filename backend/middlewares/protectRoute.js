import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
// Updated protectRoute
export const protectRoute = async(req, res, next) => {
    let token = req.headers.authorization;
    if (!token) return res.status(401).json({ success: false, message: "No token provided" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);
        
        if (!user) return res.status(401).json({ success: false, message: 'User not found' });

        req.user = user;
        next();
    } catch (error) { 
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({ success: false, message: 'Session expired, please login again' });
        }
        return res.status(401).json({ success: false, message: 'Invalid token' });
    }
}
