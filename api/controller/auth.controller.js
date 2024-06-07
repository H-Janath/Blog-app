import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs'
import  jwt from "jsonwebtoken";
import { errorHandler } from "../utils/error.js";
export const signup = async (req, res, next) => {
    const { username, email, password } = req.body;
    if (
        !username ||
        !password ||
        !email ||
        username === '' ||
        email === '' ||
        password == ''
    ) {
        next(errorHandler(400, 'All field are required'));
    }
    const hashPassword = bcryptjs.hashSync(password, 12);
    const newUser = new User({
        username,
        email,
        password: hashPassword
    });


    try {
        await newUser.save();
        res.json({ message: 'Sign up succesful' });
    } catch (err) {
        next(err);
    }

}

export const signin = async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password || email === '' || password === '') {
        next(errorHandler(400, 'All field are required'))
    }

    

    try {
        const validUser = await User.findOne({ email });
        if (!validUser) {
            next(errorHandler(404, 'User not found'));
        }
        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if (!validPassword) {
            next(errorHandler(400, 'Invalid passsword'));
        }
        const token = jwt.sign(
            { id: validUser._id }, process.env.JWT_SECRET);
            const {password: pass, ...rest} = validUser._doc;
        res.status(200).cookie('access_token', token, {
            httpOnly: true
        }).json(rest);
    } catch (err) {
        next(err)
    }
}