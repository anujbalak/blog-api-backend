import jwt from 'jsonwebtoken'
import 'dotenv/config';

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
        res.status(200).json(user)
    } else {
        return res.status(406).json({message: 'Unauthorized'});
    }
}