import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    instructorId: {
        type: String,
        required: true
    },
});

//course model
const courseModel = mongoose.model('course', courseSchema);

export default courseModel;