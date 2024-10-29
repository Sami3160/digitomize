const express=require('express');
const FileUpload=require('../config/multer-config');
const { protect } = require('../middleware/authMiddleware');
const { createBlog,  deleteBlog, getBlogs, getOneBlog, updateLike } = require('../controllers/blogController');
const router=express.Router();


router.post('/create', protect, FileUpload,createBlog);
router.delete('/delete', protect, deleteBlog);
router.get('/getBlogs',getBlogs);
router.get('/getOneBlog',getOneBlog);
router.get('/updateLike', protect,updateLike);

module.exports=router;

