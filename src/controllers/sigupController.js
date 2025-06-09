import { body, validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import { addUser, getUserByEmail, getUserByUsername } from "../module/queries.js";


export const usernameValidationChain = 
    body('username').trim()
        .isAlphanumeric().withMessage('Use alphabet charaters or combination of alphabets and numbers')
        .isLength({max: 20, min: 3}).withMessage('Username length should be between 3 to 20 characters')
        .custom( async (value) => {
            const user = await getUserByUsername(value)
            if (user && user.username === value) {
                throw new Error('Username is already taken')
            }
        })
        
export const emailValidationChain = 
    body('email').trim()
        .isEmail().withMessage('Enter an email only')
        .custom( async (value) => {
            const user = await getUserByEmail(value)
            if (user && user.email === value) {
                throw new Error('Email is already in use')
            }
        })

export const passwordValidationChain = 
    body('password').trim()
        .isStrongPassword().withMessage('Enter a password with combination of characters, symbles and numbers')

export const confirmPasswordValicationChain =  
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
                const response = {errors: result.array(), type: 'warn'}
                return res.status(400).json(response);
            }
            const hashedPW = await bcrypt.hash(password, 10);
            await addUser(username, email, hashedPW)
            res.json({message: 'Account Created Successfully', type: 'success'})
        } catch (error) {
            console.error(error)
        }
    }

]