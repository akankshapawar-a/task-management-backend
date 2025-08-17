import jwt from 'jsonwebtoken';

const authMiddleware=(req,res,next)=>{
    const token=req.headers.authorization?.split(' ')[1];
    if(!token) return res.status(401).json({ message: "No token, auth denied" });

    try{
        const decoded=jwt.verify(token ,process.env.JWT_SECRET_KEY);
         req.user = {
            id: decoded.id,
            email: decoded.email
        };
        next();

    } catch(err){
        res.status(401).json({message:'Invalid token'});
    }
}
export default authMiddleware;