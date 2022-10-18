const express =require("express");
const router = express.Router();
const multer = require('multer');

router.post("/image-upload",async(req,res)=>{
try{
    const storage=multer.diskStorage({
        destination: (req,file,callBack)=> {
            callBack(null,'public/media');
        },
        filename: (req,file,callBack)=> {
            callBack(null,file.originalname)
        }    
        
    });
// video/mp4
    const maxSize = 5 * 1024 * 1024; // for 5MB  
    const upload=multer({
        storage:storage,
        fileFilter: (req, file, cb)=> {
          if(file.mimetype==="image/jpg"||
            file.mimetype==="image/png"||
            file.mimetype==="image/jpeg"||
            file.mimetype==="image/webp"      
          ){
            cb(null, true)
          }else{
            cb(null, false);
            return cb(new Error("Only jpg, png, jpeg and webp format is allowed"))
          }
        },
        limits: { fileSize: maxSize }
      }).array('photos',12)

    //   req.body= name, father name, age  req.file=image req.files

      upload(req,res, (error)=> {  
        console.log("body test", req.body);
        console.log("files test", req.files);
/**
 * 
 * 
 * 
 * */ 

        if (error instanceof multer.MulterError) {        
            res.status(400).json({
              status:"Fail",
              message:error.message
            })
          } else if (error) {      
            res.status(400).json({
              status:"Fail",
              message:error.message
            })
          } 
      })
 
}catch(err){
    console.log(err)
}
})



module.exports=router