
const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/uploads');
    },
    filename: (req, file, cb) => {
        cb(null, `${new Date().getTime()}-${file.originalname}`);
    }
});
const upload = multer({ storage: storage });

function FileUpload(req, res, next) {
    const uploadSingle = upload.single("image");

    uploadSingle(req, res, async function (err) {
        if (err) {
            console.log("eror in image middleware :",err.message)
            return res.status(500).json({ error: err, message: "Error in uploading file inside middleware" });
        }
        if(!req.file){            
            next();
            return;
        }else{
            next();
        }

    });
}

module.exports = FileUpload;