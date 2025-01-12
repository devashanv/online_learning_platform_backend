import express from "express";
import cors from "cors";
import 'dotenv/config';
import cookieParser from "cookie-parser";

import dbConnect from './config/dbConnect.js';
import authRouter from './routes/authRoutes.js';
import userRouter from "./routes/userRoutes.js";
import courseRouter from "./routes/courseRoutes.js";

const app = express();
const port = process.env.PORT || 5000;

//invoke db conn
dbConnect();

//add middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({credentials: true}))

//routes
app.get('/', (req, res) => res.send("API Server Working"));
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/course", courseRouter);

app.listen(port, () => {
    console.log(`Serever started on PORT:${port}`)
});