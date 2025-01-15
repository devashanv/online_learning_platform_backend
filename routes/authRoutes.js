import express from "express";
import { 
    userAuthentication,
    userLogin, 
    userLogout, 
    userRegister } from "../controllers/authController.js";
import userAuth from "../middleware/userAuth.js";


const authRouter = express.Router();

//endpoints
authRouter.post("/register", userRegister);
authRouter.post("/login", userLogin);
authRouter.post("/logout", userLogout);
authRouter.post("/is-auth", userAuth, userAuthentication);

export default authRouter;