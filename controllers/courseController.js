import courseModel from "../model/courseModel.js";

//save course
export const saveCourse = async (req, res) => {
    //get course details
    const {title, description, content, instructorId} = req.body;

    //chek nulls
    if (!title || !description || !content || !instructorId){
        return res.json({success: false, message: "Missign course data."})
    }

    try{
       const course = new courseModel({title, description, content, instructorId});
       await course.save();

       return res.json({
            success: true,
            course: course,
            message: "Course successfully saved."

       })
    }
    catch (error)  {
        res.json({success: false, message: error.message});
    }
}

//all courses
export const getAllCourses = async (req, res) => {
    try{
        const courses = await courseModel.find();

        return res.json({
            success: true,
            courses: courses,
            message: "All courses got."
        })
    }
    catch (error){
        res.json({success: false, message: error.message});
    }
}

//get by id
export const getCourseById = async (req, res) => {
    const {id} = req.body;

    try{
        const course = await courseModel.findById(id);

        if (!course){
            return res.json({success: false, message: "Product not found."});
        }

        res.json({
            success: true,
            course: course,
            message: "Course found."
        })
    }
    catch (error){
        res.json({success: false, message: error.message});
    }
}

//update
export const updateCourse = async (req, res) => {
    const id = req.body._id;

    try{
        const course = await courseModel.findByIdAndUpdate(id, req.body, {new: true});

        if (!course){
            return res.json({success: false, message: "Course not found to update."});
        }
        
        res.json({
            success: true,
            course: course,
            messgae: "Course successfully updated." 
        })
    }
    catch (error){
        res.json({success: false, message: error.message});
    }
}

//delete 
export const deleteCourse = async (req, res) => {
    const id = req.body._id;

    try{
        const course = await courseModel.findByIdAndDelete(id);

        if (!course){
            return res.json({success: false, message: "Course not found to delete."})
        }

        res.json({
            success: true,
            course: course,
            message: "Course sucessfully deleted."
        })
    }
    catch (error){
        res.json({success: false, message: error.message});
    }
}