import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import authRouter from './routers/authRouter.js';
import userRouter from './routers/userRouter.js';
import postRouter from './routers/postRouter.js';
import commentRouter from './routers/commentRouter.js';
import notifyRouter from './routers/notifyRouter.js';
import messageRouter from './routers/messageRouter.js';
import http from 'http';
import { Server } from 'socket.io';
import { socketServer } from './socketServer.js';

const app = express();
const dot = dotenv.config();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

const server = http.createServer(app);
const io = new Server(server);

app.use('/api', authRouter);
app.use('/api', userRouter);
app.use('/api', postRouter);
app.use('/api', commentRouter);
app.use('/api', notifyRouter);
app.use('/api', messageRouter);

const port = process.env.PORT || 5000;
const URL = process.env.MONGO_URI;

io.on('connection', socket => {
    socketServer(socket, io);
})

mongoose.connect(URL, {tls: true})
   .then(() => console.log('Connected to MongoDB'))
   .catch(err => console.error(err));

app.get('/', (req, res) => {
    res.status(500).send('Hello World');
})

server.listen(port, () => {
    console.log(`server is running on ${port}`);
})