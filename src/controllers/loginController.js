import passport from 'passport'
import jwt from 'jsonwebtoken'
import { getUserByUsername } from '../module/queries.js';
import 'dotenv/config'

export const loginUser = async (req, res, next) => {
    
    passport.authenticate('local', {session: false}, (err, user, info) => {
        console.log(err);
        if (err || !user) {
            return res.status(400).json({
                message: info ? info.message : 'Login failed',
                user   : user
            });
        }

        req.login(user, {session: false}, (err) => {
            if (err) {
                res.send(err);
            }
        });

        const payload = {
            id: user.id,
            username: user.username,
            email: user.email,
            role: user.role
        }
        const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '15m'})

        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
            expiresIn: '1d'
        })

        res.status(200).json({
            message: 'Auth passed',
            user: payload,
            accessToken,
            refreshToken
        })
    })
    (req, res);
}

export const login = async (req, res, next) => {
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
        const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '15m'})

        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
            expiresIn: '1d'
        })

        // res.cookie('jwt', `Bearer ${refreshToken}`, {
        //     httpOnly: true,
        //     sameSite: 'None',
        //     secure: true,
        //     maxAge: 1000 * 60 * 60 * 24,
        // })
        
        res.clearCookie('connect.sid')
        res.status(200).json({
            message: 'Auth passed',
            user: payload,
            accessToken,
            refreshToken
        })
    } catch (error) {
        console.error(error.message)
    }
}