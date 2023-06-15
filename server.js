import 'express-async-errors'
import morgan from 'morgan'
import express from 'express'
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from 'path';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import cookieParser from 'cookie-parser';
import notFoundMiddleware from './middleware/not-found.js'
import errorHandlerMiddleware from './middleware/error-handler.js'
import authenticateUser from './middleware/auth.js'
import dotenv from 'dotenv'
dotenv.config()
import connectDB from './db/connect.js'
import authRouter from './routes/authRoutes.js'
import itemsRouter from './routes/itemsRoutes.js'
const app = express() //make data posted available in controllers
if (process.env.NODE_ENV !== 'production') {
    app.use(morgan('dev'));
}
const __dirname = dirname(fileURLToPath(import.meta.url))
app.use(express.static(path.resolve(__dirname, './client/build')))

app.use(express.json())

//security & extra packages
app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(mongoSanitize());

app.get('/api/v1',(req, res) => {
    res.json({msg:'Hi, API'})
})

app.use('/api/v1/auth',authRouter)
app.use('/api/v1/items',authenticateUser, itemsRouter)

// only when ready to deploy
app.get('*', function (request, response) {
    response.sendFile(path.resolve(__dirname, './client/build', 'index.html'));
  }); 

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port = 5000

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, () => {
            console.log(`Server is listening on port ${port}...`)
        })
    } catch (err) {
        console.log(err)
    }
}
start()

