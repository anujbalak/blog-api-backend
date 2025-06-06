import { Router } from "express";
import passport from "passport";
import bcrypt from "bcryptjs";

import { getUserInfo, putPassword, putUsername } from "../controllers/userController.js";
import { confirmPasswordValicationChain, emailValidationChain, passwordValidationChain, usernameValidationChain } from "../controllers/sigupController.js";
import { body } from "express-validator";
import { getUserByUsername } from "../module/queries.js";

const oldPasswordValidationChain = 
    body('oldPassword').trim()
    .custom(async (value, {req}) => {
        const user = await getUserByUsername(req.body.username);
        const hashedPassword = await bcrypt.compare(value, user.password)
        if (!hashedPassword) {
            throw new Error('Incorrect Password')
        }
    })

const userRouter = Router();

userRouter.get("/:id", getUserInfo)
userRouter.put('/:id/username', usernameValidationChain, passport.authenticate('jwt', {session: false}), putUsername);
userRouter.put('/:id/email',emailValidationChain,passport.authenticate('jwt', {session: false}), putUsername);
userRouter.put('/:id/password',
    oldPasswordValidationChain,
    passwordValidationChain,
    confirmPasswordValicationChain, 
    passport.authenticate('jwt', {session: false}),
    putPassword
);

export default userRouter;