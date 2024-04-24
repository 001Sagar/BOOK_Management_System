import User from '../models/UserSchema';
import brcypt from 'bcrypt';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

async function SingUp(req: Request, res: Response) {
    try {
        const { name, email, phn, password }: { name: string, email: string, phn: number, password: string } = req.body;
        const salt = await brcypt.genSalt(10);
        const hashedPassword = await brcypt.hash(password, salt);
        const user = new User({
            name,
            email,
            phn,
            password: hashedPassword,
        });
        const new_user = await user.save();
        return res.status(200).json({
            message: "Signup Successfully",
            data: new_user
        });
    } catch (error) {
        console.log("Error in the SignUP ", error);
        return res.status(500).json({
            status: 500,
            success: false,
            error: error,
            message: "Get Server Errror"
        })
    }
}

async function login(req: Request, res: Response) {
    try {
        const { email, password }: { email: string, password: string } = req.body;
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }
        if (!user.password) {
            return res.status(500).json({ message: 'User password not found' });
        }
        const isMatch = await brcypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        return res.status(200).json({
            message: 'Login successful'
            , user,
            data: {
                token: jwt.sign(user.toJSON(), 'Guruji_Astro', { expiresIn: 10000 })
            }
        });
    } catch (error) {
        console.log("Error in the Login");
        return res.status(500).json({
            status: 500,
            success: false,
            error: error,
            message: "Get Server Errror"
        })
    }
}

async function updatepassword(req: Request, res: Response) {
    try {
        const { email, password, new_password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }
        if (!user.password) {
            return res.status(500).json({ message: 'User password not found' });
        }
        const isMatch = await brcypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const salt = await brcypt.genSalt(10);
        const hashedPassword = await brcypt.hash(new_password, salt);
        const userupdate = await User.findOneAndUpdate({ email }, { password: hashedPassword }, { new: true, upsert: true });
        return res.status(200).json({
            message: 'Password updated successfully',
            userupdate
        });
    } catch (error) {
        console.log("Error in the updatepassword", error);
        console.log("Error in the Login");
        return res.status(500).json({
            status: 500,
            success: false,
            error: error,
            message: "Get Server Errror"
        })

    }
}

async function deleteUser(req: Request, res: Response) {
    try {
        const { email, password } = req.body;
        const getuser = await User.findOne({ email });
        if (!getuser) {
            return res.status(400).json({ message: 'User not found' });
        }
        if (!getuser.password) {
            return res.status(500).json({ message: 'User password not found' });
        }
        const isMatch = await brcypt.compare(password, getuser.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const user = await User.findOneAndDelete({ email });
        return res.status(200).json({ message: 'User deleted successfully', user });
    } catch (error) {
        console.log("Error in the deleteUser");
        return res.status(500).json({
            status: 500,
            success: false,
            error: error,
            message: "Get Server Errror"
        })
    }
}


export default { SingUp, login, updatepassword, deleteUser }