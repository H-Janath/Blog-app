import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs'
import { errorHandler } from "../utils/error.js";
export const signup =async (req,res,next)=>{
    const {username,email,password} = req.body;
    if(
        !username||
        !password||
        !email||
        username === ''||
        email === ''||
        password ==''
    ){
        next(errorHandler(400,'All field are required'));
    }
    const hashPassword = bcryptjs.hashSync(password,12);
    const newUser = new User({
        username,
        email,
        password : hashPassword
    });


    try{
        await newUser.save();
        res.json({message:'Sign up succesful'});
    }catch(err){
        next(err);
    }
 
}