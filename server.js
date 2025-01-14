import express from "express";
import cors from "cors";
import 'dotenv/config';
import cookieParser from "cookie-parser";

import dbConnect from './config/dbConnect.js';
import authRouter from './routes/authRoutes.js';
import userRouter from "./routes/userRoutes.js";
import courseRouter from "./routes/courseRoutes.js";
import enrollRouter from "./routes/enrollRoutes.js";

const app = express();
const port = process.env.PORT || 5000;

//invoke db conn
dbConnect();

//origins
const frontendOrigins = ['http://localhost:5173'];

//add middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({origin: frontendOrigins, credentials: true}))

//routes
app.get('/', (req, res) => res.send("API Server Working"));
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/course", courseRouter);
app.use("/api/enroll", enrollRouter);

app.listen(port, () => {
    console.log(`Serever started on PORT:${port}`)
});