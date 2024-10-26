const express=require('express');
const FileUpload=require('../config/multer-config');
const { protect } = require('../middleware/authMiddleware');
const { createBlog, getBlogs, getBlogById, updateBlog, deleteBlog } = require('../controllers/blogController');
const router=express.Router();


router.post('/create', protect, FileUpload,createBlog);

