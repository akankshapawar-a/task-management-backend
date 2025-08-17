import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoute from './Roue/routes.js';
import boardRouter from './Roue/board.js';

dotenv.config();
const port=5000;
const app=express();

mongoose.connect('mongodb+srv://akankshapawar131202:jiFN2vEfLVJdiFr4@cluster0.fvskhj9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0').then(()=>
console.log('Sucessfully connect with mongodb')).catch((error)=>{
    console.log('MongoDb failed to connect',error);
});


app.use(express.json());
app.use(cors());
app.use('/api',userRoute);
app.use('/api',boardRouter);

app.listen(port,()=>{
    console.log(`http://localhost:${port}`);
})

