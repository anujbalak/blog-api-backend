import { matchedData, validationResult } from "express-validator";
import { addUser, getUser, getUserForClient, updateEmail, updatePassword, updateUsername } from "../module/queries.js";
import bcrypt from 'bcryptjs'

export const getUserInfo = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await getUserForClient(id);
        res.json(user);
    } catch (error) {
        throw new Error(error)
    }
}

export const putPassword = async (req, res) => {
    try {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json(errors.array());
        }

        const { password } = req.body;
        const {id} = req.params;

        const hashedPW = await bcrypt.hash(password, 10);
        await updatePassword({id, password: hashedPW });
        
        return res.status(200).json({message: 'Password updated'})
    } catch (error) {
        throw new Error(error);
    }
}

export const putUsername = async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json(errors.array());
        }

        const {username} = req.body;
        const {id} = req.params;

        updateUsername({id, username})
        res.json({message: 'Updated'})
    } catch (error) {
        throw new Error(error);
    }
}

export const putEmail = async (req, res) => {
    try {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json(errors.array());
        }

        const {email} = req.body;
        const {id} = req.params;
        
        await updateEmail({id , email})
        return res.json({message: 'Updated'})

    } catch (error) {
        throw new Error(error);
    }
}