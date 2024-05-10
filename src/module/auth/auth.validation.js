import joi from 'joi';
import { generalFields } from '../../middleware/validation.js';
export const RegisterSchema={
body:joi.object({
    userName:joi.string().alphanum().min(3).max(20).required().messages({
        "string.empty":"userName is required",
       
    }

    ),
    email: generalFields.email,
    password:generalFields.password,
    checkPassword:joi.valid(joi.ref('password')).required(),
   
}),
query:joi.object({
    test:joi.boolean().required()
})
};

export const LogInSchema={
   body:joi.object({
  
    email:generalFields.email,
    password:generalFields.password,
   
})
}
