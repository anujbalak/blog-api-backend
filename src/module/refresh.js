import jwt from 'jsonwebtoken'
import 'dotenv/config';
import { getUser } from './queries.js';

export const refreshSite = async (req, res) => {
    if (req.headers?.authorization) {
        let user = null;
        const auth = req.headers.authorization;
        const refreshToken = (auth.split(' '))[1];
        jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, decoded) => {
            if (err) {
                return console.error(err);
            }
            user = decoded;
        })

        let userData = null;
        if (user) {
            userData = await getUser(user.id);
        }

        let payload = {
            id: userData.id,
            username: userData.username,
            email: userData.email,
            role: userData.role
        }
        
        const accessToken = jwt.sign(payload, process.env.JWT_SECRET)

        res.status(200).json({
            user: payload,
            accessToken
        })
    } else {
        return res.status(406).json({message: 'Unauthorized'});
    }
}