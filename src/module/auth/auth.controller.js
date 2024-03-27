import userModel from "../../../DB/model/user.model.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { sendEmail } from "../../services/sendEmail.js";


export const register = async (req, res) => {
  const { userName, email, password } = req.body;
  const user = await userModel.findOne({ email });
  if (user) {
    return res.status(409).json({ message: "email alredy exist" })
  }
  const hashPssword = await bcrypt.hash(password, parseInt(process.env.SALT_ROUND));
  const token= await jwt.sign({email},process.env.CONFIRMEMAILTOKEN,{expiresIn:60*60})
  const refreshToken=await jwt.sign({email},process.env.CONFIRMEMAILTOKEN,
    {expiresIn:60*60*24*30})
  const html = `
  <p>welcom  ${userName}</p>
  <div>
  <a href='${req.protocol}://${req.headers.host}/auth/confirmEmail/${token}'>confirm email</a>
   <a href='${req.protocol}://${req.headers.host}/auth/confirmEmail/${refreshToken}'>resend confirm email</a>;
   </div>
   
   `;
   
  await sendEmail(email, "confirm Email", html)
  const newUser = await userModel.create({ userName, email, password: hashPssword });
  if (!newUser) {
    return res.json({ message: "error while creat user" })
  }

  return res.status(201).json({ message: "success", newUser });
}
export const confirmEmail=async(req,res)=>{
const {token}=req.params;
const decoded=jwt.verify(token,process.env.CONFIRMEMAILTOKEN)
const user=await userModel.updateOne({email:decoded.email},{confirmEmail:true})
if(user.modifiedCount>0){
  return res.redirect(process.env.FRONTENDURL)
}
return res.json({message:"success",user})
}

export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email }).select('userName password confirmEmail');
  if (!user) {
    return res.status(400).json({ message: "email not found" });
  }
  if(!user.confirmEmail){
    return res.json({message:"plz confirm your email"})
  }
  const checkPassword = await bcrypt.compare(password, user.password);
  if (!checkPassword) {
    return res.status(400).json({ message: "Invalid Pssword" });
  }

  const token = jwt.sign({ id: user._id }, process.env.LOGINSIG, { expiresIn: '1h' });

  return res.status(200).json({ message: "success", token })
}
