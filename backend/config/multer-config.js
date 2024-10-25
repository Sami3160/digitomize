
const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/uploads');
    },
    filename: (req, file, cb) => {
        cb(null, `${new Date().toUTCString()}-${file.originalname}`);
    }
});
const upload = multer({ storage: storage });

function FileUpload(req, res, next) {
    const uploadSingle = upload.single("image");

    uploadSingle(req, res, async function (err) {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        next();
    });
}

module.exports = FileUpload;