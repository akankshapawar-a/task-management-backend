import express from 'express';
import { addCard, createColumn, getColumn,getCardData, updateCardLables, updateCardDates,deleteCardsDate,updatedDescription} from '../controller/Column.js';
import authMiddleware from '../middleware/authentication.js';

const boardRouter=express.Router();

boardRouter.get('/board',authMiddleware,getColumn);
boardRouter.post('/createColumn',authMiddleware,createColumn);
boardRouter.post('/addcards/:columnId',authMiddleware,addCard);
boardRouter.put('/addcards/label/:cardId',authMiddleware,updateCardLables);
boardRouter.get('/cards/:id',authMiddleware,getCardData);
boardRouter.put('/cards/dates/:cardId',authMiddleware,updateCardDates);
boardRouter.delete('/cards/delete/date/:cardId',authMiddleware,deleteCardsDate);
boardRouter.put('/card/description/:cardId',authMiddleware,updatedDescription);
export default boardRouter;