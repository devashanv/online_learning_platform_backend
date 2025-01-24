import axios from "axios";
import courseModel from "../model/courseModel.js";

//search
export const searchCourses = async (req, res) => {
    const {prompt} = req.body;

    try{

        //invoke GPT API
        const result = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: 'gpt-3.5-turbo',
                messages: [
                    {role: 'user', content: prompt}
                ],
                max_tokens:100
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.CHATGPT_API_KEY}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        //get keywords
        const response = result.data.choices[0].message.content;
        const keywords = response.split(/\s+/);

        const courses = [];

        for (let key of keywords){
            //get course from db
            const course = await courseModel.find({$text: {$search: key}});


            courses.push(...course);
        }

        if (courses.length === 0){
            return res.json({success: false, message: "Courses not found."});
        }

        //remove dupliates
        for (let i = 0; i < courses.length; i++){
            for (let j = i + 1; j < courses.length; j++){
                if (courses[i].title === courses[j].title){
                    courses.splice(j, 1)
                }
            }
        }
    
        return res.json({
            success: true,
            courses: courses,
            message: "Recommendation courses are found."

       })
    }
    catch (error){
        res.json({success: false, message: error.message});
    }

}