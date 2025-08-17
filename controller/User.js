import bcryptjs from 'bcryptjs';
import User from "../Model/User.modle.js";
import jwt from 'jsonwebtoken';
export const Signup=async(req,res)=>{
 const TOKEN=process.env.JWT_SECRET_KEY;
 const JWT_EXPIRE_IN = process.env.JWT_EXPIRES_IN;
 const {username,email,password}=req.body;
 
 try{
   const existingUser=await User.findOne({email});
   if(existingUser){
      return res.status(409).json({error:'User already exists'});
   }
   const hashpassword=bcryptjs.hashSync(password,10);
 const newUser=new User({username,email,password:hashpassword});

    await newUser.save();
   const token = jwt.sign(
            { id: newUser._id, email: newUser.email }, 
            TOKEN, 
            { expiresIn: JWT_EXPIRE_IN }
        );
     return res.status(201).json({
            status: 'SUCCESS',
            message: 'User created successfully',
            token,
            user: {
                id: newUser._id,
                email: newUser.email,
                username: newUser.username,
            }
        });
 }catch(error){
    res.status(500).json({message:error.message});
 }
}

export const Login=async(req,res)=>{
const TOKEN=process.env.JWT_SECRET_KEY;
 const JWT_EXPIRE_IN = process.env.JWT_EXPIRES_IN;
const {email,password}=req.body;
try{
const user=await User.findOne({email});
if(!user){
   return res.status(400).json({ error: "User does not exist" });
}
const validation=bcryptjs.compareSync(password,user.password);
if(!validation){
   return res.status(400).json({error:'Invalid email or password'});
} 
const token=jwt.sign({id:user._id,email:user.email},
   TOKEN,{expiresIn:JWT_EXPIRE_IN}
);

res.status(200).json({
   message:'Login Successful',
  token,
   user:{
      id:user._id,
      email:user.email,
      username:user.username,
   }
});

}catch(error){
   res.status(500).json({message:error.message});
}
};