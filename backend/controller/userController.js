import asyncHandler from'express-async-handler'
import User from '../models/userModel.js';

export const authUser = asyncHandler(async (req,res)=>{
    const {email, password} =req.body

    const user = await User.findOne({email})

    

    if(user && (await user.matchPassword(password))){
        res.status(200).json({
            _id:user._id,
            email:user.email,
            isAdmin : user.isAdmin,
            token:null
        })
    }
    else{
        res.status(401)
        throw new Error('Invalid email or password')
    }

})