import express from 'express';
import { 
    deleteCourse, 
    getAllCourses, 
    getCourseById, 
    getInstructorCourses, 
    saveCourse, 
    updateCourse 
} from '../controllers/courseController.js';


const courseRouter = express.Router();

//endpoints
courseRouter.post("/save", saveCourse);
courseRouter.get("/data" , getAllCourses);
courseRouter.get("/course", getCourseById);
courseRouter.post("/incourses", getInstructorCourses);
courseRouter.put("/update", updateCourse);
courseRouter.delete("/delete", deleteCourse);


export default courseRouter;