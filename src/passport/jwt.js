import jwtPassport from 'passport-jwt'
import 'dotenv/config'
import { getUser } from '../module/queries.js';

const JWTStrategy = jwtPassport.Strategy;
const ExtractJWT = jwtPassport.ExtractJwt;

let opts = {};
opts.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET;

export const jwt = new JWTStrategy(opts, async(payload, done) => {
    try {
        const user = await getUser(payload.id)
        if (!user) {
            return done(null, false)
        }
        return done(null, user)
    } catch (error) {
        return done(error , false);
    }
})
