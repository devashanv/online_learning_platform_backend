import jwt from "jsonwebtoken";

const userAuth = async (req, res, next) => {
    //token from cookie
    const {token} = req.cookies;

    if (!token){
        return res.json({success: false, message: "Access denied, Login again."})
    }
    else{
        try{
            //verify token
            const decodeToken = jwt.verify(token, process.env.JWT_SECRET);

            if (decodeToken.id){
                req.body.userId = decodeToken.id;
            }
            else{
                return res.json({success: false, messsage: "Access denied, Login again. decoded"})
            }

            next();
        }
        catch (error){
            return res.json({success: false, message: error.message});
        }
    }
}

export default userAuth;