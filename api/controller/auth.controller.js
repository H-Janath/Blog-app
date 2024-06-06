import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs'
export const signup =async (req,res)=>{
    const {username,email,password} = req.body;
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
        res.json({message:err.message})
    }
 
}