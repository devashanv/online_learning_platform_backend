import express from "express";
import { 
    getAllEnrollCourses,
    getCourseByStudent,
    getStudentByCourse,
    newEnroll, 
    updateEnrol
} from "../controllers/enrollController.js";
import rolesAutherization from "../middleware/roleAuthMiddleware.js";
import userAuth from "../middleware/userAuth.js";


const enrollRouter = express.Router();

//endpoints
enrollRouter.post("/save", newEnroll);
enrollRouter.post("/courses", getAllEnrollCourses);
enrollRouter.put("/update", updateEnrol);
enrollRouter.get("/students", getStudentByCourse);
enrollRouter.post("/stcourses", getCourseByStudent);


export default enrollRouter;