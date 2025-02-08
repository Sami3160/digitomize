const express=require('express');
const FileUpload=require('../config/multer-config');
const { protect } = require('../middleware/authMiddleware');
const { createBlog,  deleteBlog, getBlogs, getOneBlog, updateLike, addComment, deleteComment,getUserContributions } = require('../controllers/blogController');
const router=express.Router();


router.post('/create', protect, FileUpload,createBlog);
router.post('/delete', protect, deleteBlog);
router.get('/getBlogs',getBlogs);
router.get('/getOneBlog',getOneBlog);
router.get('/updateLike', protect,updateLike);
router.post('/addComment', protect,addComment);
router.post('/deleteComment', protect,deleteComment);
router.get('/contributions/:userId', getUserContributions);

module.exports=router;

