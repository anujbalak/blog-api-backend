import { addUser, getUser, getUserForClient, updateUser } from "../module/queries.js";
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
        const {username, email, password} = req.body;
        const {id} = req.params;

        const hashedPW = await bcrypt.hash(password, 10);
        await updateUser({id, username, email, password})
        res.json({message: 'Success'})
    } catch (error) {
        throw new Error(error);
    }
}