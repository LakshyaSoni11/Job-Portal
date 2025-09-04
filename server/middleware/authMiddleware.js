import jwt from 'jsonwebtoken'
import Company from '../models/Company.js'

//middleware function to protet the user and user will be able to proceed further only if token is valid and verified
export const ProtectRoute = async (req,res,next) =>{
    const token = req.headers.token
    if(!token){
        return res.json({success:false , message:"Not authorized try logging in again"})

    }
    try {
        const decoded = jwt.verify(token , process.env.JWT_SECRET)
        //remove password from the data
        req.company =await Company.findById(decoded.id).select('-password')
        next()//use to pass the control to the next route handler
    } catch (error) {
        res.json({success:false , message:error.message})
        
    }
} 