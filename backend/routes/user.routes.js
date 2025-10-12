import express from 'express'
import { getPublishedImage, getUser, loginUser, registerUser } from '../controllers/user.controller.js';
import { protectRoute } from '../middlewares/protectRoute.js';

const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.get('/data', protectRoute, getUser);
userRouter.get('/published-images', protectRoute, getPublishedImage);


export default userRouter;