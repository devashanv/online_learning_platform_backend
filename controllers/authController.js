import bcrypt from 'bcryptjs';
import  jwt from 'jsonwebtoken';
import userModel from '../model/userModel.js';

//register
export const userRegister = async (req, res) => {
    //get user data
    const {firstName, lastName, email, password, role} = req.body;

    //check nulls
    if (!firstName || !lastName || !email || !password || !role){
        return res.json({success: false, message: "Missing data."});
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
            const expire = {expiresIn: '1d'};
            const jwtToken = jwt.sign(payload, process.env.JWT_SECRET, expire);

            //set cookie
            res.cookie("token", jwtToken, {
               httpOnly: true,
               secure: process.env.NODE_ENV === "production",
               sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
               maxAge: 24 * 360 * 1000,
            });

            return res.json({sucess: true, message: "Registration successful."})
        }

    }
    catch (error) {
        res.json({success: false, message: error.message})
    }
}

//login
export const userLogin = async (req, res) => {
    const {email, password} = req.body;

    if (!email || !password){
        return res.json({sucess: false, message: "Email and password required."})
    }

    try{
        //get user
        const loginUser = await userModel.findOne({email});
        if (!loginUser){
            return res.json({success: false, message: "Email address invalid."});
        }

        //check password
        const isPasswordCorrect = await bcrypt.compare(password, loginUser.password);

        if (!isPasswordCorrect){
            return res.json({sucess: false, message: "Password incorrect."});
        }

        //token
        const payload = {id: loginUser._id};
        const expire = {expiresIn: "1d"};
        const jwtToken = jwt.sign(payload, process.env.JWT_SECRET, expire);

        res.cookie("token", jwtToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
            maxAge: 24 * 360 * 1000,
        });

        return res.json({sucess: true, message: "Login succesful."})

    }
    catch (error){
        return res.json({success: false, message: error.message});
    }
}

//logout
export const userLogout = async (req, res) => {
    try{
        //unset cookie
        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",  
        });

        return res.json({sucess: true, message: "Logout successful."})
    }
    catch (error){
        return  res.json({success: false, message: error.message});
    }
}

//check authentication
export const userAuthentication = async (req, res) => {
    try{
        return res.json({success: true, message: "user Authenticated."})
    }
    catch (error){
        return res.json({success: false, message: error.message});
    }
}