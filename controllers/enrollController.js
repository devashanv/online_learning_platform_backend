import courseModel from "../model/courseModel.js";
import enrollModel from "../model/enrollModel.js";
import mongoose from "mongoose";
import userModel from "../model/userModel.js";

//new enroll 
export const newEnroll = async (req, res) => {
    const {studentId, courseId} = req.body;

    console.log("studenr", studentId)
    console.log("course", courseId)

    if (!studentId || !courseId){
        return res.json({success: false, message: "Missing enroll data."})
    }

    try{
        const enroll = new enrollModel({studentId, courseId});
        await enroll.save();

        return res.json({
            success: true,
            data: enroll,
            message: "Enrollment successful."
        })
    }
    catch (error) {
        res.json({success: false, message: error.message});
    }
}

//get all enroll by id
export const getAllEnrollCourses = async (req, res) => {
    const {studentId} = req.body;

    try{
        const enrollCourses = await enrollModel.find({studentId});

        if (enrollCourses.length === 0){
            return res.json({success: false, message: "No enrolle courses to student."})
        }

        return res.json({
            success: true,
            courses: enrollCourses,
            message: "Found all enroll courses."
        })
    }
    catch (error) {
        res.json({success: false, message: error.message});
    }
}

//update enroll
export const updateEnrol = async (req, res) => {
    const id = req.body._id;

    try{
        const enroll = await enrollModel.findByIdAndUpdate(id, req.body, {new: true});

        if (!enroll){
            return res.json({success: false, message: "Enrollment not found."});
        }

        return res.json({
            success: true,
            data: enroll,
            message: "Enrollment update successful."
        })
    }
    catch (error) {
        res.json({success: false, message: error.message});
    }
}

//get students by course
export const getStudentByCourse = async (req, res) => {
    const {courseId} = req.body;

    try{
        const enrollments = await enrollModel.find({courseId}).populate('studentId')

        if (!enrollments){
            return res.json({success: false, message: "No enrollments course found."});
        }

        const students = enrollments.map((enrollment) => enrollment.studentId);

        if (!students){
            return res.json({success: false, message: "No enrollments."});
        }

        return res.json({
            success: true,
            students: students,
            message: "Get all students get successful."
        })        


    }
    catch (error){
        return res.json({success: false, message: error.message});
    }
}

//get course by student
export const getCourseByStudent =  async (req, res) => {
    const {studentId} = req.body;

    try{
        const enrollments = await enrollModel.find({studentId}).populate("courseId").exec();

        if (!enrollments){
            return res.json({success: false, message: "No enrollments."});
        }

        const courses = enrollments.map(enroll => enroll.courseId);

        return res.json({
            success: false,
            courses: courses, 
            message: error.message
        });
        
    }
    catch (error){
        return res.json({success: false, message: error.message});
        
    }
}

//student courses
export const getAllEnrollments = async (req, res) => {
    const {studentId} = req.body;

    try{

        const enrollments = await enrollModel.find({ studentId })

        const courseIndexes = enrollments.map((enroll) => enroll.courseId)

        const courses =  await courseModel.find({_id: {$in: courseIndexes}})

        return res.json({
            success: true,
            courses: courses,
            message: "Enrollmenmts get successfull."
        })

    }
    catch (error){
        return res.json({success: false, message: error.message});
    }
}

//course stuydents
export const getCourseStudents = async (req, res) => {
    const {courseId} = req.body;

    try{

        const enrollments = await enrollModel.find({ courseId })

        const studentIndexes = enrollments.map((enroll) => enroll.studentId)

        const students =  await userModel.find({_id: {$in: studentIndexes}})

        return res.json({
            success: true,
            students: students,
            message: "All students of course get successfull."
        })

    }
    catch (error){
        return res.json({success: false, message: error.message});
    }
}
