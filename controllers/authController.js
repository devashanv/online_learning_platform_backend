import bcrypt from 'bcryptjs';
import  jwt from 'jsonwebtoken';
import userModel from '../model/userModel.js';

export const userRegister = async (req, res) => {
    //get user data
    const {firstName, lastName, email, password, role} = req.body;

    //check nulls
    if (!firstName || !lastName || !email || !password || !role){
        return res.json({success: false, message: "Missing data"});
    }

    try{

        //valid email
        const isEmailExist = await userModel.findOne({email});
        if (isEmailExist){
            return res.json({success: false, message: "Email already used."});
        }
        else{
            //encryption
            const encryptPassword = await bcrypt.hash(password, 10);

            //add user
            const user = new userModel({firstName, lastName, email, password: encryptPassword, role});
            await user.save();

            //jwt token
            const payload = {id: user._id};
            const expire = {expireIn: '1d'};

            const jwtToken = jwt.sign(payload, process.env.JWT_SECRET, expire);

            //add token to cookie
            res.cookie("token", jwtToken, {
               httpOnly: true,
               secure: process.env.NODE_ENV === "production",
               sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
               maxAge: 24 * 360 * 1000,
            });
        }

    }
    catch (error) {
        res.json({success: false, message: error.message})
    }
}