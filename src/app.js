import express from 'express'
import 'dotenv/config'
import indexRouter from './routes/indexRouter.js';
import userRouter from './routes/accountRouter.js';
import postRouter from './routes/postRouter.js';
import signupRouter from './routes/signupRouter.js';

const app = express();
app.use(express.urlencoded({extended: true}))
app.use(express.json());

app.use('/', indexRouter)
app.use('/login', userRouter)
app.use('/posts', postRouter);
app.use('/signup', signupRouter)

const port = process.env.PORT;


app.listen(port, () => console.log('Server running at', port))