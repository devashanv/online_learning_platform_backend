import userModel from "../model/userModel.js";

export const getUserData = async (req, res) => {
    try{
        const {id} = req.body;

        const user = await userModel.findById(id);

        if (!user){
            return res.json({success: false, message: "User not found."});
        }

        res.json({
            success: true,
            userData: user,
            message: "User found."
        });
    }
    catch (error){
        res.json({success: false, message: error.message});
    }
}