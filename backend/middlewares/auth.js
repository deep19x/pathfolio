const jwt = require('jsonwebtoken');

const authMiddleware = async(req,res,next) => {
    const token = req.cookies.token;
    if(!token){
        return res.status(400).json({success:false,message:"Please login first"});
    }

    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).json({success:false,message:"Token is invalid!"});
    }
}

module.exports = authMiddleware;