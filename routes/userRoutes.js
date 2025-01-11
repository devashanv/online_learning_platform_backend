import express from "express";
import userAuth from "../middleware/userAuth.js";
import rolesAutherization from "../middleware/roleAuthMiddleware.js";
import { getUserData } from "../controllers/userController.js";

const userRouter = express.Router();

//intructor
userRouter.get("/admin", userAuth, rolesAutherization("admin"), (req, res) => {
    return res.json({message: "Welcome instructor"});
})

//student
userRouter.get("/user", userAuth, rolesAutherization("student", "admin"), (req, res) => {
    return res.json({message: "Welcome student"});
})

//common
userRouter.get("/userdata", userAuth, getUserData);

export default userRouter;