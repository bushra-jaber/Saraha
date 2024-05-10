import joi from "joi";

const dataMethod=['body','params','query']

export const generalFields={
  email:joi.string().email().required().messages({
    'string.empty':"email is required",
   "string.email":"plz enter a valid email",
}),
password:joi.string().min(8).max(20).required().messages({
  'string.empty':"password is required",
})
}
const validation=(schema)=>{
   return (req,res,next)=>{
    const validationArray=[];
    dataMethod.forEach(key=>{
      if(schema[key]){
        const validationResult= schema[key].validate(req[key],{abortEarly:false})
    if(validationResult.error){
      validationArray.push(validationResult.error)
    }
      }
    })
    if(validationArray.length>0){
      return res.status(400).json({message:"validation error ",validationArray})
    }
    
    next();
} 
}


export default validation;