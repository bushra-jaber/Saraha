import messageModel from "../../../DB/model/message.model.js";
import userModel from "../../../DB/model/user.model.js";

export const getmessage=async(req,res)=>{
const messageList=await messageModel.find({recieverId:req.user._id})
 
return res.json({message:'okkk',messageList}) 
}

export const sendMessage=async(req,res)=>{
    const {recieverId}=req.params;
    const {content}=req.body;
  
   const user= await userModel.findById(recieverId);
    
   const Creatmessage=await messageModel.create({content, recieverId})
   return res.status(201).json({message:"success",Creatmessage})
 
    
    }

