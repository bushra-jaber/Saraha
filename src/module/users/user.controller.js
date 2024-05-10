import userModel from "../../../DB/model/user.model.js"
import cloudinary from "../../services/cloudinary.js"

export const profile=async(req,res)=>{
  const user=await userModel.findById(req.user._id)
  
    return res.json({message:'success',user}) 
    }
    export const uploadFile=async(req,res,next)=>{
     const {secure_url}=await cloudinary.uploader.upload(req.file.path,
    {folder:`${process.env.APP_NAME}/users`});
      const user= await userModel.findByIdAndUpdate(req.user._id,
        {profilePic:secure_url},{new:true})
        return res.json({message:"success",user});
    }
    