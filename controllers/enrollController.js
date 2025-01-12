import enrollModel from "../model/enrollModel.js";
import mongoose from "mongoose";

//enroll course
export const newEnroll = async (req, res) => {
    const {studentId, courseId} = req.body;

    if (!studentId || !courseId){
        return res.json({success: false, message: "Missing enroll data."})
    }

    try{
        const enroll = new enrollModel({studentId, courseId});
        await enroll.save();

        return res.json({
            sucess: true,
            data: enroll,
            message: "Enrollment successful."
        })
    }
    catch (error) {
        res.json({sucess: false, message: error.message});
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
            data: enrollCourses,
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
