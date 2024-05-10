import multer from 'multer'


export const fileValidation = {
image: ['image/jpeg','image/png','image/gif'],
file:['application/pdf']
}
function fileUpload(CustomValidation=[]){
    const storage = multer.diskStorage({})
    function fileFilter (req,file,cb){
        if(CustomValidation.includes(file.mimetype)){
            cb(null,true);
        }else{
            cb("invalid format",false);
        }
    }
    const upload = multer({fileFilter,storage});
    return upload;
}
export default fileUpload;