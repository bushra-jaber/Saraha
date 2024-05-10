
import userRouter from './users/user.router.js';
import messageRouter from './message/message.router.js';
import authRouter from './auth/auth.router.js';
import connectDB from '../../DB/connection.js';
import { globalErrorHandler } from '../services/errorHandling.js';


export const initApp=(app,express)=>{
 
   connectDB();
 app.use(express.json());
 app.get('/',(req,res)=>{
    return res.json({message:"welcome"});
 });
app.use('/user',userRouter);
app.use('/message',messageRouter);
app.use('/auth',authRouter);

app.use('*',(req,res)=>{
    return res.json({message:"page not found"});
 })
 app.use(globalErrorHandler);

}