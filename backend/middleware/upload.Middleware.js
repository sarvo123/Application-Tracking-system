import multer from 'multer';

const storage = multer.diskStorage({
    destination : (req , file , cd)=>{
        cd(null , 'uploads/resumes');
    },
    filename : (req , file ,cb)=>{
        cb(null , `${Date.now()}-${file.originalname}`);
    },
});


const upload = multer({storage});

export default upload ; 