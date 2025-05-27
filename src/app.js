import express from 'express'
import 'dotenv/config'
import indexRouter from './routes/indexRouter.js';
import postRouter from './routes/postRouter.js';
import signupRouter from './routes/signupRouter.js';
import loginRouter from './routes/loginRouter.js';
import passport from 'passport';
import { local } from './passport/local.js';
import { session } from './module/db.js';
import { deserializeUser, serializeUser } from './passport/serialize.js';
import { jwt } from './passport/jwt.js';

const app = express();
app.use(express.urlencoded({extended: true}))
app.use(express.json());
app.use(session)

app.use((req, res, next) => {
    console.log(req.user)
    next()
})

app.use('/', indexRouter)
app.use('/login', loginRouter)
app.use('/posts', postRouter);
app.use('/signup', signupRouter)

passport.use(jwt);
serializeUser
deserializeUser

const port = process.env.PORT;


app.listen(port, () => console.log('Server running at', port))