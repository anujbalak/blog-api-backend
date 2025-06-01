import express from 'express'
import 'dotenv/config'
import passport from 'passport';
import { local } from './passport/local.js';
import { session } from './module/db.js';
import { deserializeUser, serializeUser } from './passport/serialize.js';
import { jwt } from './passport/jwt.js';
import cors from 'cors'
import cookieParser from 'cookie-parser'

import indexRouter from './routes/indexRouter.js';
import postRouter from './routes/postRouter.js';
import signupRouter from './routes/signupRouter.js';
import loginRouter from './routes/loginRouter.js';
import userRouter from './routes/userRouter.js';
import authorRouter from './routes/authorRouter.js';
import { refreshSite } from './module/refresh.js';

const app = express();
app.use(cookieParser());
app.use(express.urlencoded({extended: true}))
app.use(express.json());
app.use(session)
app.use(cors({credentials: true}));

app.use((req, res, next) => { 
    if (req.user) {
        console.log(req.user)
    }
    next()
})

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
})

app.use('/', indexRouter)
app.use('/login', loginRouter)
app.use('/posts', postRouter);
app.use('/users', userRouter);
app.use('/author', authorRouter);
app.use('/signup', signupRouter)
app.post('/refresh', refreshSite);

passport.use(jwt);
passport.use(local)
serializeUser
deserializeUser

const port = process.env.PORT;


app.listen(port, () => console.log('Server running at', port))