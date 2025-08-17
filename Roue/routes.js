import express from 'express';
import { Login, Signup } from '../controller/User.js';

const userRoute=express.Router();

userRoute.post('/signup',Signup);
userRoute.post('/login',Login);
export default userRoute;