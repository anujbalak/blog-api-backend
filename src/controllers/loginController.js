import passport from 'passport'
import jwt from 'jsonwebtoken'
import { getUserByUsername } from '../module/queries.js';
import 'dotenv/config'

export const loginUser = () => passport.authenticate('local')

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await getUserByUsername(username);
        if (!user) {
            res.status(403).json({message:'No user found'})
        }
        const token = jwt.sign(user, process.env.JWT_SECRET, {expiresIn: '1 minute'})
        return res.status(200).json({
            message: 'Auth passed',
            token
        })
    } catch (error) {
        
    }
}