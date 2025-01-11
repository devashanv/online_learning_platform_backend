//role authorization
const rolesAutherization = (...role) => {
    return (req, res, next) => {
        if (!role.includes(req.body.role)){
            return res.json({success: false, message: "User role access denied."});
        }
        next();
    }
}

export default rolesAutherization;