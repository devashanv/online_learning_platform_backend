import express from "express";
import { 
    getAllEnrollCourses,
    newEnroll, 
    updateEnrol
} from "../controllers/enrollController.js";


const enrollRouter = express.Router();

//endpoints
enrollRouter.post("/save", newEnroll);
enrollRouter.get("/courses", getAllEnrollCourses);
enrollRouter.put("/update", updateEnrol);


export default enrollRouter;