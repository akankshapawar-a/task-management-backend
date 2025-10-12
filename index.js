import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoute from './Roue/routes.js';
import boardRouter from './Roue/board.js';
import commentRouter from './Roue/comment.js';
import attachmentRoutes from './Roue/attachmentRoutes.js'

dotenv.config();
const port=5000;
const app=express();

mongoose.connect(process.env.MONGO_URL).then(()=>
console.log('Sucessfully connect with mongodb')).catch((error)=>{
    console.log('MongoDb failed to connect',error);
});


app.use(express.json());
app.use(cors());

app.use('/uploads', express.static('uploads'));

app.use('/api',userRoute);
app.use('/api',boardRouter);
app.use('/api',commentRouter);
app.use('/api/attachments', attachmentRoutes);

app.listen(port,()=>{
    console.log(`http://localhost:${port}`);
})


