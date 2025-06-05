import { validationResult } from "express-validator";
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

export const putUserInfo = async (req, res) => {
    try {
        const errors = validationResult(req)

        // if (!errors.isEmpty()) {
        //     return res.status(400).json(errors.array());
        // }

        const {username, email, password} = req.body;
        const {id} = req.params;
        console.log(username)
        if (username) {
            await updateUsername({id, username})
            return res.json({message: 'Updated'})
        }

        if (email) {
            await updateEmail({id , email})
            return res.json({message: 'Updated'})
        }

        if (password) {
            const hashedPW = await bcrypt.hash(password, 10);
            await updatePassword({id, hashedPW})
        }
        return;
    } catch (error) {
        throw new Error(error);
    }
}