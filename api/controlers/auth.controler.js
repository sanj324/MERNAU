import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';

export const signup = async (req, res, next) => {
    const { username, email, password } = req.body;
    try {
        console.log('Signup request:', { username, email });
        
        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return next(errorHandler(400, 'Username or email already exists'));
        }

        const hashedPassword = bcryptjs.hashSync(password, 10);
        const newUser = new User({ username, email, password: hashedPassword });
        
        console.log('Attempting to save user:', newUser);
        const savedUser = await newUser.save();
        console.log('User saved successfully:', savedUser);
        
        res.status(201).json({ 
            success: true,
            message: "User created successfully"
        });
    } catch (error) {
        console.error('Error in signup:', error);
        next(error);
    }
};

export const signin = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const validUser = await User.findOne({ email });
        if (!validUser) return next(errorHandler(404, 'User not found'));
        
        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if (!validPassword) return next(errorHandler(401, 'Wrong credentials'));
        
        const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
        const { password: hashedPassword, ...rest } = validUser._doc;
        const expirydate = new Date(Date.now() + 1000 * 60 * 60 * 24);
        
        res.cookie('access_token', token, { httpOnly: true, expires: expirydate })
            .status(200)
            .json(rest);
    } catch (error) {
        next(error);
    }
};