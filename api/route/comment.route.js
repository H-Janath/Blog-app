import express from 'express';
import { createComment, getPostComment } from '../controller/comment.controller.js';
import {verifyToken} from '../utils/verifyUser.js'
const router = express.Router();

router.post('/create',verifyToken,createComment);
router.get('/getPostComment/:postId',getPostComment)

export default router;