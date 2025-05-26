import { body, validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import { addUser } from "../module/queries.js";


const usernameValidationChain = 
    body('username').trim()
        .isAlphanumeric().withMessage('Use alphabet charaters or combination of alphabets and numbers')
        .isLength({max: 20, min: 3}).withMessage('Username length should be between 3 to 20 characters');

const emailValidationChain = 
    body('email').trim()
        .isEmail().withMessage('Enter an email only')
        // .custom((value, { req }) => {

        // });

const passwordValidationChain = 
    body('password').trim()
        .isStrongPassword().withMessage('Enter a password with combination of characters, symbles and numbers')

const confirmPasswordValicationChain =  
    body('confirmPassword').trim()
        .custom((value, {req}) => {
        return value === req.body.password;
        }).withMessage('Password is not matching');

export const signupUser = [
    usernameValidationChain,
    emailValidationChain,
    passwordValidationChain,
    confirmPasswordValicationChain,
    async (req, res) => {
        try {
            const {username, email, password, confirmPassword} = req.body;

            const result = validationResult(req)
            if (!result.isEmpty()) {
                return res.json(result.array());
            }
            console.log(username);
            const hashedPW = await bcrypt.hash(password, 10);
            await addUser(username, email, hashedPW)
            res.json({message: 'Success'})
        } catch (error) {
            console.error(error)
        }
    }

]