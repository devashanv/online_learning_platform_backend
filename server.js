import express from "express";
import cors from "cors";
import 'dotenv/config';
import cookieParser from "cookie-parser";

const app = express();
const port = process.env.PORT || 5000;

//add middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({credentials: true}))

app.get('/', (req, res) => res.send("API Server Working"));
app.listen(port, () => {
    console.log(`Serever started on PORT:${port}`)
});