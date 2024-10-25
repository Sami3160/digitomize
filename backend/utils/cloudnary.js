const cloudinary = require("cloudinary").v2;
const fs=require('fs');
const express = require('express');
const router = express.Router();
cloudinary.config({
    cloud_name: 'drixlrait',
    api_key: '678145639584449',
    api_secret: 'd0KOadtoLkhLM3T4z4-ZA_kyNdg'
});

const uploadOnCloudnary=async (localPath, folder)=>{
    try {
        if(!localPath){
            return null;
        }

        //upload part is heere
        const response=await cloudinary.uploader.upload(localPath,{
            folder,
            resource_type: "auto"
        },(error,result)=>{
            if(error){
                console.log(error);
                return null;
            }
            console.log("file is successfullty uploaded",result);
            return result.url;
        })
        return response.url;
    } catch (error) {
        fs.unlinkSync(localPath);//removes cache or locally saved temp files, very ijmp

        console.log(error);
        return null;
        
    }
}

const storage = cloudinaryStorage({
    cloudinary: cloudinary,
});
const upload = multer({
    storage: storage,
});
router.post('/update', upload.single('file'), async (req, res) => {
    

});

module.exports = router;
module.exports = uploadOnCloudnary;