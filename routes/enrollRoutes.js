import express from "express";
import { 
    getAllEnrollCourses,
    getAllEnrollments,
    getCourseByStudent,
    getCourseStudents,
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
enrollRouter.post("/enrollments", getAllEnrollments)
enrollRouter.post("/coursestudents", getCourseStudents);


export default enrollRouter;