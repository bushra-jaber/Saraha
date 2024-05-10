export const asyncHandler=(fn)=>{
    return (req,res,next)=>{
        fn(req,res,next).catch(err=>{
            return res.json({message:"catch Error",error:err.stack})
        })
    }

}
export const globalErrorHandler=(err,req,res,next)=>{
    if(err){
        return res.json({message:err.message || "invalid format"});
    }
}
