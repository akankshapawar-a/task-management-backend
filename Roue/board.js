import express from 'express';
import { addCard, createColumn, getColumn } from '../controller/Column.js';
import authMiddleware from '../middleware/authentication.js';

const boardRouter=express.Router();

boardRouter.get('/board',authMiddleware,getColumn);
boardRouter.post('/createColumn',authMiddleware,createColumn);
boardRouter.post('/addcards/:columnId',authMiddleware,addCard);
export default boardRouter;