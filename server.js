import express from "express";
import cors from "cors";
import 'dotenv/config';
import cookieParser from "cookie-parser";

import dbConnect from './config/dbConnect.js';
import authRouter from './routes/authRoutes.js';

const app = express();
const port = process.env.PORT || 5000;

//invoke db conn
dbConnect();

//add middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({credentials: true}))

//API endpoints
app.get('/', (req, res) => res.send("API Server Working"));
app.use("/api/auth", authRouter);

app.listen(port, () => {
    console.log(`Serever started on PORT:${port}`)
});