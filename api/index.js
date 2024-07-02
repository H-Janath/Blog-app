import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoute from './route/user.route.js'
import AuthRouter from './route/auth.route.js'
import cookieParser from 'cookie-parser';
import postRoute from './route/post.route.js'
import commentRoute from './route/comment.route.js'
dotenv.config();
mongoose.connect(process.env.MONGO).then(
    ()=>{
        console.log("Mongodb is connected");
    }).catch((error)=>{
        console.log(error)
    })
const app = express();

app.use(express.json());
app.use(cookieParser());


app.listen(3000,()=>{
    console.log("Server is running on port 3000");
});


app.use('/api/user',userRoute);
app.use('/api/auth',AuthRouter);
app.use('/api/post',postRoute);
app.use('/api/comment',commentRoute);


app.use((err,req,res,next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal server error";
    res.status(statusCode).json({
        success: false,
        statusCode,
        message
    })
})