import pkg from 'passport-local'
import bcrypt from 'bcryptjs';
import { getUserByUsername } from '../module/queries.js';

const LocalStrategy = pkg.Strategy;

export const local = new LocalStrategy(async (username, password, done) => {
    try {
        const user = await getUserByUsername(username);
        if (!user) {
            return done(null, false, {message: 'User does not exists'});
        }

       const hashedPassword = await bcrypt.compare(password, user.password)
       if (!hashedPassword) {
        return done(null, false, {message: 'Incorrect email or password'})
       }
       return done(null, user)
    } catch (err) {
        return done(err);
    }
})