import jwt from "jsonwebtoken"

const authMiddleware = async (req,res,next) => {
    // const {token} = req.headers;

    // const {token} = req.body.token || req.query.token || req.headers;
    
    const token = req.headers?.token;
    if (!token) {
        return res.json({success:false,message:"Not Authorized Login"});        
    }
    if (!token || typeof token !== 'string') {
        return res.json({ message: 'Token must be a string' });
    }
    
    try {
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        
        // Old
        // req.boby.userId = token_decode.id;
        req.user = { id: token_decode.id };
        console.log("userId:", req.user.id);
        
        // New
        // Best practice: assign to req.user
        // req.body = { userId: token_decode.id };
        
        // req.body.userId = req.body.userId;
        // res.json({success:false,message:req.body.userId})

        next();
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error in auth "+error})
    }

}

export default authMiddleware;