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
        // ref: 'user',
        required: true
    },
});

//text indexes
courseSchema.index({title: 'text', content: 'text'})

//course model
const courseModel = mongoose.model('course', courseSchema);

courseModel.createIndexes();

export default courseModel;