import express from 'express';
import { getComment, newComment,deleteComment,editComment} from '../controller/Comment.js';

const commentRouter=express.Router();

commentRouter.post('/card/newcomment',newComment);
commentRouter.get('/card/getcomment',getComment);
commentRouter.delete('/commentdelete/:id',deleteComment);
commentRouter.put('/comment/edit/:id',editComment);
export default commentRouter;