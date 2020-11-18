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

/*
another way of using encryption where i used comparePassword function in userModel 

export const authUser= (req,res)=>{
    const {email, password} =req.body

   User.findOne({email})
   .exec((err,user)=>{
    if(err){
        console.log("err ",err)
    }
    else{
        user.comparePassword(password, (err, isMatch) =>{
            if (err) throw err;
            console.log('Password123:', isMatch); // -&gt; Password123: true
            if(isMatch){
                res.status(200).json({
                    _id:user._id,
                    email:user.email,
                    isAdmin : user.isAdmin,
                    token:null
                })
            }
            else{
                res.status(401).json({
                    error:'invalid email or password'
                })
                
            }
        });
        
        
    }
   })

}
 */