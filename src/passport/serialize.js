import passport from "passport";
import { getUser } from "../module/queries.js";

export const serializeUser =  passport.serializeUser((user, done) => {
    console.log('ade')
    done(null, user.id)
})

export const deserializeUser =  passport.deserializeUser(async (id, done) => {
    try {
        const user = await getUser(id)
        done(null, user)
    } catch (error) {
        done(err)
    }
})
