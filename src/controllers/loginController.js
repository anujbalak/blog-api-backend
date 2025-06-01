import passport from 'passport'
import jwt from 'jsonwebtoken'
import { getUserByUsername } from '../module/queries.js';
import 'dotenv/config'

export const loginUser = () => passport.authenticate('local')

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username  || !password) {
            return res.json({message: 'Please enter the credentials'})
        }
        const user = await getUserByUsername(username);
        if (!user) {
            return res.status(403).json({message:'No user found'})
        }
        const payload = {
            id: user.id,
            username: user.username,
            email: user.email,
            role: user.role
        }
        const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '1m'})

        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
            expiresIn: '1d'
        })

        // res.cookie('jwt', `Bearer ${refreshToken}`, {
        //     httpOnly: true,
        //     sameSite: 'None',
        //     secure: true,
        //     maxAge: 1000 * 60 * 60 * 24,
        // })
        
        return res.status(200).json({
            message: 'Auth passed',
            user: payload,
            accessToken,
            refreshToken
        })
    } catch (error) {
        console.error(error.message)
    }
}