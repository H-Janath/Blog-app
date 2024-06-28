import express from 'express'
import { create, getPost,deletePost } from '../controller/post.controller.js';
import { verifyToken } from '../utils/verifyUser.js';


const route = express.Router();

route.post("/create",verifyToken,create);
route.get('/getPost',getPost);
route.delete('/deletepost/:postId/:userId',verifyToken,deletePost);

export default route;