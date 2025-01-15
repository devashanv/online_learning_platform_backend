import mongoose from "mongoose";

const enrollSchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'courses'
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    status: {
        type: String,
        required: true,
        default: "following"
    }
})

//enroll model
const enrollModel = mongoose.model('enroll', enrollSchema);

export default enrollModel;