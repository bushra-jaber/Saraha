import joi from 'joi';
export const RegisterSchema={
body:joi.object({
    userName:joi.string().alphanum().min(3).max(20).required().messages({
        "string.empty":"userName is required",
        "any.required":"userName is required"
    }

    ),
    email:joi.string().email().required().messages({
        'string.empty':"email is required",
       "string.email":"plz enter a valid email",
    }),
    password:joi.string().min(8).max(20).required().messages({
        'string.empty':"password is required",
    }),
    checkPassword:joi.valid(joi.ref('password')).required(),
   
}),
query:joi.object({
    test:joi.boolean().required()
})
};

export const LogInSchema={
   body:joi.object({
  
    email:joi.string().email().required().messages({
        'string.empty':"email is required",
       "string.email":"plz enter a valid email",
    }),
    password:joi.string().min(8).max(20).required().messages({
        'string.empty':"password is required",
    }),
   
})
}
