import jwt from "jsonwebtoken";

const userAuth = async (req, res, next) => {
    //token from cookie
    const {token} = req.cookies;

    console.log("token : ", token);
    

    if (!token){
        return res.json({success: false, message: "Access denied, Login again."})
    }
    else{
        try{

            const tokenValue = token.split(" ")[0];
            const tokenRole = token.split(" ")[1];

            console.log("token value : ", tokenValue);
            console.log("token role : ", tokenRole);

            //verify token
            const decodeToken = jwt.verify(token, process.env.JWT_SECRET);

            if (decodeToken.id){
                req.body= decodeToken;
                console.log("decoded token user: ", decodeToken);
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