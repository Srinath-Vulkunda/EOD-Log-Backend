import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config({ quiet: true });
//Register a new user
export const register = async (req, res) => {
    const { name, email, password } = req.body;

    try{
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, password: hashedPassword });

        res.status(201).json({ message: 'User created successfully', user });
     }catch(error){
         console.error('Error creating user:', error);
         res.status(500).json({ message: 'Error creating user' });
     }
}

export const login = async (req,res) => {
    const { email, password } = req.body;

    try{
        const user = await User.findOne({email});
        if(!user){
            return res.status(404).json({message: 'User not found'});
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if(!isPasswordCorrect){
            return res.status(401).json({message: 'Incorrect password'});
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

        res.status(200).json({ message: 'Login successful', token, user });
        
    }catch(error){
        console.error('Error logging in:', error);
        res.status(500).json({message: 'Error logging in'});
    }
}