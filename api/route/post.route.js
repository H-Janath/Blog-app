import express from 'express';
import { verifyToken } from '../utils/verifyUser';
import { createPost } from '../controller/post.controller';

const route = express.Router();

route.post('/create',verifyToken,createPost);